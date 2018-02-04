import Realtime from '@/components/Dashboard/Realtime/Realtime';
import * as actions from '@/actions/dashboard/realtime';
import { StoreState } from '@/types/index';
import { connect } from 'react-redux';
import { RealtimeAction } from '@/actions/dashboard/realtime';
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
      recentEvents: state.dashboard.realtime.recentEvents,
      isLoading: state.dashboard.realtime.isLoading
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: RealtimeAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getRecentEvents: () => {
            dispatch(actions.getRecentEvents());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Realtime);