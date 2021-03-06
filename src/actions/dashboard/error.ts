import * as constants from 'constants/Dashboard';
// import { StoreState } from 'types/index';

export interface RaiseError {
    type: constants.RAISE_ERROR;
    error: Error;
    errorId: number;
}

export type ErrorAction = RaiseError;

export function raiseError(error: Error): RaiseError {
    return {
        type: constants.RAISE_ERROR,
        error,
        errorId: Math.random()
    };
}