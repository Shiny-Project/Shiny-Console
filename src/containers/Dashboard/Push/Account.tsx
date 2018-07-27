import Account from '@/components/Dashboard/Push/Account';
import * as actions from '@/actions/dashboard/push/account';
import { StoreState } from '@/types/index';
import { connect } from 'react-redux';
import { AccountAction } from '@/actions/dashboard/push/account';
import { ThunkAction } from 'redux-thunk';
import { PushAccount } from '@/types/dashboard';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
        isLoading: state.dashboard.push.account.isLoading,
        accounts: state.dashboard.push.account.accounts,
        nowEditingAccount: state.dashboard.push.account.nowEditingAccount,
        createAccountModalVisible: state.dashboard.push.account.createAccountModalVisible,
        createAccountModalLoading: state.dashboard.push.account.createAccountModalLoading,
        editAccountModalVisible: state.dashboard.push.account.editAccountModalVisible,
        editAccountModalLoading: state.dashboard.push.account.editAccountModalLoading
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: AccountAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getAccountList: () => {
            dispatch(actions.getAccountList());
        },
        createAccount: (platform: string, name: string, credential: string) => {
            dispatch(actions.createAccount(platform, name, credential));
        },
        deleteAccount: (id: number) => {
            dispatch(actions.deleteAccount(id));
        },
        editAccount: (id: number, platform: string, name: string, credential: string) => {
            dispatch(actions.editAccount(id, platform, name, credential));
        },
        showCreateAccountModal: () => {
            dispatch(actions.showCreateAccountModal());
        },
        hideCreateAccountModal: () => {
            dispatch(actions.hideCreateAccountModal());
        },
        showEditAccountModal: (account: PushAccount) => {
            dispatch(actions.showEditAccountModal(account));
        },
        hideEditAccountModal: () => {
            dispatch(actions.hideEditAccountModal());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Account);