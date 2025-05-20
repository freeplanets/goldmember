import * as CryptoJS from "crypto-js";

export default class EncDecString {
    private key: string;
    private opt: CryptoJS.CipherOption;
    constructor(tkey: string= "") {
        if (!tkey) {
            tkey = CryptoJS.MD5("keyforthepassword").toString();
        }
        this.key = CryptoJS.enc.Utf8.parse(tkey).toString();
        console.log("EncDecString", tkey, this.key);
        this.opt = {
            keySize: 128 / 8,
            iv: this.key,
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.AnsiX923
        };
    }
    public Encrypted(str: string): string {
        console.log('Encrypted:', str);
        console.log(CryptoJS.MD5(str).toString());
        return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(str), this.key, this.opt).toString();
    }
    public Decrypted(str: string): string {
        console.log('Decrypted:', CryptoJS.AES.decrypt(str, this.key).toString(CryptoJS.enc.Utf8));
        return CryptoJS.AES.decrypt(str, this.key, this.opt).toString(CryptoJS.enc.Utf8);
    }
    get KeyString(): string {
        const s: string = new Date().getTime() + "rr" + Math.random();
        return CryptoJS.MD5(s).toString();
    }
}
