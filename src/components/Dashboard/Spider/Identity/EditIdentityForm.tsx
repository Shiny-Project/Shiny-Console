import React, { useEffect, useMemo } from "react";
import { Modal, Form, Input } from "antd";
import { SpiderIdentityItem } from "types/dashboard";

export interface EditIdentityFormValues {
    id: number;
    name: string;
    identity: string;
}

export interface EditIdentityFormProps {
    visible: boolean;
    loading: boolean;
    identityItem: SpiderIdentityItem;
    onSubmit: (id: number, name: string, identity: string) => void;
    onCancel: () => void;
}

function EditIdentityForm(props: EditIdentityFormProps) {
    const [form] = Form.useForm<EditIdentityFormValues>();
    const { identityItem, visible, loading, onSubmit, onCancel } = props;
    const handleSubmitClick = async (e: React.MouseEvent<HTMLElement>) => {
        const values = await form.validateFields();
        onSubmit(values.id, values.name, values.identity);
    };
    const initialFormValues = useMemo<EditIdentityFormValues>(() => {
        return {
            ...identityItem,
            identity: JSON.stringify(identityItem.identity),
        };
    }, [identityItem]);
    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [form, visible, identityItem]);
    return (
        <Modal
            visible={visible}
            confirmLoading={loading}
            onOk={handleSubmitClick}
            onCancel={onCancel}
        >
            <Form
                form={form}
                initialValues={initialFormValues}
                layout="vertical"
            >
                <Form.Item name="id" label="ID" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
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

export default EditIdentityForm;
