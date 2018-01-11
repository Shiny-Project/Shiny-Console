import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import { StatisticsResponse } from '@/types/dashboard';

export interface SpiderCount {
    publisher: string;
    count: number;
}

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
    state = {
        spiderRecentRanking: {
            '1day': [],
            '3days': [],
            '21days': [],
        }
    };

    componentDidMount() {
        this.props.getStatistics();
    }
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.statistics) {
            this.setState({
                spiderRecentRanking: nextProps.statistics
            });
        }
    }
    render() {
        return (
            <Card title="Overview">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="近1日" bordered={false}>
                            <Table
                                dataSource={this.state.spiderRecentRanking['1days']}
                                columns={recentTableColumns}
                                pagination={false}
                                rowKey="publisher"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="近3日" bordered={false}>
                            <Table
                                dataSource={this.state.spiderRecentRanking['3days']}
                                columns={recentTableColumns}
                                pagination={false}
                                rowKey="publisher"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="近21日" bordered={false}>
                            <Table
                                dataSource={this.state.spiderRecentRanking['21days']}
                                columns={recentTableColumns}
                                pagination={false}
                                rowKey="publisher"
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Overview;