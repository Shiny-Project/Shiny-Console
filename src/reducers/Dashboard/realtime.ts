import { RealtimeAction } from '@/actions/dashboard/realtime';
import { RealtimeState } from '@/types/index';
import { GET_RECENT_EVENTS, GET_RECENT_EVENTS_SUCCESS, GET_RECENT_EVENTS_FAILURE } from '@/constants/index';
import initState from '@/stores/initState';

export function realtime(state: RealtimeState = initState.dashboard.realtime, actions: RealtimeAction): RealtimeState {
    switch (actions.type) {
        case GET_RECENT_EVENTS:
            return {
                ...state,
                isLoading: true
            };
        case GET_RECENT_EVENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                recentEvents: actions.recentEvents
            };
        case GET_RECENT_EVENTS_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return {
                ...state
            };
    }
}