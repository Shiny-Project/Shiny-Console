import { AuthAction } from '../actions/auth';
import { StoreState } from '../types/index';
import { LOGIN } from '../constants/index';

export function auth(state: StoreState, action: AuthAction): StoreState {
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