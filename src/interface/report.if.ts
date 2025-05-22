export interface IMemberYearly {
    year?:number;
    totalMembers?: number;
    newMembers?: number;
    totalCoupons?: number;
    usedCoupons?: number;
    usageRate?: number;     // 直接運算
}

export interface IMemberMonthly {
    year?:number;
    month?: number;
    newMembers?: number;
    usedCoupons?: number;
    yearToDateUsageRate?: number;   // 直接運算
}

export interface IMemberGrowth {
    year?:number;
    month?: number;
    regularGrowth?: number;
    shareholderGrowth?: number;
    familyGrowth?: number;
    regularActivity?: number;
    shareholderActivity?: number;
    familyActivity?: number;
}

export interface ICouponStats {
    year?:number;
    month?: number;
    type?: string;
    electronicCount?: number;
    electronicUsed?: number;
    electronicInvalid?: number;
    electronicExpired?: number;
    electronicUnused?: number;
    paperCount?: number;
    paperUsed?: number;
    paperInvalid?: number;
    paperExpired?: number;
    paperUnused?: number;
}

export interface IReport {
    yearlyStats: IMemberYearly;
    monthlyStats: IMemberMonthly[];
    growthStats: IMemberGrowth[];
    couponStats: ICouponStats[];
}