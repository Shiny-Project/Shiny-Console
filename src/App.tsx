import * as React from 'react';
// import Menu from './components/Menu/Index';
import Login from './containers/User/Login/Login';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Login isLogin={false} userName="" />
    );
  }
}

export default App;