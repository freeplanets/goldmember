import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IKsMember } from "../interface/ks-member.if";

export type KsMemberDocument = Document & KsMember;

@Schema()
export class KsMember implements IKsMember {
    @Prop({index:true, unique:true})
    no:string;

    @Prop()
    name:string;

    @Prop()
    gender:number;

    @Prop()
    birthday:string;

    @Prop()
    birthMonth: number;
    
    @Prop()
    types:number;
    
    @Prop()
    ownId:string;

    @Prop()
    realUser:string;

    @Prop({default:false})
    isChanged:boolean;

    @Prop({default: ''})
    appUser:string;
}
export const KsMemberSchema = SchemaFactory.createForClass(KsMember);