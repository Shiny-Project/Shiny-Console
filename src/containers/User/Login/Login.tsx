import Login from '@/components/User/Login/Login';
import * as actions from '@/actions/user';
import { StoreState } from '@/types';
import { connect } from 'react-redux';
import { UserAction } from '@/actions/user';
import { ThunkAction } from 'redux-thunk';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps, 
        ...stateProps, 
        ...dispatchProps
    };
}

export function mapStateToProps({user: {isLogin, userName, loading}}: StoreState) {
    return {
        isLogin,
        userName,
        loading
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: UserAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        login: (userName: string, password: string) => dispatch(actions.login(userName, password)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login);