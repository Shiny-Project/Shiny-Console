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
        case ActionTypes.SHOW_CREATE_REPOSITORY_MODAL: {
            return {
                ...state,
                createRepositoryModalVisible: true
            }
        }
        case ActionTypes.HIDE_CREATE_REPOSITORY_MODAL: {
            return {
                ...state,
                createRepositoryModalVisible: false
            }
        }
        case ActionTypes.CREATE_REPOSITORY_START: {
            return {
                ...state,
                createRepositoryModalLoading: true
            }
        }
        case ActionTypes.CREATE_REPOSITORY_SUCCESS: {
            return {
                ...state,
                createRepositoryModalLoading: false,
                createRepositoryModalVisible: false,
                repositories: [
                    ...state.repositories,
                    {
                        ...actions.newRepository,
                        revisions: []
                    }
                ]
            }
        }
        case ActionTypes.CREATE_REPOSITORY_FAILURE: {
            return {
                ...state,
                createRepositoryModalLoading: false
            }
        }
        case ActionTypes.DELETE_REPOSITORY_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ActionTypes.DELETE_REPOSITORY_SUCCESS: {
            const index = state.repositories.findIndex(repository => repository.id === actions.repositoryId);
            return {
                ...state,
                isLoading: false,
                repositories: [
                    ...state.repositories.slice(0, index),
                    ...state.repositories.slice(index + 1)
                ]
            }
        }
        case ActionTypes.DELETE_REPOSITORY_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        default: {
            return state;
        }
    }
}