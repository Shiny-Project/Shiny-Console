import React from "react";
import { Card, Spin } from "antd";
import dayjs from "dayjs";
import { Chart, Tooltip, Axis, Line } from "viser-react";
import { LatencyGraphResponse } from "types/dashboard";
import "./index.css";

interface Props {
    latencyData: LatencyGraphResponse;
    loading: boolean;
}

function LatencyGraph(props: Props) {
    const scale = [
        {
            dataKey: "time",
            tickCount: 12,
        },
        {
            dataKey: "websocket",
            min: 0,
        },
    ];
    const labelFormatter = {
        formatter: function formatter(text: number | string) {
            return dayjs(text).format("HH:mm");
        },
    };
    return (
        <Spin spinning={props.loading}>
            <Card
                title="中控 - Websocket中继时延"
                bordered={false}
                className="latency-graph-container"
            >
                <Chart
                    forceFit={true}
                    height={300}
                    scale={scale}
                    data={props.latencyData}
                >
                    <Tooltip />
                    <Axis dataKey="time" label={labelFormatter} />
                    <Axis dataKey="websocket" />
                    <Line position="time*websocket" />
                </Chart>
            </Card>
        </Spin>
    );
}

export default LatencyGraph;
