import React from 'react';
import { Card, Select, Spin, Button, Pagination } from 'antd';
import { RecentEventsResponse, Spider, SpiderListResponse } from '@/types/dashboard';
import request from '@/services/request';
import debounce from 'lodash/debounce';
import EventListItem from './EventListItem';
const Option = Select.Option;

interface EventListProps {
    recentEvents: RecentEventsResponse;
    getRecentEvents: (publishers?: string[], page?: number) => void;
}
interface EventListState {
    fetching: boolean;
    data: { text: string, value: string }[];
    value: {key: string, label: string}[];
    currentPage: number;
}
class EventList extends React.Component<EventListProps, EventListState> {
    lastFetchId: number = 0;
    state: EventListState = {
        fetching: false,
        data: [],
        value: [],
        currentPage: 1
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
        } else {
            this.props.getRecentEvents();
        }
        this.setState({
            currentPage: 1
        });
    }
    handlePageChange = (page: number) => {
        if (this.state.value.length > 0) {
            this.props.getRecentEvents(Array.from(this.state.value, v => v.key), page);
        } else {
            this.props.getRecentEvents([], page);
        }
        this.setState({
            currentPage: page
        });
    }
    render() {
        const eventList = this.props.recentEvents.events.map((event) => {
            return (
                <EventListItem event={event} key={event.hash} />
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
                        placeholder="Select Spiders"
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
                    <Button onClick={this.handleFilterApply} className="filter-apply-button">Apply</Button>
                </div>
                {eventList}
                <div>
                    <Pagination 
                        current={this.state.currentPage} 
                        onChange={this.handlePageChange} 
                        total={this.props.recentEvents.total} 
                        pageSize={20} 
                    />
                </div>
            </div>
        );
    }
}

export default EventList;