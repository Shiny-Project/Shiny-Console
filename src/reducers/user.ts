import { UserAction } from '@/actions/user';
import { UserState } from '@/types/index';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '@/constants/index';
import initState from '@/stores/initState';

export function user(state: UserState = initState.user, action: UserAction): UserState {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                loading: false,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default: 
            return state;
    }
}