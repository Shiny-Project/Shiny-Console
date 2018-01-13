import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import * as DashboardTypes from '@/types/dashboard';
import { Chart, Tooltip, Axis, Bar } from 'viser-react';

export interface SpiderCount {
    publisher: string;
    count: number;
}

const spiderRankingColumns = [{
    title: 'Spider Name',
    dataIndex: 'publisher',
    key: 'name',
}, {
    title: '计数',
    dataIndex: 'count',
    key: 'count',
}];

interface State {
    spiderRanking: DashboardTypes.SpiderRanking;
    levelRanking: DashboardTypes.LevelRankingItem[];
}

interface Props {
    isLoading: boolean;
    statistics: DashboardTypes.StatisticsResponse;
    getStatistics: () => void;
}

class Overview extends React.Component<Props, State> {
    state: State = {
        spiderRanking: {
            '1day': [],
            '3days': [],
            '21days': [],
        },
        levelRanking: []
    };

    componentDidMount() {
        this.props.getStatistics();
    }
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.statistics) {
            this.setState({
                spiderRanking: nextProps.statistics.spiderRanking
            });
        }
    }
    render() {
        return (
            <Card title="Overview">
                <Row gutter={16}>
                    <Col lg={12} xs={24}>
                        <Card title="本月事件等级分布">
                            {/* <Chart forceFit={true} height={400} data={this.props.statistics.levelRanking}>
                                <Tooltip />
                                <Axis />
                                <Bar position="year*sales" />
                            </Chart> */}
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col lg={8} xs={24}>
                        <Card title="近1日" bordered={false}>
                            <Table
                                dataSource={this.state.spiderRanking['1day']}
                                columns={spiderRankingColumns}
                                pagination={false}
                                rowKey="publisher"
                            />
                        </Card>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Card title="近3日" bordered={false}>
                            <Table
                                dataSource={this.state.spiderRanking['3days']}
                                columns={spiderRankingColumns}
                                pagination={false}
                                rowKey="publisher"
                            />
                        </Card>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Card title="近21日" bordered={false}>
                            <Table
                                dataSource={this.state.spiderRanking['21days']}
                                columns={spiderRankingColumns}
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