import React, { useCallback, useMemo, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { PushRuleItem } from "types/dashboard";

export interface EditRuleFormValues {
    id: number;
    spider_name: string;
    rule: string;
}

export interface EditRuleFormProps {
    rule: PushRuleItem;
    visible: boolean;
    loading: boolean;
    onSubmit: (id: number, spiderName: string, rule: string) => void;
    onCancel: () => void;
}

function EditRuleForm(props: EditRuleFormProps) {
    const [form] = Form.useForm<EditRuleFormValues>();
    const { rule, visible, loading, onCancel, onSubmit } = props;
    const handleSubmitClick = useCallback(
        async (e: React.MouseEvent<HTMLElement>) => {
            const values = await form.validateFields();
            onSubmit(values.id, values.spider_name, values.rule);
        },
        [form, onSubmit]
    );
    const formInitialValues = useMemo(() => {
        return {
            ...rule,
            rule: JSON.stringify(rule.rule),
        };
    }, [rule]);
    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible, form]);
    return (
        <Modal
            visible={visible}
            confirmLoading={loading}
            onOk={handleSubmitClick}
            onCancel={onCancel}
        >
            <Form
                form={form}
                initialValues={formInitialValues}
                layout="vertical"
            >
                <Form.Item name="id" label="ID" rules={[{ required: true }]}>
                    <Input disabled={true} />
                </Form.Item>
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

export default EditRuleForm;
