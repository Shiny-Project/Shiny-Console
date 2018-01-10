import { ErrorAction } from '@/actions/dashboard/error';
import { ErrorState } from '@/types/index';
import { RAISE_ERROR } from '@/constants/index';
import initState from '@/stores/initState';

export function error(state: ErrorState = initState.dashboard.error, action: ErrorAction) {
    switch (action.type) {
        case RAISE_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return {
                ...state
            };
    }
}