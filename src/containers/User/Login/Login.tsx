import Login from '../../../components/User/Login/Login';
import * as actions from '../../../actions/user';
import { StoreState } from '../../../types/index';
import { connect, Dispatch } from 'react-redux';

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

export function mapDispatchToProps(dispatch: Dispatch<actions.UserAction>) {
    return {
        login: () => dispatch(actions.login()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login);