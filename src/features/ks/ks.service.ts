import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import mongoose, { Document, Model } from "mongoose";
import { KsMember, KsMemberDocument } from "../../schemas/ksmember.schema";
import { CreateKsMemberDto } from "../dto/create_ks_member.dto";
import { ImportKsMemberDto } from "../dto/import_ks_member.dto";
import { bulkWriteItem } from "../../interface/mongo.op";
import { Member, MemberDcoument } from "../../schemas/member.schema";
import { UpdateMemberDto } from "../dto/update_member.dto";
import { MEMBER_LEVEL } from "../../utils/enum";
import { KsImportLog, KsImportLogDocument } from "../../schemas/ks_import_log.schema";
import { IKsMember } from "../../interface/ks-member.if";
import { MemberGrowth, MemberGrowthDocument } from "../../schemas/member-growth.schema";
import { IMemberGrowth } from "../../interface/report.if";
import { KS_FAMILY_NO_STYLE, KS_MEMBER_NO_STYLE } from "../../utils/constant";

@Injectable()
export class KsService {
    constructor(
        @InjectModel(KsMember.name) private ksMemberModel:Model<KsMemberDocument>,
        @InjectModel(Member.name) private memberModel:Model<MemberDcoument>,
        @InjectModel(KsImportLog.name) private ksImportLogModel:Model<KsImportLogDocument>,
        @InjectModel(MemberGrowth.name) private modelMG:Model<MemberGrowthDocument>,
        @InjectConnection() private readonly connection: mongoose.Connection
    ){}

    async create(dto: CreateKsMemberDto) {
        const member = new this.ksMemberModel(dto);
        return member.save();
    }
    async getAll(opt:string='') {
        const ans = new ImportKsMemberDto();
        const rlts = await this.ksMemberModel.find({});
        ans.count = rlts.length;
        if (ans.count > 0) {
            ans.data = rlts.map((itm) => {
                const tmp:any = {};
                tmp.no = opt == 'OG' ? itm.no : `T${itm.no}`;
                tmp.name = `${itm.name}`;
                tmp.gender = itm.gender;
                tmp.birthday = itm.birthday;
                tmp.types = itm.types;
                tmp.ownId = itm.ownId;
                tmp.realUser = itm.realUser;
                tmp.isChanged = itm.isChanged;
                tmp.appUser = opt == 'OG' ? itm.appUser : 'FORDELETE';
                if (opt === 'showkey') tmp._id = itm._id;
                return tmp;
            })
        }
        return ans;
    }
    async getOneById(id:string) {
        return this.ksMemberModel.find({"_id": id});
    }
    async delOne(id:string) {
        let filter = {}
        if (id === 'FORDELETE') {
            filter = {"appUser": id};
        } else {
            filter = {"_id": id};
        }
        await this.ksMemberModel.deleteMany(filter);
    }
    async delAll() {
        const items = await this.getAll();
        const n = items.count;
        for (let i=0; i<n; i++) {
            //if (!items[i].no) {
                await this.ksMemberModel.findOneAndDelete(items[i]._id);
            //}
        }
        return "";
    }
    async importDatas(dto: ImportKsMemberDto){
        // console.log("count:", dto.count);
        if (dto.data.length === 0) return 0;
        const temp= await this.getAll('OG');
        // console.log("getAll:", temp);
        // KsMember data from locale
        const list:Partial<IKsMember>[] = [];
        for (let i=0; i<temp.count; i++) {
            const item:Partial<IKsMember> = temp.data.pop();
            list[item.no] = item;
        }
        const log:KsImportLog = {
            id: `${Date.now()}`,
            count: dto.count,
            data: dto.data,
        }
        const newlog = await this.ksImportLogModel.create(log);
        await newlog.save();
        // console.log("list:", list);
        const cmds:bulkWriteItem<Partial<IKsMember>>[] = [];
        const upMbrs:bulkWriteItem<UpdateMemberDto>[] = [];
        let checkpoint = false;
        let chgSH = 0;
        let chgFA = 0;
        dto.data.forEach((dta) => {
            if (!dta.no) return;
            const itm:Partial<IKsMember> = dta;
            if (itm.birthday) itm.birthMonth = this.getBirthMonth(itm.birthday);
            const cmd:bulkWriteItem<Partial<IKsMember>>={};
            const upmbr:bulkWriteItem<UpdateMemberDto>={};
            const tmp = list[itm.no];
            if (tmp) {
                console.log('change:',tmp.no,'<>' ,itm.no, '=>', tmp.name, itm.name);
                if (tmp.name !== itm.name || tmp.realUser !== itm.realUser) {
                    itm.isChanged = true;
                    itm.changeDate = new Date().toLocaleString('zh-TW');
                    if (tmp.appUser) {
                        console.log("itm:", itm);
                        upmbr.updateOne = {
                            filter: {systemId: itm.no},
                            update: {
                                systemId: itm.no,
                                membershipType: MEMBER_LEVEL.GENERAL_MEMBER,
                                membershipLastModified: {
                                    modifiedBy: 'ks_member_update',
                                    modifiedAt: Date.now(),
                                    lastValue: '',
                                }
                            }
                        }
                        if (KS_MEMBER_NO_STYLE.test(itm.no)) {
                            chgSH += 1;
                        } else if (KS_FAMILY_NO_STYLE.test(itm.no)) {
                            chgFA += 1;
                        }
                        upMbrs.push(upmbr);
                    }
                }
                cmd.updateOne = {
                    filter: { no: itm.no },
                    update: itm,
                }
                // console.log('cmd:', cmd);
            } else {
                if (!checkpoint) {
                    console.log('do insert');
                    checkpoint = true;
                }
                cmd.insertOne = { document: itm };
            }
            cmds.push(cmd);
        });
        // console.log('cmds:', cmds);
        const session = await this.connection.startSession();
        session.startTransaction();
        let isSaveProcess = false;
        try {
            console.log('check0', upMbrs.length, cmds.length);
            if (upMbrs.length > 0) {
                const uprlt = await this.memberModel.bulkWrite(upMbrs as any[], {session});
                console.log('check1', uprlt);
                if (uprlt && (chgFA + chgSH) > 0) {
                    const mgOK = await this.updateMemberGrowth(chgSH, chgFA, session);
                    if (mgOK) {
                        isSaveProcess = true;
                        console.log('update member growth ok');
                    } else {
                        console.log('update member growth error');
                    }
                }
                // console.log('member update check', uprlt);
                //upMbrs.forEach((itm) => console.log(itm.updateOne));
            } else {
                isSaveProcess = true;
            }
            const rst = await this.ksMemberModel.bulkWrite(cmds as any[], {session});
            console.log('check2', rst);
            // cmds.forEach((itm) => console.log(itm.insertOne, itm.updateOne));
            //console.log(cmds[0].insertOne, cmds[0].updateOne); 
            //console.log('check1', rst);
            if (isSaveProcess) {
                await session.commitTransaction();
            } else {
                console.log('no save process');
                await session.abortTransaction();
            }
        } catch (err) {
            console.log(`error: ${err}`);
            await session.abortTransaction();
        } finally {
            //console.log('end process!!')
            await session.endSession();
        }
        return 0;
    }
    private async updateMemberGrowth(chgSH:number, chgFA:number, session: mongoose.ClientSession) {
        let modifyOK = false;
        try {
            const d = new Date();
            const year = d.getFullYear();
            const month = d.getMonth() + 1;
            const mg = await this.modelMG.findOne({year, month});
            let myMG:Partial<IMemberGrowth> = {};
            if (mg) {
                myMG.regularGrowth = mg.regularGrowth;
                myMG.shareholderGrowth = mg.shareholderGrowth;
                myMG.familyGrowth = mg.familyGrowth;
            } else {
                myMG.regularGrowth = 0;
                myMG.shareholderGrowth = 0;
                myMG.familyGrowth = 0;
            }
            myMG.regularGrowth = myMG.regularGrowth + chgSH + chgFA;
            myMG.shareholderGrowth = myMG.shareholderGrowth - chgSH;
            myMG.familyGrowth = myMG.familyGrowth - chgFA;
            const upesert = await this.modelMG.updateOne({year, month}, myMG, {upsert:true, session});
            console.log('modifyMG', upesert);
            modifyOK = true;
        } catch (e) {
            console.log('modifyMG error:', e);
            modifyOK = false;
        }
        return modifyOK;
    }    
    async getLog(count=500){
       return this.ksImportLogModel.find({count: {$gte: count}}).limit(5);
    }
    async delLog(id:string) {
        return this.ksImportLogModel.findByIdAndDelete({"_id": id});
    }
    getBirthMonth(birthday:string) {
        const pos1 = birthday.indexOf('/');
        const pos2 = birthday.indexOf('/', pos1+1)
        if (pos1 ==-1 || pos2 ==-1) return 0;
        let newStr = birthday.substring(pos1+1, pos2);
        return Number(newStr);
    }
}