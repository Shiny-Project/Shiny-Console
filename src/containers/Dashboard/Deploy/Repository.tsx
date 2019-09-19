import Repository from 'components/Dashboard/Deploy/Repository/Repository';
import * as actions from 'actions/dashboard/deploy/repository';
import { StoreState } from 'types';
import { connect } from 'react-redux';
import { Dispatch } from 'types/action';
import { RepositoryAction } from 'actions/dashboard/deploy/repository';

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
      createRepositoryModalVisible: state.dashboard.deploy.repository.createRepositoryModalVisible,
      createRepositoryModalLoading: state.dashboard.deploy.repository.createRepositoryModalLoading
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
        createRepository: (name: string, description: string) => {
            dispatch(actions.createRepository(name, description));
        },
        deleteRepository: (repositoryId: number) => {
            dispatch(actions.deleteRepository(repositoryId));
        }
    };
}
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Repository);