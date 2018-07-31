import Identity from '@/components/Dashboard/Spider/Identity';
import * as actions from '@/actions/dashboard/spider/identity';
import { StoreState } from '@/types';
import { connect } from 'react-redux';
import { IdentityAction } from '@/actions/dashboard/spider/identity';
import { ThunkAction } from 'redux-thunk';
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

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: IdentityAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
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