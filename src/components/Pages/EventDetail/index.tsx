import { useMemo } from "react";
import { Card } from "antd";
import { useParams } from "react-router";
import { ShinyEventDetail } from "types/dashboard";
import request from "services/request";
import EventBody from "./components/EventBody";
import useRequest from "hooks/useRequest";

interface UrlParams {
    id: string;
}

const EventDetail: React.FC = () => {
    const { id } = useParams<UrlParams>();
    const detailFetcher = useMemo(
        () =>
            request.get<ShinyEventDetail>("/Data/detail", {
                eventId: id,
            }),
        [id]
    );
    const imagesFetcher = useMemo(
        () =>
            request.get<string[]>("/Data/event_images", {
                eventId: id,
            }),
        [id]
    );
    const [eventData, loading] = useRequest(detailFetcher);
    const [images] = useRequest(imagesFetcher);
    return (
        <Card title="事件详情">
            <EventBody
                eventDetail={eventData}
                images={images}
                loading={loading}
            />
        </Card>
    );
};

export default EventDetail;
