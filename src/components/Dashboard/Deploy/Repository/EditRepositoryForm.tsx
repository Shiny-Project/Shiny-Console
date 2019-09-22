import React from 'react';
import { Repository } from 'types/dashboard';
import { FormComponentProps } from 'antd/lib/form';
import { Modal, Form, Input } from 'antd';

export interface EditRepositoryFormProps {
    repository: Repository;
    visible: boolean;
    loading: boolean;
    onSubmit: (repositoryId: number, name: string, description: string) => void;
    onCancel: () => void;
}

class EditRepositoryForm extends React.Component<EditRepositoryFormProps & FormComponentProps> {
    handleSubmitClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values.id, values.name, values.description);
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
                            initialValue: this.props.repository.id
                        })(
                            <Input
                                disabled={true}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="仓库名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true }],
                            initialValue: this.props.repository.name
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="说明">
                        {getFieldDecorator('description', {
                            rules: [{ required: true }],
                            initialValue: this.props.repository.description
                        })(
                            <Input />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<EditRepositoryFormProps & FormComponentProps>()(EditRepositoryForm);