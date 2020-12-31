import Account from 'components/Dashboard/Push/Account/Account';
import * as actions from 'actions/dashboard/push/account';
import { StoreState } from 'types';
import { connect } from 'react-redux';
import { Dispatch } from 'types/action';
import { AccountAction } from 'actions/dashboard/push/account';
import { PushAccount } from 'types/dashboard';
import { CreateAccountFormValues } from 'components/Dashboard/Push/Account/CreateAccountForm';
import { EditAccountFormValues } from 'components/Dashboard/Push/Account/EditAccountForm';

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

export function mapDispatchToProps(dispatch: Dispatch<AccountAction>) {
    return {
        getAccountList: () => {
            dispatch(actions.getAccountList());
        },
        createAccount: (formValues: CreateAccountFormValues) => {
            dispatch(actions.createAccount(formValues));
        },
        deleteAccount: (id: number) => {
            dispatch(actions.deleteAccount(id));
        },
        editAccount: (formValues: EditAccountFormValues) => {
            dispatch(actions.editAccount(formValues));
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
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Account);