import React from 'react';
import { Row, Col, Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '@/components/Menu/Index';
import './Index.css';
const { Header, Content } = Layout;

class RedirectToOverview extends React.Component {
    render() {
        return (
            <Redirect to="/dashboard/overview" />
        );
    }
}

export interface Props {
    error?: Error;
    raiseError: (error: Error) => void;
}

class Dashboard extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <h2 className="logo">Shiny-Console</h2>
                    </Header>
                    <Content>
                        <Row gutter={16}>
                            <Col span={4}>
                                <Menu />
                            </Col>
                            <Col span={20}>
                                <Switch>
                                    <Route exact={true} path="/dashboard" component={RedirectToOverview} />
                                </Switch>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default Dashboard;