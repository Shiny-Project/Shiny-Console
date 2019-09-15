import { AccountAction } from 'actions/dashboard/push/account';
import { PushAccountState } from 'types';
import initState from 'stores/initState';
import * as ActionTypes from 'constants/Push/account';

export function pushAccount(
    state: PushAccountState = initState.dashboard.push.account, actions: AccountAction): PushAccountState {
    switch (actions.type) {
        case ActionTypes.GET_ACCOUNT_LIST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.GET_ACCOUNT_LIST_FAILURE: {
            return {
                ...state,
                isLoading: false
            };
        }
        case ActionTypes.GET_ACCOUNT_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                accounts: actions.accounts
            };
        }
        case ActionTypes.SHOW_CREATE_ACCOUNT_MODAL: {
            return {
                ...state,
                createAccountModalVisible: true
            };
        }
        case ActionTypes.HIDE_CREATE_ACCOUNT_MODAL: {
            return {
                ...state,
                createAccountModalVisible: false
            };
        }
        case ActionTypes.CREATE_ACCOUNT: {
            return {
                ...state,
                createAccountModalLoading: true
            };
        }
        case ActionTypes.CREATE_ACCOUNT_FAILURE: {
            return {
                ...state,
                createAccountModalLoading: false
            };
        }
        case ActionTypes.CREATE_ACCOUNT_SUCCESS: {
            return {
                ...state,
                createAccountModalVisible: false,
                createAccountModalLoading: false,
                accounts: [
                    ...state.accounts,
                    actions.account
                ]
            };
        }
        case ActionTypes.DELETE_ACCOUNT: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.DELETE_ACCOUNT_SUCCESS: {
            const accountItemIndex = state.accounts.findIndex(accountItem => accountItem.id === actions.id);
            return {
                ...state,
                accounts: [
                    ...state.accounts.slice(0, accountItemIndex),
                    ...state.accounts.slice(accountItemIndex + 1)
                ],
                isLoading: false
            };
        }
        case ActionTypes.SHOW_EDIT_ACCOUNT_MODAL: {
            return {
                ...state,
                editAccountModalVisible: true,
                nowEditingAccount: actions.account
            };
        }
        case ActionTypes.HIDE_EDIT_ACCOUNT_MODAL: {
            return {
                ...state,
                editAccountModalVisible: false
            };
        }
        case ActionTypes.EDIT_ACCOUNT: {
            return {
                ...state,
                editAccountModalLoading: true
            };
        }
        case ActionTypes.EDIT_ACCOUNT_SUCCESS: {
            const accountItemIndex = 
                state.accounts.findIndex(accountItem => accountItem.id === actions.account.id);
            return {
                ...state,
                editAccountModalLoading: false,
                editAccountModalVisible: false,
                accounts: [
                    ...state.accounts.slice(0, accountItemIndex),
                    {
                        ...state.accounts[accountItemIndex],
                        name: actions.account.name,
                        platform: actions.account.platform,
                        credential: actions.account.credential
                    },
                    ...state.accounts.slice(accountItemIndex + 1)
                ]
            };
        }
        case ActionTypes.EDIT_ACCOUNT_FAILURE: {
            return {
                ...state,
                editAccountModalLoading: false
            };
        }
        default: {
            return state;
        }
    }
}