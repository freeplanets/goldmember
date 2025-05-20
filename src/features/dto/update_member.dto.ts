import { IsObject, IsString } from "class-validator";
import { IMember } from "../../interface/member.if";
import { MEMBER_LEVEL } from "../../utils/enum";
import { IModifiedBy } from "../../interface/modifyed-by.if";

export class UpdateMemberDto implements Partial<IMember> {
    @IsString()
    systemId?: string;

    @IsString()
    membershipType?: MEMBER_LEVEL;

    @IsObject()
    membershipLastModified?: IModifiedBy;
}