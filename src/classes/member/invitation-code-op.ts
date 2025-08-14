import { Model } from 'mongoose';
import { InvitationCodeDocument } from '../../schemas/invitation-code.schema';

export class InvitationCodeOp {
    private BaseStr='23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    private BaseLen = 32;
    private _history:string[] =[];
    constructor(private readonly db:Model<InvitationCodeDocument>) {}
    create(no:string, len=10) {
        let str = '';
        const rand = Math.random()
        for (let i=0;i<len;i++) {
            str+= this.BaseStr[Math.floor(Math.random()*this.BaseLen)];
        }
        while(this._history.indexOf(str)!==-1) {
            console.log('code:', str, ' exists recreate');
            str = this.create(no, len);
        }
        // this._history.push(str);
        this._history[no] = str;
        return str;
    }
    async getHistory() {
        const founds = await this.db.find({}, 'no code');
        //this._history = founds.map((itm) => itm.code);
        founds.forEach((itm) => {
            this._history[itm.no] = itm.code;
        })
    }
    Code(no:string) {
        return this._history[no];
    }
    // set history(str:string|string[]){
    //     if (typeof str === 'string') {
    //         this._history.push(str);
    //     } else {
    //         this._history = str;
    //     }
    // }
    // get history() {
    //     return this._history;
    // }

}