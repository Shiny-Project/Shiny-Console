import { ServerNodeAction } from '@/actions/dashboard/server/node';
import { ServerNodeState } from '@/types/index';
import initState from '@/stores/initState';
import { GET_SERVER_LIST, GET_SERVER_LIST_SUCCESS, GET_SERVER_LIST_FAILURE } from '@/constants/Server/node';

export function node(state: ServerNodeState = initState.dashboard.server.node, actions: ServerNodeAction) {
    switch (actions.type) {
        case GET_SERVER_LIST:
            return {
                ...state,
                isLoading: true
            };
        case GET_SERVER_LIST_SUCCESS:
            return {
                ...state,
                serverList: actions.serverList,
                isLoading: false
            };
        case GET_SERVER_LIST_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default: 
            return {
                ...state
            };
    }
}