import { combineReducers } from 'redux';
import { user } from './user';
import { errors } from './Dashboard/errors';
import { overview } from './Dashboard/overview';
import { realtime } from './Dashboard/realtime';
const rootReducer = combineReducers({
    user,
    dashboard: combineReducers({
        errors,
        overview,
        realtime
    }),
});
export default rootReducer;