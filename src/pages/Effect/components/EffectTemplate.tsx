import React, { useState } from "react";
import { Modal, Form, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import useRequest from "hooks/useRequest";
import SimpleSchemaForm from "./SimpleSchemaForm";
import { getSpiderList } from "../service";
import { EffectTemplates } from "../constants";
import { EffectTemplate } from "../types";
import fillStringTemplate from "utils/string_template";

interface Props {
    visible: boolean;
    onConfirm: (result: string) => void;
    onCancel: () => void;
}

interface EffectTemplateFormValues {
    spider: string;
    template: string;
    [index: string]: string;
}

const EffectTemplateForm: React.FC<Props> = (props: Props) => {
    const { visible, onCancel, onConfirm } = props;
    const [form] = useForm<EffectTemplateFormValues>();
    const [spiderList, loading] = useRequest(getSpiderList);
    const [selectedSpiderName, setSelectedSpiderName] = useState("");
    const [selectedTemplate, setSelectedTemplate] =
        useState<EffectTemplate>(null);
    const [availableTemplates, setAvailableTemplates] = useState([]);
    const onSelectedSpiderChange = () => {
        form.setFieldsValue({
            template: null,
        });
        const spiderName = form.getFieldValue("spider");
        setSelectedSpiderName(spiderName);
        const templates = EffectTemplates[spiderName];
        setAvailableTemplates(templates || []);
    };
    const onSelectedTemplateChange = () => {
        const templateName = form.getFieldValue("template");
        const spiderName = form.getFieldValue("spider");
        const template = EffectTemplates[spiderName].find(
            (t) => t.name === templateName
        );
        setSelectedTemplate(template);
    };
    const onEffectTemplateConfirm = async () => {
        const values = await form.validateFields();
        let templateStr = selectedTemplate.template;
        for (const parameter of selectedTemplate.parameters) {
            templateStr = fillStringTemplate(templateStr, {
                [parameter.name]: values[parameter.name],
            });
        }
        onConfirm(JSON.stringify(JSON.parse(templateStr), null, 2));
    };
    return (
        <Modal
            visible={visible}
            title="从模板创建效果"
            onCancel={onCancel}
            onOk={onEffectTemplateConfirm}
        >
            <Form form={form} layout="vertical">
                <Form.Item label="爬虫" name="spider">
                    <Select
                        notFoundContent={
                            !spiderList && loading ? (
                                <Spin size="small" />
                            ) : null
                        }
                        placeholder="请选择爬虫"
                        onChange={onSelectedSpiderChange}
                    >
                        {!!spiderList &&
                            spiderList.map((spider) => (
                                <Select.Option
                                    key={spider.name}
                                    value={spider.name}
                                >
                                    {spider.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>
                {selectedSpiderName && (
                    <Form.Item label="模板" name="template">
                        <Select
                            placeholder={
                                selectedSpiderName && !availableTemplates.length
                                    ? "无可用模板"
                                    : "请选择模板"
                            }
                            onChange={onSelectedTemplateChange}
                        >
                            {availableTemplates.map((template) => (
                                <Select.Option
                                    key={template.name}
                                    value={template.name}
                                >
                                    {template.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
                {selectedTemplate && (
                    <SimpleSchemaForm schema={selectedTemplate.parameters} />
                )}
            </Form>
        </Modal>
    );
};

export default EffectTemplateForm;
