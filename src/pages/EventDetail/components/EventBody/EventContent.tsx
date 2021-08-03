import React from "react";
import { Card } from "antd";
import { ShinyEventDetail } from "types/dashboard";

interface Props {
    event: ShinyEventDetail;
}

function EventContent(props: Props) {
    const { event } = props;
    return (
        <Card title="事件内容" className="event-content-card">
            <div
                dangerouslySetInnerHTML={{
                    __html: event.event.data.content.replace(/\n/g, "<br>"),
                }}
            ></div>
        </Card>
    );
}

export default EventContent;
