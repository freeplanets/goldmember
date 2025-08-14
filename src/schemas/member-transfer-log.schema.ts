import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMemberTransferLog } from '../interface/member.if';
import { MEMBER_LEVEL } from '../utils/enum';

export type MemberTransferLogDocument = MemberTransferLog & Document;

@Schema()
export class MemberTransferLog implements IMemberTransferLog {
    @Prop({ index: true, required: true, unique: true })
    id: string;

    @Prop({ index: true, required: true })
    memberId: string;

    @Prop({ index: true, required: true })
    memberName: string;

    @Prop({})
    oldMembershipType?: MEMBER_LEVEL;

    @Prop({})
    newMembershipType?: MEMBER_LEVEL;

    @Prop()
    isDirector?: boolean;

    @Prop()
    modifiedAt?: number;
    
    @Prop()
    modifiedBy?: string;

    @Prop()
    modifiedByWho: string;
}

export const MemberTransferLogSchema = SchemaFactory.createForClass(MemberTransferLog);
    
  
  
    