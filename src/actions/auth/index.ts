import * as constants from '../../constants/index';

export interface Login {
    type: constants.LOGIN;
}

export type AuthAction = Login;

export function login(): Login {
    return {
        type: constants.LOGIN
    };
}