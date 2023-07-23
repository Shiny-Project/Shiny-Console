import React, { useCallback, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { Repository } from "types/dashboard";

export interface EditRepositoryFormValues {
    id: number;
    name: string;
    description: string;
}

export interface EditRepositoryFormProps {
    repository: Repository;
    visible: boolean;
    loading: boolean;
    onSubmit: (formValues: EditRepositoryFormValues) => void;
    onCancel: () => void;
}

function EditRepositoryForm(props: EditRepositoryFormProps) {
    const [form] = Form.useForm<EditRepositoryFormValues>();
    const { repository, visible, loading, onSubmit, onCancel } = props;
    const handleSubmitClick = useCallback(
        async (e: React.MouseEvent<HTMLElement>) => {
            const values = await form.validateFields();
            onSubmit(values);
        },
        [form, onSubmit]
    );

    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible, form]);

    return (
        (<Modal
            open={visible}
            confirmLoading={loading}
            onOk={handleSubmitClick}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical" initialValues={repository}>
                <Form.Item name="id" label="ID" rules={[{ required: true }]}>
                    <Input disabled={true} />
                </Form.Item>
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
        </Modal>)
    );
}

export default EditRepositoryForm;
