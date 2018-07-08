import * as constants from '@/constants/Server/application';
import { StoreState } from '@/types/index';
import { ThunkAction } from 'redux-thunk';
import { RaiseError, raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import { APIKeyPairsResponse, APIKeyPair, ServerNode } from '@/types/dashboard';

export interface GetKeyPairs {
    type: constants.GET_KEY_PAIRS;
}

export interface GetKeyPairsSuccess {
    type: constants.GET_KEY_PAIRS_SUCCESS;
    keyPairs: APIKeyPair[];
    serverList: ServerNode[];
}

export interface GetKeyPairsFailure {
    type: constants.GET_KEY_PAIRS_FAILURE;
}

export interface DeleteKeyPair {
    type: constants.DELETE_KEY_PAIR;
}

export interface DeleteKeyPairSuccess {
    type: constants.DELETE_KEY_PAIR_SUCCESS;
    applicationId: number;
}

export interface DeleteKeyPairFailure {
    type: constants.DELETE_KEY_PAIR_FAILURE;
}

export interface CreateKeyPair {
    type: constants.CREATE_KEY_PAIR;
}

export interface CreateKeyPairSuccess {
    type: constants.CREATE_KEY_PAIR_SUCCESS;
    keyPair: APIKeyPair[];
    tag: number;
}

export interface CreateKeyPairFailure {
    type: constants.CREATE_KEY_PAIR_FAILURE;
}

export interface ShowCreateModal {
    type: constants.SHOW_CREATE_MODAL;
}

export interface CloseCreateModal {
    type: constants.CLOSE_CREATE_MODAL;
}

export type ApplicationAction = GetKeyPairs | GetKeyPairsSuccess | GetKeyPairsFailure |
                                DeleteKeyPair | DeleteKeyPairSuccess | DeleteKeyPairFailure |
                                CreateKeyPair | CreateKeyPairSuccess | CreateKeyPairFailure |
                                ShowCreateModal | CloseCreateModal;

export function getKeyPairsStart(): GetKeyPairs {
    return {
        type: constants.GET_KEY_PAIRS
    };
}

export function getKeyPairsSuccess(keyPairs: APIKeyPair[], serverList: ServerNode[]): GetKeyPairsSuccess {
    return {
        type: constants.GET_KEY_PAIRS_SUCCESS,
        keyPairs,
        serverList
    };
}

export function getKeyPairsFailure(): GetKeyPairsFailure {
    return {
        type: constants.GET_KEY_PAIRS_FAILURE
    };
}

export function deleteKeyPairStart(): DeleteKeyPair {
    return {
        type: constants.DELETE_KEY_PAIR
    };
}

export function deleteKeyPairSuccess(applicationId: number): DeleteKeyPairSuccess {
    return {
        type: constants.DELETE_KEY_PAIR_SUCCESS,
        applicationId
    };
}

export function deleteKeyPairFailure(): DeleteKeyPairFailure {
    return {
        type: constants.DELETE_KEY_PAIR_FAILURE
    };
}

export function createKeyPairStart(): CreateKeyPair {
    return {
        type: constants.CREATE_KEY_PAIR
    };
}

export function createKeyPairSuccess(keyPair: APIKeyPair[], tag: number): CreateKeyPairSuccess {
    return {
        type: constants.CREATE_KEY_PAIR_SUCCESS,
        keyPair,
        tag
    };
}

export function createKeyPairFailure(): CreateKeyPairFailure {
    return {
        type: constants.CREATE_KEY_PAIR_FAILURE
    };
}

export function showCreateModal(): ShowCreateModal {
    return {
        type: constants.SHOW_CREATE_MODAL
    };
}

export function closeCreateModal(): CloseCreateModal {
    return {
        type: constants.CLOSE_CREATE_MODAL
    };
}

/** 
 * 获得应用密钥对列表
 */
export function getKeyPairs(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(getKeyPairsStart());
        try {
            const result = await request.get<APIKeyPairsResponse>('/Application/list');
            dispatch(getKeyPairsSuccess(result.keyPairs, result.serverList));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getKeyPairsFailure());
        }
    };
}

/**
 * 删除应用密钥对
 * @param applicationId 应用 ID
 */
export function deleteKeyPair(applicationId: number): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(deleteKeyPairStart());
        try {
            const result = await request.post('/Application/delete', {
                applicationId
            });
            dispatch(deleteKeyPairSuccess(applicationId));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getKeyPairsFailure());
        }
    };
}

/**
 * 生成新密钥对
 * @param tag 标签 
 */
export function createKeyPair(tag: number):  ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(createKeyPairStart());
        try {
            const result = await request.post<APIKeyPair[]>('/Application/createAPIKeyPairs', {
                tag
            });
            dispatch(createKeyPairSuccess(result, tag));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(createKeyPairFailure());
        }
    };
}