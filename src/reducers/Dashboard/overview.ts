import { OverviewAction } from '@/actions/dashboard/overview';
import { OverviewState } from '@/types/index';
import { GET_STATISTICS, GET_STATISTICS_SUCCESS, GET_STATISTIC_FAILURE } from '@/constants/index';
import initState from '@/stores/initState';

export function overview(state: OverviewState = initState.dashboard.overview, action: OverviewAction): OverviewState {
    switch (action.type) {
        case GET_STATISTICS:
            return {
                ...state,
                isLoading: true,
            };
        case GET_STATISTICS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                statistics: action.statistics
            };
        case GET_STATISTIC_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return {
                ...state
            };
    }
}