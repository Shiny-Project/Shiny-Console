import React, { useMemo } from "react";
import { Card, Descriptions, Tabs } from "antd";
import { ShinyEEWEvent } from "types/dashboard";
import EEWParser from "eew-parser";

interface Props {
    event: ShinyEEWEvent;
}

function EEW(props: Props) {
    const { event } = props;
    const { data } = event;
    const { code } = data;
    const parsedCode = useMemo(() => {
        return new EEWParser(code);
    }, [code]);
    console.log(parsedCode);
    return (
        <Card title="电文">
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="解析" key="1">
                    <Descriptions bordered column={3}>
                        <Descriptions.Item label="电文类型" span={3}>
                            {parsedCode.type}
                        </Descriptions.Item>
                        <Descriptions.Item label="发表部门">
                            {parsedCode.forecastOffice}
                        </Descriptions.Item>
                        <Descriptions.Item label="训练标记">
                            {parsedCode.drillType}
                        </Descriptions.Item>
                        <Descriptions.Item label="发表时间">
                            {parsedCode.reportTime.toISOString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="长度">
                            {parsedCode.partNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="继续标记">
                            {parsedCode.isContinue.toString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="地震时间">
                            {parsedCode.earthquakeTime.toISOString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="地震标识符" span={2}>
                            {parsedCode.earthquakeId}
                        </Descriptions.Item>
                        <Descriptions.Item label="发表状态">
                            {parsedCode.status}
                        </Descriptions.Item>
                        <Descriptions.Item label="最终报标记">
                            {parsedCode.isFinal.toString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="预报编号">
                            {parsedCode.forecastNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="震中名称">
                            {parsedCode.epicenterName}
                        </Descriptions.Item>
                        <Descriptions.Item label="震中位置" span={2}>
                            {parsedCode.epicenterCoordinate}
                        </Descriptions.Item>
                        <Descriptions.Item label="震源深度">
                            {parsedCode.depth}km
                        </Descriptions.Item>
                        <Descriptions.Item label="震级">
                            {parsedCode.magnitude}
                        </Descriptions.Item>
                        <Descriptions.Item label="最大预测震度">
                            {parsedCode.maximumSeismicIntensity}
                        </Descriptions.Item>
                        <Descriptions.Item label="震源位置确定度">
                            {parsedCode.epicenterPositionProbability}
                        </Descriptions.Item>
                        <Descriptions.Item label="震源深度确定度">
                            {parsedCode.depthProbability}
                        </Descriptions.Item>
                        <Descriptions.Item label="震级确定度">
                            {parsedCode.magnitudeProbability}
                        </Descriptions.Item>
                        <Descriptions.Item label="震级观测点数">
                            {parsedCode.magnitudeObservePoints}
                        </Descriptions.Item>
                        <Descriptions.Item label="震源位置确定度" span={3}>
                            {parsedCode.hypocenterPositionProbability}
                        </Descriptions.Item>
                        <Descriptions.Item label="海陆位置">
                            {parsedCode.landOrSea}
                        </Descriptions.Item>
                        <Descriptions.Item label="警报标记">
                            {parsedCode.isWarning.toString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="预报方法">
                            {parsedCode.forecastMethod}
                        </Descriptions.Item>
                        <Descriptions.Item label="预报震度变化标记">
                            {parsedCode.isMaximumSeismicIntensityChanged}
                        </Descriptions.Item>
                        <Descriptions.Item label="最大预测震度上升标记">
                            {parsedCode.isMaximumSeismicIntensityIncreased.toString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="最大预测震度下降标记">
                            {parsedCode.isMaximumSeismicIntensityDecreased.toString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="最大预测震度变化理由">
                            {parsedCode.maximumSeismicIntensityChangeReason}
                        </Descriptions.Item>
                    </Descriptions>
                </Tabs.TabPane>
                <Tabs.TabPane tab="原文" key="2">
                    <pre
                        dangerouslySetInnerHTML={{
                            __html: code.replace(/\n/g, "<br>"),
                        }}
                    ></pre>
                </Tabs.TabPane>
            </Tabs>
        </Card>
    );
}

export default EEW;
