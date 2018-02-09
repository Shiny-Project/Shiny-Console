import { combineReducers } from 'redux';
import { user } from './user';
import { errors } from './Dashboard/errors';
import { overview } from './Dashboard/overview';
import { realtime } from './Dashboard/realtime';
import { node } from './Dashboard/Server/node';
const rootReducer = combineReducers({
    user,
    dashboard: combineReducers({
        errors,
        overview,
        realtime,
        server: combineReducers({
            node
        })
    }),
});
export default rootReducer;