import * as constants from '@/constants/index';
import { StoreState } from '@/types/index';

export interface RaiseError {
    type: constants.RAISE_ERROR;
    name: string;
    message: string;
}

export type DashboardAction = RaiseError;

export function raiseError(name: string, message: string): RaiseError {
    return {
        type: constants.RAISE_ERROR,
        name,
        message
    };
}