import * as constants from 'constants/Push/rule';
import { raiseError } from 'actions/dashboard/error';
import request from 'services/request';
import { PushRuleList, PushRuleItem } from 'types/dashboard';
import { DeferredAction } from 'types/action';
import { CreateRuleFormValues } from 'components/Dashboard/Push/Rule/CreateRuleForm';

export interface GetRuleList {
    type: constants.GET_RULE_LIST;
}

export interface GetRuleListSuccess {
    type: constants.GET_RULE_LIST_SUCCESS;
    rules: PushRuleList;
}

export interface GetRuleListFailure {
    type: constants.GET_RULE_LIST_FAILURE;
}

export interface ShowCreateRuleModal {
    type: constants.SHOW_CREATE_RULE_MODAL;
}

export interface HideCreateRuleModal {
    type: constants.HIDE_CREATE_RULE_MODAL;
}

export interface CreateRule {
    type: constants.CREATE_RULE;
}

export interface CreateRuleSuccess {
    type: constants.CREATE_RULE_SUCCESS;
    rule: PushRuleItem;
}

export interface CreateRuleFailure {
    type: constants.CREATE_RULE_FAILURE;
}

export interface DeleteRule {
    type: constants.DELETE_RULE;
}

export interface DeleteRuleSuccess {
    type: constants.DELETE_RULE_SUCCESS;
    id: number;
}

export interface DeleteRuleFailure {
    type: constants.DELETE_RULE_FAILURE;
}

export interface ShowEditRuleModal {
    type: constants.SHOW_EDIT_RULE_MODAL;
    rule: PushRuleItem;
}

export interface HideEditRuleModal {
    type: constants.HIDE_EDIT_RULE_MODAL;
}

export interface EditRule {
    type: constants.EDIT_RULE;
}

export interface EditRuleSuccess {
    type: constants.EDIT_RULE_SUCCESS;
    rule: PushRuleItem;
}

export interface EditRuleFailure {
    type: constants.EDIT_RULE_FAILURE;
}

export type RuleAction = 
    GetRuleList | GetRuleListSuccess | GetRuleListFailure |
    ShowCreateRuleModal | HideCreateRuleModal | 
    CreateRule | CreateRuleSuccess | CreateRuleFailure |
    DeleteRule | DeleteRuleSuccess | DeleteRuleFailure |
    ShowEditRuleModal | HideEditRuleModal | EditRule | EditRuleSuccess | EditRuleFailure;

export function getRuleListStart(): GetRuleList {
    return {
        type: constants.GET_RULE_LIST
    };
}

export function getRuleListSuccess(rules: PushRuleList): GetRuleListSuccess {
    return {
        type: constants.GET_RULE_LIST_SUCCESS,
        rules
    };
}

export function getRuleListFailure(): GetRuleListFailure {
    return {
        type: constants.GET_RULE_LIST_FAILURE
    };
}

export function showCreateRuleModal(): ShowCreateRuleModal {
    return {
        type: constants.SHOW_CREATE_RULE_MODAL
    };
}

export function hideCreateRuleModal(): HideCreateRuleModal {
    return {
        type: constants.HIDE_CREATE_RULE_MODAL
    };
}

export function createRuleStart(): CreateRule {
    return {
        type: constants.CREATE_RULE
    };
}

export function createRuleSuccess(rule: PushRuleItem): CreateRuleSuccess {
    return {
        type: constants.CREATE_RULE_SUCCESS,
        rule
    };
}

export function createRuleFailure(): CreateRuleFailure {
    return {
        type: constants.CREATE_RULE_FAILURE
    };
}

export function deleteRuleStart(): DeleteRule {
    return {
        type: constants.DELETE_RULE
    };
}

export function deleteRuleSuccess(id: number): DeleteRuleSuccess {
    return {
        type: constants.DELETE_RULE_SUCCESS,
        id
    };
}

export function deleteRuleFailure(): DeleteRuleFailure {
    return {
        type: constants.DELETE_RULE_FAILURE
    };
}

export function showEditRuleModal(rule: PushRuleItem): ShowEditRuleModal {
    return {
        type: constants.SHOW_EDIT_RULE_MODAL,
        rule
    };
}

export function hideEditRuleModal(): HideEditRuleModal {
    return {
        type: constants.HIDE_EDIT_RULE_MODAL,
    };
}

export function editRuleStart(): EditRule {
    return {
        type: constants.EDIT_RULE,
    };
}

export function editRuleSuccess(rule: PushRuleItem): EditRuleSuccess {
    return {
        type: constants.EDIT_RULE_SUCCESS,
        rule
    };
}

export function editRuleFailure(): EditRuleFailure {
    return {
        type: constants.EDIT_RULE_FAILURE
    };
}

/**
 * 获得推送规则列表
 */
export function getRuleList(): 
    DeferredAction<GetRuleList | GetRuleListSuccess | GetRuleListFailure> {
    return async (dispatch) => {
        dispatch(getRuleListStart());
        try {
            const response = await request.get<PushRuleList>('/PushRule/list');
            dispatch(getRuleListSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getRuleListFailure());
        }
    };
}

/**
 * 创建推送规则
 */
export function createRule({ spider_name, rule }: CreateRuleFormValues): 
    DeferredAction<CreateRule | CreateRuleSuccess | CreateRuleFailure> {
    return async (dispatch) => {
        dispatch(createRuleStart());
        try {
            const response = await request.post<PushRuleItem>('/PushRule/create', {
                spiderName: spider_name,
                rule
            });
            dispatch(createRuleSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(createRuleFailure());
        }
    };
}
/**
 * 删除推送规则
 * @param id
 */
export function deleteRule(id: number): 
    DeferredAction<DeleteRule | DeleteRuleSuccess | DeleteRuleFailure> {
    return async (dispatch) => {
        dispatch(deleteRuleStart());
        try {
            await request.post('/PushRule/delete', {
                id
            });
            dispatch(deleteRuleSuccess(id));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(deleteRuleFailure());
        }
    };
}

/**
 * 编辑规则
 * @param id 
 * @param platform
 * @param name 
 * @param rule
 */
export function editRule(
    id: number, spiderName: string, rule: string
): DeferredAction<EditRule | EditRuleSuccess | EditRuleFailure> {
    return async (dispatch) => {
        dispatch(editRuleStart());
        try {
            const response = await request.post<PushRuleItem>('/PushRule/edit', {
                id,
                spiderName,
                rule
            });
            dispatch(editRuleSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(editRuleFailure());
        }
    };
}