import React from 'react';
import { List } from 'antd';
import { Job } from 'types/dashboard';

interface JobStatusItemProps {
    job: Job;
}

class DataRefreshJob extends React.Component<JobStatusItemProps> {
    render() {
        return (
            <List.Item>
                <List.Item.Meta
                    title={<span>数据刷新:{this.props.job.spider}</span>}
                    description={this.props.job.createdAt.toString()}
                />
                <div>
                    <span className={`status-${this.props.job.status}`}>
                        {this.props.job.status === 'success' ? this.props.job.done_by : this.props.job.status}
                    </span>
                </div>
            </List.Item>
        );
    }
}

export default DataRefreshJob;