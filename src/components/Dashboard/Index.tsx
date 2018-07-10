import React from 'react';
import { Row, Col, Layout, message } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '@/components/Menu/Index';
import ServerNodes from '@/containers/Dashboard/Server/Node';
import ServerApplication from '@/containers/Dashboard/Server/Application';
import Overview from '@/containers/Dashboard/Overview/Overview';
import Realtime from '@/containers/Dashboard/Realtime/Realtime';
import SpiderList from '@/containers/Dashboard/Spider/List';
import SpiderIdentity from '@/containers/Dashboard/Spider/Identity';
import PushHistory from '@/containers/Dashboard/Push/History';
import Config from '@/containers/Dashboard/Server/Config';
import './Index.css';
import { ErrorState } from '@/types';
import Auth from '@/services/auth';
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
    history: {
        location: string;
        push: (path: string, state?: object) => void;
    };
}

class Dashboard extends React.Component<Props, {}> {
    componentWillReceiveProps(nextProps: Props) {
        // tslint:disable-next-line:max-line-length
        if (nextProps.errors.lastError.name !== 'initial_error' && nextProps.errors.errorId !== this.props.errors.errorId) {
            message.error(nextProps.errors.lastError.message);
            if (['need_login', 'need_admin'].includes(nextProps.errors.lastError.name)) {
                Auth.logout();
                this.props.history.push('/');
            }
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
                        <Row gutter={8}>
                            <Col lg={3} xs={24}>
                                <Menu />
                            </Col>
                            <Col lg={21} xs={24} className="dashboard-main-container">
                                <Switch>
                                    <Route exact={true} path="/dashboard" component={RedirectToOverview} />
                                    {/* Overview */}
                                    <Route path="/dashboard/overview" component={Overview} />
                                    {/* Server Control */}
                                    <Route path="/dashboard/server/nodes" component={ServerNodes}/>
                                    <Route path="/dashboard/server/applications" component={ServerApplication}/>
                                    <Route path="/dashboard/server/config" component={Config} />
                                    {/**/}
                                    <Route path="/dashboard/realtime" component={Realtime} />
                                    <Route path="/dashboard/spider/list" component={SpiderList} />
                                    <Route path="/dashboard/spider/identity" component={SpiderIdentity} />
                                    <Route path="/dashboard/push/history" component={PushHistory} />
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