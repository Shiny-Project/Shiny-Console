import React from 'react';
import { Card, List } from 'antd';
import { Job } from '@/types/dashboard';
import DataRefreshJob from '@/components/Dashboard/Realtime/Jobs/DataRefreshJob';

interface JobStatusItemProps {
    job: Job;
}

class JobStatusItem extends React.Component<JobStatusItemProps> {
    render() {
        switch (this.props.job.type) {
            case 'data_refresh':
                return <DataRefreshJob job={this.props.job} />;
            default:
                return null;
        }
    }
}

interface Props {
    recentJobs: Job[];
}

class JobStatus extends React.Component<Props> {
    render() {
        return (
            <Card title="任务执行">
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.recentJobs}
                    renderItem={(item: Job) => (
                        <JobStatusItem job={item} />
                    )}
                />
            </Card>
        );
    }
}

export default JobStatus;