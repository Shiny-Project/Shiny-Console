import Rule from '@/components/Dashboard/Push/Rule';
import { StoreState } from '@/types';
import { connect } from 'react-redux';
import { AccountAction } from '@/actions/dashboard/push/account';
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
        
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: AccountAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Rule);