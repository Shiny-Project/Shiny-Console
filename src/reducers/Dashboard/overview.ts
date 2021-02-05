import { OverviewAction } from "actions/dashboard/overview";
import { OverviewState } from "types";
import {
    GET_LATENCY_GRAPH,
    GET_LATENCY_GRAPH_FAILURE,
    GET_LATENCY_GRAPH_SUCCESS,
    GET_STATISTICS,
    GET_STATISTICS_SUCCESS,
    GET_STATISTIC_FAILURE,
} from "constants/Dashboard/overview";
import initState from "stores/initState";

export function overview(
    state: OverviewState = initState.dashboard.overview,
    action: OverviewAction
): OverviewState {
    switch (action.type) {
        case GET_STATISTICS:
            return {
                ...state,
                isLoading: true,
            };
        case GET_STATISTICS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                statistics: action.statistics,
            };
        case GET_STATISTIC_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case GET_LATENCY_GRAPH:
            return {
                ...state,
                isLoadingLatencyGraph: true,
            };
        case GET_LATENCY_GRAPH_SUCCESS:
            return {
                ...state,
                isLoadingLatencyGraph: false,
                latencyData: action.latencyData,
            };
        case GET_LATENCY_GRAPH_FAILURE: {
            return {
                ...state,
                isLoadingLatencyGraph: false,
            };
        }
        default:
            return {
                ...state,
            };
    }
}
