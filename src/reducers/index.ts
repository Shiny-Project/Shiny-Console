import { combineReducers } from 'redux';
import { user } from './user';
import { error } from './Dashboard/error';
import { overview } from './Dashboard/overview';
const rootReducer = combineReducers({
    user,
    dashboard: combineReducers({
        error,
        overview
    }),
    overview
});

export default rootReducer;