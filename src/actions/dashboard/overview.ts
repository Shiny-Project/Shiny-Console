import * as constants from '@/constants/Dashboard/overview';
import { StoreState } from '@/types/index';
import { ThunkAction } from 'redux-thunk';
import { RaiseError, raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import { StatisticsResponse } from '@/types/dashboard';

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

export type OverviewAction = GetStatistic | GetStatisticSuccess | GetStatisticFailure;

export function getStatistics(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(getStatisticsStart());
        try {
            const response = await request.get<StatisticsResponse>('/Data/statistics');
            dispatch(getStatisticsSuccess(response));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getStatisticsFailure());
        }
    };
}

export function getStatisticsStart(): GetStatistic {
    return {
        type: constants.GET_STATISTICS
    };
}

export function getStatisticsSuccess(statistics: StatisticsResponse): GetStatisticSuccess {
    return {
        type: constants.GET_STATISTICS_SUCCESS,
        statistics
    };
}

export function getStatisticsFailure(): GetStatisticFailure {
    return {
        type: constants.GET_STATISTIC_FAILURE,
    };
}