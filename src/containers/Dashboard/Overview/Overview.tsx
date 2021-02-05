import Overview from 'components/Dashboard/Overview/Overview';
import * as actions from 'actions/dashboard/overview';
import { StoreState } from 'types';
import { connect } from 'react-redux';
import { Dispatch } from 'types/action';
import { OverviewAction } from 'actions/dashboard/overview';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps, 
        ...stateProps, 
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
      statistics: state.dashboard.overview.statistics,
      isLoading: state.dashboard.overview.isLoading,
      isLoadingLatencyGraph: state.dashboard.overview.isLoadingLatencyGraph,
      latencyData: state.dashboard.overview.latencyData,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<OverviewAction>) {
    return {
        getStatistics: () => {
            dispatch(actions.getStatistics());
        },
        getLatencyData: () => {
            dispatch(actions.getLatencyGraph());
        }
    };
}
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Overview);