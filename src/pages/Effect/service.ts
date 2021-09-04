import request from "services/request";
import { Spider } from "types/dashboard";
import { EffectItem, EffectType } from "./types";

export const getEffectList = () => request.get<EffectItem[]>("/Effect/list");

export interface CreateEffectParams {
    key: string;
    value: string;
    type: EffectType;
    start?: string;
    end?: string;
    desc?: string;
    contentType: string;
}

export const createEffect = (values: CreateEffectParams) => {
    const payload = values;
    if (payload.type === EffectType.PERMANENT) {
        delete payload.start;
        delete payload.end;
    }
    return request.post<EffectItem>("/Effect/create", values);
};

export const deleteEffect = (key: string) =>
    request.post<void>("/Effect/delete", { key });

export const getSpiderList = () => request.get<Spider[]>("/Spider/list");
