import * as constants from '@/constants/Server/config';
import { raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import { ConfigItem, ConfigListResponse } from '@/types/dashboard';
import { DeferredAction } from '@/types/action';

export interface GetConfigList {
    type: constants.GET_CONFIG_LIST;
}

export interface GetConfigListSuccess {
    type: constants.GET_CONFIG_LIST_SUCCESS;
    configList: ConfigItem[];
}

export interface GetConfigListFailure {
    type: constants.GET_CONFIG_LIST_FAILURE;
}

export interface ShowCreateConfigModal {
    type: constants.SHOW_CREATE_CONFIG_MODAL;
}

export interface HideCreateConfigModal {
    type: constants.HIDE_CREATE_CONFIG_MODAL;
}

export interface CreateConfig {
    type: constants.CREATE_CONFIG;
}

export interface CreateConfigSuccess {
    type: constants.CREATE_CONFIG_SUCCESS;
    config: ConfigItem;
}

export interface CreateConfigFailure {
    type: constants.CREATE_CONFIG_FAILURE;
}

export interface DeleteConfig {
    type: constants.DELETE_CONFIG;
}

export interface DeleteConfigSuccess {
    type: constants.DELETE_CONFIG_SUCCESS;
    key: string;
}

export interface DeleteConfigFailure {
    type: constants.DELETE_CONFIG_FAILURE;
}

export interface ShowEditConfigModal {
    type: constants.SHOW_EDIT_CONFIG_MODAL;
    configItem: ConfigItem;
}

export interface HideEditConfigModal {
    type: constants.HIDE_EDIT_CONFIG_MODAL;
}

export interface EditConfig {
    type: constants.EDIT_CONFIG;
}

export interface EditConfigSuccess {
    type: constants.EDIT_CONFIG_SUCCESS;
    configItem: ConfigItem;
}

export interface EditConfigFailure {
    type: constants.EDIT_CONFIG_FAILURE;
}

export type ConfigAction = 
    GetConfigList | GetConfigListSuccess | GetConfigListFailure |
    ShowCreateConfigModal | HideCreateConfigModal | 
    CreateConfig | CreateConfigSuccess | CreateConfigFailure |
    DeleteConfig | DeleteConfigSuccess | DeleteConfigFailure |
    ShowEditConfigModal | HideEditConfigModal | EditConfig | EditConfigSuccess | EditConfigFailure;

export function getConfigListStart(): GetConfigList {
    return {
        type: constants.GET_CONFIG_LIST
    };
}

export function getConfigListSuccess(configList: ConfigItem[]): GetConfigListSuccess {
    return {
        type: constants.GET_CONFIG_LIST_SUCCESS,
        configList
    };
}

export function getConfigListFailure(): GetConfigListFailure {
    return {
        type: constants.GET_CONFIG_LIST_FAILURE
    };
}

export function showCreateConfigModal(): ShowCreateConfigModal {
    return {
        type: constants.SHOW_CREATE_CONFIG_MODAL
    };
}

export function hideCreateConfigModal(): HideCreateConfigModal {
    return {
        type: constants.HIDE_CREATE_CONFIG_MODAL
    };
}

export function createConfigStart(): CreateConfig {
    return {
        type: constants.CREATE_CONFIG
    };
}

export function createConfigSuccess(config: ConfigItem): CreateConfigSuccess {
    return {
        type: constants.CREATE_CONFIG_SUCCESS,
        config
    };
}

export function createConfigFailure(): CreateConfigFailure {
    return {
        type: constants.CREATE_CONFIG_FAILURE
    };
}

export function deleteConfigStart(): DeleteConfig {
    return {
        type: constants.DELETE_CONFIG
    };
}

export function deleteConfigSuccess(key: string): DeleteConfigSuccess {
    return {
        type: constants.DELETE_CONFIG_SUCCESS,
        key
    };
}

export function deleteConfigFailure(): DeleteConfigFailure {
    return {
        type: constants.DELETE_CONFIG_FAILURE
    };
}

export function showEditConfigModal(configItem: ConfigItem): ShowEditConfigModal {
    return {
        type: constants.SHOW_EDIT_CONFIG_MODAL,
        configItem
    };
}

export function hideEditConfigModal(): HideEditConfigModal {
    return {
        type: constants.HIDE_EDIT_CONFIG_MODAL,
    };
}

export function editConfigStart(): EditConfig {
    return {
        type: constants.EDIT_CONFIG,
    };
}

export function editConfigSuccess(configItem: ConfigItem): EditConfigSuccess {
    return {
        type: constants.EDIT_CONFIG_SUCCESS,
        configItem
    };
}

export function editConfigFailure(): EditConfigFailure {
    return {
        type: constants.EDIT_CONFIG_FAILURE
    };
}

/**
 * 获得设置项列表
 */
export function getConfigList(): DeferredAction<GetConfigList | GetConfigListSuccess | GetConfigListFailure> {
    return async (dispatch) => {
        dispatch(getConfigListStart());
        try {
            const response = await request.get<ConfigListResponse>('/Config/list');
            dispatch(getConfigListSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getConfigListFailure());
        }
    };
}

/**
 * 创建设置项
 */
export function createConfig(key: string, value: string): 
    DeferredAction<CreateConfig | CreateConfigSuccess | CreateConfigFailure> {
    return async (dispatch) => {
        dispatch(createConfigStart());
        try {
            const response = await request.post<ConfigItem>('/Config/create', {
                key,
                value
            });
            dispatch(createConfigSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(createConfigFailure());
        }
    };
}
/**
 * 删除设置项
 * @param key 
 */
export function deleteConfig(key: string): 
    DeferredAction<DeleteConfig | DeleteConfigSuccess | DeleteConfigFailure> {
    return async (dispatch) => {
        dispatch(deleteConfigStart());
        try {
            await request.post('/Config/delete', {
                key
            });
            dispatch(deleteConfigSuccess(key));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(deleteConfigFailure());
        }
    };
}

/**
 * 编辑设置项
 * @param key 
 * @param value 
 */
export function editConfig(key: string, value: string): 
    DeferredAction<EditConfig | EditConfigSuccess | EditConfigFailure> {
    return async (dispatch) => {
        dispatch(editConfigStart());
        try {
            const response = await request.post<ConfigItem>('/Config/edit', {
                key,
                value
            });
            dispatch(editConfigSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(editConfigFailure());
        }
    };
}