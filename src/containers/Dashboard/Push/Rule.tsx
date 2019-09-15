import Rule from 'components/Dashboard/Push/Rule';
import * as actions from 'actions/dashboard/push/rule';
import { StoreState } from 'types';
import { connect } from 'react-redux';
import { Dispatch } from 'types/action';
import { RuleAction } from 'actions/dashboard/push/rule';
import { PushRuleItem } from 'types/dashboard';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
        rules: state.dashboard.push.rule.rules,
        isLoading: state.dashboard.push.rule.isLoading,
        nowEditingRule: state.dashboard.push.rule.nowEditingRule,
        editRuleModalVisible: state.dashboard.push.rule.editRuleModalVisible,
        editRuleModalLoading: state.dashboard.push.rule.editRuleModalLoading,
        createRuleModalVisible: state.dashboard.push.rule.createRuleModalVisible,
        createRuleModalLoading: state.dashboard.push.rule.createRuleModalLoading
    };
}

export function mapDispatchToProps(dispatch: Dispatch<RuleAction>) {
    return {
        getRuleList: () => {
            dispatch(actions.getRuleList());
        },
        createRule: (spiderName: string, rule: string) => {
            dispatch(actions.createRule(spiderName, rule));
        },
        editRule: (ruleId: number, spiderName: string, rule: string) => {
            dispatch(actions.editRule(ruleId, spiderName, rule));
        },
        deleteRule: (ruleId: number) => {
            dispatch(actions.deleteRule(ruleId));
        },
        showEditRuleModal: (rule: PushRuleItem) => {
            dispatch(actions.showEditRuleModal(rule));
        },
        hideEditRuleModal: () => {
            dispatch(actions.hideEditRuleModal());
        },
        showCreateRuleModal: () => {
            dispatch(actions.showCreateRuleModal());
        },
        hideCreateRuleModal: () => {
            dispatch(actions.hideCreateRuleModal());
        }
    };
}
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Rule);