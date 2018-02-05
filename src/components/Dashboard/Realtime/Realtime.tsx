import React from 'react';
import { Card, Row, Col, Icon, Spin, List } from 'antd';
import { RecentEventsResponse, Job } from '@/types/dashboard';
import { Link } from 'react-router-dom';
import './Realtime.css';

const { Meta } = Card;

export interface Props {
    getRecentEvents: () => void;
    listenNewEvents: () => void;
    listenJobStatus: () => void;
    recentEvents: RecentEventsResponse;
    recentJobs: Job[];
    isLoading: boolean;
}

export interface State { }

const renderEventList = (recentEvents: RecentEventsResponse) => {
    const eventList = recentEvents.map((event) => {
        return (
            <div key={event.hash} onClick={(e) => { window.open(event.data.link); }}>
                <Card
                    className={['event-item', `event-border-${event.level}`].join(' ')}
                    type="inner"
                    hoverable={true}
                >
                    <Meta
                        title={event.data.title}
                        description={<div dangerouslySetInnerHTML={{__html: event.data.content}} />}
                        avatar={<img src={event.data.cover} />}
                    />
                </Card>
            </div>
        );
    });
    return eventList;
};
const data = [
    {
        spider: '123',
        path: '1234',
        status: 'success'
    },
    {
        spider: '123',
        path: '1234',
        status: 'failed'
    }
];

class Realtime extends React.Component<Props, State> {
    state: State = {
        recentEvents: []
    };
    componentDidMount() {
        this.props.getRecentEvents();
        this.props.listenNewEvents();
        this.props.listenJobStatus();
    }
    render() {
        return (
            <Card title="实时">
                <Row gutter={16}>
                    <Col lg={18} xs={24}>
                        <Card title="最近事件">
                            <Spin spinning={this.props.isLoading}>
                                {renderEventList(this.props.recentEvents)}
                            </Spin>
                        </Card>
                    </Col>
                    <Col lg={6} xs={24}>
                        <Card title="任务执行">
                            <List
                                itemLayout="horizontal"
                                dataSource={this.props.recentJobs}
                                renderItem={(item: Job) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<a href="https://ant.design">{item.spider}</a>}
                                            description={item.createdAt.toString()}
                                        />
                                        <div>{item.status}</div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Realtime;