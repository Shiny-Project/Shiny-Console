import * as constants from '@/constants/index';
// import { StoreState } from '@/types/index';

export interface RaiseError {
    type: constants.RAISE_ERROR;
    error: Error;
}

export type ErrorAction = RaiseError;

export function raiseError(error: Error): RaiseError {
    return {
        type: constants.RAISE_ERROR,
        error,
    };
}