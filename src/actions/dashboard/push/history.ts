import * as constants from '@/constants/Push/history';
import { raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import { PushHistoryResponse } from '@/types/dashboard';
import { DeferredAction } from '@/types/action';

export interface GetPushHistory {
    type: constants.GET_PUSH_HISTORY;
}

export interface GetPushHistorySuccess {
    type: constants.GET_PUSH_HISTORY_SUCCESS;
    pushHistory: PushHistoryResponse;
}

export interface GetPushHistoryFailure {
    type: constants.GET_PUSH_HISTORY_FAILURE;
}

export type HistoryAction = GetPushHistory | GetPushHistorySuccess | GetPushHistoryFailure;

export function getPushHistoryStart(): GetPushHistory {
    return {
        type: constants.GET_PUSH_HISTORY
    };
}

export function getPushHistorySuccess(pushHistory: PushHistoryResponse): GetPushHistorySuccess {
    return {
        type: constants.GET_PUSH_HISTORY_SUCCESS,
        pushHistory
    };
}

export function getPushHistoryFailure(): GetPushHistoryFailure {
    return {
        type: constants.GET_PUSH_HISTORY_FAILURE
    };
}

/**
 * 获得最近推送任务列表
 */
export function getPushHistory():
    DeferredAction<GetPushHistory | GetPushHistorySuccess | GetPushHistoryFailure> {
    return async (dispatch) => {
        dispatch(getPushHistoryStart());
        try {
            const result = await request.get<PushHistoryResponse>('/Job/recent', {
                types: 'push'
            });
            dispatch(getPushHistorySuccess(result));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getPushHistoryFailure());
        }
    };
}
