import React from 'react';
import { Card, Spin, Table, Divider, Button, Popconfirm, Form, Modal, Input } from 'antd';
import { APIKeyPairsResponse, APIKeyPair } from '@/types/dashboard';
import { FormComponentProps } from 'antd/lib/form';

export interface Props {
    getKeyPairs: () => void;
    deleteKeyPair: (applicationId: number) => void;
    createKeyPair: (tag: string) => void;
    showCreateModal: () => void;
    closeCreateModal: () => void;
    isLoading: boolean;
    keyPairs: APIKeyPairsResponse;
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
                        <Button
                            type="danger"
                            size={'small'}
                        >
                            吊销
                        </Button>
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
            this.props.createKeyPair(values.tag);
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
                    <Button onClick={this.props.showCreateModal}>生成新密钥</Button>
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
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        );
    }
}

export default Form.create<Props>()(APIKeys);