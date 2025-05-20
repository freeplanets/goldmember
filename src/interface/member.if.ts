import { DS_LEVEL, GENDER, MEMBER_LEVEL } from "../utils/enum";
import { IModifiedBy } from "./modifyed-by.if";

export interface IMember {
  id?: string;
  systemId?: string;
  name?: string;
  displayName?: string;
  password?: string;
  passwordLastModifiedTs: number;
  passwordUpdateReminderDays?: number; // 密碼更新提醒天數
  gender?: GENDER;
  birthDate?: string;
  birthMonth?: number;
  email?: string;
  phone?: string;
  address?: string;
  handicap?: number;
  pic?: string,  // 圖片(會員上傳或預設圖片自選)
  membershipType?: MEMBER_LEVEL;  // 
  membershipLastModified?: IModifiedBy;
  mobileType: string; //手機種類
  mobileId: string; //app 安裝序號, 每次重裝會不同
  joinDate?: string;
  expiryDate?: string;
  notes?: string;
  lastVisit?: string;
  isDirector?: DS_LEVEL;       // 球場董監事
  refSystemId?: string;  //非股東會員董監代表之股東代號
  directorStatusLastModified?: IModifiedBy;
}

// 非app股東，查詢優惠券

// 查詢 股號，手機，名字(含國興資料)