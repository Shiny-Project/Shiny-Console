import * as constants from '@/constants/index';
import { StoreState } from '@/types/index';
import { ThunkAction } from 'redux-thunk';
import { RaiseError, raiseError } from '@/actions/dashboard';
import request from '@/services/request';
import { StatisticsResponse } from '@/types/dashboard';

export interface GetStatistic {
    type: constants.GET_STATISTICS;
}

export interface GetStatisticSuccess {
    type: constants.GET_STATISTICS_SUCCESS;
    data: object;
}

export interface GetStatisticFailure {
    type: constants.GET_STATISTIC_FAILURE;
}

export type OverviewAction = GetStatistic | GetStatisticSuccess | GetStatisticFailure | RaiseError;

export function getStatistics(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(getStatisticsStart());
        try {
            const response = await request.get<StatisticsResponse>('/Data/statistics');
            dispatch(getStatisticsSuccess(response));
        } catch (e) {
            dispatch(getStatisticsFailure(e));
        }
    };
}

export function getStatisticsStart(): GetStatistic {
    return {
        type: constants.GET_STATISTICS
    };
}

export function getStatisticsSuccess(data: StatisticsResponse): GetStatisticSuccess {
    return {
        type: constants.GET_STATISTICS_SUCCESS,
        data
    };
}

export function getStatisticsFailure(e: Error): RaiseError {
    return raiseError(e);
}