import * as React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "containers/User/Login/Login";
import createAsyncContainerComponent from "./utils/createAsyncContainerComponent";
import "nprogress/nprogress.css";
import "./App.css";

const AsyncDashboard = createAsyncContainerComponent({
    path: "Dashboard/Index",
});

class App extends React.Component {
    componentDidCatch(error: Error) {
        console.log(error);
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact={true} path="/" component={Login} />
                    <Route path="/dashboard" component={AsyncDashboard} />
                </Switch>
            </Router>
        );
    }
}

export default App;
