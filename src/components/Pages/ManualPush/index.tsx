import { useEffect, useRef, useState } from "react";
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
import { ShinyPushJob } from "types/dashboard";
import EventTimeline from "../EventDetail/components/EventBody/Timeline";
import { fetchAvailableChannels, manualPush, queryJobStatus } from "./services";
import "./index.css";

interface ManualPushForm {
    channels: string[];
    text: string;
}

const ManualPush: React.FC = () => {
    const [form] = Form.useForm<ManualPushForm>();
    const refreshJobTimer = useRef(null);
    const initialTime = useRef<string>(null);
    const jobIds = useRef<number[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [jobs, setJobs] = useState<ShinyPushJob[]>([]);
    const [availableChannels, loading] = useRequest(fetchAvailableChannels);
    const onSubmit = async () => {
        const values = await form.validateFields();
        setIsSubmitting(true);
        try {
            const createdJobs = await manualPush(values.channels, values.text);
            message.success("推送任务已创建");
            initialTime.current = new Date().toISOString();
            jobIds.current = Array.from(createdJobs, (job) => job.id);
            startRefreshingJobStatus();
            form.resetFields();
        } catch (e) {
            message.error(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    const startRefreshingJobStatus = () => {
        if (refreshJobTimer.current) {
            clearInterval(refreshJobTimer.current);
        }
        refreshJobTimer.current = setInterval(async () => {
            const jobs = await queryJobStatus(jobIds.current);
            setJobs(jobs);
        }, 3000);
    };

    useEffect(() => {
        const ref = refreshJobTimer;
        return () => {
            clearInterval(ref.current);
        };
    }, []);

    return (
        <Card title="手动推送">
            <Row className="container" gutter={16}>
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
                <Col lg={8} xs={24}>
                    {jobs.length > 0 && (
                        <EventTimeline
                            jobs={jobs}
                            baseTime={initialTime.current}
                        />
                    )}
                </Col>
            </Row>
        </Card>
    );
};

export default ManualPush;
