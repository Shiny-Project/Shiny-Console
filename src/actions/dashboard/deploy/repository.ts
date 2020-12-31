import * as constants from 'constants/Deploy/repository';
import { raiseError } from 'actions/dashboard/error';
import { DeferredAction } from 'types/action';
import request from 'services/request';
import { RepositoryList, Repository } from 'types/dashboard';
import { CreateRepositoryFormValues } from 'components/Dashboard/Deploy/Repository/CreateRepositoryForm';
import { EditRepositoryFormValues } from 'components/Dashboard/Deploy/Repository/EditRepositoryForm';

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

export interface DeleteRepositoryStart {
    type: constants.DELETE_REPOSITORY_START;
}

export interface DeleteRepositorySuccess {
    type: constants.DELETE_REPOSITORY_SUCCESS;
    repositoryId: number;
}

export interface DeleteRepositoryFailure {
    type: constants.DELETE_REPOSITORY_FAILURE
}

export interface EditRepositoryStart {
    type: constants.EDIT_REPOSITORY_START;
}

export interface EditRepositorySuccess {
    type: constants.EDIT_REPOSITORY_SUCCESS;
    repository: Repository
}

export interface EditRepositoryFailure {
    type: constants.EDIT_REPOSITORY_FAILURE;
}

export interface ShowEditRepositoryModal {
    type: constants.SHOW_EDIT_REPOSITORY_MODAL;
    repository: Repository
};

export interface HideEditRepositoryModal {
    type: constants.HIDE_EDIT_REPOSITORY_MODAL;
}

export type RepositoryAction = GetRepositoryList | GetRepositoryListSuccess | GetRepositoryListFailure |
    CreateRepositoryStart | CreateRepositorySuccess | CreateRepositoryFailure | ShowCreateRepositoryModal | HideCreateRepositoryModal |
    DeleteRepositoryStart | DeleteRepositorySuccess | DeleteRepositoryFailure |
    EditRepositoryStart | EditRepositorySuccess | EditRepositoryFailure | ShowEditRepositoryModal | HideEditRepositoryModal;

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

export function deleteRepositoryStart(): DeleteRepositoryStart {
    return {
        type: constants.DELETE_REPOSITORY_START
    };
}

export function deleteRepositorySuccess(repositoryId: number): DeleteRepositorySuccess {
    return {
        type: constants.DELETE_REPOSITORY_SUCCESS,
        repositoryId
    };
}

export function deleteRepositoryFailure(): DeleteRepositoryFailure {
    return {
        type: constants.DELETE_REPOSITORY_FAILURE
    };
}

export function editRepositoryStart(): EditRepositoryStart {
    return {
        type: constants.EDIT_REPOSITORY_START
    };
}

export function editRepositorySuccess(updatedRepository: Repository): EditRepositorySuccess {
    return {
        type: constants.EDIT_REPOSITORY_SUCCESS,
        repository: updatedRepository
    };
}

export function editRepositoryFailure(): EditRepositoryFailure {
    return {
        type: constants.EDIT_REPOSITORY_FAILURE
    };
}

export function showEditRepositoryModal(editRepository: Repository): ShowEditRepositoryModal {
    return {
        type: constants.SHOW_EDIT_REPOSITORY_MODAL,
        repository: editRepository
    };
}

export function hideEditRepositoryModal(): HideEditRepositoryModal {
    return {
        type: constants.HIDE_EDIT_REPOSITORY_MODAL
    }
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
export function createRepository({ name, description }: CreateRepositoryFormValues):
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

/**
 * 更新仓库信息
 * @param repositoryId 仓库ID
 * @param name 仓库名
 * @param description 仓库说明
 */
export function editRepository({ id, name, description }: EditRepositoryFormValues):
    DeferredAction<EditRepositoryStart | EditRepositorySuccess | EditRepositoryFailure> {
        return async (dispatch) => {
            dispatch(editRepositoryStart());
            try {
                const updatedRepository = await request.post<Repository>('/Repository/update', {
                    id,
                    name,
                    description
                });
                dispatch(editRepositorySuccess(updatedRepository));
            } catch (e) {
                dispatch(raiseError(e));
                dispatch(editRepositoryFailure());
            }
        }
    }

/**
 * 删除仓库
 * @param repositoryId 仓库ID
 */
export function deleteRepository(repositoryId: number):
    DeferredAction<DeleteRepositoryStart | DeleteRepositorySuccess | DeleteRepositoryFailure> {
    return async (dispatch) => {
        dispatch(deleteRepositoryStart());
        try {
            await request.post('/Repository/delete', {
                id: repositoryId
            });
            dispatch(deleteRepositorySuccess(repositoryId));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(deleteRepositoryFailure());
        }
    }
}