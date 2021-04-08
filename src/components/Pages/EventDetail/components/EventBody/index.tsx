import React from "react";
import Loading from "components/Common/Loading";
import { ShinyEventDetail } from "types/dashboard";
import EventTimeline from "./Timeline";
import './index.css';

interface Props {
    eventDetail?: ShinyEventDetail;
    loading: boolean;
}

const EventBody: React.FC<Props> = (props) => {
    const { eventDetail, loading } = props;
    if (!eventDetail) {
        return (
            <Loading
                isLoading={loading}
                loadingText="数据加载中"
                errorText="数据加载失败"
            />
        );
    }
    return (
        <div className="event-body">
            <h2 className="title">{eventDetail.event.data.title}</h2>
            <div className="event-info-container">
                <div className="timeline-container">
                    <EventTimeline event={eventDetail} />
                </div>
            </div>
        </div>
    );
};

export default EventBody;
