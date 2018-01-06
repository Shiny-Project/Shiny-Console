import Dashboard from '@/components/Dashboard/Index';
import * as actions from '@/actions/dashboard';
import { StoreState } from '@/types/index';
import { connect } from 'react-redux';
import { DashboardAction } from '@/actions/dashboard';
import { ThunkAction } from 'redux-thunk';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps, 
        ...stateProps, 
        ...dispatchProps
    };
}

export function mapStateToProps({dashboard: {error}}: StoreState) {
    return {
      error,
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: DashboardAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        raiseError: (error: Error) => {
            dispatch(actions.raiseError(error));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Dashboard);