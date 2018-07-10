import { combineReducers } from 'redux';
import { user } from './user';
import { errors } from './Dashboard/errors';
import { overview } from './Dashboard/overview';
import { realtime } from './Dashboard/realtime';
import { node } from './Dashboard/Server/node';
import { application } from './Dashboard/Server/application';
import { config } from './Dashboard/Server/config';
import { list } from './Dashboard/Spider/list';
import { identity } from './Dashboard/Spider/identity';
import { pushHistory } from './Dashboard/Push/history';
const rootReducer = combineReducers({
    user,
    dashboard: combineReducers({
        errors,
        overview,
        realtime,
        server: combineReducers({
            node,
            application,
            config
        }),
        spider: combineReducers({
            list,
            identity
        }),
        push: combineReducers({
            history: pushHistory
        })
    }),
});
export default rootReducer;