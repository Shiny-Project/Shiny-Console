import { Card, Table } from "antd";
import React from "react";
import { ShinyTsunamiObservationEvent } from "types/dashboard";

interface Props {
    event: ShinyTsunamiObservationEvent;
}

const TsunamiObservation: React.FC<Props> = (props) => {
    const { event } = props;
    const columns = [
        {
            title: "观测点名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "观测时间",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "海啸高度",
            dataIndex: "height",
            key: "height",
        },
    ];
    console.log(event)
    return (
        <Card title="观测情报">
            <Table columns={columns} dataSource={event.data.observation}></Table>
        </Card>
    );
};

export default TsunamiObservation;
