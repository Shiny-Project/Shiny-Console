import Application from '@/components/Dashboard/Server/Application';
import * as actions from '@/actions/dashboard/server/application';
import { StoreState } from '@/types/index';
import { connect } from 'react-redux';
import { ApplicationAction } from '@/actions/dashboard/server/application';
import { ThunkAction } from 'redux-thunk';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
        isLoading: state.dashboard.server.application.isLoading,
        keyPairs: state.dashboard.server.application.keyPairs
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: ApplicationAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getKeyPairs: () => {
            dispatch(actions.getKeyPairs());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Application);