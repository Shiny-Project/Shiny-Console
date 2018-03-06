import * as constants from '@/constants/Spider/list';
import { StoreState } from '@/types/index';
import { ThunkAction } from 'redux-thunk';
import { RaiseError, raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import { SpiderListResponse } from '@/types/dashboard';

export interface GetSpiderList {
    type: constants.GET_SPIDER_LIST;
}

export interface GetSpiderListSuccess {
    type: constants.GET_SPIDER_LIST_SUCCESS;
    spiderList: SpiderListResponse;
}

export interface GetSpiderListFailure {
    type: constants.GET_SPIDER_LIST_FAILURE;
}

export type SpiderListAction = GetSpiderList | GetSpiderListSuccess | GetSpiderListFailure;

export function getSpiderList(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        try {
            const spiderList = await request.get<SpiderListResponse>('/Spider/list');
            dispatch(getSpiderListSuccess(spiderList));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getSpiderListFailure());
        }
    };
}

export function getSpiderListStart(): GetSpiderList {
    return {
        type: constants.GET_SPIDER_LIST
    };
}

export function getSpiderListSuccess(spiderList: SpiderListResponse): GetSpiderListSuccess {
    return {
        type: constants.GET_SPIDER_LIST_SUCCESS,
        spiderList
    };
}

export function getSpiderListFailure(): GetSpiderListFailure {
    return {
        type: constants.GET_SPIDER_LIST_FAILURE
    };
}