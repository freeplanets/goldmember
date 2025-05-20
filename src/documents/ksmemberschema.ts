import { Schema } from "mongoose";

const MemberSchema = new Schema({
    no: {
        type: String,
        index: true,
        unique: true,
    },
    name: String,
    gender: Number,
    birthday: String,
    ownId: String,
    realUser: String,
});
export default MemberSchema;