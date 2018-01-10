import Overview from '@/components/Dashboard/Overview/Overview';
import * as actions from '@/actions/dashboard/overview';
import { StoreState } from '@/types/index';
import { connect } from 'react-redux';
import { OverviewAction } from '@/actions/dashboard/overview';
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
      statistics: state.dashboard.overview.statistics
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: OverviewAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getStatistics: () => {
            dispatch(actions.getStatistics());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Overview);