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

export interface EffectTemplate {
    name: string;
    template: string;
    parameters: EffectTemplateParameter[];
}

export type EffectTemplateParameterTypes = "array" | "string";

export interface EffectTemplateParameter {
    type: EffectTemplateParameterTypes;
    name: string;
    label: string;
    required?: boolean;
}
