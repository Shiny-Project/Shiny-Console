import React from 'react';
import { Card, Table, Divider, Spin, Button, Modal, Form, Input, Select, Popconfirm, Tag } from 'antd';
import { ServerListResponse, ServerNode } from 'types/dashboard';
import { FormComponentProps } from 'antd/lib/form';

interface ServerNodeProps {
    type: string;
}
class ServerNodeType extends React.Component<ServerNodeProps> {
    render() {
        if (this.props.type === 'central') {
            return <span>中控</span>;
        } else if (this.props.type === 'websocket') {
            return <span>消息分发</span>;
        } else if (this.props.type === 'spider') {
            return <span>爬虫</span>;
        } else {
            return <span>{this.props.type}</span>;
        }
    }
}

interface ServerGroupProps {
    group: string[];
}
class ServerGroup extends React.Component<ServerGroupProps> {
    render() {
        return this.props.group.map(group => {
            return (<Tag key={group}>{group}</Tag>);
        });
    }
}

export interface Props {
    getServerList: () => void;
    deleteServer: (serverId: number) => void;
    addServer: (type: string, name: string, host: string, group: string[]) => void;
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

class Node extends React.Component<Props & FormComponentProps, State> {
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
        title: 'Group',
        key: 'group',
        render: (text: string, record: ServerNode) => {
            return <ServerGroup group={record.group || []} />;
        },
    }, {
        title: 'Action',
        key: 'action',
        render: (text: string, record: ServerNode) => {
            return (
                <div>
                    <Popconfirm
                        title="危险操作确认"
                        onConfirm={() => {
                            this.props.deleteServer(record.id);
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
        this.props.getServerList();
    }

    handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.addServer(values.type, values.name, values.host, values.group);
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
                                rules: [{ required: true }]
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
                                rules: [{ required: true }]
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="服务器组">
                            {getFieldDecorator('group', {
                                rules: [{ required: true }],
                                initialValue: ['default']
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                >
                                    <Select.Option key="default">default</Select.Option>
                                    <Select.Option key="china_mainland">china_mainland</Select.Option>
                                </Select>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create<Props & FormComponentProps>()(Node);