import { Card, Tabs, Descriptions } from "antd";
import React from "react";
import { ShinyTyphoonInfoEvent } from "types/dashboard";

interface Props {
    event: ShinyTyphoonInfoEvent;
}

const TyphoonInfo: React.FC<Props> = (props) => {
    const { event } = props;
    const { data } = event;
    const { typhoon_data } = data;
    const { current } = typhoon_data;
    return (
        <Card title="台风信息">
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="当前" key="1">
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
                            {current.time}
                        </Descriptions.Item>
                        <Descriptions.Item label="编号">
                            {current.number}
                        </Descriptions.Item>
                        <Descriptions.Item label="日文名">
                            {current.name_ja}
                        </Descriptions.Item>
                        <Descriptions.Item label="英文名">
                            {current.name_en}
                        </Descriptions.Item>
                        <Descriptions.Item label="坐标">
                            {current.coordinate}
                        </Descriptions.Item>
                        <Descriptions.Item label="位置描述" span={2}>
                            {current.location}
                        </Descriptions.Item>
                        <Descriptions.Item label="台风等级">
                            {current.typhoon_class || "/"}
                        </Descriptions.Item>
                        <Descriptions.Item label="强度分级">
                            {current.intensity_class || "/"}
                        </Descriptions.Item>
                        <Descriptions.Item label="大小分级">
                            {current.area_class || "/"}
                        </Descriptions.Item>
                        <Descriptions.Item label="近中心最大风速">
                            {current.near_center_wind_speed}m/s
                        </Descriptions.Item>
                        <Descriptions.Item label="中心气压">
                            {current.pressure}hpa
                        </Descriptions.Item>
                        <Descriptions.Item label="移动速度">
                            {current.move_speed}km/h
                        </Descriptions.Item>
                        <Descriptions.Item label="移动方向">
                            {current.direction}
                        </Descriptions.Item>
                    </Descriptions>
                </Tabs.TabPane>
            </Tabs>
        </Card>
    );
};

export default TyphoonInfo;
