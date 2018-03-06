import React from 'react';
import { SpiderListResponse, Spider } from '@/types/dashboard';
import { Spin, Card, Table } from 'antd';

export interface Props {
    spiderList: SpiderListResponse;
    isLoading: boolean;
    getSpiderList: () => void;
}
export interface State {

}

class List extends React.Component<Props, State> {
    spiderListColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '路径',
        dataIndex: 'path',
        key: 'path'
    }, {
        title: '刷新间隔(秒)',
        key: 'interval',
        render: (text: string, record: Spider) => {
            const spiderInfo = JSON.parse(record.info);
            return <span>{spiderInfo.expires}秒</span>;
        }
    }];
    componentDidMount() {
        this.props.getSpiderList();
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="Spider 定义管理">
                    <Table
                        dataSource={this.props.spiderList}
                        columns={this.spiderListColumns}
                        pagination={false}
                        rowKey={'id'}
                    />
                </Card>
            </Spin>
        );
    }
}

export default List;