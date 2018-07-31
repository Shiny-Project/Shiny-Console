import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Row, Col, Card, Spin, message } from 'antd';
import LoginForm from '@/components/User/Login/LoginForm';
import './Login.css';
import Auth from '@/services/auth';
const { Content } = Layout;

export interface Props {
    isLogin: boolean;
    userName: string;
    login?: (userName: string, password: string) => void;
    loading?: boolean;
}

export interface State {
    isLogin: boolean;
}

class Login extends React.Component<Props, State> {
    state = {
        isLogin: false
    };
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
    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.isLogin) {
            this.setState({
                isLogin: true
            });
        }
    }
    render() {
        if (this.state.isLogin) {
            return (
                <Redirect to="/dashboard" />
            );
        }
        if (Auth.isLogin()) {
            return (
                <Redirect to="/dashboard" />
            );
        }
        return (
            <Layout>
                <Content>
                    <Row type="flex" justify="space-around" align="middle" className="login-container">
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