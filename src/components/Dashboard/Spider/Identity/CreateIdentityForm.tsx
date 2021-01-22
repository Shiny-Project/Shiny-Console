import React from "react";
import { Modal, Form, Input } from "antd";

export interface CreateIdentityFormValues {
    name: string;
    identity: string;
}

export interface CreateIdentityFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (name: string, identity: string) => void;
    onCancel: () => void;
}

function CreateIdentityForm(props: CreateIdentityFormProps) {
    const [form] = Form.useForm<CreateIdentityFormValues>();
    const { visible, loading, onCancel, onSubmit } = props;
    const handleSubmitClick = async (e: React.MouseEvent<HTMLElement>) => {
        const values = await form.validateFields();
        onSubmit(values.name, values.identity);
    };
    return (
        <Modal
            visible={visible}
            confirmLoading={loading}
            onOk={handleSubmitClick}
            onCancel={onCancel}
        >
            <Form layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="identity"
                    label="Identity (JSON)"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateIdentityForm;
