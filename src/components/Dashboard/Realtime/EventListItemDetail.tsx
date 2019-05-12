import React from 'react';
import { Card, Divider, Spin, Row, Col } from 'antd';
import { ShinyEvent, ShinyEventDetail } from '@/types/dashboard';
import TimeDiff from '@/components/Common/TimeDiff';
import JobList from './Jobs/List';
export interface EventListItemDetailProps {
    event: ShinyEvent;
    eventDetail: ShinyEventDetail;
}
class EventListItemDetail extends React.Component<EventListItemDetailProps> {
    render() {
        if (!this.props.eventDetail) {
            return (
                <div className="event-detail-loading-container">
                    <Spin />
                </div>
            );
        }
        return (
            <Row className="event-detail">
                <Col lg={10} xs={24}>
                    <Row>
                        <Col span={8} className="column-label">
                            Spider Name
                        </Col>
                        <Col span={16}>
                            {this.props.event.publisher}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} className="column-label">
                            Spider Channel
                        </Col>
                        <Col span={16}>
                            {this.props.event.channel || '无'}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} className="column-label">
                            事件等级
                        </Col>
                        <Col span={16}>
                            {this.props.event.level}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} className="column-label">
                            开始处理时刻
                        </Col>
                        <Col span={16}>
                            <TimeDiff time={this.props.event.createdAt} diffMode={false} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} className="column-label">
                            Hash
                        </Col>
                        <Col span={16}>
                            {this.props.event.hash}
                        </Col>
                    </Row>
                </Col>
                <Col lg={14} xs={24}>
                    <Row>
                        <Col span={24} className="column-label">
                            推送任务
                        </Col>
                        <Col span={24}>
                            <JobList jobs={this.props.eventDetail.jobs} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default EventListItemDetail;