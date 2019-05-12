import React from 'react';
import { ShinyPushJobLog } from '@/types/dashboard';
import { Table } from 'antd';

export interface JobLogListProps {
    logs: ShinyPushJobLog[];
}

class JobLogList extends React.Component<JobLogListProps> {
    columns = [{
        title: '任务ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: '时间',
        dataIndex: 'createdAt',
        key: 'createdAt'
    }];
    render() {
        return (
            <Table 
                dataSource={this.props.logs}
                columns={this.columns}
                pagination={false}
                rowKey="id"
            />
        );
    }
}

export default JobLogList;