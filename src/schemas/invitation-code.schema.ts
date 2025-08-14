import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IInvitationCode } from '../interface/ks-member.if';

export type InvitationCodeDocument = Document & InvitationCode;

@Schema()
export class InvitationCode implements IInvitationCode {
    @Prop({index: true, unique:true})
    no:string;

    @Prop({index: true})
    name:string;

    @Prop({index: true})
    code:string;

    @Prop()
    isCodeUsed: boolean;

    @Prop()
    CodeUsedTS: number;

    @Prop()
    isTransferred: boolean; // IF true, code wil expired    
}

export const InvitationCodeSchema = SchemaFactory.createForClass(InvitationCode);