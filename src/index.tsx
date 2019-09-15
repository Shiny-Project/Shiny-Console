import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'App';
import registerServiceWorker from 'registerServiceWorker';
import configureStore from 'stores/configureStore';
import initState from 'stores/initState';
import './index.css';

const store = configureStore(initState);
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
