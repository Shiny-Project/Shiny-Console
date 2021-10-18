import { Descriptions } from "antd";
import { ShinyEventDetail } from "types/dashboard";

interface Props {
    event: ShinyEventDetail;
}

function EventBasicInfo(props: Props) {
    const { event } = props;
    return (
        <Descriptions bordered>
            <Descriptions.Item label="事件ID">
                {event.event.id}
            </Descriptions.Item>
            <Descriptions.Item label="事件标题">
                {event.event.data.title}
            </Descriptions.Item>
            <Descriptions.Item label="事件等级">
                {event.event.level}
            </Descriptions.Item>
            <Descriptions.Item label="事件唯一标识">
                {event.event.hash}
            </Descriptions.Item>
            <Descriptions.Item label="来源">
                {event.event.publisher}
            </Descriptions.Item>
            <Descriptions.Item label="子频道">
                {event.event.channel || "/"}
            </Descriptions.Item>
            <Descriptions.Item label="链接">
                <a
                    href={event.event.data.link}
                    target="_blank"
                    rel="noreferrer"
                >
                    {event.event.data.link}
                </a>
            </Descriptions.Item>
        </Descriptions>
    );
}

export default EventBasicInfo;
