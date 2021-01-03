import React from "react";
import { Modal, Form, Input } from "antd";
import { ConfigItem } from "types/dashboard";

export interface EditConfigFormValues {
    key: string;
    value: string;
}

export interface EditConfigFormProps {
    visible: boolean;
    loading: boolean;
    configItem: ConfigItem;
    onSubmit: (key: string, value: string) => void;
    onCancel: () => void;
}

function EditConfigForm(props: EditConfigFormProps) {
    const [form] = Form.useForm<EditConfigFormValues>();
    const { configItem, visible, loading, onSubmit, onCancel } = props;
    const handleSubmitClick = async (e: React.MouseEvent<HTMLElement>) => {
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
            <Form form={form} layout="vertical" initialValues={configItem}>
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

export default EditConfigForm;
