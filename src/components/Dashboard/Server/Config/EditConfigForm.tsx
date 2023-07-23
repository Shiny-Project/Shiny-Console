import React, { useState, useEffect, useMemo } from "react";
import { Modal, Form, Input, Select } from "antd";
import { ValidateStatus } from "antd/lib/form/FormItem";
import { validateValueByType } from "utils/validate";
import { ConfigItem } from "types/dashboard";

export interface EditConfigFormValues {
    key: string;
    value: string;
    contentType: string;
}

export interface EditConfigFormProps {
    visible: boolean;
    loading: boolean;
    configItem: ConfigItem;
    onSubmit: (key: string, value: string, contentType: string) => void;
    onCancel: () => void;
}

function EditConfigForm(props: EditConfigFormProps) {
    const { configItem, visible, loading, onSubmit, onCancel } = props;
    const [form] = Form.useForm<EditConfigFormValues>();
    const [contentType, setContentType] = useState(configItem.contentType);
    const [valueValidateStatus, setValueValidateStatus] =
        useState<ValidateStatus>("success");
    const [valueValidateText, setValueValidateText] = useState("");
    const handleSubmitClick = async (e: React.MouseEvent<HTMLElement>) => {
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
    const initialValues = useMemo(
        () => ({
            ...configItem,
            value:
                typeof configItem.value === "string"
                    ? configItem.value
                    : JSON.stringify(configItem.value),
        }),
        [configItem]
    );
    useEffect(() => {
        if (visible) {
            form.resetFields();
        }
    }, [form, visible]);
    return (
        (<Modal
            open={visible}
            confirmLoading={loading}
            onOk={handleSubmitClick}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical" initialValues={initialValues}>
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
        </Modal>)
    );
}

export default EditConfigForm;
