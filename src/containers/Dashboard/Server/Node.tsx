import Node from '@/components/Dashboard/Server/Node';
import * as actions from '@/actions/dashboard/server/node';
import { StoreState } from '@/types/index';
import { connect } from 'react-redux';
import { ServerNodeAction } from '@/actions/dashboard/server/node';
import { ThunkAction } from 'redux-thunk';

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

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: ServerNodeAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
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