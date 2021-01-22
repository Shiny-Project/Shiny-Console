import React from 'react';
import { Card, Table, Divider, Spin, Button, Popconfirm, Tag } from 'antd';
import { ServerListResponse, ServerNode } from 'types/dashboard';
import CreateNodeForm from './CreateNodeForm';

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

    render() {
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
                                this.props.showModal();
                            }}
                        >
                            添加
                        </Button>
                    </Card>
                </Spin>
                <CreateNodeForm
                    visible={this.props.modalVisible}
                    loading={this.props.modalLoading}
                    onSubmit={this.props.addServer}
                    onCancel={this.props.closeModal}
                />
            </div>
        );
    }
}

export default Node;