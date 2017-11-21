import {Reducer} from './reducer';
import {Store} from '../types';
import {Times} from '../../data/times';
// import {setOfRandomCoords} from '../../utils/set-of-random-coords';

// const initialCircles: Store['currentCircles'] = setOfRandomCoords(4);
const initialTimes: Store['times'] = Times;

export const times: Reducer<Store['times']> = (
    state = initialTimes, action
) => {
    switch (action.type) {
        case 'SetTimes': {
            return action.times;
        }
        // case 'NextRound': {
        //     let newCurrentCircles = [...state, ...action.newCircles];
        //     return newCurrentCircles;
        // }
        default: {
            return state;
        }
    }
};