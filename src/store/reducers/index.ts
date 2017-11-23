import {combineReducers} from 'redux';
import {Store} from '../types';
import {Reducer} from './reducer';
import {times} from './times';
import {fromCoord} from './from-coord';
import {toCoord} from './to-coord';
import {optimalPath} from './optimal-path';
import {nextBuildingSize} from './next-building-size';

export default combineReducers({
    times,
    fromCoord,
    toCoord,
    optimalPath,
    nextBuildingSize
}) as Reducer<Store>;