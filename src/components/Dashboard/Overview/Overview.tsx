import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import { StatisticsResponse } from '@/types/dashboard';

export interface SpiderCount {
    publisher: string;
    count: number;
}

const dataSource: SpiderCount[] = [];

const recentTableColumns = [{
    title: 'Spider Name',
    dataIndex: 'publisher',
    key: 'name',
}, {
    title: '计数',
    dataIndex: 'count',
    key: 'count',
}];

interface State {
    spiderRecentRanking: StatisticsResponse;
}

interface Props {
    isLoading: boolean;
    statistics: StatisticsResponse;
    getStatistics: () => void;
}

class Overview extends React.Component<Props, State> {
    componentDidMount() {
        this.props.getStatistics();
    }
    componentWillReceiveProps(nextProps: Props) {
        console.log(nextProps);
    }
    render() {
        return (
            <Card title="Overview">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="近1日" bordered={false}>
                            <Table dataSource={dataSource} columns={recentTableColumns} pagination={false} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="近3日" bordered={false}>
                            <Table dataSource={dataSource} columns={recentTableColumns} pagination={false} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="近21日" bordered={false}>
                            <Table dataSource={dataSource} columns={recentTableColumns} pagination={false} />
                        </Card>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Overview;