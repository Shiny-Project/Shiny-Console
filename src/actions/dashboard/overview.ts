import * as constants from "constants/Dashboard/overview";
import { raiseError } from "actions/dashboard/error";
import request from "services/request";
import { LatencyGraphResponse, StatisticsResponse } from "types/dashboard";
import { DeferredAction } from "types/action";

export interface GetStatistic {
    type: constants.GET_STATISTICS;
}

export interface GetStatisticSuccess {
    type: constants.GET_STATISTICS_SUCCESS;
    statistics: StatisticsResponse;
}

export interface GetStatisticFailure {
    type: constants.GET_STATISTIC_FAILURE;
}

export interface GetLatencyGraph {
    type: constants.GET_LATENCY_GRAPH;
}

export interface GetLatencyGraphSuccess {
    type: constants.GET_LATENCY_GRAPH_SUCCESS;
    latencyData: LatencyGraphResponse;
}

export interface GetLatencyGraphFailure {
    type: constants.GET_LATENCY_GRAPH_FAILURE;
}

export type OverviewAction =
    | GetStatistic
    | GetStatisticSuccess
    | GetStatisticFailure
    | GetLatencyGraph
    | GetLatencyGraphSuccess
    | GetLatencyGraphFailure;

export function getStatistics(): DeferredAction<
    GetStatistic | GetStatisticSuccess | GetStatisticFailure
> {
    return async (dispatch) => {
        dispatch(getStatisticsStart());
        try {
            const response = await request.get<StatisticsResponse>(
                "/Data/statistics"
            );
            dispatch(getStatisticsSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getStatisticsFailure());
        }
    };
}

export function getStatisticsStart(): GetStatistic {
    return {
        type: constants.GET_STATISTICS,
    };
}

export function getStatisticsSuccess(
    statistics: StatisticsResponse
): GetStatisticSuccess {
    return {
        type: constants.GET_STATISTICS_SUCCESS,
        statistics,
    };
}

export function getStatisticsFailure(): GetStatisticFailure {
    return {
        type: constants.GET_STATISTIC_FAILURE,
    };
}

export function getLatencyGraph(): DeferredAction<
    GetLatencyGraph | GetLatencyGraphSuccess | GetLatencyGraphFailure
> {
    return async (dispatch) => {
        dispatch(getLatencyGraphStart());
        try {
            const latencyData = await request.get<LatencyGraphResponse>(
                "/System/latency"
            );
            dispatch(getLatencyGraphSuccess(latencyData));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getLatencyGraphFailure());
        }
    };
}

export function getLatencyGraphStart(): GetLatencyGraph {
    return {
        type: constants.GET_LATENCY_GRAPH,
    };
}

export function getLatencyGraphSuccess(
    latencyData: LatencyGraphResponse
): GetLatencyGraphSuccess {
    return {
        type: constants.GET_LATENCY_GRAPH_SUCCESS,
        latencyData,
    };
}

export function getLatencyGraphFailure(): GetLatencyGraphFailure {
    return {
        type: constants.GET_LATENCY_GRAPH_FAILURE,
    };
}
