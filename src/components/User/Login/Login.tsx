import * as React from 'react';
import { Layout, Row, Col, Card, Spin, message } from 'antd';
import LoginForm from './LoginForm';
import './Login.css';
const { Content } = Layout;

export interface Props {
    isLogin: boolean;
    userName: string;
    login?: (userName: string, password: string) => void;
    loading?: boolean;
}

class Login extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(userName: string, password: string) {
        if (!userName || !password) {
            return message.error('缺少必要参数');
        }
        return this.props.login && this.props.login(userName, password);
    }
    render() {
        return (
            <Layout>
                <Content>
                    <Row type="flex" justify="space-around" align="middle" className="login-container">
                        <Col span={8}>
                            <Spin spinning={this.props.loading}>
                                <Card title="Login">
                                    <LoginForm handleLogin={this.handleLogin} />
                                </Card>
                            </Spin>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default Login;