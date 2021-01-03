import React from "react";
import { Card, Spin, Table, Divider, Button, Popconfirm } from "antd";
import { APIKeyPair, ServerNode } from "types/dashboard";
import CreateApplicationForm from "./CreateApplicationForm";

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

class APIKeys extends React.Component<Props, {}> {
    keyPairsColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "API_KEY",
            dataIndex: "api_key",
            key: "api_key",
        },
        {
            title: "API_SECRET_KEY",
            dataIndex: "api_secret_key",
            key: "api_secret_key",
        },
        {
            title: "Tag",
            key: "tag",
            render: (text: string, record: APIKeyPair) => {
                return (
                    <span>
                        {`${record.tag[0] && record.tag[0].name} / 
                    ${record.tag[0] && record.tag[0].type} / 
                    ${record.tag[0] && record.tag[0].host}`}
                    </span>
                );
            },
        },
        {
            title: "Action",
            key: "action",
            render: (text: string, record: APIKeyPair) => {
                return (
                    <div>
                        <Popconfirm
                            title="危险操作确认"
                            onConfirm={() => {
                                this.props.deleteKeyPair(record.id);
                            }}
                        >
                            <Button type="link" className="danger-text">
                                吊销
                            </Button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

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
                        rowKey={"id"}
                    />
                    <Divider />
                    <Button
                        onClick={() => {
                            this.props.showCreateModal();
                        }}
                    >
                        生成新密钥
                    </Button>
                </Card>
                <CreateApplicationForm
                    serverList={this.props.serverList.filter(
                        (serverNode) => serverNode.key_pair === null
                    )}
                    visible={this.props.createModalVisible}
                    loading={this.props.createModalLoading}
                    onSubmit={this.props.createKeyPair}
                    onCancel={this.props.closeCreateModal}
                />
            </Spin>
        );
    }
}

export default APIKeys;
