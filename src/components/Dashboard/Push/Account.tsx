import React from 'react';
import { Card, Spin, Table, Popconfirm } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { PushAccountList, PushAccount } from '@/types/dashboard';
import PushChannel from '@/components/Dashboard/Push/PushChannel';

export interface Props {
    isLoading: boolean;
    accounts: PushAccountList;
    nowEditingAccount: PushAccount;
    createAccountModalVisible: boolean;
    createAccountModalLoading: boolean;
    editAccountModalVisible: boolean;
    editAccountModalLoading: boolean;
    getAccountList: () => void;
    deleteAccount: (id: number) => void;
}

class Account extends React.Component<Props> {
    accountColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: '渠道',
        dataIndex: 'platform',
        key: 'platform',
        render: (platform: string) => {
            return <PushChannel channel={platform} />;
        }
    }, {
        title: '账号名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '账号凭据',
        key: 'credential',
        render: (text: string, record: PushAccount) => {
            return (
                <a
                    style={{
                        fontFamily: 'Consola'
                    }}
                >
                    {
                        JSON.stringify(record.credential).length > 20
                            ? JSON.stringify(record.credential).slice(0, 20) + '...'
                            : JSON.stringify(record.credential)
                    }
                </a>
            );
        }
    }, {
        title: '操作',
        key: 'operations',
        render: (text: string, record: PushAccount) => {
            return (
                <div>
                    <Popconfirm
                        title="危险操作确认"
                        onConfirm={() => {
                            this.props.deleteAccount(record.id);
                        }}
                    >
                        <a
                            className="danger-text"
                        >
                            删除
                        </a>
                    </Popconfirm>
                </div>
            );
        }
    }];
    componentDidMount() {
        this.props.getAccountList();
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="推送渠道账号管理">
                    <Table
                        dataSource={this.props.accounts}
                        columns={this.accountColumns}
                        pagination={false}
                        rowKey="id"
                    />
                </Card>
            </Spin>
        );
    }
}

export default Account;