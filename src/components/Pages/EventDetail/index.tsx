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
    const [images, setImages] = useState<string[]>([]);
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
        request
            .get<string[]>("/Data/event_images", {
                eventId: id,
            })
            .then((data) => {
                setImages(data);
            })
            .catch((e) => {
                // no images or unauthorized, ignore.
            });
    }, [id]);
    return (
        <Card title="事件详情">
            <EventBody eventDetail={eventData} images={images} loading={loading} />
        </Card>
    );
}

export default EventDetail;
