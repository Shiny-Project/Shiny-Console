import Application from 'components/Dashboard/Server/Application/Application';
import * as actions from 'actions/dashboard/server/application';
import { StoreState } from 'types';
import { connect } from 'react-redux';
import { Dispatch } from 'types/action';
import { ApplicationAction } from 'actions/dashboard/server/application';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
        isLoading: state.dashboard.server.application.isLoading,
        createModalVisible: state.dashboard.server.application.createModalVisible,
        createModalLoading: state.dashboard.server.application.createModalLoading,
        keyPairs: state.dashboard.server.application.keyPairs,
        serverList: state.dashboard.server.application.serverList
    };
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationAction>) {
    return {
        getKeyPairs: () => {
            dispatch(actions.getKeyPairs());
        },
        deleteKeyPair: (applicationId: number) => {
            dispatch(actions.deleteKeyPair(applicationId));
        },
        createKeyPair: (tag: number) => {
            dispatch(actions.createKeyPair(tag));
        },
        showCreateModal: () => {
            dispatch(actions.showCreateModal());
        },
        closeCreateModal: () => {
            dispatch(actions.closeCreateModal());
        }
    };
}
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Application);