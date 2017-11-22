import {Reducer} from './reducer';
import {Coord} from '../types';

const initialFromCoord: Coord = {
    floor: 0,
    room: 0
};

export const fromCoord: Reducer<Coord> = (
    state = initialFromCoord, action
) => {
    switch (action.type) {
        case 'SetFromCoord': {
            return {...state, ...action.coord};
        }

        default: {
            return state;
        }
    }
};
