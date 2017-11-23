import {Reducer} from './reducer';
import {Coord} from '../types';
import {TIMES} from '../../data/times';

const initialToCoord: Coord = {
    floor: TIMES.length - 1,
    room: TIMES[0].length - 1
};

export const toCoord: Reducer<Coord> = (
    state = initialToCoord, action
) => {
    switch (action.type) {
        case 'SetToCoord': {
            return {...state, ...action.coord};
        }
        case 'SetTimes': {
            const {times} = action;

            return {floor: times.length - 1, room: times[0].length - 1};
        }
        default: {
            return state;
        }
    }
};
