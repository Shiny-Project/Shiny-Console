import Node from '@/components/Dashboard/Server/Node';
import * as actions from '@/actions/dashboard/server/node';
import { StoreState } from '@/types';
import { connect } from 'react-redux';
import { Dispatch } from '@/types/action';
import { ServerNodeAction } from '@/actions/dashboard/server/node';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps, 
        ...stateProps, 
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
      serverList: state.dashboard.server.node.serverList,
      isLoading: state.dashboard.server.node.isLoading,
      modalLoading: state.dashboard.server.node.modalLoading,
      modalVisible: state.dashboard.server.node.modalVisible,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<ServerNodeAction>) {
    return {
        getServerList: () => {
            dispatch(actions.getServerList());
        },
        deleteServer: (serverId: number) => {
            dispatch(actions.deleteServer(serverId));
        },
        addServer: (type: string, name: string, host: string, group: string[]) => {
            dispatch(actions.addServer(type, name, host, group));
        },
        showModal: () => {
            dispatch(actions.showCreateServerModal());
        },
        closeModal: () => {
            dispatch(actions.closeCreateServerModal());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Node);