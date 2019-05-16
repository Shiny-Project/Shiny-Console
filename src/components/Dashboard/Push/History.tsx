import React from 'react';
import { Spin, Card, Table, Button, Popover, Modal, Alert } from 'antd';
import { PushHistoryResponse, Job, PushJob } from '@/types/dashboard';
import PushJobStatus from '@/components/Dashboard/Push/PushJobStatus';
import PushChannel from '@/components/Dashboard/Push/PushChannel';
import TimeDiff from '@/components/Common/TimeDiff';
import JSONViewer from '@/components/Common/JSONViewer';

interface Props {
    isLoading: boolean;
    pushHistory: PushHistoryResponse;
    getPushHistory: () => void;
}
interface State {
    responseModalVisible: boolean;
    response: string;
}

class PushHistory extends React.Component<Props, State> {
    state: State = {
        responseModalVisible: false,
        response: ''
    };
    pushHistoryColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: '状态',
        key: 'status',
        render: (text: string, record: PushJob) => {
            return <PushJobStatus status={record.status} />;
        }
    }, {
        title: '推送内容',
        key: 'info.text',
        render: (text: string, record: PushJob) => {
            return (
                <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                    {record.info.text}
                </div>
            );
        },
        width: 800
    }, {
        title: '渠道',
        key: 'info.channel',
        render: (text: string, record: PushJob) => {
            return <PushChannel channel={record.info.channel} />;
        }
    }, {
        title: '账号',
        dataIndex: 'info.account',
        key: 'info.account'
    }, {
        title: '响应',
        key: 'response',
        render: (text: string, record: PushJob) => {
            return (
                <JSONViewer json={JSON.parse(record.info.response)}>查看响应内容</JSONViewer>
            );
        }
    }, {
        title: '推送时间',
        key: 'createdAt',
        render: (text: string, record: PushJob) => {
            return <TimeDiff time={record.createdAt} />;
        }
    }];
    componentDidMount() {
        this.props.getPushHistory();
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Alert
                    message="本页面已经废弃，请前往「实时」面板查看各个事件的推送任务。"
                    banner={true}
                    closable={true}
                />
                <Card title="推送历史">
                    <Table
                        dataSource={this.props.pushHistory.jobs}
                        columns={this.pushHistoryColumns}
                        pagination={false}
                        rowKey={'id'}
                    />
                </Card>
            </Spin>
        );
    }
}

export default PushHistory;