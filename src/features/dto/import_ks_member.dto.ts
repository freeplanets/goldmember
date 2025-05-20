import { IsArray, IsNumber } from "class-validator";
import { CreateKsMemberDto } from "./create_ks_member.dto";

export class ImportKsMemberDto {
    @IsNumber()
    count: number;

    @IsArray()
    data: CreateKsMemberDto[];
}