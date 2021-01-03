import React, { useCallback } from "react";
import { Modal, Form, Input, Select } from "antd";

export interface CreateNodeFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (
        type: string,
        name: string,
        host: string,
        group: string[]
    ) => void;
    onCancel: () => void;
}

function CreateNodeForm(props: CreateNodeFormProps) {
    const [form] = Form.useForm();
    const { visible, loading, onSubmit, onCancel } = props;
    const handleSubmit = useCallback(
        async (e: React.MouseEvent<HTMLElement>) => {
            const values = await form.validateFields();
            onSubmit(values.type, values.name, values.host, values.group);
        },
        [form, onSubmit]
    );
    return (
        <Modal
            title="添加服务器"
            visible={visible}
            confirmLoading={loading}
            onOk={handleSubmit}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="服务器名"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="服务器类型"
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Select.Option value="central">中控</Select.Option>
                        <Select.Option value="spider">爬虫</Select.Option>
                        <Select.Option value="websocket">转发</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="host"
                    label="服务器地址"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="group"
                    label="服务器组"
                    rules={[{ required: true }]}
                    initialValue={["default"]}
                >
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select"
                    >
                        <Select.Option key="default" value="default">
                            default
                        </Select.Option>
                        <Select.Option
                            key="china_mainland"
                            value="china_mainland"
                        >
                            china_mainland
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateNodeForm;
