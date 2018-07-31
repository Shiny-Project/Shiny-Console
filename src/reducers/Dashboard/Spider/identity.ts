import { IdentityAction } from '@/actions/dashboard/spider/identity';
import { SpiderIdentityState } from '@/types';
import initState from '@/stores/initState';
import * as ActionTypes from '@/constants/Spider/identity';

export function identity(
    state: SpiderIdentityState = initState.dashboard.spider.identity, actions: IdentityAction): SpiderIdentityState {
    switch (actions.type) {
        case ActionTypes.GET_IDENTITY_LIST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.GET_IDENTITY_LIST_FAILURE: {
            return {
                ...state,
                isLoading: false
            };
        }
        case ActionTypes.GET_IDENTITY_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                identityList: actions.identityList
            };
        }
        case ActionTypes.SHOW_CREATE_IDENTITY_MODAL: {
            return {
                ...state,
                createIdentityModalVisible: true
            };
        }
        case ActionTypes.HIDE_CREATE_IDENTITY_MODAL: {
            return {
                ...state,
                createIdentityModalVisible: false
            };
        }
        case ActionTypes.CREATE_IDENTITY: {
            return {
                ...state,
                createIdentityModalLoading: true
            };
        }
        case ActionTypes.CREATE_IDENTITY_FAILURE: {
            return {
                ...state,
                createIdentityModalLoading: false
            };
        }
        case ActionTypes.CREATE_IDENTITY_SUCCESS: {
            return {
                ...state,
                createIdentityModalVisible: false,
                createIdentityModalLoading: false,
                identityList: [
                    ...state.identityList,
                    actions.identity
                ]
            };
        }
        case ActionTypes.DELETE_IDENTITY: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.DELETE_IDENTITY_SUCCESS: {
            const identityItemIndex = state.identityList.findIndex(identityItem => identityItem.id === actions.id);
            return {
                ...state,
                identityList: [
                    ...state.identityList.slice(0, identityItemIndex),
                    ...state.identityList.slice(identityItemIndex + 1)
                ],
                isLoading: false
            };
        }
        case ActionTypes.SHOW_EDIT_IDENTITY_MODAL: {
            return {
                ...state,
                editIdentityModalVisible: true,
                nowEditingIdentity: actions.identityItem
            };
        }
        case ActionTypes.HIDE_EDIT_IDENTITY_MODAL: {
            return {
                ...state,
                editIdentityModalVisible: false
            };
        }
        case ActionTypes.EDIT_IDENTITY: {
            return {
                ...state,
                editIdentityModalLoading: true
            };
        }
        case ActionTypes.EDIT_IDENTITY_SUCCESS: {
            const identityItemIndex = 
                state.identityList.findIndex(identityItem => identityItem.id === actions.identityItem.id);
            return {
                ...state,
                editIdentityModalLoading: false,
                editIdentityModalVisible: false,
                identityList: [
                    ...state.identityList.slice(0, identityItemIndex),
                    {
                        ...state.identityList[identityItemIndex],
                        name: actions.identityItem.name,
                        identity: actions.identityItem.identity
                    },
                    ...state.identityList.slice(identityItemIndex + 1)
                ]
            };
        }
        case ActionTypes.EDIT_IDENTITY_FAILURE: {
            return {
                ...state,
                editIdentityModalLoading: false
            };
        }
        default: {
            return state;
        }
    }
}