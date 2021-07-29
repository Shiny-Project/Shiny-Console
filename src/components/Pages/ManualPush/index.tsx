import { useEffect, useState } from "react";
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
import request from "services/request";
import "./index.css";

const ManualPush: React.FC = () => {
    const [form] = Form.useForm();
    const [availableChannels, setAvailableChannels] = useState<string[]>(null);
    useEffect(() => {
        request
            .get<string[]>("/push/channels")
            .then((channels) => {
                setAvailableChannels(channels);
            })
            .catch((e) => {
                message.error(e.message);
            });
    }, []);

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
                        <Form.Item label="渠道" name="channels">
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
                        <Form.Item label="内容" name="text">
                            <Input.TextArea placeholder="140字上限 自己把握一下"></Input.TextArea>
                        </Form.Item>
                        <Button
                            type="primary"
                            loading={!availableChannels}
                            disabled={!availableChannels}
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
