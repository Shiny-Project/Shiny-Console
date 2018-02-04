import * as constants from '@/constants/index';
import { StoreState } from '@/types/index';
import { ThunkAction } from 'redux-thunk';
import { RaiseError, raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import { RecentEventsResponse } from '@/types/dashboard';

export interface GetRecentEvent {
    type: constants.GET_RECENT_EVENTS;
}

export interface GetRecentEventSuccess {
    type: constants.GET_RECENT_EVENTS_SUCCESS;
    recentEvents: RecentEventsResponse;
}

export interface GetRecentEventFailure {
    type: constants.GET_RECENT_EVENTS_FAILURE;
}

export type RealtimeAction = GetRecentEvent | GetRecentEventSuccess | GetRecentEventFailure | RaiseError;

export function getRecentEvents(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(getRecentEventsStart());
        try {
            const recentEvents = await request.get<RecentEventsResponse>('/Data/recent');
            dispatch(getRecentEventsSuccess(recentEvents));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getRecentEventsFailure());
        }
    };
}

export function getRecentEventsStart(): GetRecentEvent {
    return {
        type: constants.GET_RECENT_EVENTS
    };
}

export function getRecentEventsSuccess(recentEvents: RecentEventsResponse): GetRecentEventSuccess {
    return {
        type: constants.GET_RECENT_EVENTS_SUCCESS,
        recentEvents
    };
}

export function getRecentEventsFailure(): GetRecentEventFailure {
    return {
        type: constants.GET_RECENT_EVENTS_FAILURE
    };
}