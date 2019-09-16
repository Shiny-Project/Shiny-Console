import * as constants from 'constants/Deploy/repository';
import { raiseError } from 'actions/dashboard/error';
import { DeferredAction } from 'types/action';
import request from 'services/request';
import { RepositoryList } from 'types/dashboard';

export interface GetRepositoryList {
    type: constants.GET_REPOSITORY_LIST;
}

export interface GetRepositoryListSuccess {
    type: constants.GET_REPOSITORY_SUCCESS;
    repositories: RepositoryList;
}

export interface GetRepositoryListFailure {
    type: constants.GET_REPOSITORY_FAILURE;
}

export type RepositoryAction = GetRepositoryList | GetRepositoryListSuccess | GetRepositoryListFailure;

export function getRepositoryListStart(): GetRepositoryList {
    return {
        type: constants.GET_REPOSITORY_LIST
    };
}

export function getRepositoryListSuccess(repositories: RepositoryList): GetRepositoryListSuccess {
    return {
        type: constants.GET_REPOSITORY_SUCCESS,
        repositories
    };
}

export function getRepositoryListFailure(): GetRepositoryListFailure {
    return {
        type: constants.GET_REPOSITORY_FAILURE
    };
}

/**
 * 获得 Repository 列表
 */
export function getRepositoryList(): DeferredAction<GetRepositoryList | GetRepositoryListSuccess | GetRepositoryListFailure> {
    return async (dispatch) => {
        dispatch(getRepositoryListStart());
        try {
            const repositories = await request.get<RepositoryList>('/Repository/list');
            dispatch(getRepositoryListSuccess(repositories));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getRepositoryListFailure());
        }
    }
}