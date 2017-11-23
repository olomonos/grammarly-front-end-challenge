import {Reducer} from './reducer';
import {Store} from '../types';
import {TIMES} from '../../data/times';

export const times: Reducer<Store['times']> = (
    state = TIMES, action
) => {
    switch (action.type) {
        case 'SetTimes': {
            return action.times;
        }
        default: {
            return state;
        }
    }
};