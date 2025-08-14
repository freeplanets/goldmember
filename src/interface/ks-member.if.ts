// types: 會員類別>0:來賓 1:記名會員 2:無記名會員 3:平日會員 5:眷屬會員 6:團體眷屬會員 9:廠商
export interface IKsMember {
    no:string;
    name:string;
    gender:number;
    birthday:string;
    birthMonth: number;
    types:number;
    ownId:string;
    realUser:string;
    isChanged:boolean;
    appUser:string;
    changeDate: string;
}

export interface IInvitationCode {
    no:string;
    name:string;
    code:string;
    isCodeUsed: boolean;
    CodeUsedTS: number;
    isTransferred: boolean; // IF true, code wil expired
}