import { Card, Tabs, Descriptions } from "antd";
import Coordinate from "components/Common/Coordinate";
import React from "react";
import { ShinyTyphoonInfoEvent, ShinyTyphoonInfoItem } from "types/dashboard";

interface Props {
    event: ShinyTyphoonInfoEvent;
}

const TyphoonInfoItem: React.FC<{ data: ShinyTyphoonInfoItem }> = (props: {
    data: ShinyTyphoonInfoItem;
}) => {
    const { data } = props;
    return (
        <Descriptions
            bordered
            column={{
                xxl: 4,
                xl: 3,
                lg: 3,
                md: 3,
                sm: 2,
                xs: 1,
            }}
            size="small"
        >
            <Descriptions.Item label="时间" span={3}>
                {data.time}
            </Descriptions.Item>
            <Descriptions.Item label="编号">{data.number}</Descriptions.Item>
            <Descriptions.Item label="日文名">{data.name_ja}</Descriptions.Item>
            <Descriptions.Item label="英文名">{data.name_en}</Descriptions.Item>
            <Descriptions.Item label="坐标">
                <Coordinate coordinate={data.coordinate} />
            </Descriptions.Item>
            <Descriptions.Item label="位置描述" span={2}>
                {data.location}
            </Descriptions.Item>
            <Descriptions.Item label="台风等级">
                {data.typhoon_class || "/"}
            </Descriptions.Item>
            <Descriptions.Item label="强度分级">
                {data.intensity_class || "/"}
            </Descriptions.Item>
            <Descriptions.Item label="大小分级">
                {data.area_class || "/"}
            </Descriptions.Item>
            <Descriptions.Item label="近中心最大风速">
                {data.near_center_wind_speed}m/s
            </Descriptions.Item>
            <Descriptions.Item label="中心气压">
                {data.pressure}hpa
            </Descriptions.Item>
            <Descriptions.Item label="移动速度">
                {data.move_speed}km/h
            </Descriptions.Item>
            <Descriptions.Item label="移动方向">
                {data.direction}
            </Descriptions.Item>
        </Descriptions>
    );
};

const TyphoonInfo: React.FC<Props> = (props) => {
    const { event } = props;
    const { data } = event;
    const { typhoon_data } = data;
    const { current, estimations } = typhoon_data;
    return (
        <Card title="台风信息">
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="当前" key="1">
                    <TyphoonInfoItem data={current} />
                </Tabs.TabPane>
                {estimations.map((estimation, index) => (
                    <Tabs.TabPane
                        tab={`${estimation.time}（预测）`}
                        key={`${index + 2}`}
                    >
                        <TyphoonInfoItem data={estimation} />
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </Card>
    );
};

export default TyphoonInfo;
