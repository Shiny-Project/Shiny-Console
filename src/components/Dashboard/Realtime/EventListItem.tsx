import React from 'react';
import request from 'services/request';
import { Card, Divider } from 'antd';
import { ShinyEvent, ShinyEventDetail } from 'types/dashboard';
import EventListItemDetail from './EventListItemDetail';

export interface EventListItemProps {
    event: ShinyEvent;
}
export interface EventListItemState {
    showDetail: boolean;
    detailLoading: boolean;
    eventDetail: ShinyEventDetail;
}
/**
 * Shiny Event List Item
 */
class EventListItem extends React.Component<EventListItemProps, EventListItemState> {
    constructor(props: EventListItemProps) {
        super(props);
        this.state = {
            showDetail: false,
            detailLoading: false,
            eventDetail: undefined
        };
    }
    toggleDetailPanel = async () => {
        if (!this.state.eventDetail) {
            // Load event detail
            this.setState({
                detailLoading: true
            });
            this.setState({
                eventDetail: await request.get<ShinyEventDetail>('/Data/detail', {
                    eventId: this.props.event.id
                })
            });
        }
        this.setState({
            showDetail: !this.state.showDetail
        });
    }
    render() {
        return (
            <div>
                <Card
                    className={['event-item', `event-border-${this.props.event.level}`].join(' ')}
                    type="inner"
                    hoverable={true}
                >
                    <div onClick={this.toggleDetailPanel}>
                        <Card.Meta
                            title={this.props.event.data.title}
                            description={<div dangerouslySetInnerHTML={{ __html: this.props.event.data.content }} />}
                            avatar={<img src={this.props.event.data.cover} alt="事件封面" className="event-cover" />}
                        />
                    </div>
                    {this.state.showDetail
                        ? (
                            <div className="event-detail-container">
                                <Divider>详情</Divider>
                            <EventListItemDetail event={this.props.event} eventDetail={this.state.eventDetail} />
                            </div>
                        ) : ''
                    }
                </Card>
            </div>

        );
    }
}

export default EventListItem;