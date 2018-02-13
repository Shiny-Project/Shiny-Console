import React from 'react';
import { Card, Spin, Table, Divider, Button } from 'antd';
import { APIKeyPairsResponse } from '@/types/dashboard';

export interface Props {
    getKeyPairs: () => void;
    isLoading: boolean;
    keyPairs: APIKeyPairsResponse;
}
export interface State {

}
class APIKeys extends React.Component<Props, State> {
    keyPairsColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: 'API_KEY',
        dataIndex: 'api_key',
        key: 'api_key'
    }, {
        title: 'API_SECRET_KEY',
        dataIndex: 'api_secret_key',
        key: 'api_secret_key'
    }, {
        title: 'Action',
        key: 'action',
        render: () => {
            return (<span />);
        }
    }];
    componentDidMount() {
        this.props.getKeyPairs();
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
            <Card title="应用密钥对管理">
                <Table
                    dataSource={this.props.keyPairs}
                    columns={this.keyPairsColumns}
                    pagination={false}
                    rowKey={'id'}
                />
                <Divider />
            </Card>
        </Spin>
        );
    }
}

export default APIKeys;