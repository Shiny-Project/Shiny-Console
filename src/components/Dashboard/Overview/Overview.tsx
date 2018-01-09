import React from 'react';
import { Card, Row, Col, Table } from 'antd';

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
class Overview extends React.Component<{}, {}> {
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