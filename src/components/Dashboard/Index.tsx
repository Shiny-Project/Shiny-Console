import React from 'react';
import { Row, Col, Layout, message } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from 'components/Menu/Index';
import './Index.css';
import { ErrorState } from 'types';
import Auth from 'services/auth';
import createAsyncComponent from 'utils/createAsyncComponent';
const { Header, Content } = Layout;

class RedirectToOverview extends React.Component {
    render() {
        return (
            <Redirect to="/dashboard/overview" />
        );
    }
}

const AsyncServerNodes = createAsyncComponent('Dashboard/Server/Node');
const AsyncServerApplication = createAsyncComponent('Dashboard/Server/Application');
const AsyncOverview = createAsyncComponent('Dashboard/Overview/Overview');
const AsyncRealtime = createAsyncComponent('Dashboard/Realtime/Realtime');
const AsyncSpiderList = createAsyncComponent('Dashboard/Spider/List');
const AsyncSpiderIdentity = createAsyncComponent('Dashboard/Spider/Identity');
const AsyncPushHistory = createAsyncComponent('Dashboard/Push/History');
const AsyncPushAccount = createAsyncComponent('Dashboard/Push/Account');
const AsyncPushRule = createAsyncComponent('Dashboard/Push/Rule');
const AsyncConfig = createAsyncComponent('Dashboard/Server/Config');

export interface Props {
    errors?: ErrorState;
    raiseError: (error: Error) => void;
    history: {
        location: string;
        push: (path: string, state?: object) => void;
    };
}

class Dashboard extends React.Component<Props, {}> {
    componentDidUpdate(prevProps: Props) {
        // tslint:disable-next-line:max-line-length
        if (this.props.errors.lastError.name !== 'initial_error' && prevProps.errors.errorId !== this.props.errors.errorId) {
            message.error(this.props.errors.lastError.message);
            if (['need_login', 'need_admin'].includes(this.props.errors.lastError.name)) {
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
                                    <Route path="/dashboard/overview" component={AsyncOverview} />
                                    {/* Server Control */}
                                    <Route path="/dashboard/server/nodes" component={AsyncServerNodes}/>
                                    <Route path="/dashboard/server/applications" component={AsyncServerApplication}/>
                                    <Route path="/dashboard/server/config" component={AsyncConfig} />
                                    {/**/}
                                    <Route path="/dashboard/realtime" component={AsyncRealtime} />
                                    <Route path="/dashboard/spider/list" component={AsyncSpiderList} />
                                    <Route path="/dashboard/spider/identity" component={AsyncSpiderIdentity} />
                                    {/* Push */}
                                    <Route path="/dashboard/push/history" component={AsyncPushHistory} />
                                    <Route path="/dashboard/push/account" component={AsyncPushAccount} />
                                    <Route path="/dashboard/push/rule" component={AsyncPushRule} />
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