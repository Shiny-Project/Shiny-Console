import React from "react";
import { Card, Table } from "antd";
import useRequest from "hooks/useRequest";
import { getSpecialPushHistory } from "./services";
import { SpecialPushHistoryItem } from "./types";
import TimeDiff from "components/Common/TimeDiff";

const SpecialPushHistory: React.FC = () => {
    const [specialPushLogs, loading] = useRequest(getSpecialPushHistory);
    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "名称",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "描述",
            key: "description",
            dataIndex: "description",
        },
        {
            title: "最后触发时间",
            key: "last_trigger",
            render: (text: string, record: SpecialPushHistoryItem) => {
                return <TimeDiff time={record.last_trigger} />;
            },
        },
    ];
    return (
        <Card title="特殊推送触发历史" loading={loading}>
            <Table
                columns={columns}
                dataSource={specialPushLogs}
                rowKey="id"
                pagination={false}
            />
        </Card>
    );
};

export default SpecialPushHistory;
