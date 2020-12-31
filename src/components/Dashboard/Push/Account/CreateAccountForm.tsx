import React, { useCallback } from "react";
import { Modal, Form, Input } from "antd";

export interface CreateAccountFormValues {
    platform: string;
    name: string;
    credential: string;
}

export interface CreateAccountFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (formValues: CreateAccountFormValues) => void;
    onCancel: () => void;
}

function CreateAccountForm(props: CreateAccountFormProps) {
    const [form] = Form.useForm<CreateAccountFormValues>();
    const { visible, loading, onSubmit, onCancel } = props;
    const handleSubmitClick = useCallback(
        async (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            const formValues = await form.validateFields();
            onSubmit(formValues);
        },
        [form, onSubmit]
    );
    return (
        <Modal
            visible={visible}
            onOk={handleSubmitClick}
            onCancel={onCancel}
            confirmLoading={loading}
            afterClose={() => {
                form.resetFields();
            }}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="platform"
                    label="渠道"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="账号名"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="credential"
                    label="账号凭据 (JSON)"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateAccountForm;
