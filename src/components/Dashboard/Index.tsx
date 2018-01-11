import React from 'react';
import { Row, Col, Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '@/components/Menu/Index';
import ServerNodes from './Server/Node';
import Overview from '@/containers/Dashboard/Overview/Overview';
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
                            <Col lg={4} xs={24}>
                                <Menu />
                            </Col>
                            <Col lg={20} xs={24} className="dashboard-main-container">
                                <Switch>
                                    <Route exact={true} path="/dashboard" component={RedirectToOverview} />
                                    {/* Overview */}
                                    <Route path="/dashboard/overview" component={Overview} />
                                    {/* Server Control */}
                                    <Route path="/dashboard/server/nodes" component={ServerNodes}/>
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