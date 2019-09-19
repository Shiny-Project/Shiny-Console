import React from 'react';
import { Form, Modal, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
export interface CreateRepositoryFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (name: string, description: string) => void;
    onCancel: () => void;
}

class CreateRepositoryForm extends React.Component<CreateRepositoryFormProps & FormComponentProps> {
    handleSubmitClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values.name, values.description);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={this.props.visible}
                confirmLoading={this.props.loading}
                onCancel={this.props.onCancel}
                onOk={this.handleSubmitClick}
            >
                <Form layout="vertical">
                    <Form.Item label="仓库名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="说明">
                        {getFieldDecorator('description', {
                            rules: [{ required: true }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create<CreateRepositoryFormProps & FormComponentProps>()(CreateRepositoryForm);