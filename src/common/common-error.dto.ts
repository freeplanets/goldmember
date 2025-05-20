import { ApiProperty } from "@nestjs/swagger";
import { ICommonError } from "../interface/common.if";
import { ErrCode } from "../utils/enumError";

export class CommonErrorDto implements ICommonError{
    @ApiProperty({
        description: '錯誤訊息',
        example: ErrCode.DATABASE_ACCESS_ERROR,
    })
    message: string;
    @ApiProperty({
        description: '系統抛出的錯誤訊息',
        example: { Error: 'some error message'},
    })
    extra?: object;
}