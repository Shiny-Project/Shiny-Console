import Rule from '@/components/Dashboard/Push/Rule';
import * as actions from '@/actions/dashboard/push/rule';
import { StoreState } from '@/types';
import { connect } from 'react-redux';
import { RuleAction } from '@/actions/dashboard/push/rule';
import { ThunkAction } from 'redux-thunk';
import { PushRuleItem } from '@/types/dashboard';

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

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: RuleAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getRuleList: () => {
            dispatch(actions.getRuleList());
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Rule);