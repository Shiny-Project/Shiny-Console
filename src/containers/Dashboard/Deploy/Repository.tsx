import * as actions from 'actions/dashboard/deploy/repository';
import { StoreState } from 'types';
import { connect } from 'react-redux';
import { Dispatch } from 'types/action';
import { RepositoryAction } from 'actions/dashboard/deploy/repository';
import { Repository as RepositoryItem } from 'types/dashboard';
import Repository from 'components/Dashboard/Deploy/Repository/Repository';
import { CreateRepositoryFormValues } from 'components/Dashboard/Deploy/Repository/CreateRepositoryForm';
import { EditRepositoryFormValues } from 'components/Dashboard/Deploy/Repository/EditRepositoryForm';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps, 
        ...stateProps, 
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
      isLoading: state.dashboard.deploy.repository.isLoading,
      repositories: state.dashboard.deploy.repository.repositories,
      nowEditingRepository: state.dashboard.deploy.repository.nowEditingRepository,
      createRepositoryModalVisible: state.dashboard.deploy.repository.createRepositoryModalVisible,
      createRepositoryModalLoading: state.dashboard.deploy.repository.createRepositoryModalLoading,
      editRepositoryModalVisible: state.dashboard.deploy.repository.editRepositoryModalVisible,
      editRepositoryModalLoading: state.dashboard.deploy.repository.editRepositoryModalLoading,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<RepositoryAction>) {
    return {
        getRepositoryList: () => {
            dispatch(actions.getRepositoryList());
        },
        showCreateRepositoryModal: () => {
            dispatch(actions.showCreateRepositoryModal());
        },
        hideCreateRepositoryModal: () => {
            dispatch(actions.hideCreateRepositoryModal());
        },
        createRepository: (formValues: CreateRepositoryFormValues) => {
            dispatch(actions.createRepository(formValues));
        },
        deleteRepository: (repositoryId: number) => {
            dispatch(actions.deleteRepository(repositoryId));
        },
        showEditRepositoryModal: (repository: RepositoryItem) => {
            dispatch(actions.showEditRepositoryModal(repository));
        },
        hideEditRepositoryModal: () => {
            dispatch(actions.hideEditRepositoryModal());
        },
        editRepository: (formValues: EditRepositoryFormValues) => {
            dispatch(actions.editRepository(formValues));
        }
    };
}
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Repository);