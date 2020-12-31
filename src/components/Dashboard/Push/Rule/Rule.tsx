import React from "react";
import { Spin, Card, Table, Popconfirm, Divider, Button } from "antd";
import { PushRuleItem } from "types/dashboard";
import JSONViewer from "components/Common/JSONViewer";
import CreateRuleForm, { CreateRuleFormValues } from "./CreateRuleForm";
import EditRuleForm from "./EditRuleForm";

export interface Props {
    isLoading: boolean;
    createRuleModalVisible: boolean;
    createRuleModalLoading: boolean;
    editRuleModalVisible: boolean;
    editRuleModalLoading: boolean;
    rules: PushRuleItem[];
    nowEditingRule: PushRuleItem;
    showEditRuleModal: (rule: PushRuleItem) => void;
    hideEditRuleModal: () => void;
    showCreateRuleModal: () => void;
    hideCreateRuleModal: () => void;
    getRuleList: () => void;
    createRule: (formValues: CreateRuleFormValues) => void;
    editRule: (ruleId: number, spiderName: string, rule: string) => void;
    deleteRule: (ruleId: number) => void;
}

class PushRule extends React.Component<Props> {
    ruleColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Spider Name",
            dataIndex: "spider_name",
            key: "spider_name",
        },
        {
            title: "规则",
            key: "rule",
            render: (text: string, record: PushRuleItem) => {
                return <JSONViewer json={record.rule} />;
            },
        },
        {
            title: "操作",
            key: "operations",
            render: (text: string, record: PushRuleItem) => {
                return (
                    <div>
                        <Button
                            type="link"
                            onClick={() => {
                                this.props.showEditRuleModal(record);
                            }}
                        >
                            编辑
                        </Button>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="危险操作确认"
                            onConfirm={() => {
                                this.props.deleteRule(record.id);
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
        this.props.getRuleList();
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="推送规则">
                    <Table
                        dataSource={this.props.rules}
                        columns={this.ruleColumns}
                        rowKey="id"
                        pagination={false}
                    />
                    <Divider />
                    <Button
                        onClick={() => {
                            this.props.showCreateRuleModal();
                        }}
                    >
                        创建新项
                    </Button>
                    <EditRuleForm
                        visible={this.props.editRuleModalVisible}
                        loading={this.props.editRuleModalLoading}
                        rule={this.props.nowEditingRule}
                        onSubmit={this.props.editRule}
                        onCancel={this.props.hideEditRuleModal}
                    />
                    <CreateRuleForm
                        visible={this.props.createRuleModalVisible}
                        loading={this.props.createRuleModalLoading}
                        onSubmit={this.props.createRule}
                        onCancel={this.props.hideCreateRuleModal}
                    />
                </Card>
            </Spin>
        );
    }
}

export default PushRule;
