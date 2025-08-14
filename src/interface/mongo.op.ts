import { FilterQuery, UpdateQuery } from "mongoose";

export interface IbulkWriteItem<T> {
    insertOne?: {
        document:T
    },
    updateOne?: {
        filter: FilterQuery<T>;    // key of document like { key: "yourvalue" }
        update: UpdateQuery<T>;
        upsert?: boolean;
    }
}
