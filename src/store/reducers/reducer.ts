import {Action} from '../actions';

export type Reducer<S> = (state: S, action: Action) => S;