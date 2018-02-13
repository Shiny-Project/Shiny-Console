import { ApplicationAction } from '@/actions/dashboard/server/application';
import { ApplicationState } from '@/types/index';
import initState from '@/stores/initState';
import * as ActionTypes from '@/constants/Server/application';

// tslint:disable-next-line:max-line-length
export function application(state: ApplicationState = initState.dashboard.server.application, actions: ApplicationAction) {
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
                keyPairs: actions.keyPairs
            };
        case ActionTypes.GET_KEY_PAIRS_FAILURE:
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