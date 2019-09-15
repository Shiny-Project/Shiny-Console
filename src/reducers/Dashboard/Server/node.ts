import { ServerNodeAction } from 'actions/dashboard/server/node';
import { ServerNodeState } from 'types';
import initState from 'stores/initState';
import * as ActionTypes from 'constants/Server/node';

export function node(
        state: ServerNodeState = initState.dashboard.server.node,
        actions: ServerNodeAction
    ): ServerNodeState {
    switch (actions.type) {
        case ActionTypes.GET_SERVER_LIST:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.GET_SERVER_LIST_SUCCESS:
            return {
                ...state,
                serverList: actions.serverList,
                isLoading: false
            };
        case ActionTypes.GET_SERVER_LIST_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case ActionTypes.DELETE_SERVER:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.DELETE_SERVER_SUCCESS:
            const index = state.serverList.findIndex(server => server.id === actions.serverId);
            return {
                ...state,
                serverList: [
                    ...state.serverList.slice(0, index),
                    ...state.serverList.slice(index + 1)
                ],
                isLoading: false
            };
        case ActionTypes.DELETE_SERVER_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case ActionTypes.ADD_SERVER: 
            return {
                ...state,
                modalLoading: true
            };
        case ActionTypes.ADD_SERVER_SUCCESS:
            return {
                ...state,
                serverList: [
                    ...state.serverList,
                    actions.server
                ],
                modalLoading: false,
                modalVisible: false
            };
        case ActionTypes.ADD_SERVER_FAILURE:
            return {
                ...state,
                modalLoading: false
            };
        case ActionTypes.SHOW_CREATE_SERVER_MODAL:
            return {
                ...state,
                modalVisible: true
            };
        case ActionTypes.CLOSE_CREATE_SERVER_MODAL:
            return {
                ...state,
                modalVisible: false
            };
        default: 
            return {
                ...state
            };
    }
}