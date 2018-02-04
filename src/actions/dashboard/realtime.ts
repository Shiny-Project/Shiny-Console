import * as constants from '@/constants/index';
import { StoreState } from '@/types/index';
import { ThunkAction } from 'redux-thunk';
import { RaiseError, raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import { RecentEventsResponse, ShinyEvent, ShinyEventLevel, ShinyEventData } from '@/types/dashboard';
import io from 'socket.io-client';

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

export interface AddRecentEvent {
    type: constants.ADD_RECENT_EVENT;
    event: ShinyEvent;
}

export type RealtimeAction = 
    GetRecentEvent | GetRecentEventSuccess | GetRecentEventFailure | AddRecentEvent | RaiseError;

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

interface EventSocketMessage {
    level: ShinyEventLevel;
    spiderName: string;
    hash: string;
    data: ShinyEventData;
}

export function listenNewEvents(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        const socketClient = io('http://websocket.shiny.kotori.moe:3737');
        socketClient.on('event', (event: string) => {
            const message = JSON.parse(event) as EventSocketMessage;
            dispatch(addRecentEvent({
                level: message.level,
                data: message.data,
                publisher: message.spiderName,
                hash: message.hash
            }));
        });
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

export function addRecentEvent(event: ShinyEvent): AddRecentEvent {
    return {
        type: constants.ADD_RECENT_EVENT,
        event
    };
}