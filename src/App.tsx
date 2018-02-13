import * as React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '@/components/Common/Loading';
import Login from '@/containers/User/Login/Login';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import './App.css';

const createAsyncComp = (path: string) => {
  return Loadable({
    loader: () => {
      const promise = import(`./containers/${path}`);
      nprogress.start();
      promise.then(() => {
        nprogress.done();
      });
      return promise;
    },
    loading: Loading,
  });
};

const AsyncDashboard = createAsyncComp('Dashboard/Index');

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