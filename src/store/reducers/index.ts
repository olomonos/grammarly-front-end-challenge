import {combineReducers} from 'redux';
import {Store} from '../types';
import {Reducer} from './reducer';
import {times} from './times';
// import {from} from './';
// import {to} from './;

export default combineReducers({
    times,
    // from,
    // to
}) as Reducer<Store>;