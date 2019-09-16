import Repository from 'components/Dashboard/Deploy/Repository';
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
      repositories: state.dashboard.deploy.repository.repositories
    };
}

export function mapDispatchToProps(dispatch: Dispatch<RepositoryAction>) {
    return {
        getRepositoryList: () => {
            dispatch(actions.getRepositoryList());
        }
    };
}
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Repository);