import { ApplicationAction } from 'actions/dashboard/server/application';
import { ApplicationState } from 'types';
import initState from 'stores/initState';
import * as ActionTypes from 'constants/Server/application';

// tslint:disable-next-line:max-line-length
export function application(state: ApplicationState = initState.dashboard.server.application, actions: ApplicationAction)
    : ApplicationState {
    switch (actions.type) {
        case ActionTypes.GET_KEY_PAIRS:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.GET_KEY_PAIRS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                keyPairs: actions.keyPairs,
                serverList: actions.serverList
            };
        case ActionTypes.GET_KEY_PAIRS_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case ActionTypes.DELETE_KEY_PAIR:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.DELETE_KEY_PAIR_SUCCESS: {
                const index = state.keyPairs.findIndex(keyPair => keyPair.id === actions.applicationId);
                return {
                    ...state,
                    isLoading: false,
                    keyPairs: [
                        ...state.keyPairs.slice(0, index),
                        ...state.keyPairs.slice(index + 1)
                    ]
                };
            }
        case ActionTypes.DELETE_KEY_PAIR_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case ActionTypes.CREATE_KEY_PAIR:
            return {
                ...state,
                createModalLoading: true
            };
        case ActionTypes.CREATE_KEY_PAIR_SUCCESS: {
                const index = state.serverList.findIndex(server => server.id === actions.tag);
                const keyIndex = state.keyPairs.findIndex(keyPair =>
                    keyPair.tag[0].id === actions.tag
                );
                return {
                    ...state,
                    createModalLoading: false,
                    createModalVisible: false,
                    keyPairs: [
                        ...actions.keyPair
                    ],
                    serverList: [
                        ...state.serverList.slice(0, index),
                        {
                            ...state.serverList[index],
                            key_pair: keyIndex
                        },
                        ...state.serverList.slice(index + 1)
                    ]
                };
            }
        case ActionTypes.CREATE_KEY_PAIR_FAILURE:
            return {
                ...state,
                createModalLoading: false
            };
        case ActionTypes.SHOW_CREATE_MODAL:
            return {
                ...state,
                createModalVisible: true
            };
        case ActionTypes.CLOSE_CREATE_MODAL:
            return {
                ...state,
                createModalVisible: false
            };
        default:
            return {
                ...state
            };
    }
}