import React, { useCallback, useEffect } from "react";
import { Modal, Form, Input } from "antd";

export interface FrequencyUpdateFormValues {
    frequency: number;
}

export interface FrequencyUpdateFormProps {
    visible: boolean;
    loading?: boolean;
    onCancel: () => void;
    onSubmit: (frequency: number) => void;
    frequency: number;
}

function FrequencyUpdateForm(props: FrequencyUpdateFormProps) {
    const [form] = Form.useForm<FrequencyUpdateFormValues>();
    const { frequency, visible, loading, onSubmit, onCancel } = props;
    const handleSubmit = useCallback(async () => {
        const values = await form.validateFields();
        onSubmit(values.frequency);
    }, [form, onSubmit]);
    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [visible, form]);
    return (
        <Modal
            visible={visible}
            confirmLoading={loading}
            onCancel={onCancel}
            onOk={handleSubmit}
            title="修改刷新频率"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="frequency"
                    label="刷新频率(秒)"
                    rules={[{ required: true }]}
                    initialValue={frequency}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default FrequencyUpdateForm;
