import * as React from 'react';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import LoginForm from './LoginForm';
import './Login.css';
const { Content } = Layout;

class Login extends React.Component {
    render() {
        return (
            <Layout>
                <Content>
                    <Row type="flex" justify="space-around" align="middle" className="login-container">
                        <Col span={8}>
                            <Card title="Login">
                                <LoginForm />
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default Login;