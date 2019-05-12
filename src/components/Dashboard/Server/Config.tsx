import React from 'react';
import { Card, Spin, Table, Button, Divider, Form, Modal, Input, Popconfirm } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { ConfigItem } from '@/types/dashboard';

interface CreateConfigFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (key: string, value: string) => void;
    onCancel: () => void;
}

class CreateConfigForm extends React.Component<CreateConfigFormProps & FormComponentProps> {
    handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values.key, values.value);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                onOk={this.handleSubmitClick}
                onCancel={this.props.onCancel}
                confirmLoading={this.props.loading}
                afterClose={() => {
                    this.props.form.resetFields();
                }}
            >
                <Form layout="vertical">
                    <Form.Item label="Key">
                        {getFieldDecorator('key', {
                            rules: [{ required: true }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Value">
                        {getFieldDecorator('value', {
                            rules: [{ required: true }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedCreateConfigForm = Form.create<CreateConfigFormProps & FormComponentProps>()(CreateConfigForm);

export interface EditConfigFormProps {
    visible: boolean;
    loading: boolean;
    configItem: ConfigItem;
    onSubmit: (key: string, value: string) => void;
    onCancel: () => void;
}

class EditConfigForm extends React.Component<EditConfigFormProps & FormComponentProps> {
    handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values.key, values.value);
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
                <Form>
                    <Form.Item label="Key">
                        {getFieldDecorator('key', {
                            rules: [{ required: true }],
                            initialValue: this.props.configItem.key
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Value">
                        {getFieldDecorator('value', {
                            rules: [{ required: true }],
                            initialValue: this.props.configItem.value
                        })(
                            <Input />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedEditConfigForm = Form.create<EditConfigFormProps & FormComponentProps>()(EditConfigForm);

interface Props {
    isLoading: boolean;
    configList: ConfigItem[];
    nowEditingConfig: ConfigItem;
    createConfigModalVisible: boolean;
    createConfigModalLoading: boolean;
    editConfigModalVisible: boolean;
    editConfigModalLoading: boolean;
    createConfig: (key: string, value: string) => void;
    deleteConfig: (key: string) => void;
    editConfig: (key: string, value: string) => void;
    getConfigList: () => void;
    showCreateConfigModal: () => void;
    hideCreateConfigModal: () => void;
    showEditConfigModal: (configItem: ConfigItem) => void;
    hideEditConfigModal: () => void;
}
interface State { }

class Config extends React.Component<Props & FormComponentProps, State> {
    configColumns = [{
        title: 'Key',
        dataIndex: 'key',
        key: 'key'
    }, {
        title: 'Value',
        dataIndex: 'value',
        key: 'value'
    }, {
        title: '操作',
        key: 'operations',
        render: (text: string, record: ConfigItem) => {
            return (
                <div>
                    <a 
                        onClick={() => {
                            this.props.showEditConfigModal(record);
                        }}
                    >
                        编辑
                    </a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="危险操作确认"
                        onConfirm={() => {
                            this.props.deleteConfig(record.key);
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
        this.props.getConfigList();
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card title="设置项列表">
                    <Table
                        dataSource={this.props.configList}
                        columns={this.configColumns}
                        pagination={false}
                    />
                    <Divider />
                    <Button
                        onClick={() => {
                            this.props.showCreateConfigModal();
                        }}
                    >
                        新增
                    </Button>
                </Card>
                <WrappedCreateConfigForm
                    visible={this.props.createConfigModalVisible}
                    loading={this.props.createConfigModalLoading}
                    onSubmit={this.props.createConfig}
                    onCancel={this.props.hideCreateConfigModal}
                />
                <WrappedEditConfigForm
                    visible={this.props.editConfigModalVisible}
                    loading={this.props.editConfigModalLoading}
                    onSubmit={this.props.editConfig}
                    onCancel={this.props.hideEditConfigModal}
                    configItem={this.props.nowEditingConfig}
                />
            </Spin>
        );
    }
}

export default Form.create<Props & FormComponentProps>()(Config);