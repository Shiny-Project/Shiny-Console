import React from 'react';
import { Row, Col, Layout, message } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '@/components/Menu/Index';
import ServerNodes from '@/containers/Dashboard/Server/Node';
import Overview from '@/containers/Dashboard/Overview/Overview';
import Realtime from '@/containers/Dashboard/Realtime/Realtime';
import './Index.css';
import { ErrorState } from '@/types';
const { Header, Content } = Layout;

class RedirectToOverview extends React.Component {
    render() {
        return (
            <Redirect to="/dashboard/overview" />
        );
    }
}

export interface Props {
    errors?: ErrorState;
    raiseError: (error: Error) => void;
}

class Dashboard extends React.Component<Props, {}> {
    componentWillReceiveProps(nextProps: Props) {
        // tslint:disable-next-line:max-line-length
        if (nextProps.errors.lastError.name !== 'initial_error' && nextProps.errors.errorId !== this.props.errors.errorId) {
            message.error(nextProps.errors.lastError.message);
        }
    }
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
                                    <Route path="/dashboard/realtime" component={Realtime} />
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