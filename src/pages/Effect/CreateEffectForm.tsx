import React, { useState } from "react";
import { Modal, Form, Input, Radio, DatePicker } from "antd";
import { EffectType } from "./types";

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
}

const CreateEffectForm: React.FC<Props> = (props) => {
    const { visible, loading, onCancel, onSubmit } = props;
    const [form] = Form.useForm<CreateEffectFormValues>();
    const [effectType, setEffectType] = useState(EffectType.PERMANENT);
    return (
        <Modal
            title="创建全局效果"
            visible={visible}
            confirmLoading={loading}
            onCancel={onCancel}
            onOk={async () => {
                const values = await form.validateFields();
                onSubmit(values);
            }}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    type: EffectType.PERMANENT,
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
                <Form.Item label="Key" name="key" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Value"
                    name="value"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                {effectType === EffectType.TEMPORARY && (
                    <>
                        <Form.Item label="起始时间" name="start">
                            <DatePicker
                                showTime={{ format: "HH:mm" }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>
                        <Form.Item label="结束时间" name="end">
                            <DatePicker
                                showTime={{ format: "HH:mm" }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>
                    </>
                )}
                <Form.Item label="说明" name="desc">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateEffectForm;
