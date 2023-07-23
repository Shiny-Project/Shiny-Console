import React, { useCallback, useEffect, useMemo } from "react";
import { Modal, Form, Input } from "antd";
import { PushAccount } from "types/dashboard";

export interface EditAccountFormValues {
    id: number;
    platform: string;
    name: string;
    credential: string;
}

export interface EditAccountFormProps {
    account: PushAccount;
    visible: boolean;
    loading: boolean;
    onSubmit: (formValues: EditAccountFormValues) => void;
    onCancel: () => void;
}

function EditAccountForm(props: EditAccountFormProps) {
    const [form] = Form.useForm<EditAccountFormValues>();
    const { account, visible, loading, onSubmit, onCancel } = props;
    const handleSubmitClick = useCallback(
        async (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            const values = await form.validateFields();
            onSubmit(values);
        },
        [form, onSubmit]
    );
    const formInitialValues: EditAccountFormValues = useMemo(() => {
        return {
            ...account,
            credential: JSON.stringify(account.credential),
        };
    }, [account]);
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
            <Form
                form={form}
                layout="vertical"
                initialValues={formInitialValues}
            >
                <Form.Item name="id" label="ID" rules={[{ required: true }]}>
                    <Input disabled={true} />
                </Form.Item>
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
                    label="账号凭证 (JSON)"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>)
    );
}

export default EditAccountForm;
