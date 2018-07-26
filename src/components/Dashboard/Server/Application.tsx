import React from 'react';
import { Card, Spin, Table, Divider, Button, Popconfirm, Form, Modal, Input, Select } from 'antd';
import { APIKeyPairsResponse, APIKeyPair, ServerNode } from '@/types/dashboard';
import { FormComponentProps } from 'antd/lib/form';

export interface Props {
    getKeyPairs: () => void;
    deleteKeyPair: (applicationId: number) => void;
    createKeyPair: (tag: number) => void;
    showCreateModal: () => void;
    closeCreateModal: () => void;
    isLoading: boolean;
    keyPairs: APIKeyPair[];
    serverList: ServerNode[];
    createModalVisible: boolean;
    createModalLoading: boolean;
}

class APIKeys extends React.Component<Props & FormComponentProps, {}> {
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
        title: 'Tag',
        key: 'tag',
        render: (text: string, record: APIKeyPair) => {
            return (
                <span>
                    {`${record.tag[0] && record.tag[0].name} / 
                    ${record.tag[0] && record.tag[0].type} / 
                    ${record.tag[0] && record.tag[0].host}`}
                </span>
            );
        }
    }, {
        title: 'Action',
        key: 'action',
        render: (text: string, record: APIKeyPair) => {
            return (
                <div>
                    <Popconfirm
                        title="危险操作确认"
                        onConfirm={() => {
                            this.props.deleteKeyPair(record.id);
                        }}
                    >
                        <a
                            className="danger-text"
                        >
                            吊销
                        </a>
                    </Popconfirm>
                </div>
            );
        }
    }];

    componentDidMount() {
        this.props.getKeyPairs();
    }

    handleCreateSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.createKeyPair(values.tag as number);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
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
                    <Button
                        onClick={() => {
                            this.props.form.resetFields();
                            this.props.showCreateModal();
                        }}
                    >生成新密钥
                    </Button>
                </Card>
                <Modal
                    visible={this.props.createModalVisible}
                    title="生成密钥对"
                    confirmLoading={this.props.createModalLoading}
                    onOk={this.handleCreateSubmit}
                    onCancel={this.props.closeCreateModal}
                >
                    <Form layout="vertical">
                        <Form.Item label="标识标签">
                            {getFieldDecorator('tag', {
                                rules: [{ required: true }]
                            })(
                                <Select>
                                    {this.props.serverList.filter(serverNode => {
                                        return serverNode.key_pair === null;
                                    }).map(serverNode => {
                                        return (
                                            <Select.Option
                                                value={serverNode.id}
                                                key={serverNode.id}
                                            >
                                                {serverNode.name} / {serverNode.type} / {serverNode.host}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        );
    }
}

export default Form.create<Props>()(APIKeys);