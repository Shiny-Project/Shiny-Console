import * as constants from '@/constants/Spider/list';
import { StoreState } from '@/types';
import { ThunkAction } from 'redux-thunk';
import { RaiseError, raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import { SpiderListResponse, Spider } from '@/types/dashboard';

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

export interface DeleteSpider {
    type: constants.DELETE_SPIDER;
    spiderId: number;
}

export interface DeleteSpiderSuccess {
    type: constants.DELETE_SPIDER_SUCCESS;
    spiderId: number;
}

export interface DeleteSpiderFailure {
    type: constants.DELETE_SPIDER_FAILURE;
}

export interface UpdateFrequencyShowModal {
    type: constants.UPDATE_FREQUENCY_SHOW_MODAL;
    spiderId: number;
}

export interface UpdateFrequencyStart {
    type: constants.UPDATE_FREQUENCY_START;
}

export interface UpdateFrequencySuccess {
    type: constants.UPDATE_FREQUENCY_SUCCESS;
    spiderId: number;
    frequency: number;
}

export interface UpdateFrequencyFailure {
    type: constants.UPDATE_FREQUENCY_FAILURE;
}

export interface UpdateFrequencyCancel {
    type: constants.UPDATE_FREQUENCY_CANCEL;
}

export interface EditSpiderShowModal {
    type: constants.EDIT_SPIDER_SHOW_MODAL;
    spiderId: number;
}

export interface EditSpiderCancel {
    type: constants.EDIT_SPIDER_CANCEL;
}

export interface EditSpiderStart {
    type: constants.EDIT_SPIDER_START;
}

export interface EditSpiderSuccess {
    type: constants.EDIT_SPIDER_SUCCESS;
    spiderId: number;
    spider: Spider;
}

export interface EditSpiderFailure {
    type: constants.EDIT_SPIDER_FAILURE;
}

export type SpiderListAction = GetSpiderList | GetSpiderListSuccess | GetSpiderListFailure |
    DeleteSpider | DeleteSpiderSuccess | DeleteSpiderFailure |
    UpdateFrequencyShowModal | UpdateFrequencyStart | UpdateFrequencySuccess |
    UpdateFrequencyFailure | UpdateFrequencyCancel |
    EditSpiderShowModal | EditSpiderCancel | EditSpiderStart | EditSpiderFailure |
    EditSpiderSuccess |
    RaiseError;

/**
 * 获得 Spider 列表
 */
export function getSpiderList(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(getSpiderListStart());
        try {
            const spiderList = await request.get<SpiderListResponse>('/Spider/list');
            dispatch(getSpiderListSuccess(spiderList));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getSpiderListFailure());
        }
    };
}

/**
 * 删除 Spider
 * @param spiderId 
 */
export function deleteSpider(spiderId: number): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(deleteSpiderStart(spiderId));
        try {
            await request.post('/Spider/delete', {
                id: spiderId
            });
            dispatch(deleteSpiderSuccess(spiderId));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(deleteSpiderFailure());
        }
    };
}

/**
 * 显示修改频率的面板
 * @param spiderId 
 */
export function showFrequencyUpdateModal(spiderId: number): UpdateFrequencyShowModal {
    return {
        type: constants.UPDATE_FREQUENCY_SHOW_MODAL,
        spiderId
    };
}

export function updateFrequency(spiderId: number, frequency: number): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(updateFrequencyStart());
        try {
            const response = await request.post('/Spider/updateFrequency', {
                spiderId,
                frequency
            });
            dispatch(updateFrequencySuccess(spiderId, frequency));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(updateFrequencyFailure());
        }
    };
}

export function hideFrequencyUpdateModal(): UpdateFrequencyCancel {
    return {
        type: constants.UPDATE_FREQUENCY_CANCEL
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

export function deleteSpiderStart(spiderId: number): DeleteSpider {
    return {
        type: constants.DELETE_SPIDER,
        spiderId
    };
}

export function deleteSpiderSuccess(spiderId: number): DeleteSpiderSuccess {
    return {
        type: constants.DELETE_SPIDER_SUCCESS,
        spiderId
    };
}

export function deleteSpiderFailure(): DeleteSpiderFailure {
    return {
        type: constants.DELETE_SPIDER_FAILURE
    };
}

export function updateFrequencyStart(): UpdateFrequencyStart {
    return {
        type: constants.UPDATE_FREQUENCY_START,
    };
}

export function updateFrequencyFailure(): UpdateFrequencyFailure {
    return {
        type: constants.UPDATE_FREQUENCY_FAILURE
    };
}

export function updateFrequencySuccess(spiderId: number, frequency: number): UpdateFrequencySuccess {
    return {
        type: constants.UPDATE_FREQUENCY_SUCCESS,
        spiderId,
        frequency
    };
}

export function showEditSpiderModal(spiderId: number): EditSpiderShowModal {
    return {
        type: constants.EDIT_SPIDER_SHOW_MODAL,
        spiderId
    };
}

export function hideEditSpiderModal(): EditSpiderCancel {
    return {
        type: constants.EDIT_SPIDER_CANCEL
    };
}

/**
 * 编辑爬虫信息
 * @param spiderId 爬虫ID
 * @param name 爬虫名
 * @param path 爬虫路径
 */
export function editSpider(
    spiderId: number, name: string, description: string, group: string, path: string
): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(editSpiderStart());
        try {
            const result = await request.post<Spider>('/Spider/update', {
                spiderId,
                name,
                path,
                description,
                group
            });
            dispatch(editSpiderSuccess(spiderId, result));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(editSpiderFailure());
        }
    };
}

export function editSpiderStart(): EditSpiderStart {
    return {
        type: constants.EDIT_SPIDER_START
    };
}

export function editSpiderSuccess(spiderId: number, spider: Spider): EditSpiderSuccess {
    return {
        type: constants.EDIT_SPIDER_SUCCESS,
        spiderId,
        spider
    };
}

export function editSpiderFailure(): EditSpiderFailure {
    return {
        type: constants.EDIT_SPIDER_FAILURE,
    };
}