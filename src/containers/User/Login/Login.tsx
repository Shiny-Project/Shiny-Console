import Login from '../../../components/User/Login/Login';
import * as actions from '../../../actions/auth';
import { StoreState } from '../../../types/index';
import { connect, Dispatch } from 'react-redux';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps, 
        ...stateProps, 
        ...dispatchProps
    };
}

export function mapStateToProps({user: {isLogin, userName}}: StoreState) {
    return {
        isLogin,
        userName
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.AuthAction>) {
    return {
        onLogin: () => dispatch(actions.login()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login);