import React from 'react';
import { Card, Spin, Tabs } from 'antd';
import { RecentEventsResponse, Job } from 'types/dashboard';
import JobStatus from 'components/Dashboard/Realtime/JobStatus';
import EventList from 'components/Dashboard/Realtime/EventList';
import './Realtime.css';

export interface Props {
    getRecentEvents: (publishers?: string[]) => void;
    listenNewEvents: () => void;
    listenJobStatus: () => void;
    recentEvents: RecentEventsResponse;
    recentJobs: Job[];
    isLoading: boolean;
}

export interface State {
    listening: boolean;
 }

class Realtime extends React.Component<Props, State> {
    state: State = {
        listening: false
    };
    componentDidMount() {
        this.props.getRecentEvents();
        if (!this.state.listening) {
            this.props.listenNewEvents();
            this.props.listenJobStatus();
            this.setState({listening: true});
        }
    }
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Recent Events" key="1">
                        <Card title="最近事件">
                            <Spin spinning={this.props.isLoading}>
                                <EventList 
                                    recentEvents={this.props.recentEvents} 
                                    getRecentEvents={this.props.getRecentEvents}
                                />
                            </Spin>
                        </Card>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Realtime Job Status" key="2">
                        <JobStatus recentJobs={this.props.recentJobs} />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Realtime;