import React from 'react';
import { Card, Spin, Table, Popconfirm, Divider, Button } from 'antd';
import { PushAccountList, PushAccount } from 'types/dashboard';
import PushChannel from 'components/Dashboard/Realtime/PushChannel';
import JSONViewer from 'components/Common/JSONViewer';
import CreateAccountForm, { CreateAccountFormValues } from './CreateAccountForm';
import EditAccountForm, { EditAccountFormValues } from './EditAccountForm';

export interface Props {
    isLoading: boolean;
    accounts: PushAccountList;
    nowEditingAccount: PushAccount;
    createAccountModalVisible: boolean;
    createAccountModalLoading: boolean;
    editAccountModalVisible: boolean;
    editAccountModalLoading: boolean;
    showCreateAccountModal: () => void;
    hideCreateAccountModal: () => void;
    showEditAccountModal: (account: PushAccount) => void;
    hideEditAccountModal: () => void;
    getAccountList: () => void;
    createAccount: (formValues: CreateAccountFormValues) => void;
    editAccount: (formValues: EditAccountFormValues) => void;
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
            return <JSONViewer json={record.credential} />;
        }
    }, {
        title: '操作',
        key: 'operations',
        render: (text: string, record: PushAccount) => {
            return (
                <div>
                    <Button
                        type="link"
                        onClick={() => {
                            this.props.showEditAccountModal(record);
                        }}
                    >
                        编辑
                    </Button>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="危险操作确认"
                        onConfirm={() => {
                            this.props.deleteAccount(record.id);
                        }}
                    >
                        <Button
                            type="link"
                            className="danger-text"
                        >
                            删除
                        </Button>
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
                    <Divider />
                    <Button 
                        onClick={() => {
                            this.props.showCreateAccountModal();
                        }}
                    >
                        创建新项
                    </Button>
                    <CreateAccountForm 
                        visible={this.props.createAccountModalVisible}
                        loading={this.props.createAccountModalLoading}
                        onSubmit={this.props.createAccount}
                        onCancel={this.props.hideCreateAccountModal}
                    />
                    <EditAccountForm 
                        account={this.props.nowEditingAccount}
                        visible={this.props.editAccountModalVisible}
                        loading={this.props.editAccountModalLoading}
                        onSubmit={this.props.editAccount}
                        onCancel={this.props.hideEditAccountModal}
                    />
                </Card>
            </Spin>
        );
    }
}

export default Account;