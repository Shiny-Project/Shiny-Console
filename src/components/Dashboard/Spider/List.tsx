import React from 'react';
import { SpiderListResponse, Spider } from '@/types/dashboard';
import { Spin, Card, Table, Button, Divider, Popconfirm } from 'antd';

export interface Props {
    spiderList: SpiderListResponse;
    isLoading: boolean;
    getSpiderList: () => void;
    deleteSpider: (spiderId: number) => void;
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
    }, {
        title: '操作',
        key: 'actions',
        render: (text: string, record: Spider): JSX.Element => {
            return (
                <div>
                    <a>修改刷新频率</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="危险操作确认"
                        onConfirm={() => {
                          this.props.deleteSpider(record.id);
                        }}
                    >
                        <a href="javascript:;" className="danger-text">删除</a>
                    </Popconfirm>
                </div>
            );
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