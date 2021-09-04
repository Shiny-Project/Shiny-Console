import React from "react";
import { Form, Input, Select } from "antd";
import { EffectTemplateParameter } from "../types";

interface Props {
    schema: EffectTemplateParameter[];
}

const SimpleSchemaForm: React.FC<Props> = (props: Props) => {
    const { schema } = props;
    return (
        <>
            {schema.map((parameterItem) => (
                <React.Fragment key={parameterItem.name}>
                    {parameterItem.type === "string" && (
                        <Form.Item
                            label={parameterItem.label}
                            name={parameterItem.name}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    {parameterItem.type === "array" && (
                        <Form.Item
                            label={parameterItem.label}
                            name={parameterItem.name}
                        >
                            <Select mode="tags" placeholder="输入关键词以回车结束" />
                        </Form.Item>
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

export default SimpleSchemaForm;
