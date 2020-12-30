import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Spin, Table, Button, Divider, Modal, Input, Popconfirm } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { SpiderIdentityItem } from 'types/dashboard';
import JSONViewer from 'components/Common/JSONViewer';

export interface CreateIdentityFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (name: string, identity: string) => void;
    onCancel: () => void;
}

class CreateIdentityForm extends React.Component<CreateIdentityFormProps & FormComponentProps> {
    handleSubmitClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values.name, values.identity);
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
                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true }]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Identity (JSON)">
                        {getFieldDecorator('identity', {
                            rules: [{ required: true }]
                        })(
                            <Input.TextArea />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedCreateIdentityForm = Form.create<CreateIdentityFormProps & FormComponentProps>()(CreateIdentityForm);

export interface EditIdentityFormProps {
    visible: boolean;
    loading: boolean;
    identityItem: SpiderIdentityItem;
    onSubmit: (id: number, name: string, identity: string) => void;
    onCancel: () => void;
}

class EditIdentityForm extends React.Component<EditIdentityFormProps & FormComponentProps> {
    handleSubmitClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values.id, values.name, values.identity);
            }
        });
    }
    componentDidUpdate(prevProps: EditIdentityFormProps & FormComponentProps) {
        if (prevProps.identityItem.id !== this.props.identityItem.id) {
            this.props.form.resetFields();
        }
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
                            initialValue: this.props.identityItem.id
                        })(
                            <Input
                                disabled={true}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true }],
                            initialValue: this.props.identityItem.name
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Identity (JSON)">
                        {getFieldDecorator('identity', {
                            rules: [{ required: true }],
                            initialValue: JSON.stringify(this.props.identityItem.identity)
                        })(
                            <Input.TextArea />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const WrappedEditIdentityForm = Form.create<EditIdentityFormProps & FormComponentProps>()(EditIdentityForm);

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
    identityColumns = [{
        title: 'ID',
        key: 'id',
        dataIndex: 'id',
    }, {
        title: '名称',
        key: 'name',
        dataIndex: 'name'
    }, {
        title: '凭据',
        key: 'identity',
        render: (text: string, record: SpiderIdentityItem) => {
            return <JSONViewer json={record.identity} />;
        }
    }, {
        title: '操作',
        key: 'operations',
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
                    <WrappedCreateIdentityForm
                        visible={this.props.createIdentityModalVisible}
                        loading={this.props.createIdentityModalLoading}
                        onSubmit={this.props.createIdentity}
                        onCancel={this.props.hideCreateIdentityModal}
                    />
                    <WrappedEditIdentityForm
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