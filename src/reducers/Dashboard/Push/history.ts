import { HistoryAction } from 'actions/dashboard/push/history';
import { PushHistoryState } from 'types';
import initState from 'stores/initState';
import * as ActionTypes from 'constants/Push/history';

// tslint:disable-next-line:max-line-length
export function pushHistory(state: PushHistoryState = initState.dashboard.push.history, actions: HistoryAction)
    : PushHistoryState {
    switch (actions.type) {
        case ActionTypes.GET_PUSH_HISTORY: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.GET_PUSH_HISTORY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                pushHistory: actions.pushHistory
            };
        }
        case ActionTypes.GET_PUSH_HISTORY_FAILURE: {
            return {
                ...state,
                isLoading: false
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
}