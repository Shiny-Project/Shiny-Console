import List from '@/components/Dashboard/Spider/List';
import * as actions from '@/actions/dashboard/spider/list';
import { StoreState } from '@/types';
import { connect } from 'react-redux';
import { SpiderListAction } from '@/actions/dashboard/spider/list';
import { ThunkAction } from 'redux-thunk';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
        spiderList: state.dashboard.spider.list.spiderList,
        isLoading: state.dashboard.spider.list.isLoading,
        confirmLoading: state.dashboard.spider.list.comfirmLoading,
        frequencyUpdateModalVisible: state.dashboard.spider.list.frequencyUpdateModalVisible,
        editSpiderModalVisible: state.dashboard.spider.list.editSpiderModalVisible,
        editSpiderLoading: state.dashboard.spider.list.editSpiderLoading,
        nowEditingSpider: state.dashboard.spider.list.nowEditingSpider,
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: SpiderListAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getSpiderList: () => {
            dispatch(actions.getSpiderList());
        },
        deleteSpider: (spiderId: number) => {
            dispatch(actions.deleteSpider(spiderId));
        },
        showFrequencyUpdateModal: (spiderId: number) => {
            dispatch(actions.showFrequencyUpdateModal(spiderId));
        },
        hideFrequencyUpdateModal: () => {
            dispatch(actions.hideFrequencyUpdateModal());
        },
        updateFrequency: (spiderId: number, frequency: number) => {
            dispatch(actions.updateFrequency(spiderId, frequency));
        },
        showEditSpiderModal: (spiderId: number) => {
            dispatch(actions.showEditSpiderModal(spiderId));
        },
        hideEditSpiderModal: () => {
            dispatch(actions.hideEditSpiderModal());
        },
        editSpider: (spiderId: number, name: string, description: string, group: string, path: string) => {
            dispatch(actions.editSpider(spiderId, name, description, group, path));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(List);