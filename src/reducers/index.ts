import { combineReducers } from 'redux';
import { user } from './user';
import { errors } from './Dashboard/errors';
import { overview } from './Dashboard/overview';
import { realtime } from './Dashboard/realtime';
import { node } from './Dashboard/Server/node';
import { application } from './Dashboard/Server/application';
import { list } from './Dashboard/Spider/list';
const rootReducer = combineReducers({
    user,
    dashboard: combineReducers({
        errors,
        overview,
        realtime,
        server: combineReducers({
            node,
            application
        }),
        spider: combineReducers({
            list
        })
    }),
});
export default rootReducer;