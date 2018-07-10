import * as constants from '@/constants/Spider/identity';
import { StoreState } from '@/types/index';
import { ThunkAction } from 'redux-thunk';
import { RaiseError, raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import { SpiderIdentityItem, SpiderIdentityListResponse } from '@/types/dashboard';

export interface GetIdentityList {
    type: constants.GET_IDENTITY_LIST;
}

export interface GetIdentityListSuccess {
    type: constants.GET_IDENTITY_LIST_SUCCESS;
    identityList: SpiderIdentityItem[];
}

export interface GetIdentityListFailure {
    type: constants.GET_IDENTITY_LIST_FAILURE;
}

export interface ShowCreateIdentityModal {
    type: constants.SHOW_CREATE_IDENTITY_MODAL;
}

export interface HideCreateIdentityModal {
    type: constants.HIDE_CREATE_IDENTITY_MODAL;
}

export interface CreateIdentity {
    type: constants.CREATE_IDENTITY;
}

export interface CreateIdentitySuccess {
    type: constants.CREATE_IDENTITY_SUCCESS;
    identity: SpiderIdentityItem;
}

export interface CreateIdentityFailure {
    type: constants.CREATE_IDENTITY_FAILURE;
}

export interface DeleteIdentity {
    type: constants.DELETE_IDENTITY;
}

export interface DeleteIdentitySuccess {
    type: constants.DELETE_IDENTITY_SUCCESS;
    id: number;
}

export interface DeleteIdentityFailure {
    type: constants.DELETE_IDENTITY_FAILURE;
}

export interface ShowEditIdentityModal {
    type: constants.SHOW_EDIT_IDENTITY_MODAL;
    identityItem: SpiderIdentityItem;
}

export interface HideEditIdentityModal {
    type: constants.HIDE_EDIT_IDENTITY_MODAL;
}

export interface EditIdentity {
    type: constants.EDIT_IDENTITY;
}

export interface EditIdentitySuccess {
    type: constants.EDIT_IDENTITY_SUCCESS;
    identityItem: SpiderIdentityItem;
}

export interface EditIdentityFailure {
    type: constants.EDIT_IDENTITY_FAILURE;
}

export type IdentityAction = 
    GetIdentityList | GetIdentityListSuccess | GetIdentityListFailure |
    ShowCreateIdentityModal | HideCreateIdentityModal | 
    CreateIdentity | CreateIdentitySuccess | CreateIdentityFailure |
    DeleteIdentity | DeleteIdentitySuccess | DeleteIdentityFailure |
    ShowEditIdentityModal | HideEditIdentityModal | EditIdentity | EditIdentitySuccess | EditIdentityFailure;

export function getIdentityListStart(): GetIdentityList {
    return {
        type: constants.GET_IDENTITY_LIST
    };
}

export function getIdentityListSuccess(identityList: SpiderIdentityItem[]): GetIdentityListSuccess {
    return {
        type: constants.GET_IDENTITY_LIST_SUCCESS,
        identityList
    };
}

export function getIdentityListFailure(): GetIdentityListFailure {
    return {
        type: constants.GET_IDENTITY_LIST_FAILURE
    };
}

export function showCreateIdentityModal(): ShowCreateIdentityModal {
    return {
        type: constants.SHOW_CREATE_IDENTITY_MODAL
    };
}

export function hideCreateIdentityModal(): HideCreateIdentityModal {
    return {
        type: constants.HIDE_CREATE_IDENTITY_MODAL
    };
}

export function createIdentityStart(): CreateIdentity {
    return {
        type: constants.CREATE_IDENTITY
    };
}

export function createIdentitySuccess(identity: SpiderIdentityItem): CreateIdentitySuccess {
    return {
        type: constants.CREATE_IDENTITY_SUCCESS,
        identity
    };
}

export function createIdentityFailure(): CreateIdentityFailure {
    return {
        type: constants.CREATE_IDENTITY_FAILURE
    };
}

export function deleteIdentityStart(): DeleteIdentity {
    return {
        type: constants.DELETE_IDENTITY
    };
}

export function deleteIdentitySuccess(id: number): DeleteIdentitySuccess {
    return {
        type: constants.DELETE_IDENTITY_SUCCESS,
        id
    };
}

export function deleteIdentityFailure(): DeleteIdentityFailure {
    return {
        type: constants.DELETE_IDENTITY_FAILURE
    };
}

export function showEditIdentityModal(identityItem: SpiderIdentityItem): ShowEditIdentityModal {
    return {
        type: constants.SHOW_EDIT_IDENTITY_MODAL,
        identityItem
    };
}

export function hideEditIdentityModal(): HideEditIdentityModal {
    return {
        type: constants.HIDE_EDIT_IDENTITY_MODAL,
    };
}

export function editIdentityStart(): EditIdentity {
    return {
        type: constants.EDIT_IDENTITY,
    };
}

export function editIdentitySuccess(identityItem: SpiderIdentityItem): EditIdentitySuccess {
    return {
        type: constants.EDIT_IDENTITY_SUCCESS,
        identityItem
    };
}

export function editIdentityFailure(): EditIdentityFailure {
    return {
        type: constants.EDIT_IDENTITY_FAILURE
    };
}

/**
 * 获得凭据项列表
 */
export function getIdentityList(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(getIdentityListStart());
        try {
            const response = await request.get<SpiderIdentityListResponse>('/SpiderIdentity/list');
            dispatch(getIdentityListSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getIdentityListFailure());
        }
    };
}

/**
 * 创建凭据项
 */
export function createIdentity(name: string, identity: string): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(createIdentityStart());
        try {
            const response = await request.post<SpiderIdentityItem>('/SpiderIdentity/create', {
                name,
                identity
            });
            dispatch(createIdentitySuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(createIdentityFailure());
        }
    };
}
/**
 * 删除凭据项
 * @param id
 */
export function deleteIdentity(id: number): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(deleteIdentityStart());
        try {
            await request.post('/SpiderIdentity/delete', {
                identityId: id
            });
            dispatch(deleteIdentitySuccess(id));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(deleteIdentityFailure());
        }
    };
}

/**
 * 编辑凭据项
 * @param id 
 * @param name 
 * @param identity
 */
export function editIdentity(id: number, name: string, identity: string): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(editIdentityStart());
        try {
            const response = await request.post<SpiderIdentityItem>('/SpiderIdentity/edit', {
                identityId: id,
                name,
                identity
            });
            dispatch(editIdentitySuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(editIdentityFailure());
        }
    };
}