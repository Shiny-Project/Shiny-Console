import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { StoreState } from '../types/index';
export default function configureStore(initialState: StoreState) {
  // const store = createStore<StoreState>(reducers, initialState);
  // 该泛型定义似乎由于 Redux 定义文件 Bug 无法使用
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}