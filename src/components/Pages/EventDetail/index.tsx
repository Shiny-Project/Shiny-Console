import React, { useState, useEffect } from "react";
import { Card, message } from "antd";
import { useParams } from "react-router";
import { ShinyEventDetail } from "types/dashboard";

import request from "services/request";
import EventBody from "./components/EventBody";

interface Props {}

interface UrlParams {
    id: string;
}

function EventDetail(props: Props): JSX.Element {
    const { id } = useParams<UrlParams>();
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState<ShinyEventDetail>(null);
    useEffect(() => {
        setLoading(true);
        request
            .get<ShinyEventDetail>("/Data/detail", {
                eventId: id,
            })
            .then((data) => {
                setEventData(data);
            })
            .catch((e) => {
                message.error(e.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);
    return (
        <Card title="事件详情">
            <EventBody eventDetail={eventData} loading={loading} />
        </Card>
    );
}

export default EventDetail;
