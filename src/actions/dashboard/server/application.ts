import * as constants from '@/constants/Server/application';
import { StoreState } from '@/types/index';
import { ThunkAction } from 'redux-thunk';
import { RaiseError, raiseError } from '@/actions/dashboard/error';
import request from '@/services/request';
import { APIKeyPairsResponse } from '@/types/dashboard';

export interface GetKeyPairs {
    type: constants.GET_KEY_PAIRS;
}

export interface GetKeyPairsSuccess {
    type: constants.GET_KEY_PAIRS_SUCCESS;
    keyPairs: APIKeyPairsResponse;
}

export interface GetKeyPairsFailure {
    type: constants.GET_KEY_PAIRS_FAILURE;
}

export function getKeyPairsStart(): GetKeyPairs {
    return {
        type: constants.GET_KEY_PAIRS
    };
}

export type ApplicationAction = GetKeyPairs | GetKeyPairsSuccess | GetKeyPairsFailure;

export function getKeyPairsSuccess(keyPairs: APIKeyPairsResponse): GetKeyPairsSuccess {
    return {
        type: constants.GET_KEY_PAIRS_SUCCESS,
        keyPairs
    };
}

export function getKeyPairsFailure():  GetKeyPairsFailure {
    return {
        type: constants.GET_KEY_PAIRS_FAILURE
    };
}

/** 
 * 获得应用密钥对列表
 */
export function getKeyPairs(): ThunkAction<void, StoreState, null> {
    return async (dispatch) => {
        dispatch(getKeyPairsStart());
        try {
            const result = await request.get<APIKeyPairsResponse>('/Application/list');
            dispatch(getKeyPairsSuccess(result));
        } catch (e) {
            dispatch(raiseError(e));
            dispatch(getKeyPairsFailure());
        }
    };
}