import React from 'react';
import { Card, Row, Col, Icon, Spin } from 'antd';
import { RecentEventsResponse } from '@/types/dashboard';
import { Link } from 'react-router-dom';
import './Realtime.css';

const { Meta } = Card;

export interface Props {
    getRecentEvents: () => void;
    listenNewEvents: () => void;
    recentEvents: RecentEventsResponse;
    isLoading: boolean;
}

export interface State {
    recentEvents: RecentEventsResponse;
}

const renderEventList = (recentEvents: RecentEventsResponse) => {
    const eventList = recentEvents.map((event) => {
        return (
            <div key={event.id} onClick={(e) => { window.open(event.data.link); }}>
                <Card 
                    className={['event-item', `event-border-${event.level}`].join(' ')}
                    type="inner"
                    hoverable={true}
                    key={event.hash}
                >
                    <Meta
                        title={event.data.title}
                        description={event.data.content}
                        avatar={<img src={event.data.cover} />}
                    />
                </Card>
            </div>
        );
    });
    return eventList;
};

class Realtime extends React.Component<Props, State> {
    state: State = {
        recentEvents: []
    };
    componentDidMount() {
        this.props.getRecentEvents();
        this.props.listenNewEvents();
    }
    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            recentEvents: nextProps.recentEvents
        });
    }
    render() {
        return (
            <Card title="实时">
                <Row gutter={16}>
                    <Col lg={18} xs={24}>
                        <Card title="最近事件">
                            <Spin spinning={this.props.isLoading}>
                                {renderEventList(this.state.recentEvents)}
                            </Spin>
                        </Card>
                    </Col>
                    <Col lg={6} xs={24}>
                        <Card title="任务执行" />
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Realtime;