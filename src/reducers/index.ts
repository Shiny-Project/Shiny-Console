import { combineReducers } from 'redux';
import { user } from './user';
import { dashboard } from './dashboard';
const rootReducer = combineReducers({
    user,
    dashboard
});

export default rootReducer;