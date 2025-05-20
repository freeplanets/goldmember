import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IModifiedBy } from '../interface/modifyed-by.if';

export class ModifiedByData implements IModifiedBy {
  @ApiProperty({
    description: '修改人員編號',
    required: false,
  })
  @IsOptional()
  @IsString()
  modifiedBy?: string;

  @ApiProperty({
    description: '修改時間',
    required: false,
  })
  @IsOptional()
  @IsString()
  modifiedAt?: string;

  @ApiProperty({
    description: '修改前數值',
    required: false,
  })
  lastValue: string | number | boolean;
}
