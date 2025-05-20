import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { KsMember, KsMemberSchema } from "../../schemas/ksmember.schema";
import { KsController } from "./ks.controller";
import { KsService } from "./ks.service";
import { Member, MemberSchema } from "../../schemas/member.schema";
import { KsImportLog, KsImportLogSchema } from "../../schemas/ks_import_log.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: KsMember.name, schema: KsMemberSchema},
            {name: Member.name, schema: MemberSchema},
            {name: KsImportLog.name, schema: KsImportLogSchema},
        ]),
    ],
    controllers: [KsController],
    providers:[KsService],
})
export class KsModule {}