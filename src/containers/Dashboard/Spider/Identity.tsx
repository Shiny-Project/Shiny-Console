import Identity from '@/components/Dashboard/Spider/Identity';
import * as actions from '@/actions/dashboard/spider/identity';
import { StoreState } from '@/types';
import { connect } from 'react-redux';
import { Dispatch } from '@/types/action';
import { IdentityAction } from '@/actions/dashboard/spider/identity';
import { SpiderIdentityItem } from '@/types/dashboard';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
        isLoading: state.dashboard.spider.identity.isLoading,
        identityList: state.dashboard.spider.identity.identityList,
        nowEditingIdentity: state.dashboard.spider.identity.nowEditingIdentity,
        createIdentityModalVisible: state.dashboard.spider.identity.createIdentityModalVisible,
        createIdentityModalLoading: state.dashboard.spider.identity.createIdentityModalLoading,
        editIdentityModalVisible: state.dashboard.spider.identity.editIdentityModalVisible,
        editIdentityModalLoading: state.dashboard.spider.identity.editIdentityModalLoading
    };
}

export function mapDispatchToProps(dispatch: Dispatch<IdentityAction>) {
    return {
        getIdentityList: () => {
            dispatch(actions.getIdentityList());
        },
        createIdentity: (key: string, value: string) => {
            dispatch(actions.createIdentity(key, value));
        },
        deleteIdentity: (id: number) => {
            dispatch(actions.deleteIdentity(id));
        },
        editIdentity: (id: number, name: string, identity: string) => {
            dispatch(actions.editIdentity(id, name, identity));
        },
        showCreateIdentityModal: () => {
            dispatch(actions.showCreateIdentityModal());
        },
        hideCreateIdentityModal: () => {
            dispatch(actions.hideCreateIdentityModal());
        },
        showEditIdentityModal: (identityItem: SpiderIdentityItem) => {
            dispatch(actions.showEditIdentityModal(identityItem));
        },
        hideEditIdentityModal: () => {
            dispatch(actions.hideEditIdentityModal());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Identity);