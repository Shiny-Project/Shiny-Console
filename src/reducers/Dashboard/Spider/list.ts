import { SpiderListAction } from '@/actions/dashboard/spider/list';
import { SpiderListState } from '@/types/index';
import initState from '@/stores/initState';
import * as ActionTypes from '@/constants/Spider/list';

export function list(state: SpiderListState = initState.dashboard.spider.list, actions: SpiderListAction)
    : SpiderListState {
    switch (actions.type) {
        case ActionTypes.GET_SPIDER_LIST: 
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.GET_SPIDER_LIST_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                spiderList: actions.spiderList
            };
        case ActionTypes.GET_SPIDER_LIST_FAILURE: 
            return {
                ...state,
                isLoading: false
            };
        default:
            return {
                ...state
            };
    }
}