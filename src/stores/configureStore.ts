import { createStore } from 'redux';
import { auth } from '../reducers';
import { StoreState } from '../types/index';
export default function configureStore(initialState: StoreState) {
  const store = createStore<StoreState>(auth, initialState);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}