import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IMemberGrowth } from "../interface/report.if";

export type MemberGrowthDocument = Document & MemberGrowth;

@Schema()
export class MemberGrowth implements IMemberGrowth {
    @Prop({index: true, required: true})
    year?:number;

    @Prop({index: true, required: true})
    month?: number;

    @Prop()
    regularGrowth?: number;

    @Prop()
    shareholderGrowth?: number;

    @Prop()
    familyGrowth?: number;

    @Prop()
    regularActivity?: number;

    @Prop()
    shareholderActivity?: number;

    @Prop()
    familyActivity?: number;
}

export const MemberGrowthSchema = SchemaFactory.createForClass(MemberGrowth);

MemberGrowthSchema.index(
    { year: 1, month: 1},
    { unique: true }
)

