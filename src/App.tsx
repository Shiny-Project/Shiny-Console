import * as React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import Login from '@/containers/User/Login/Login';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact={true} path="/" component={Login} />
      </Router>
    );
  }
}

export default App;