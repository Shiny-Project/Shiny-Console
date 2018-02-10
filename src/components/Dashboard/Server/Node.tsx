import React from 'react';
import { Card, Table, Divider, Spin, Button, Modal, Form, Input, Select } from 'antd';
import { ServerListResponse, ServerNode } from '@/types/dashboard';
import { FormComponentProps } from 'antd/lib/form';

export interface Props {
    getServerList: () => void;
    deleteServer: (serverId: number) => void;
    addServer: (type: string, name: string, host: string) => void;
    showModal: () => void;
    closeModal: () => void;
    serverList: ServerListResponse;
    isLoading: boolean;
    modalVisible: boolean;
    modalLoading: boolean;
}

export interface State {
    showModal: boolean;
}

const ServerNodeType = function ({ type }: { type: string }): JSX.Element {
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

class Node extends React.Component<Props & FormComponentProps, State> {
    state: State = {
        showModal: false
    };

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
        render: (type: string) => <ServerNodeType type={type} />,
    }, {
        title: 'Host',
        dataIndex: 'host',
        key: 'host',
    }, {
        title: 'Action',
        key: 'action',
        render: (text: string, record: ServerNode) => {
            return (
                <div>
                    <Button 
                        type="danger" 
                        size={'small'} 
                        onClick={() => {
                            this.props.deleteServer(record.id);
                        }} 
                    >
                        删除
                    </Button>
                </div>
            );
        }
    }];

    componentDidMount() {
        this.props.getServerList();
    }

    handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.addServer(values.type, values.name, values.host);
          }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Spin spinning={this.props.isLoading}>
                    <Card title="服务器节点管理">
                        <Table
                            dataSource={this.props.serverList}
                            columns={this.serverListColumns}
                            pagination={false}
                            rowKey={'id'}
                        />
                        <Divider />
                        <Button 
                            onClick={() => {
                                this.props.form.resetFields();
                                this.props.showModal();
                            }} 
                        >
                            添加
                        </Button>
                    </Card>
                </Spin>
                <Modal 
                    visible={this.props.modalVisible} 
                    title="添加服务器" 
                    confirmLoading={this.props.modalLoading}
                    onOk={this.handleSubmit}
                    onCancel={this.props.closeModal}
                >
                    <Form layout="vertical">
                        <Form.Item label="服务器名">
                            {getFieldDecorator('name', {
                                rules: [{ required: true }]
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="服务器类型">
                            {getFieldDecorator('type', {
                                rules: [{required: true}]
                            })(
                                <Select>
                                    <Select.Option value="central">中控</Select.Option>
                                    <Select.Option value="spider">爬虫</Select.Option>
                                    <Select.Option value="websocket">转发</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="服务器地址">
                            {getFieldDecorator('host', {
                                rules: [{required: true}]
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create<Props>()(Node);