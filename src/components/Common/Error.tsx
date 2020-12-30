import * as React from 'react';
import { Layout, Row, Col, Card } from 'antd';
export interface Props {
    message: string;
}
const { Content } = Layout;

class ErrorPage extends React.Component<Props, {}> {
    render() {
        return (
            <Layout>
                <Content>
                    <Row justify="space-around" align="middle" className="login-container">
                        <Col span={8}>
                            <Card title="Error">
                                <p>{this.props.message}</p>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default ErrorPage;