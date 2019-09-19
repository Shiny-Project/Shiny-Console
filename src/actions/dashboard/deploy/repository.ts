import * as constants from 'constants/Deploy/repository';
import { raiseError } from 'actions/dashboard/error';
import { DeferredAction } from 'types/action';
import request from 'services/request';
import { RepositoryList, Repository } from 'types/dashboard';

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

export interface ShowCreateRepositoryModal {
    type: constants.SHOW_CREATE_REPOSITORY_MODAL;
}

export interface HideCreateRepositoryModal {
    type: constants.HIDE_CREATE_REPOSITORY_MODAL;
}

export interface CreateRepositoryStart {
    type: constants.CREATE_REPOSITORY_START;
};

export interface CreateRepositorySuccess {
    type: constants.CREATE_REPOSITORY_SUCCESS;
    newRepository: Repository;
}

export interface CreateRepositoryFailure {
    type: constants.CREATE_REPOSITORY_FAILURE;
}

export type RepositoryAction = GetRepositoryList | GetRepositoryListSuccess | GetRepositoryListFailure |
                               CreateRepositoryStart | CreateRepositorySuccess | CreateRepositoryFailure | ShowCreateRepositoryModal | HideCreateRepositoryModal;

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

export function createRepositoryStart(): CreateRepositoryStart {
    return {
        type: constants.CREATE_REPOSITORY_START
    };
}

export function createRepositorySuccess(newRepository: Repository): CreateRepositorySuccess {
    return {
        type: constants.CREATE_REPOSITORY_SUCCESS,
        newRepository
    };
}

export function createRepositoryFailure(): CreateRepositoryFailure {
    return {
        type: constants.CREATE_REPOSITORY_FAILURE
    };
}

export function showCreateRepositoryModal(): ShowCreateRepositoryModal {
    return {
        type: constants.SHOW_CREATE_REPOSITORY_MODAL
    };
}

export function hideCreateRepositoryModal(): HideCreateRepositoryModal {
    return {
        type: constants.HIDE_CREATE_REPOSITORY_MODAL
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

/**
 * 创建新的仓库
 * @param name 仓库名
 * @param description 仓库说明
 */
export function createRepository(name: string, description: string): 
    DeferredAction<CreateRepositoryStart | CreateRepositorySuccess | CreateRepositoryFailure> {
    return async (dispatch) => {
        dispatch(createRepositoryStart());
        try {
            const newRepository = await request.post<Repository>('/Repository/create', {
                name,
                description
            });
            dispatch(createRepositorySuccess(newRepository));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(createRepositoryFailure());
        }
    }
}