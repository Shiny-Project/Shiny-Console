import * as constants from "constants/Push/account";
import { raiseError } from "actions/dashboard/error";
import request from "services/request";
import { PushAccountList, PushAccount } from "types/dashboard";
import { DeferredAction } from "types/action";
import { CreateAccountFormValues } from "components/Dashboard/Push/Account/CreateAccountForm";
import { EditAccountFormValues } from "components/Dashboard/Push/Account/EditAccountForm";

export interface GetAccountList {
    type: constants.GET_ACCOUNT_LIST;
}

export interface GetAccountListSuccess {
    type: constants.GET_ACCOUNT_LIST_SUCCESS;
    accounts: PushAccountList;
}

export interface GetAccountListFailure {
    type: constants.GET_ACCOUNT_LIST_FAILURE;
}

export interface ShowCreateAccountModal {
    type: constants.SHOW_CREATE_ACCOUNT_MODAL;
}

export interface HideCreateAccountModal {
    type: constants.HIDE_CREATE_ACCOUNT_MODAL;
}

export interface CreateAccount {
    type: constants.CREATE_ACCOUNT;
}

export interface CreateAccountSuccess {
    type: constants.CREATE_ACCOUNT_SUCCESS;
    account: PushAccount;
}

export interface CreateAccountFailure {
    type: constants.CREATE_ACCOUNT_FAILURE;
}

export interface DeleteAccount {
    type: constants.DELETE_ACCOUNT;
}

export interface DeleteAccountSuccess {
    type: constants.DELETE_ACCOUNT_SUCCESS;
    id: number;
}

export interface DeleteAccountFailure {
    type: constants.DELETE_ACCOUNT_FAILURE;
}

export interface ShowEditAccountModal {
    type: constants.SHOW_EDIT_ACCOUNT_MODAL;
    account: PushAccount;
}

export interface HideEditAccountModal {
    type: constants.HIDE_EDIT_ACCOUNT_MODAL;
}

export interface EditAccount {
    type: constants.EDIT_ACCOUNT;
}

export interface EditAccountSuccess {
    type: constants.EDIT_ACCOUNT_SUCCESS;
    account: PushAccount;
}

export interface EditAccountFailure {
    type: constants.EDIT_ACCOUNT_FAILURE;
}

export type AccountAction =
    | GetAccountList
    | GetAccountListSuccess
    | GetAccountListFailure
    | ShowCreateAccountModal
    | HideCreateAccountModal
    | CreateAccount
    | CreateAccountSuccess
    | CreateAccountFailure
    | DeleteAccount
    | DeleteAccountSuccess
    | DeleteAccountFailure
    | ShowEditAccountModal
    | HideEditAccountModal
    | EditAccount
    | EditAccountSuccess
    | EditAccountFailure;

export function getAccountListStart(): GetAccountList {
    return {
        type: constants.GET_ACCOUNT_LIST,
    };
}

export function getAccountListSuccess(
    accounts: PushAccountList
): GetAccountListSuccess {
    return {
        type: constants.GET_ACCOUNT_LIST_SUCCESS,
        accounts,
    };
}

export function getAccountListFailure(): GetAccountListFailure {
    return {
        type: constants.GET_ACCOUNT_LIST_FAILURE,
    };
}

export function showCreateAccountModal(): ShowCreateAccountModal {
    return {
        type: constants.SHOW_CREATE_ACCOUNT_MODAL,
    };
}

export function hideCreateAccountModal(): HideCreateAccountModal {
    return {
        type: constants.HIDE_CREATE_ACCOUNT_MODAL,
    };
}

export function createAccountStart(): CreateAccount {
    return {
        type: constants.CREATE_ACCOUNT,
    };
}

export function createAccountSuccess(
    account: PushAccount
): CreateAccountSuccess {
    return {
        type: constants.CREATE_ACCOUNT_SUCCESS,
        account,
    };
}

export function createAccountFailure(): CreateAccountFailure {
    return {
        type: constants.CREATE_ACCOUNT_FAILURE,
    };
}

export function deleteAccountStart(): DeleteAccount {
    return {
        type: constants.DELETE_ACCOUNT,
    };
}

export function deleteAccountSuccess(id: number): DeleteAccountSuccess {
    return {
        type: constants.DELETE_ACCOUNT_SUCCESS,
        id,
    };
}

export function deleteAccountFailure(): DeleteAccountFailure {
    return {
        type: constants.DELETE_ACCOUNT_FAILURE,
    };
}

export function showEditAccountModal(
    account: PushAccount
): ShowEditAccountModal {
    return {
        type: constants.SHOW_EDIT_ACCOUNT_MODAL,
        account,
    };
}

export function hideEditAccountModal(): HideEditAccountModal {
    return {
        type: constants.HIDE_EDIT_ACCOUNT_MODAL,
    };
}

export function editAccountStart(): EditAccount {
    return {
        type: constants.EDIT_ACCOUNT,
    };
}

export function editAccountSuccess(account: PushAccount): EditAccountSuccess {
    return {
        type: constants.EDIT_ACCOUNT_SUCCESS,
        account,
    };
}

export function editAccountFailure(): EditAccountFailure {
    return {
        type: constants.EDIT_ACCOUNT_FAILURE,
    };
}

/**
 * 获得账号列表
 */
export function getAccountList(): DeferredAction<
    GetAccountList | GetAccountListSuccess | GetAccountListFailure
> {
    return async (dispatch) => {
        dispatch(getAccountListStart());
        try {
            const response = await request.get<PushAccountList>(
                "/PushAccount/list"
            );
            dispatch(getAccountListSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getAccountListFailure());
        }
    };
}

/**
 * 创建账号
 */
export function createAccount({
    platform,
    name,
    credential,
}: CreateAccountFormValues): DeferredAction<
    CreateAccount | CreateAccountSuccess | CreateAccountFailure
> {
    return async (dispatch) => {
        dispatch(createAccountStart());
        try {
            const response = await request.post<PushAccount>(
                "/PushAccount/create",
                {
                    platform,
                    name,
                    credential,
                }
            );
            dispatch(createAccountSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(createAccountFailure());
        }
    };
}
/**
 * 删除账号
 * @param id
 */
export function deleteAccount(
    id: number
): DeferredAction<DeleteAccount | DeleteAccountSuccess | DeleteAccountFailure> {
    return async (dispatch) => {
        dispatch(deleteAccountStart());
        try {
            await request.post("/PushAccount/delete", {
                accountId: id,
            });
            dispatch(deleteAccountSuccess(id));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(deleteAccountFailure());
        }
    };
}

/**
 * 编辑账号
 * @param id
 * @param platform
 * @param name
 * @param account
 */
export function editAccount({
    id,
    platform,
    name,
    credential,
}: EditAccountFormValues): DeferredAction<
    EditAccount | EditAccountSuccess | EditAccountFailure
> {
    return async (dispatch) => {
        dispatch(editAccountStart());
        try {
            const response = await request.post<PushAccount>(
                "/PushAccount/edit",
                {
                    accountId: id,
                    platform,
                    name,
                    credential,
                }
            );
            dispatch(editAccountSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(editAccountFailure());
        }
    };
}
