import { AuthAction } from '../actions/auth';
import { UserState } from '../types/index';
import { LOGIN } from '../constants/index';
import initState from '../stores/initState';

export function user(state: UserState = initState.user, action: AuthAction): UserState {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLogin: true
            };
        default: 
            return state;
    }
}