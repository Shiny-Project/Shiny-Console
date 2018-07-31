import History from '@/components/Dashboard/Push/History';
import * as actions from '@/actions/dashboard/push/history';
import { StoreState } from '@/types';
import { connect } from 'react-redux';
import { HistoryAction } from '@/actions/dashboard/push/history';
import { ThunkAction } from 'redux-thunk';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
        isLoading: state.dashboard.push.history.isLoading,
        pushHistory: state.dashboard.push.history.pushHistory
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: HistoryAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getPushHistory: () => {
            dispatch(actions.getPushHistory());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(History);