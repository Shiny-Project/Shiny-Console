import { ErrorAction } from 'actions/dashboard/error';
import { ErrorState } from 'types';
import { RAISE_ERROR } from 'constants/Dashboard';
import initState from 'stores/initState';

export function errors(state: ErrorState = initState.dashboard.errors, action: ErrorAction) {
    switch (action.type) {
        case RAISE_ERROR:
            return {
                ...state,
                lastError: action.error,
                errorId: action.errorId
            };
        default:
            return {
                ...state
            };
    }
}