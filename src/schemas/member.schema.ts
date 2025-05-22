import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IMember } from "../interface/member.if";
import { Document } from "mongoose";
import { DS_LEVEL, GENDER, MEMBER_LEVEL } from "../utils/enum";
import { ModifiedByData } from "../common/modified-by.data";
import { IModifiedBy } from "../interface/modifyed-by.if";

export type MemberDcoument = Document & Member;

@Schema()
export class Member implements IMember {
    @Prop({index: true, unique: true})
    id: string;

    @Prop({index: true})
    systemId: string;

    @Prop()
    name: string;

    @Prop()
    displayName: string;

    @Prop()
    password: string;

    @Prop({
        default: 0,
    })
    passwordLastModifiedTs: number;

    @Prop({
        enum: GENDER,
    })
    gender?: GENDER;

    @Prop()
    birthDate: string;

    @Prop()
    birthMonth: number;

    @Prop()
    email: string;

    @Prop({unique: true, required: true})
    phone: string;

    @Prop()
    address: string;

    @Prop()
    handicap: number;
    
    @Prop()
    pic: string;

    @Prop({
        enum: MEMBER_LEVEL,
        default: MEMBER_LEVEL.GENERAL_MEMBER,
    })
    membershipType: MEMBER_LEVEL;

    @Prop({
        type: ModifiedByData,
    })
    membershipLastModified: IModifiedBy;

    @Prop()
    mobileType: string;

    @Prop()
    mobileId: string;

    @Prop()
    joinDate: string;

    @Prop()
    expiryDate: string;

    @Prop()
    notes: string;

    @Prop()
    lastVisit: string;

    @Prop({
        enum: DS_LEVEL,
        default: DS_LEVEL.NONE,
    })
    isDirector: DS_LEVEL;
    
    @Prop()
    refSystemId: string;

    @Prop({
        type: ModifiedByData, 
    })
    directorStatusLastModified?: IModifiedBy;
}
const saltRounds = Number(process.env.SALT_ROUNDS);
export const MemberSchema = SchemaFactory.createForClass(Member);
