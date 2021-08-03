import React from "react";
import { Card, Row, Col, Spin } from "antd";
import { Chart, Tooltip, Axis, Bar, Pie, Coord, Legend } from "viser-react";
import DataSet from "@antv/data-set";
import * as DashboardTypes from "types/dashboard";
import CurrentTime from "./Statistics/CurrentTime";
import LatencyGraph from "./Statistics/LatencyGraph";
import "./index.css";

export interface SpiderCount {
    publisher: string;
    count: number;
}

interface Props {
    isLoading: boolean;
    isLoadingLatencyGraph: boolean;
    statistics: DashboardTypes.StatisticsResponse;
    latencyData: DashboardTypes.LatencyGraphResponse;
    getStatistics: () => void;
    getLatencyData: () => void;
}

class Overview extends React.Component<Props> {
    levelRankingScale = [
        {
            dataKey: "count",
            min: 0,
        },
        {
            dataKey: "level",
            min: 0,
            max: 1,
        },
    ];

    jobStatusScale = [
        {
            dataKey: "percent",
            min: 0,
            formatter: ".0%",
        },
    ];

    processJobStatusData = () => {
        const dv = new DataSet.View().source(this.props.statistics.jobStatus);
        dv.transform({
            type: "percent",
            field: "count",
            dimension: "status",
            as: "percent",
        });
        return dv.rows;
    };

    get dailySuccessRate() {
        if (!this.props.statistics?.jobStatus) {
            return "";
        }
        const successCount =
            this.props.statistics.jobStatus.find(
                (item) => item.status === "success"
            )?.count || 0;
        const totalCount = this.props.statistics.jobStatus.reduce(
            (prev, current) => prev + current.count,
            0
        );
        return `${((successCount / totalCount) * 100).toFixed(2)}%`;
    }

    get dailyJobCount() {
        if (!this.props.statistics?.jobStatus) {
            return "";
        }
        return this.props.statistics.jobStatus.reduce(
            (prev, current) => prev + current.count,
            0
        );
    }

    get dailyEventsCount() {
        if (!this.props.statistics?.jobStatus) {
            return "";
        }
        return this.props.statistics.spiderRanking["1day"].reduce(
            (prev, current) => prev + current.count,
            0
        );
    }

    statisticTimer: NodeJS.Timer;
    latencyTimer: NodeJS.Timer;

    componentDidMount() {
        this.props.getLatencyData();
        this.statisticTimer = setInterval(this.props.getStatistics, 5000);
        this.latencyTimer = setInterval(this.props.getLatencyData, 60000);
        this.props.getStatistics();
    }

    componentWillUnmount() {
        clearInterval(this.statisticTimer);
        clearInterval(this.latencyTimer);
    }

    render() {
        const pieLabel = [
            "percent",
            {
                formatter: (
                    val: string,
                    item: {
                        point: {
                            status: string;
                        };
                    }
                ) => {
                    return item.point.status + ": " + val;
                },
            },
        ];
        const pieStyle = {
            stroke: "#fff",
            lineWidth: 1,
        };
        return (
            <Card title="Overview">
                <Row>
                    <Col lg={24} xs={24}>
                        <div className="time-container">
                            <CurrentTime />
                        </div>
                    </Col>
                </Row>
                <Spin spinning={this.props.isLoading}>
                    <Row>
                        <Col lg={24} xs={24}>
                            <Card title="核心指标" bordered={false}>
                                <Row>
                                    <Col lg={8} xs={24}>
                                        <div className="metrics-block">
                                            <div className="metrics-value">
                                                {this.dailySuccessRate}
                                            </div>
                                            <div className="metrics-desc">
                                                当日任务处理成功率
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={8} xs={24}>
                                        <div className="metrics-block">
                                            <div className="metrics-value">
                                                {this.dailyJobCount}
                                            </div>
                                            <div className="metrics-desc">
                                                当日任务数
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={8} xs={24}>
                                        <div className="metrics-block">
                                            <div className="metrics-value">
                                                {this.dailyEventsCount}
                                            </div>
                                            <div className="metrics-desc">
                                                当日事件数
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Spin>
                <Row gutter={16}>
                    <Col lg={24} xs={24}>
                        <LatencyGraph
                            latencyData={this.props.latencyData}
                            loading={this.props.isLoadingLatencyGraph}
                        />
                    </Col>
                </Row>
                <Spin spinning={this.props.isLoading}>
                    {this.props.statistics && (
                        <Row gutter={16}>
                            <Col lg={12} xs={24}>
                                <Card
                                    title="24小时事件等级分布"
                                    bordered={false}
                                >
                                    <Chart
                                        forceFit={true}
                                        height={300}
                                        scale={this.levelRankingScale}
                                        data={
                                            this.props.statistics.levelRanking
                                        }
                                    >
                                        <Tooltip />
                                        <Axis />
                                        <Bar position="level*count" />
                                    </Chart>
                                </Card>
                            </Col>
                            <Col lg={12} xs={24}>
                                <Card
                                    title="24小时任务处理情况"
                                    bordered={false}
                                >
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
                                            style={pieStyle}
                                            label={pieLabel}
                                        />
                                    </Chart>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Spin>
            </Card>
        );
    }
}

export default Overview;
