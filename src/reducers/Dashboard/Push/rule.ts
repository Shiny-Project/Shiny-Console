import { RuleAction } from 'actions/dashboard/push/rule';
import { PushRuleState } from 'types';
import initState from 'stores/initState';
import * as ActionTypes from 'constants/Push/rule';

export function pushRule(
    state: PushRuleState = initState.dashboard.push.rule, actions: RuleAction): PushRuleState {
    switch (actions.type) {
        case ActionTypes.GET_RULE_LIST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.GET_RULE_LIST_FAILURE: {
            return {
                ...state,
                isLoading: false
            };
        }
        case ActionTypes.GET_RULE_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                rules: actions.rules
            };
        }
        case ActionTypes.SHOW_CREATE_RULE_MODAL: {
            return {
                ...state,
                createRuleModalVisible: true
            };
        }
        case ActionTypes.HIDE_CREATE_RULE_MODAL: {
            return {
                ...state,
                createRuleModalVisible: false
            };
        }
        case ActionTypes.CREATE_RULE: {
            return {
                ...state,
                createRuleModalLoading: true
            };
        }
        case ActionTypes.CREATE_RULE_FAILURE: {
            return {
                ...state,
                createRuleModalLoading: false
            };
        }
        case ActionTypes.CREATE_RULE_SUCCESS: {
            return {
                ...state,
                createRuleModalVisible: false,
                createRuleModalLoading: false,
                rules: [
                    ...state.rules,
                    actions.rule
                ]
            };
        }
        case ActionTypes.DELETE_RULE: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.DELETE_RULE_SUCCESS: {
            const ruleItemIndex = state.rules.findIndex(rule => rule.id === actions.id);
            return {
                ...state,
                rules: [
                    ...state.rules.slice(0, ruleItemIndex),
                    ...state.rules.slice(ruleItemIndex + 1)
                ],
                isLoading: false
            };
        }
        case ActionTypes.SHOW_EDIT_RULE_MODAL: {
            return {
                ...state,
                editRuleModalVisible: true,
                nowEditingRule: actions.rule
            };
        }
        case ActionTypes.HIDE_EDIT_RULE_MODAL: {
            return {
                ...state,
                editRuleModalVisible: false
            };
        }
        case ActionTypes.EDIT_RULE: {
            return {
                ...state,
                editRuleModalLoading: true
            };
        }
        case ActionTypes.EDIT_RULE_SUCCESS: {
            const ruleItemIndex = 
                state.rules.findIndex(rule => rule.id === actions.rule.id);
            return {
                ...state,
                editRuleModalLoading: false,
                editRuleModalVisible: false,
                rules: [
                    ...state.rules.slice(0, ruleItemIndex),
                    {
                        ...state.rules[ruleItemIndex],
                        spider_name: actions.rule.spider_name,
                        rule: actions.rule.rule
                    },
                    ...state.rules.slice(ruleItemIndex + 1)
                ]
            };
        }
        case ActionTypes.EDIT_RULE_FAILURE: {
            return {
                ...state,
                editRuleModalLoading: false
            };
        }
        default: {
            return state;
        }
    }
}