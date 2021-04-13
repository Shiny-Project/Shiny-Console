import React from "react";
import { Row, Col, Divider } from "antd";
import Loading from "components/Common/Loading";
import { ShinyEventDetail } from "types/dashboard";
import EventTimeline from "./Timeline";
import EventBasicInfo from "./EventBasicInfo";
import EventContent from "./EventContent";
import EventExtendContent from './EventExtendContent';
import "./index.css";

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
            <Row className="event-detail-container">
                <Col xs={24} lg={24}>
                    <EventBasicInfo event={eventDetail} />
                </Col>
                <Col xs={24} lg={8} className="timeline-container">
                    <EventTimeline event={eventDetail} />
                </Col>
                <Col xs={24} lg={16} className="event-content-container">
                    <Row>
                        <Col span={24}>
                            <EventContent event={eventDetail} />
                        </Col>
                        <Divider />
                        <Col span={24}>
                            <EventExtendContent event={eventDetail} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default EventBody;
