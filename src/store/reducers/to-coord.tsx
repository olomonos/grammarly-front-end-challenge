import {Reducer} from './reducer';
import {Coord} from '../types';

const initialToCoord: Coord = {
    floor: 9,
    room: 9
};

export const toCoord: Reducer<Coord> = (
    state = initialToCoord, action
) => {
    switch (action.type) {
        case 'SetToCoord': {
            return {...state, ...action.coord};
        }

        default: {
            return state;
        }
    }
};
