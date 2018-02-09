import React from 'react';
import { Card, Table, Divider, Spin } from 'antd';
import { ServerListResponse } from '@/types/dashboard';

export interface Props {
    getServerList: () => void;
    serverList: ServerListResponse;
    isLoading: boolean;
}

export interface State {

}

const ServerNodeType = function({type}: {type: string}): JSX.Element {
    if (type === 'central') {
        return <span>中控</span>;
    } else if (type === 'websocket') {
        return <span>消息分发</span>;
    } else if (type === 'spider') {
        return <span>爬虫</span>;
    } else {
        return <span>{type}</span>;
    }
};

class Node extends React.Component<Props, State> {
    serverListColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (type: string) => ServerNodeType({type}),
    }, {
        title: 'Host',
        dataIndex: 'host',
        key: 'host',
    }];

    componentDidMount() {
        this.props.getServerList();
    }

    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="服务器节点管理">
                    <Table 
                        dataSource={this.props.serverList} 
                        columns={this.serverListColumns} 
                        pagination={false} 
                        rowKey={'id'} 
                    />
                </Card>
            </Spin>
        );
    }
}

export default Node;