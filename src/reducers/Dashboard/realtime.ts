import { RealtimeAction } from '@/actions/dashboard/realtime';
import { RealtimeState } from '@/types/index';
import * as ActionTypes from '@/constants/index';
import initState from '@/stores/initState';

export function realtime(state: RealtimeState = initState.dashboard.realtime, actions: RealtimeAction): RealtimeState {
    switch (actions.type) {
        case ActionTypes.GET_RECENT_EVENTS:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.GET_RECENT_EVENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                recentEvents: actions.recentEvents
            };
        case ActionTypes.GET_RECENT_EVENTS_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case ActionTypes.ADD_RECENT_EVENT:
            return {
                ...state,
                recentEvents: [
                    actions.event,
                    ...state.recentEvents
                ]
            };
        default:
            return {
                ...state
            };
    }
}