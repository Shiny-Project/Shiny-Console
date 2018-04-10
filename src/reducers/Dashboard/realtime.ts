import { RealtimeAction } from '@/actions/dashboard/realtime';
import { RealtimeState } from '@/types/index';
import * as ActionTypes from '@/constants/Dashboard/realtime';
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
                recentEvents: {
                    total: state.recentEvents.total + 1,
                    events: [
                        actions.event,
                        ...state.recentEvents.events
                    ]
                }
            };
        case ActionTypes.ADD_JOB:
            return {
                ...state,
                recentJobs: [
                    actions.job,
                    ...state.recentJobs
                ]
            };
        case ActionTypes.UPDATE_JOB:
            const index = state.recentJobs.findIndex(job => job.id === actions.job.id);
            if (index !== -1) {
                return {
                    ...state,
                    recentJobs: [
                        ...state.recentJobs.slice(0, index),
                        actions.job,
                        ...state.recentJobs.slice(index + 1)
                    ]
                };
            } else {
                return {
                    ...state
                };
            }
        default:
            return {
                ...state
            };
    }
}