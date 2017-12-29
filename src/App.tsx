import * as React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '@/components/Common/Loading';
import Login from '@/containers/User/Login/Login';
import './App.css';

const AsyncDashboard = Loadable({
  loader: () => import('@/components/Dashboard/Index'),
  loading: Loading
});

class App extends React.Component {
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