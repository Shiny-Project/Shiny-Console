import React from 'react';
import { Spin, Card, Table, Popconfirm, Form, Modal, Input, Divider } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { PushRuleItem } from '@/types/dashboard';
import JSONViewer from '@/components/Common/JSONViewer';

export interface EditRuleFormProps {
    rule: PushRuleItem;
    visible: boolean;
    loading: boolean;
    onSubmit: (id: number, spiderName: string, rule: string) => void;
    onCancel: () => void;
}

class EditRuleForm extends React.Component<EditRuleFormProps & FormComponentProps> {
    handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values.id, values.spider_name, values.rule);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                confirmLoading={this.props.loading}
                onOk={this.handleSubmitClick}
                onCancel={this.props.onCancel}
            >
                <Form layout="vertical">
                    <Form.Item label="ID">
                        {getFieldDecorator('id', {
                            rules: [{ required: true }],
                            initialValue: this.props.rule.id
                        })(
                            <Input
                                disabled={true}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Spider Name">
                        {getFieldDecorator('spider_name', {
                            rules: [{ required: true }],
                            initialValue: this.props.rule.spider_name
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="规则 (JSON)">
                        {getFieldDecorator('rule', {
                            rules: [{ required: true }],
                            initialValue: JSON.stringify(this.props.rule.rule)
                        })(
                            <Input.TextArea />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedEditRuleForm = Form.create<EditRuleFormProps>()(EditRuleForm);

export interface Props {
    isLoading: boolean;
    createRuleModalVisible: boolean;
    createRuleModalLoading: boolean;
    editRuleModalVisible: boolean;
    editRuleModalLoading: boolean;
    rules: PushRuleItem[];
    nowEditingRule: PushRuleItem;
    showEditRuleModel: (rule: PushRuleItem) => void;
    hideEditRuleModel: () => void;
    getRuleList: () => void;
    editRule: (ruleId: number, spiderName: string, rule: string) => void;
    deleteRule: (ruleId: number) => void;
}

class PushRule extends React.Component<Props> {
    ruleColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: 'Spider Name',
        dataIndex: 'spider_name',
        key: 'spider_name'
    }, {
        title: '规则',
        key: 'rule',
        render: (text: string, record: PushRuleItem) => {
            return <JSONViewer json={record.rule} />;
        }
    }, {
        title: '操作',
        key: 'operations',
        render: (text: string, record: PushRuleItem) => {
            return (
                <div>
                    <a
                        onClick={() => {
                            this.props.showEditRuleModel(record);
                        }}
                    >
                        编辑
                    </a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="危险操作确认"
                        onConfirm={() => {
                            this.props.deleteRule(record.id);
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
                    <WrappedEditRuleForm
                        visible={this.props.editRuleModalVisible}
                        loading={this.props.editRuleModalLoading}
                        rule={this.props.nowEditingRule}
                        onSubmit={this.props.editRule}
                        onCancel={this.props.hideEditRuleModel}
                    />
                </Card>
            </Spin>
        );
    }
}

export default PushRule;