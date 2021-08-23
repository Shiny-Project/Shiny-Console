export enum EffectType {
    TEMPORARY = 1,
    PERMANENT = 2,
}

export interface EffectItem {
    id: number;
    type: EffectType;
    start?: string;
    end?: string;
    key: string;
    value: string;
    desc?: string;
    contentType: string;
    createdAt: string;
    updatedAt: string;
}