import { DeployRepositoryState } from "types";
import * as ActionTypes from 'constants/Deploy/repository';
import { RepositoryAction } from "actions/dashboard/deploy/repository";
import initState from "stores/initState";

export function deployRepository(
    state: DeployRepositoryState = initState.dashboard.deploy.repository, actions: RepositoryAction
): DeployRepositoryState {
    switch(actions.type) {
        case ActionTypes.GET_REPOSITORY_LIST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ActionTypes.GET_REPOSITORY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                repositories: actions.repositories
            }
        }
        case ActionTypes.GET_REPOSITORY_FAILURE: {
            return {
                ...state,
                isLoading: false,
            }
        }
        default: {
            return state;
        }
    }
}