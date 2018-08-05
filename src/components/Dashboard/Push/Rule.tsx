import React from 'react';
import { Spin, Card } from 'antd';

export interface Props {
    isLoading: boolean;
}

class PushRule extends React.Component<Props> {
    render() {
        return (
            <Spin spinning={false}>
                <Card title="推送规则">
                    <div />
                </Card>
            </Spin>
        );
    }
}

export default PushRule;