import React, { useState } from "react";
import { Modal, Form, Input, Select, Radio, DatePicker, Button } from "antd";
import { ValidateStatus } from "antd/lib/form/FormItem";
import { validateValueByType } from "utils/validate";
import { EffectType } from "../types";
import EffectTemplate from "./EffectTemplate";

interface Props {
    visible: boolean;
    loading: boolean;
    onCancel: () => void;
    onSubmit: (values: CreateEffectFormValues) => void;
}

export interface CreateEffectFormValues {
    key: string;
    value: string;
    type: EffectType;
    start?: string;
    end?: string;
    desc?: string;
    contentType: string;
}

const CreateEffectForm: React.FC<Props> = (props) => {
    const { visible, loading, onCancel, onSubmit } = props;
    const [form] = Form.useForm<CreateEffectFormValues>();
    const [effectType, setEffectType] = useState(EffectType.PERMANENT);
    const [contentType, setContentType] = useState("string");
    const [valueValidateStatus, setValueValidateStatus] =
        useState<ValidateStatus>("success");
    const [valueValidateText, setValueValidateText] = useState("");
    const [effectTemplateModalVisible, setEffectTemplateModalVisible] =
        useState(false);
    const onContentTypeChange = () => {
        setContentType(form.getFieldValue("contentType"));
    };
    const onConfirm = async () => {
        const values = await form.validateFields();
        try {
            validateValueByType(values.value, contentType);
        } catch (e) {
            setValueValidateStatus("error");
            setValueValidateText(e.message);
            return;
        }
        onSubmit(values);
    };
    return (
        <Modal
            title="创建全局效果"
            visible={visible}
            confirmLoading={loading}
            onCancel={onCancel}
            onOk={onConfirm}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    type: EffectType.PERMANENT,
                    contentType: "string",
                }}
            >
                <Form.Item label="类型" name="type">
                    <Radio.Group
                        onChange={() => {
                            setEffectType(form.getFieldValue("type"));
                        }}
                    >
                        <Radio value={EffectType.PERMANENT}>永久有效</Radio>
                        <Radio value={EffectType.TEMPORARY}>期间限定</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="contentType"
                    label="数据类型"
                    rules={[{ required: true }]}
                >
                    <Select onChange={onContentTypeChange}>
                        <Select.Option value="string">string</Select.Option>
                        <Select.Option value="integer">integer</Select.Option>
                        <Select.Option value="boolean">boolean</Select.Option>
                        <Select.Option value="json">JSON</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Key" name="key" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Value"
                    name="value"
                    validateStatus={valueValidateStatus}
                    help={valueValidateText}
                    rules={[{ required: true }]}
                >
                    <Input.TextArea />
                </Form.Item>
                {effectType === EffectType.TEMPORARY && (
                    <>
                        <Form.Item label="起始时间" name="start">
                            <DatePicker
                                showTime={{ format: "HH:mm" }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder="选择时间"
                            />
                        </Form.Item>
                        <Form.Item label="结束时间" name="end">
                            <DatePicker
                                showTime={{ format: "HH:mm" }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder="选择时间"
                            />
                        </Form.Item>
                    </>
                )}
                <Form.Item label="说明" name="desc">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button
                        size="small"
                        onClick={() => {
                            setEffectTemplateModalVisible(true);
                        }}
                    >
                        从模板创建
                    </Button>
                </Form.Item>
            </Form>
            <EffectTemplate
                visible={effectTemplateModalVisible}
                onCancel={() => {
                    setEffectTemplateModalVisible(false);
                }}
                onConfirm={(result: string) => {
                    form.setFieldsValue({
                        value: result,
                    });
                    setEffectTemplateModalVisible(false);
                }}
            />
        </Modal>
    );
};

export default CreateEffectForm;
