import { memo } from "react";
import { Card, Spin } from "antd";
import dayjs from "dayjs";
import { Chart, Tooltip, Axis, Line } from "viser-react";
import { LatencyGraphResponse } from "types/dashboard";
import "./index.css";

interface Props {
    latencyData: LatencyGraphResponse;
    loading: boolean;
}

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

function LatencyGraph(props: Props) {
    const { loading, latencyData } = props;

    return (
        <Spin spinning={loading}>
            <Card
                title="中控 - Websocket中继时延"
                bordered={false}
                className="latency-graph-container"
            >
                <Chart
                    forceFit={true}
                    height={300}
                    scale={scale}
                    data={latencyData}
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

export default memo(LatencyGraph);
