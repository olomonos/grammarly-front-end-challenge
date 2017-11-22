import {Reducer} from './reducer';
import {Store} from '../types';

const initialNextBuildingSize: Store['nextBuildingSize'] = {
    floors: 10,
    rooms: 10
};

export const nextBuildingSize: Reducer<Store['nextBuildingSize']> = (
    state = initialNextBuildingSize, action
) => {
    switch (action.type) {
        case 'SetNextBuildingSize': {
            return {...state, ...action.nextSize};
        }

        default: {
            return state;
        }
    }
};
