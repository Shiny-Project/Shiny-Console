import { combineReducers } from 'redux';
import { user } from './user';
import { errors } from './Dashboard/errors';
import { overview } from './Dashboard/overview';
import { realtime } from './Dashboard/realtime';
import { node } from './Dashboard/Server/node';
import { application } from './Dashboard/Server/application';
const rootReducer = combineReducers({
    user,
    dashboard: combineReducers({
        errors,
        overview,
        realtime,
        server: combineReducers({
            node,
            application
        })
    }),
});
export default rootReducer;