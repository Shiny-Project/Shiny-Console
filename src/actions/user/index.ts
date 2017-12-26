import * as constants from '../../constants/index';

export interface Login {
    type: constants.LOGIN;
}

export interface LoginSuccess {
    type: constants.LOGIN_SUCCESS;
}

export interface LoginFailure {
    type: constants.LOGIN_FAILURE;
    message: string;
}

export type UserAction = Login | LoginSuccess | LoginFailure;

export function login(): Login {
    return {
        type: constants.LOGIN
    };
}