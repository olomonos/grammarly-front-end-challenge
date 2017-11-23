import {ThunkAction} from 'redux-thunk';
import {Store} from '../types';

export type Command<R = void> = ThunkAction<R, Store, void>;