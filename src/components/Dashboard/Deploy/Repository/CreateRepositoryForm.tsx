import React, { useCallback } from "react";
import { Modal, Form, Input } from "antd";

export interface CreateRepositoryFormValues {
    name: string;
    description: string;
}
export interface CreateRepositoryFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (formValues: CreateRepositoryFormValues) => void;
    onCancel: () => void;
}

function CreateRepositoryForm(props: CreateRepositoryFormProps) {
    const { visible, loading, onSubmit, onCancel } = props;
    const [form] = Form.useForm<CreateRepositoryFormValues>();

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
            confirmLoading={loading}
            onCancel={onCancel}
            onOk={handleSubmitClick}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="仓库名"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="说明"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateRepositoryForm;
