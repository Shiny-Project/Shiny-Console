import * as constants from '@/constants/Server/node';
import { StoreState } from '@/types/index';
import { ThunkAction } from 'redux-thunk';
import { RaiseError, raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import { ServerListResponse } from '@/types/dashboard';

export interface GetServerList {
    type: constants.GET_SERVER_LIST;
}

export interface GetServerListSuccess {
    type: constants.GET_SERVER_LIST_SUCCESS;
    serverList: ServerListResponse;
}

export interface GetServerListFailure {
    type: constants.GET_SERVER_LIST_FAILURE;
}

export type ServerNodeAction = GetServerList | GetServerListSuccess | GetServerListFailure;

/** 
 * 获得服务器节点列表
 */
export function getServerList(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(getServerListStart());
        try {
            const result = await request.get<ServerListResponse>('/Server/list');
            dispatch(getServerListSuccess(result));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getServerListFailure());
        }
    };
}

export function getServerListStart(): GetServerList {
    return {
        type: constants.GET_SERVER_LIST
    };
}

export function getServerListSuccess(serverList: ServerListResponse): GetServerListSuccess {
    return {
        type: constants.GET_SERVER_LIST_SUCCESS,
        serverList
    };
}

export function getServerListFailure(): GetServerListFailure {
    return {
        type: constants.GET_SERVER_LIST_FAILURE
    };
}