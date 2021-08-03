import { useMemo } from "react";
import { useParams } from "react-router";
import { Card } from "antd";
import useRequest from "hooks/useRequest";
import { fetchEventDetail, fetchEventImages } from "./services";
import EventBody from "./components/EventBody";

interface UrlParams {
    id: string;
}

const EventDetail: React.FC = () => {
    const { id } = useParams<UrlParams>();
    const fetchEventDetailById = useMemo(() => () => fetchEventDetail(+id), [id]);
    const fetchEventImagesById = useMemo(() => () => fetchEventImages(+id), [id]);
    const [eventData, loading] = useRequest(fetchEventDetailById);
    const [images] = useRequest(fetchEventImagesById);
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
