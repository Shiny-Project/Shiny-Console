import * as constants from '@/constants/Dashboard/realtime';
import { StoreState } from '@/types/index';
import { ThunkAction } from 'redux-thunk';
import { RaiseError, raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import * as DashboardTypes from '@/types/dashboard';
import io from 'socket.io-client';

export interface GetRecentEvent {
    type: constants.GET_RECENT_EVENTS;
}

export interface GetRecentEventSuccess {
    type: constants.GET_RECENT_EVENTS_SUCCESS;
    recentEvents: DashboardTypes.RecentEventsResponse;
}

export interface GetRecentEventFailure {
    type: constants.GET_RECENT_EVENTS_FAILURE;
}

export interface AddRecentEvent {
    type: constants.ADD_RECENT_EVENT;
    event: DashboardTypes.ShinyEvent;
}

export interface AddJob {
    type: constants.ADD_JOB;
    job: DashboardTypes.Job;
}

export interface UpdateJob {
    type: constants.UPDATE_JOB;
    job: DashboardTypes.Job;
}

export type RealtimeAction =
    GetRecentEvent | GetRecentEventSuccess | GetRecentEventFailure | AddRecentEvent |
    AddJob | UpdateJob | RaiseError;

/**
 * 获得最近事件
 */
export function getRecentEvents(publishers?: string[]): ThunkAction<void, StoreState, null> {
    console.log(publishers);
    return async (dispatch) => {
        dispatch(getRecentEventsStart());
        try {
            const recentEvents = await request.get<DashboardTypes.RecentEventsResponse>(
                '/Data/recent', 
                publishers ? { 
                    publishers: publishers.join(',')
                } : {}
            );
            dispatch(getRecentEventsSuccess(recentEvents));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getRecentEventsFailure());
        }
    };
}

/**
 * 开始监听新事件
 */
export function listenNewEvents(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        const socketClient = io('http://websocket.shiny.kotori.moe:3737');
        socketClient.on('event', (event: string) => {
            const message = JSON.parse(event) as DashboardTypes.EventSocketMessage;
            dispatch(addRecentEvent({
                level: message.level,
                data: message.data,
                publisher: message.spiderName,
                hash: message.hash
            }));
        });
    };
}

/**
 * 监听任务执行状态
 */
export function listenJobStatus(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        const socketClient = io('/', {
            path: '/API/socket.io'
        });
        socketClient.on('job', (message: DashboardTypes.JobStatusMessage) => {
            if (message.type === 'create') {
                dispatch(addJob(message.job));
            } else if (message.type === 'update') {
                dispatch(updateJob(message.job));
            } else {
                //
            }
        });
    };
}

export function getRecentEventsStart(): GetRecentEvent {
    return {
        type: constants.GET_RECENT_EVENTS
    };
}

export function getRecentEventsSuccess(recentEvents: DashboardTypes.RecentEventsResponse): GetRecentEventSuccess {
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

export function addRecentEvent(event: DashboardTypes.ShinyEvent): AddRecentEvent {
    return {
        type: constants.ADD_RECENT_EVENT,
        event
    };
}

export function addJob(job: DashboardTypes.Job): AddJob {
    return {
        type: constants.ADD_JOB,
        job
    };
}

export function updateJob(job: DashboardTypes.Job): UpdateJob {
    return {
        type: constants.UPDATE_JOB,
        job
    };
}