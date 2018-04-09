import React from 'react';
import { Card, List } from 'antd';
import { Job } from '@/types/dashboard';

interface JobStatusItemProps {
    job: Job;
}
class JobStatusItem extends React.Component<JobStatusItemProps> {
    render() {
        return  (
            <span className={`status-${this.props.job.status}`}>
                {this.props.job.status === 'success' ? this.props.job.done_by : this.props.job.status}
            </span>
        );
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
                        <List.Item>
                            <List.Item.Meta
                                title={<span>数据刷新:{item.spider}</span>}
                                description={item.createdAt.toString()}
                            />
                            <div>
                                <JobStatusItem job={item} />
                            </div>
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}

export default JobStatus;