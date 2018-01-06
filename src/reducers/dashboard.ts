import { DashboardAction } from '@/actions/dashboard';
import { DashboardState } from '@/types/index';
import { RAISE_ERROR } from '@/constants/index';
import initState from '@/stores/initState';

export function dashboard(state: DashboardState = initState.dashboard, action: DashboardAction) {
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