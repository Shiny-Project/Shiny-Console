import { ThunkAction } from 'redux-thunk';
import { StoreState } from '.';
import { Action } from 'redux';
import { RaiseError } from '@/actions/dashboard/error';

export type DeferredAction<ActionTypes extends Action> = ThunkAction<void, StoreState, null, ActionTypes | RaiseError>;

export interface Dispatch<ActionTypes extends Action> {
    (action: ActionTypes | DeferredAction<ActionTypes>): void;
}