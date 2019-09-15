import History from 'components/Dashboard/Push/History';
import * as actions from 'actions/dashboard/push/history';
import { StoreState } from 'types';
import { connect } from 'react-redux';
import { Dispatch } from 'types/action';
import { HistoryAction } from 'actions/dashboard/push/history';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
        isLoading: state.dashboard.push.history.isLoading,
        pushHistory: state.dashboard.push.history.pushHistory
    };
}

export function mapDispatchToProps(dispatch: Dispatch<HistoryAction>) {
    return {
        getPushHistory: () => {
            dispatch(actions.getPushHistory());
        }
    };
}
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(History);