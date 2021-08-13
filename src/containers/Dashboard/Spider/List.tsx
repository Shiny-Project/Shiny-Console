import List from 'components/Dashboard/Spider/List/List';
import * as actions from 'actions/dashboard/spider/list';
import { StoreState } from 'types';
import { connect } from 'react-redux';
import { Dispatch } from 'types/action';
import { SpiderListAction } from 'actions/dashboard/spider/list';

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

export function mapDispatchToProps(dispatch: Dispatch<SpiderListAction>) {
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
        updateFrequency: (spiderId: number, frequency: number, cooldown?: number) => {
            dispatch(actions.updateFrequency(spiderId, frequency, cooldown));
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
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(List);