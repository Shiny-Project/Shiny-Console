import React from "react";
import { Row, Col, Divider } from "antd";
import Loading from "components/Common/Loading";
import createAsyncComponent from "utils/createAsyncComponent";
import { ShinyEventDetail } from "types/dashboard";
import EventTimeline from "./Timeline";
import EventBasicInfo from "./EventBasicInfo";
import EventContent from "./EventContent";
import EventImages from "./EventImages";
import "./index.css";

const AsyncEventExtendContent = createAsyncComponent({
    path: "Pages/EventDetail/components/EventBody/EventExtendContent",
    disableProgress: true,
});

interface Props {
    eventDetail?: ShinyEventDetail;
    images?: string[];
    loading: boolean;
}

const EventBody: React.FC<Props> = (props) => {
    const { eventDetail, images = [], loading } = props;
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
            <Row className="event-detail-container">
                <Col xs={24} lg={24}>
                    <EventBasicInfo event={eventDetail} />
                </Col>
                <Col xs={24} lg={8} className="timeline-container">
                    <EventTimeline
                        jobs={eventDetail.jobs}
                        baseTime={eventDetail.event.createdAt}
                    />
                </Col>
                <Col xs={24} lg={16} className="event-content-container">
                    <Row>
                        <Col span={24}>
                            <EventContent event={eventDetail} />
                        </Col>
                        {images?.length > 0 && (
                            <>
                                <Divider />
                                <EventImages images={images} />
                            </>
                        )}
                        <Divider />
                        <Col span={24}>
                            <AsyncEventExtendContent event={eventDetail} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default EventBody;
