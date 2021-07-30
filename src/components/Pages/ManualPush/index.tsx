import {
    Row,
    Col,
    Card,
    Form,
    Select,
    Input,
    Spin,
    Button,
    message,
} from "antd";
import useRequest from "hooks/useRequest";
import { fetchAvailableChannels, manualPush } from "./services";
import "./index.css";
import { useState } from "react";

interface ManualPushForm {
    channels: string[];
    text: string;
}

const ManualPush: React.FC = () => {
    const [form] = Form.useForm<ManualPushForm>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableChannels, loading] = useRequest(fetchAvailableChannels);
    const onSubmit = async () => {
        const values = await form.validateFields();
        setIsSubmitting(true);
        try {
            await manualPush(values.channels, values.text);
            message.success("推送任务已创建");
            form.resetFields();
        } catch (e) {
            message.error(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card title="手动推送">
            <Row className="container">
                <Col lg={8} xs={24}>
                    <Form
                        form={form}
                        initialValues={{
                            channels: [],
                            text: "",
                        }}
                    >
                        <Form.Item
                            label="渠道"
                            name="channels"
                            rules={[{ required: true }]}
                        >
                            <Select
                                mode="multiple"
                                notFoundContent={
                                    !availableChannels ? (
                                        <Spin size="small" />
                                    ) : null
                                }
                                placeholder="请选择推送渠道"
                            >
                                {!!availableChannels &&
                                    availableChannels.map((channel) => (
                                        <Select.Option
                                            key={channel}
                                            value={channel}
                                        >
                                            {channel}
                                        </Select.Option>
                                    ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="内容"
                            name="text"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea placeholder="140字上限 自己把握一下"></Input.TextArea>
                        </Form.Item>
                        <Button
                            type="primary"
                            loading={loading || isSubmitting}
                            disabled={loading || isSubmitting}
                            onClick={onSubmit}
                        >
                            确认
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
};

export default ManualPush;
