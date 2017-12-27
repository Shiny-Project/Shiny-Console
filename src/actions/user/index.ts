import * as constants from '../../constants/index';
import { StoreState } from '../../types/index';
import { ThunkAction } from 'redux-thunk';
import request from '../../services/request';

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

export function login(userName: string, password: string): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(loginStart());
        try {
            await request.post('/User/login', {
                email: userName,
                password
            });
            dispatch(loginSuccess());
        } catch (e) {
            dispatch(loginFailure(e.message));
        }
    };
}

export function loginStart(): Login {
    return {
        type: constants.LOGIN
    };
}

export function loginSuccess(): LoginSuccess {
    return {
        type: constants.LOGIN_SUCCESS
    };
}

export function loginFailure(message: string): LoginFailure {
    return {
        type: constants.LOGIN_FAILURE,
        message
    };
}