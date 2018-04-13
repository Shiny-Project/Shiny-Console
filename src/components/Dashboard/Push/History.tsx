import React from 'react';
import { Spin, Card, Table, Button, Popover, Modal } from 'antd';
import { PushHistoryResponse, Job, PushJob } from '@/types/dashboard';
import PushJobStatus from './PushJobStatus';
import PushChannel from '@/components/Dashboard/Push/PushChannel';

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
        dataIndex: 'info.text',
        key: 'info.text'
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
                <a
                    onClick={() => {
                        Modal.info({
                            title: '响应内容',
                            content: (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            `<pre>${JSON.stringify(JSON.parse(record.info.response), null, 2)}</pre>`
                                    }} 
                                />
                            ),
                            width: '80vw',
                            iconType: ''
                        });
                    }}
                >
                    查看响应内容
                </a>
            );
        }
    }, {
        title: '推送时间',
        dataIndex: 'createdAt',
        key: 'createdAt'
    }];
    componentDidMount() {
        this.props.getPushHistory();
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
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