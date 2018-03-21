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
        case ActionTypes.DELETE_SPIDER:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.DELETE_SPIDER_SUCCESS: {
            const index = state.spiderList.findIndex(spider => spider.id === actions.spiderId);
            return {
                ...state,
                spiderList: [
                    ...state.spiderList.slice(0, index),
                    ...state.spiderList.slice(index + 1)
                ],
                isLoading: false
            };
        }
        case ActionTypes.DELETE_SPIDER_FAILURE: 
            return {
                ...state,
                isLoading: false
            };
        case ActionTypes.UPDATE_FREQUENCY_SHOW_MODAL: {
            const editingSpider = state.spiderList.find(spider => spider.id === actions.spiderId);
            return {
                ...state,
                frequencyUpdateModalVisible: true,
                nowEditingSpider: editingSpider
            };
        }
        case ActionTypes.UPDATE_FREQUENCY_CANCEL: {
            return {
                ...state,
                frequencyUpdateModalVisible: false
            };
        }
        case ActionTypes.UPDATE_FREQUENCY_START: {
            return {
                ...state,
                comfirmLoading: true
            };
        }
        case ActionTypes.UPDATE_FREQUENCY_SUCCESS: {
            const index = state.spiderList.findIndex((spider) => {
                return spider.id === actions.spiderId;
            });
            
            return {
                ...state,
                spiderList: [
                    ...state.spiderList.slice(0, index),
                    {
                        ...state.spiderList[index],
                        info: {
                            ...state.spiderList[index].info,
                            expires: actions.frequency
                        }
                    },
                    ...state.spiderList.slice(index + 1)
                ],
                comfirmLoading: false,
                frequencyUpdateModalVisible: false
            };
        }
        case ActionTypes.UPDATE_FREQUENCY_FAILURE: {
            return {
                ...state,
                comfirmLoading: false,
            };
        }
        default:
            return {
                ...state
            };
    }
}