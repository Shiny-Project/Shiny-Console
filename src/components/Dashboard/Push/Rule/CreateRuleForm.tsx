import React, { useCallback } from "react";
import { Modal, Form, Input } from "antd";

export interface CreateRuleFormValues {
    spider_name: string;
    rule: string;
}

export interface CreateRuleFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (formValues: CreateRuleFormValues) => void;
    onCancel: () => void;
}

function CreateRuleForm(props: CreateRuleFormProps) {
    const [form] = Form.useForm<CreateRuleFormValues>();
    const { visible, loading, onSubmit, onCancel } = props;
    const handleSubmitClick = useCallback(
        async (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            const values = await form.validateFields();
            onSubmit(values);
        },
        [form, onSubmit]
    );
    return (
        <Modal
            visible={visible}
            onOk={handleSubmitClick}
            onCancel={onCancel}
            confirmLoading={loading}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="spider_name"
                    label="Spider Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="rule"
                    label="规则 (JSON)"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateRuleForm;
