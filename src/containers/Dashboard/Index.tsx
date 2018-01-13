import Dashboard from '@/components/Dashboard/Index';
import * as actions from '@/actions/dashboard/error';
import { StoreState } from '@/types/index';
import { connect } from 'react-redux';
import { ErrorAction } from '@/actions/dashboard/error';
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
      errors: state.dashboard.errors
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: ErrorAction | ThunkAction<void, StoreState, null>): void;
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