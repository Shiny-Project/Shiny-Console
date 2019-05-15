import React from 'react';
import { ShinyPushJobLog } from '@/types/dashboard';
import { Table, Divider } from 'antd';
import JSONViewer from '@/components/Common/JSONViewer';

export interface JobLogStatusProps {
    job: ShinyPushJobLog;
}

class JobLogStatus extends React.Component<JobLogStatusProps> {
    render() {
        if (this.props.job.status === 'job_created') {
            return (<span>任务创建</span>);
        }
        if (this.props.job.status === 'finished') {
            return (
                <div>
                    <span className="text-success">任务完成</span>
                    <Divider type="vertical" />
                    <JSONViewer json={JSON.parse(this.props.job.info)}>查看响应</JSONViewer>
                </div>
            );
        }
        if (this.props.job.status === 'upload_image') {
            return (
                <div>
                    <span>上传图片</span>
                    <Divider type="vertical" />
                    <JSONViewer json={JSON.parse(this.props.job.info)}>图片信息</JSONViewer>
                </div>
            );
        }
        if (this.props.job.status === 'upload_image_success') {
            return (
                <div>
                    <span className="text-success">上传图片成功</span>
                    <Divider type="vertical" />
                    <JSONViewer json={JSON.parse(this.props.job.info)}>图片信息</JSONViewer>
                </div>
            );
        }
        if (this.props.job.status === 'retry') {
            return (
                <div>
                    <span className="text-fail">失败重试（第{JSON.parse(this.props.job.info).retry}次）</span>
                    <Divider type="vertical" />
                    <JSONViewer json={JSON.parse(this.props.job.info)}>详细信息</JSONViewer>
                </div>
            );
        }
        return (
            <span>{this.props.job.status}</span>
        );
    }
}

export interface JobLogListProps {
    logs: ShinyPushJobLog[];
}

class JobLogList extends React.Component<JobLogListProps> {
    columns = [{
        title: '日志ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: '操作',
        key: 'status',
        render: (record: ShinyPushJobLog) => <JobLogStatus job={record} />
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