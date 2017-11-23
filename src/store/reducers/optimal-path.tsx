import {Reducer} from './reducer';
import {Store} from '../types';

export const optimalPath: Reducer<Store['optimalPath']> = (state = [], action) => {
    switch (action.type) {
        case 'SetOptimalPath': {
            return action.path;
        }
        case 'RemoveStep': {
            const newPath = [...state];
            newPath.shift();
            return newPath;
        }
        default: {
            return state;
        }
    }
};
