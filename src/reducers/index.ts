import { combineReducers } from 'redux';
import { user } from './user';
import { errors } from './Dashboard/errors';
import { overview } from './Dashboard/overview';
const rootReducer = combineReducers({
    user,
    dashboard: combineReducers({
        errors,
        overview
    }),
});
export default rootReducer;