import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
//import { KsMember } from "./ksmember.schema";

export type KsImportLogDocument = Document & KsImportLog;

@Schema()
export class KsImportLog {
    @Prop({ index: true})
    id: string;

    @Prop()
    count: number;

    @Prop()
    data: any[];
}

export const KsImportLogSchema = SchemaFactory.createForClass(KsImportLog);