import React from "react";
import { Row, Col, Layout, message } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import { History } from "history";
import { ErrorState } from "types";
import Auth from "services/auth";
import createAsyncContainerComponent from "utils/createAsyncContainerComponent";
import createAsyncComponent from "utils/createAsyncComponent";
import { ErrorStateContext } from "hooks/useErrorState";
import Menu from "components/Menu/Index";
import "./Index.css";

const { Header, Content } = Layout;

class RedirectToOverview extends React.Component {
    render() {
        return <Redirect to="/dashboard/overview" />;
    }
}

const AsyncServerNodes = createAsyncContainerComponent({
    path: "Dashboard/Server/Node",
});
const AsyncServerApplication = createAsyncContainerComponent({
    path: "Dashboard/Server/Application",
});
const AsyncOverview = createAsyncContainerComponent({
    path: "Dashboard/Overview/Overview",
});
const AsyncRealtime = createAsyncContainerComponent({
    path: "Dashboard/Realtime/Realtime",
});
const AsyncSpiderList = createAsyncContainerComponent({
    path: "Dashboard/Spider/List",
});
const AsyncSpiderIdentity = createAsyncContainerComponent({
    path: "Dashboard/Spider/Identity",
});
const AsyncPushAccount = createAsyncContainerComponent({
    path: "Dashboard/Push/Account",
});
const AsyncPushRule = createAsyncContainerComponent({
    path: "Dashboard/Push/Rule",
});
const AsyncConfig = createAsyncContainerComponent({
    path: "Dashboard/Server/Config",
});
const AsyncDeployRepository = createAsyncContainerComponent({
    path: "Dashboard/Deploy/Repository",
});
const AsyncEventDetailPage = createAsyncComponent({
    path: "pages/EventDetail",
});
const AsyncManualPushPage = createAsyncComponent({
    path: "pages/ManualPush",
});
const AsyncEffect = createAsyncComponent({
    path: "pages/Effect",
});

export interface Props {
    errors?: ErrorState;
    raiseError: (error: Error) => void;
    history: History;
}

class Dashboard extends React.Component<Props, {}> {
    componentDidUpdate(prevProps: Props) {
        if (
            this.props.errors.lastError.name !== "initial_error" &&
            prevProps.errors.errorId !== this.props.errors.errorId
        ) {
            message.error(this.props.errors.lastError.message);
            if (
                ["need_login", "need_admin"].includes(
                    this.props.errors.lastError.name
                )
            ) {
                Auth.logout();
                this.props.history.push(
                    `/?returnTo=${this.props.history.location.pathname}`
                );
            }
        }
    }
    render() {
        return (
            <ErrorStateContext.Provider
                value={{
                    errors: this.props.errors,
                    raiseError: this.props.raiseError,
                    history: this.props.history,
                }}
            >
                <Layout>
                    <Header>
                        <h2 className="logo">Shiny Console</h2>
                    </Header>
                    <Content>
                        <Row gutter={8}>
                            <Col lg={3} xs={24}>
                                <Menu />
                            </Col>
                            <Col
                                lg={21}
                                xs={24}
                                className="dashboard-main-container"
                            >
                                <Switch>
                                    <Route
                                        exact={true}
                                        path="/dashboard"
                                        component={RedirectToOverview}
                                    />
                                    {/* Overview */}
                                    <Route
                                        path="/dashboard/overview"
                                        component={AsyncOverview}
                                    />
                                    {/* Server Control */}
                                    <Route
                                        path="/dashboard/server/nodes"
                                        component={AsyncServerNodes}
                                    />
                                    <Route
                                        path="/dashboard/server/applications"
                                        component={AsyncServerApplication}
                                    />
                                    <Route
                                        path="/dashboard/server/config"
                                        component={AsyncConfig}
                                    />
                                    <Route
                                        path="/dashboard/server/effect"
                                        component={AsyncEffect}
                                    />
                                    {/**/}
                                    <Route
                                        path="/dashboard/realtime"
                                        component={AsyncRealtime}
                                    />
                                    <Route
                                        path="/dashboard/spider/list"
                                        component={AsyncSpiderList}
                                    />
                                    <Route
                                        path="/dashboard/spider/identity"
                                        component={AsyncSpiderIdentity}
                                    />
                                    <Route
                                        path="/dashboard/push/account"
                                        component={AsyncPushAccount}
                                    />
                                    <Route
                                        path="/dashboard/push/rule"
                                        component={AsyncPushRule}
                                    />
                                    {/* Pages - ManualPush */}
                                    <Route
                                        path="/dashboard/push/manual_push"
                                        component={AsyncManualPushPage}
                                    />
                                    {/* Deploy */}
                                    <Route
                                        path="/dashboard/deploy/repository"
                                        component={AsyncDeployRepository}
                                    />
                                    {/* Pages - EventDetail */}
                                    <Route
                                        path="/dashboard/event/:id"
                                        component={AsyncEventDetailPage}
                                    />
                                </Switch>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </ErrorStateContext.Provider>
        );
    }
}

export default Dashboard;
