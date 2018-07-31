import * as constants from '@/constants';
import { StoreState } from '@/types';
import { ThunkAction } from 'redux-thunk';
import request from '@/services/request';
import { message } from 'antd';
import Auth from '@/services/auth';

export interface LoginResponse {
    uid: number;
}

export interface Login {
    type: constants.LOGIN;
}

export interface LoginSuccess {
    type: constants.LOGIN_SUCCESS;
}

export interface LoginFailure {
    type: constants.LOGIN_FAILURE;
}

export type UserAction = Login | LoginSuccess | LoginFailure;

export function login(userName: string, password: string): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(loginStart());
        try {
            const response = await request.post<LoginResponse>('/User/login', {
                email: userName,
                password
            });
            Auth.login(response.uid);
            dispatch(loginSuccess());
        } catch (e) {
            message.error(e.message);
            dispatch(loginFailure());
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

export function loginFailure(): LoginFailure {
    return {
        type: constants.LOGIN_FAILURE,
    };
}