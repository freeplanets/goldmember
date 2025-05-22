import { IsBoolean, IsNumber, IsString } from "class-validator";
import { IKsMember } from "../../interface/ks-member.if";

export class CreateKsMemberDto implements Partial<IKsMember> {
    @IsString()
    no:string;

    @IsString()
    name:string;

    @IsNumber()
    gender:number;

    @IsString()
    birthday?:string;
   
    @IsNumber()
    types: number
    
    @IsString()
    ownId:string;

    @IsString()
    realUser:string;
    
    @IsBoolean()
    isChanged?: boolean;

    @IsString()
    appUser?:string;
}