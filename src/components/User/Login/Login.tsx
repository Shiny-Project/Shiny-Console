import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Row, Col, Card, Spin, message } from 'antd';
import LoginForm from 'components/User/Login/LoginForm';
import './Login.css';
import Auth from 'services/auth';
import { History } from 'history';
const { Content } = Layout;

export interface Props {
    isLogin: boolean;
    userName: string;
    login?: (userName: string, password: string) => void;
    loading?: boolean;
    history: History
}
class Login extends React.Component<Props> {
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
        if (this.props.isLogin || Auth.isLogin()) {
            return (
                this.props.history.location.search ? 
                    <Redirect to={this.props.history.location.search.replace('?returnTo=', '')} /> : 
                    <Redirect to="/dashboard" />
            );
        }
        return (
            <Layout>
                <Content>
                    <Row justify="space-around" align="middle" className="login-container">
                        <Col lg={8} xs={24}>
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