import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '@/reducers';
import { StoreState } from '@/types';
export default function configureStore(initialState: StoreState) {
  const store = createStore<StoreState>(reducers, initialState, applyMiddleware(thunk));
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}