import Login from '@/components/User/Login/Login';
import * as actions from '@/actions/user';
import { StoreState } from '@/types';
import { Dispatch } from '@/types/action';
import { connect } from 'react-redux';
import { UserAction } from '@/actions/user';

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

export function mapDispatchToProps(dispatch: Dispatch<UserAction>) {
    return {
        login: (userName: string, password: string) => dispatch(actions.login(userName, password)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login);