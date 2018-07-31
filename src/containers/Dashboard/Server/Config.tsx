import Config from '@/components/Dashboard/Server/Config';
import * as actions from '@/actions/dashboard/server/config';
import { StoreState } from '@/types';
import { connect } from 'react-redux';
import { ConfigAction } from '@/actions/dashboard/server/config';
import { ThunkAction } from 'redux-thunk';
import { ConfigItem } from '@/types/dashboard';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
        isLoading: state.dashboard.server.config.isLoading,
        configList: state.dashboard.server.config.configList,
        nowEditingConfig: state.dashboard.server.config.nowEditingConfig,
        createConfigModalVisible: state.dashboard.server.config.createConfigModalVisible,
        createConfigModalLoading: state.dashboard.server.config.createConfigModalLoading,
        editConfigModalVisible: state.dashboard.server.config.editConfigModalVisible,
        editConfigModalLoading: state.dashboard.server.config.editConfigModalLoading
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: ConfigAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getConfigList: () => {
            dispatch(actions.getConfigList());
        },
        createConfig: (key: string, value: string) => {
            dispatch(actions.createConfig(key, value));
        },
        deleteConfig: (key: string) => {
            dispatch(actions.deleteConfig(key));
        },
        editConfig: (key: string, value: string) => {
            dispatch(actions.editConfig(key, value));
        },
        showCreateConfigModal: () => {
            dispatch(actions.showCreateConfigModal());
        },
        hideCreateConfigModal: () => {
            dispatch(actions.hideCreateConfigModal());
        },
        showEditConfigModal: (configItem: ConfigItem) => {
            dispatch(actions.showEditConfigModal(configItem));
        },
        hideEditConfigModal: () => {
            dispatch(actions.hideEditConfigModal());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Config);