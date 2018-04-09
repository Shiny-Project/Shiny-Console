import React from 'react';
import { Card } from 'antd';
import { RecentEventsResponse } from '@/types/dashboard';

interface EventListProps {
    recentEvents: RecentEventsResponse;
}
class EventList extends React.Component<EventListProps> {
    render() {
        const eventList = this.props.recentEvents.map((event) => {
            return (
                <div key={event.hash} onClick={(e) => { window.open(event.data.link); }}>
                    <Card
                        className={['event-item', `event-border-${event.level}`].join(' ')}
                        type="inner"
                        hoverable={true}
                    >
                        <Card.Meta
                            title={event.data.title}
                            description={<div dangerouslySetInnerHTML={{ __html: event.data.content }} />}
                            avatar={<img src={event.data.cover} />}
                        />
                    </Card>
                </div>
            );
        });
        return eventList;
    }
}

export default EventList;