import React from 'react';
import { Card, Select, Spin, Button } from 'antd';
import { RecentEventsResponse, Spider, SpiderListResponse } from '@/types/dashboard';
import request from '@/services/request';
import debounce from 'lodash/debounce';
const Option = Select.Option;

interface EventListProps {
    recentEvents: RecentEventsResponse;
    getRecentEvents: (publishers?: string[]) => void;
}
interface EventListState {
    fetching: boolean;
    data: { text: string, value: string }[];
    value: {key: string, label: string}[];
}
class EventList extends React.Component<EventListProps, EventListState> {
    lastFetchId: number = 0;
    state: EventListState = {
        fetching: false,
        data: [],
        value: []
    };

    constructor(props: EventListProps) {
        super(props);
        this.fetchSpiders = debounce(this.fetchSpiders, 500);
    }

    fetchSpiders = (): void => {
        this.setState({
            fetching: true,
            data: []
        });
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        request.get<SpiderListResponse>('/Spider/list').then(spiderList => {
            if (fetchId !== this.lastFetchId) {
                return;
            }
            const data: { text: string, value: string }[] = [];
            spiderList.forEach(spider => {
                data.push({
                    text: `${spider.name} / ${spider.description}`,
                    value: spider.name
                });
            });
            this.setState({
                fetching: false,
                data
            });
        });
    }
    handleChange = (value: {key: string, label: string}[]) => {
        this.setState({
            value
        });
    }
    handleFilterApply = (): void => {
        if (this.state.value.length > 0) {
            this.props.getRecentEvents(Array.from(this.state.value, v => v.key));
        }
    }
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
        const { fetching, data, value } = this.state;
        return (
            <div>
                <div className="events-filter">
                    <Select
                        mode="multiple"
                        labelInValue={true}
                        value={value}
                        placeholder="Select users"
                        notFoundContent={fetching ? <Spin size="small" /> : null}
                        filterOption={true}
                        onSearch={this.fetchSpiders}
                        onChange={this.handleChange}
                        style={{ width: '30%' }}
                    >
                        {data.map(d => {
                            return <Option key={d.value}>{d.text}</Option>;
                        })}
                    </Select>
                    <Button onClick={this.handleFilterApply}>Apply</Button>
                </div>
                {eventList}
            </div>
        );
    }
}

export default EventList;