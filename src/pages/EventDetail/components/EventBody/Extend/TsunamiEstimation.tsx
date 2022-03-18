import { Card, Table } from "antd";
import React from "react";
import { ShinyTsunamiEstimationEvent } from "types/dashboard";

interface Props {
    event: ShinyTsunamiEstimationEvent;
}

const TsunamiEstimation: React.FC<Props> = (props) => {
    const { event } = props;
    const columns = [
        {
            title: "观测点名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "到达时间",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "预测海啸高度",
            dataIndex: "height",
            key: "height",
        },
    ];
    return (
        <Card title="海啸到达时间和高度预测">
            <Table columns={columns} dataSource={event.data.estimation}></Table>
        </Card>
    );
};

export default TsunamiEstimation;
