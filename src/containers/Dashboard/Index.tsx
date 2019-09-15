import Dashboard from 'components/Dashboard/Index';
import * as actions from 'actions/dashboard/error';
import { StoreState } from 'types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

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

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        raiseError: (error: Error) => {
            dispatch(actions.raiseError(error));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Dashboard);