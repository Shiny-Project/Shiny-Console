import * as constants from 'constants/Server/node';
import { raiseError } from 'actions/dashboard/error';
import request from 'services/request';
import { ServerListResponse, ServerNode } from 'types/dashboard';
import { DeferredAction } from 'types/action';

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

export interface DeleteServer {
    type: constants.DELETE_SERVER;
}

export interface DeleteServerSuccess {
    type: constants.DELETE_SERVER_SUCCESS;
    serverId: number;
}

export interface DeleteServerFailure {
    type: constants.DELETE_SERVER_FAILURE;
}

export interface AddServer {
    type: constants.ADD_SERVER;
}

export interface AddServerSuccess {
    type: constants.ADD_SERVER_SUCCESS;
    server: ServerNode;
}

export interface AddServerFailure {
    type: constants.ADD_SERVER_FAILURE;
}

export interface ShowCreateServerModal {
    type: constants.SHOW_CREATE_SERVER_MODAL;
}

export interface CloseCreateServerModal {
    type: constants.CLOSE_CREATE_SERVER_MODAL;
}

export type ServerNodeAction = GetServerList | GetServerListSuccess | GetServerListFailure |
    ShowCreateServerModal | CloseCreateServerModal | DeleteServer |
    DeleteServerSuccess | DeleteServerFailure | AddServer | AddServerSuccess | AddServerFailure;

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

export function deleteServerStart(): DeleteServer {
    return {
        type: constants.DELETE_SERVER
    };
}

export function deleteServerSuccess(serverId: number): DeleteServerSuccess {
    return {
        type: constants.DELETE_SERVER_SUCCESS,
        serverId
    };
}

export function deleteServerFailure(): DeleteServerFailure {
    return {
        type: constants.DELETE_SERVER_FAILURE
    };
}

export function addServerStart(): AddServer {
    return {
        type: constants.ADD_SERVER
    };
}

export function addServerSuccess(server: ServerNode): AddServerSuccess {
    return {
        type: constants.ADD_SERVER_SUCCESS,
        server
    };
}

export function addServerFailure(): AddServerFailure {
    return {
        type: constants.ADD_SERVER_FAILURE
    };
}

export function showCreateServerModal(): ShowCreateServerModal {
    return {
        type: constants.SHOW_CREATE_SERVER_MODAL
    };
}

export function closeCreateServerModal(): CloseCreateServerModal {
    return {
        type: constants.CLOSE_CREATE_SERVER_MODAL
    };
}

/** 
 * 获得服务器节点列表
 */
export function getServerList(): DeferredAction<GetServerList | GetServerListSuccess | GetServerListFailure> {
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

/**
 * 删除服务器节点
 * @param id 节点 ID
 */
export function deleteServer(id: number): DeferredAction<DeleteServer | DeleteServerSuccess | DeleteServerFailure> {
    return async (dispatch) => {
        dispatch(deleteServerStart());
        try {
            await request.post('/Server/delete', {
                serverId: id
            });
            dispatch(deleteServerSuccess(id));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(deleteServerFailure());
        }
    };
}

/**
 * 添加服务器节点
 * @param type 服务器类型 
 * @param name 服务器节点名
 * @param host 服务器地址
 */
export function addServer(type: string, name: string, host: string, group: string[]): 
    DeferredAction<AddServer | AddServerSuccess | AddServerFailure> {
    return async (dispatch) => {
        dispatch(addServerStart());
        try {
            const result = await request.post<ServerNode>('/Server/add', {
                serverName: name,
                serverType: type,
                serverHost: host,
                serverGroup: JSON.stringify(group)
            });
            dispatch(addServerSuccess(result));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(addServerFailure());
        }
    };
}