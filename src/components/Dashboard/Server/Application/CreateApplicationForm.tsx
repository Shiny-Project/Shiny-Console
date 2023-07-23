import React from "react";
import { Modal, Form, Select } from "antd";
import { ServerNode } from "types/dashboard";

export interface CreateApplicationFormValues {
    tag: number;
}

export interface CreateApplicationFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (tag: number) => void;
    onCancel: () => void;
    serverList: ServerNode[];
}

function CreateApplicationForm(props: CreateApplicationFormProps) {
    const [form] = Form.useForm<CreateApplicationFormValues>();
    const { serverList, visible, loading, onSubmit, onCancel } = props;
    const handleCreateSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        const values = await form.validateFields();
        onSubmit(values.tag);
    };
    return (
        (<Modal
            open={visible}
            title="生成密钥对"
            confirmLoading={loading}
            onOk={handleCreateSubmit}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="tag"
                    label="标识标签"
                    rules={[{ required: true }]}
                >
                    <Select>
                        {serverList.map((serverNode) => {
                            return (
                                <Select.Option
                                    value={serverNode.id}
                                    key={serverNode.id}
                                >
                                    {serverNode.name} / {serverNode.type} /{" "}
                                    {serverNode.host}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>)
    );
}

export default CreateApplicationForm;
