import Config from 'components/Dashboard/Server/Config/Config';
import * as actions from 'actions/dashboard/server/config';
import { StoreState } from 'types';
import { connect } from 'react-redux';
import { Dispatch } from 'types/action';
import { ConfigAction } from 'actions/dashboard/server/config';
import { ConfigItem } from 'types/dashboard';

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

export function mapDispatchToProps(dispatch: Dispatch<ConfigAction>) {
    return {
        getConfigList: () => {
            dispatch(actions.getConfigList());
        },
        createConfig: (key: string, value: string, contentType: string) => {
            dispatch(actions.createConfig(key, value, contentType));
        },
        deleteConfig: (key: string) => {
            dispatch(actions.deleteConfig(key));
        },
        editConfig: (key: string, value: string, contentType: string) => {
            dispatch(actions.editConfig(key, value, contentType));
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
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Config);