import React from "react";
import classNames from "classnames";
import { Card, Spin, Table, Button, Divider, Popconfirm } from "antd";
import { SpiderIdentityItem } from "types/dashboard";
import JSONViewer from "components/Common/JSONViewer";
import CreateIdentityForm from "./CreateIdentityForm";
import EditIdentityForm from "./EditIdentityForm";
import './list.css';

export interface Props {
    isLoading: boolean;
    identityList: SpiderIdentityItem[];
    nowEditingIdentity: SpiderIdentityItem;
    createIdentityModalVisible: boolean;
    createIdentityModalLoading: boolean;
    editIdentityModalVisible: boolean;
    editIdentityModalLoading: boolean;
    createIdentity: (name: string, identity: string) => void;
    deleteIdentity: (id: number) => void;
    editIdentity: (id: number, name: string, identity: string) => void;
    getIdentityList: () => void;
    showCreateIdentityModal: () => void;
    hideCreateIdentityModal: () => void;
    showEditIdentityModal: (identityItem: SpiderIdentityItem) => void;
    hideEditIdentityModal: () => void;
}

class Identity extends React.Component<Props> {
    identityColumns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "名称",
            key: "name",
            render: (text: string, record: SpiderIdentityItem) => {
                // @ts-ignore
                const queries = this.props.location.search;
                const focus = queries.match(/focus=(.+?)(?:$|&)/)?.[1];
                return (
                    <span
                        className={classNames({ focus: focus === record.name })}
                    >
                        {record.name}
                    </span>
                );
            },
        },
        {
            title: "凭据",
            key: "identity",
            render: (text: string, record: SpiderIdentityItem) => {
                return <JSONViewer json={record.identity} />;
            },
        },
        {
            title: "操作",
            key: "operations",
            render: (text: string, record: SpiderIdentityItem) => {
                return (
                    <div>
                        <Button
                            type="link"
                            onClick={() => {
                                this.props.showEditIdentityModal(record);
                            }}
                        >
                            编辑
                        </Button>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="危险操作确认"
                            onConfirm={() => {
                                this.props.deleteIdentity(record.id);
                            }}
                        >
                            <Button type="link" className="danger-text">
                                删除
                            </Button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
    componentDidMount() {
        this.props.getIdentityList();
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="爬虫统一凭据管理">
                    <Table
                        dataSource={this.props.identityList}
                        columns={this.identityColumns}
                        pagination={false}
                        rowKey="id"
                    />
                    <Divider />
                    <Button
                        onClick={() => {
                            this.props.showCreateIdentityModal();
                        }}
                    >
                        创建
                    </Button>
                    <CreateIdentityForm
                        visible={this.props.createIdentityModalVisible}
                        loading={this.props.createIdentityModalLoading}
                        onSubmit={this.props.createIdentity}
                        onCancel={this.props.hideCreateIdentityModal}
                    />
                    <EditIdentityForm
                        visible={this.props.editIdentityModalVisible}
                        loading={this.props.editIdentityModalLoading}
                        onSubmit={this.props.editIdentity}
                        onCancel={this.props.hideEditIdentityModal}
                        identityItem={this.props.nowEditingIdentity}
                    />
                </Card>
            </Spin>
        );
    }
}

export default Identity;
