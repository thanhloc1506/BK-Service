export interface Quan{
    readonly district_id: string;
    readonly district_name: string;
}
export interface Phuong{
    readonly ward_name: string;
    readonly ward_id: string;
}

export interface Address{
    readonly province: string;
    readonly district: string;
    readonly village: string;
    readonly detail: string;
}