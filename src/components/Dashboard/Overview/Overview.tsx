import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import * as DashboardTypes from '@/types/dashboard';
import { Chart, Tooltip, Axis, Bar, Pie, Coord, Legend } from 'viser-react';
const DataSet = require('@antv/data-set');

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
    jobStatus: DashboardTypes.StatusItem[];
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
        levelRanking: [],
        jobStatus: [],
    };

    levelRankingScale = [{
        dataKey: 'count',
        min: 0,
    }, {
        dataKey: 'level',
        min: 0,
        max: 1,
    }];

    jobStatusScale = [{
        dataKey: 'percent',
        min: 0,
        formatter: '.0%',
    }];

    processJobStatusData = () => {
        const dv = new DataSet.View().source(this.state.jobStatus);
        dv.transform({
            type: 'percent',
            field: 'count',
            dimension: 'status',
            as: 'percent'
        });
        return dv.rows;
    }

    componentDidMount() {
        this.props.getStatistics();
    }
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.statistics) {
            this.setState({
                spiderRanking: nextProps.statistics.spiderRanking,
                levelRanking: nextProps.statistics.levelRanking,
                jobStatus: nextProps.statistics.jobStatus,
            });
        }
    }
    render() {
        return (
            <Card title="Overview">
                <Row gutter={16}>
                    <Col lg={12} xs={24}>
                        <Card title="本月事件等级分布" bordered={false}>
                            <Chart
                                forceFit={true}
                                height={300}
                                scale={this.levelRankingScale}
                                data={this.state.levelRanking}
                            >
                                <Tooltip />
                                <Axis />
                                <Bar position="level*count" />
                            </Chart>
                        </Card>
                    </Col>
                    <Col lg={12} xs={24}>
                        <Card title="本日任务处理情况" bordered={false}>
                            <Chart 
                                forceFit={true} 
                                height={300} 
                                data={this.processJobStatusData()} 
                                scale={this.jobStatusScale}
                            >
                                <Tooltip showTitle={false} />
                                <Coord type="theta" />
                                <Axis />
                                <Legend dataKey="status" />
                                <Pie
                                    position="percent"
                                    color="status"
                                    style={{ stroke: '#fff', lineWidth: 1 }}
                                    label={['percent', {
                                        formatter: (val: string, item: {point: {status: string}}) => {
                                            return item.point.status + ': ' + val;
                                        }
                                    }]}
                                />
                            </Chart>
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