export interface bulkWriteItem<T> {
    insertOne?: {
        document:T
    },
    updateOne?: {
        filter: any;    // key of document like { key: "yourvalue" }
        update: T;
    }
}
