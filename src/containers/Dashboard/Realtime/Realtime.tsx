import Realtime from '@/components/Dashboard/Realtime/Realtime';
import * as actions from '@/actions/dashboard/realtime';
import { StoreState } from '@/types';
import { connect } from 'react-redux';
import { Dispatch } from '@/types/action';
import { RealtimeAction } from '@/actions/dashboard/realtime';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps, 
        ...stateProps, 
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
      recentEvents: state.dashboard.realtime.recentEvents,
      recentJobs: state.dashboard.realtime.recentJobs,
      isLoading: state.dashboard.realtime.isLoading
    };
}

export function mapDispatchToProps(dispatch: Dispatch<RealtimeAction>) {
    return {
        getRecentEvents: (publishers?: string[], page?: number) => {
            dispatch(actions.getRecentEvents(publishers, page));
        },
        listenNewEvents: () => {
            dispatch(actions.listenNewEvents());
        },
        listenJobStatus: () => {
            dispatch(actions.listenJobStatus());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Realtime);