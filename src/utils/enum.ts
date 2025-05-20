export enum ERROR_TYPE {
  SYSTEM = 'SYSTEM',
  DEVELOPER = 'DEVELOPER',
}

export enum LEVEL {
  //SUPER = 'SUPER',
  ADMIN = 'ADMIN',        // 系統管理員 
  MANAGER = 'MANAGER',    // 場地經理
  WORKER = 'WORKER',      // 工作人員
  RECEPTION = 'RECEPTION',// 櫃檯接待
  //USER = 'USER',
}

export enum DS_LEVEL {
  CHAIRMAN = 'chairman',      // 董事長
  VICE_CHAIRMAN = 'vice_chairman',  // 副董事長
  MANAGING_DIRECTOR = 'managing_director', // 常務董事
  DIRECTOR = 'director', // 董事
  STANDING_SUPERVISOR = 'standing_supervisor',  // 常務監察人
  SUPERVISOR = 'supervisor',  // 監察人
  NONE = 'none',
}

export enum MEMBER_LEVEL {
  ALL = 'all',
  GENERAL_MEMBER = 'general_member',
  DEPENDENTS = 'dependents',
  SHARE_HOLDER = 'share_holder', 
}

export enum ANNOUNCEMENT_TYPE {
  ROUTINE = 'routine',
  GAME = 'game',
  ANNIVERSARY = 'anniversary',
}
export enum MEMBER_GROUP {
  ALL = 'all',
  SHARE_HOLDER = 'share_holder',
  GENERAL_MEMBER = 'general_member',
  DEPENDENTS = 'dependents',
  DIRECTOR_SUPERVISOR = 'director_and_supervisor',
}
export enum MEMBER_EXTEND_GROUP {
  BIRTH_OF_MONTH = 'birth_of_month',
}

export enum BIRTH_OF_MONTH {
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12,
}

export enum ANNOUNCEMENT_READ_STATUS {
  UNREAD = 'unread',
  READ = 'read',
}
// export enum SEARCH_GROUP_METHOD {
//   NONE = 'none',
//   INTERSECTION = 'intersection',
//   JOINT = 'joint',
// }

export enum COUPON_BATCH_ISSUANCE_METHOD {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
}

export enum COUPON_BATCH_STATUS {
  CANCELED = 'canceled',
  ISSUED = 'issued',
  NOT_ISSUED = 'not_issued',
}

export enum COUPON_BATCH_FREQUNCY {
  MONTHLY = 'monthly',  // label: '月' },
  QUARTERLY = 'quarterly',  //label: '季' },
  SEMI_ANNUAL = 'semi_annual', // label: '半年' },
  YEARLY = 'yearly', // label: '年' }
}

export enum COUPON_STATUS {
  NOT_USED = 'not_used',
  USED = 'used',
  CANCELED = 'canceled',
  NOT_ISSUED = 'not_issued',
  //READY_TO_USE = 'ready_to_use',
  EXPIRED = 'expired',
}

export enum GENDER {
  LEGAL_PERSON = 0,
  MALE = 1,
  FEMALE = 2,
}

export enum SmsCodeUsage {
  REGISTER = 'regi',
  RESET_PASS = 'reset',
  PHONE_CHANGE = 'change',
}