import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { ValidateStatus } from "antd/lib/form/FormItem";
import { validateValueByType } from "utils/validate";

export interface CreateConfigFormValues {
    key: string;
    value: string;
    contentType: string;
}

export interface CreateConfigFormProps {
    visible: boolean;
    loading: boolean;
    onSubmit: (key: string, value: string, contentType: string) => void;
    onCancel: () => void;
}

function CreateConfigForm(props: CreateConfigFormProps) {
    const [form] = Form.useForm<CreateConfigFormValues>();
    const [contentType, setContentType] = useState("string");
    const [valueValidateStatus, setValueValidateStatus] =
        useState<ValidateStatus>("success");
    const [valueValidateText, setValueValidateText] = useState("");
    const { visible, loading, onSubmit, onCancel } = props;
    const handleSubmitClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const values = await form.validateFields();
        try {
            validateValueByType(values.value, contentType);
        } catch (e) {
            setValueValidateStatus("error");
            setValueValidateText(e.message);
            return;
        }
        onSubmit(values.key, values.value, values.contentType);
    };
    const onContentTypeChange = () => {
        setContentType(form.getFieldValue("contentType"));
    };
    return (
        <Modal
            visible={visible}
            confirmLoading={loading}
            onOk={handleSubmitClick}
            onCancel={onCancel}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ contentType: "string" }}
            >
                <Form.Item name="contentType" label="数据类型">
                    <Select onChange={onContentTypeChange}>
                        <Select.Option value="string">string</Select.Option>
                        <Select.Option value="integer">integer</Select.Option>
                        <Select.Option value="boolean">boolean</Select.Option>
                        <Select.Option value="json">JSON</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="key" label="Key" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="value"
                    label="Value"
                    validateStatus={valueValidateStatus}
                    help={valueValidateText}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateConfigForm;


