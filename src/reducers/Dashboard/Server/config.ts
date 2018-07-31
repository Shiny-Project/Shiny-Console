import { ConfigAction } from '@/actions/dashboard/server/config';
import { ConfigState } from '@/types';
import initState from '@/stores/initState';
import * as ActionTypes from '@/constants/Server/config';

export function config(state: ConfigState = initState.dashboard.server.config, actions: ConfigAction): ConfigState {
    switch (actions.type) {
        case ActionTypes.GET_CONFIG_LIST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.GET_CONFIG_LIST_FAILURE: {
            return {
                ...state,
                isLoading: false
            };
        }
        case ActionTypes.GET_CONFIG_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                configList: actions.configList
            };
        }
        case ActionTypes.SHOW_CREATE_CONFIG_MODAL: {
            return {
                ...state,
                createConfigModalVisible: true
            };
        }
        case ActionTypes.HIDE_CREATE_CONFIG_MODAL: {
            return {
                ...state,
                createConfigModalVisible: false
            };
        }
        case ActionTypes.CREATE_CONFIG: {
            return {
                ...state,
                createConfigModalLoading: true
            };
        }
        case ActionTypes.CREATE_CONFIG_FAILURE: {
            return {
                ...state,
                createConfigModalLoading: false
            };
        }
        case ActionTypes.CREATE_CONFIG_SUCCESS: {
            return {
                ...state,
                createConfigModalVisible: false,
                createConfigModalLoading: false,
                configList: [
                    ...state.configList,
                    actions.config
                ]
            };
        }
        case ActionTypes.DELETE_CONFIG: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.DELETE_CONFIG_SUCCESS: {
            const configItemIndex = state.configList.findIndex(configItem => configItem.key === actions.key);
            return {
                ...state,
                configList: [
                    ...state.configList.slice(0, configItemIndex),
                    ...state.configList.slice(configItemIndex + 1)
                ],
                isLoading: false
            };
        }
        case ActionTypes.SHOW_EDIT_CONFIG_MODAL: {
            return {
                ...state,
                editConfigModalVisible: true,
                nowEditingConfig: actions.configItem
            };
        }
        case ActionTypes.HIDE_EDIT_CONFIG_MODAL: {
            return {
                ...state,
                editConfigModalVisible: false
            };
        }
        case ActionTypes.EDIT_CONFIG: {
            return {
                ...state,
                editConfigModalLoading: true
            };
        }
        case ActionTypes.EDIT_CONFIG_SUCCESS: {
            const configItemIndex = state.configList.findIndex(configItem => configItem.key === actions.configItem.key);
            return {
                ...state,
                editConfigModalLoading: false,
                editConfigModalVisible: false,
                configList: [
                    ...state.configList.slice(0, configItemIndex),
                    {
                        ...state.configList[configItemIndex],
                        value: actions.configItem.value
                    },
                    ...state.configList.slice(configItemIndex + 1)
                ]
            };
        }
        case ActionTypes.EDIT_CONFIG_FAILURE: {
            return {
                ...state,
                editConfigModalLoading: false
            };
        }
        default: {
            return state;
        }
    }
}