import React from "react";
import { Modal, Form, Input } from "antd";

export interface CreateConfigFormValues {
    key: string;
    value: string;
}

export interface CreateConfigFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (key: string, value: string) => void;
    onCancel: () => void;
}

function CreateConfigForm(props: CreateConfigFormProps) {
    const [form] = Form.useForm<CreateConfigFormValues>();
    const { visible, loading, onSubmit, onCancel } = props;
    const handleSubmitClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const values = await form.validateFields();
        onSubmit(values.key, values.value);
    };
    return (
        <Modal
            visible={visible}
            confirmLoading={loading}
            onOk={handleSubmitClick}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="key" label="Key" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="value"
                    label="Value"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateConfigForm;
