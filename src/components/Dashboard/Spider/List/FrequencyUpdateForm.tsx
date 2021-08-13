import React, { useCallback, useEffect } from "react";
import { Modal, Form, Input } from "antd";

export interface FrequencyUpdateFormValues {
    frequency: number;
    cooldown: number;
}

export interface FrequencyUpdateFormProps {
    visible: boolean;
    loading?: boolean;
    onCancel: () => void;
    onSubmit: (frequency: number, cooldown?: number) => void;
    frequency: number;
    cooldown: number;
}

function FrequencyUpdateForm(props: FrequencyUpdateFormProps) {
    const [form] = Form.useForm<FrequencyUpdateFormValues>();
    const { frequency, cooldown, visible, loading, onSubmit, onCancel } = props;
    const handleSubmit = useCallback(async () => {
        const values = await form.validateFields();
        onSubmit(values.frequency, values.cooldown);
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
                    tooltip="当最近数据已经超过该值没有更新时，会生成任务下发给爬虫节点"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="cooldown"
                    label="冷却(秒)"
                    initialValue={cooldown || 0}
                    tooltip="在刷新频率基础上设定最小任务执行间隔，即使任务失败也会进入冷却"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default FrequencyUpdateForm;
