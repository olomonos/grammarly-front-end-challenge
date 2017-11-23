import {Command} from './command';
import {solve} from '../../utils/solve';
import {setOptimalPath} from '../actions';

export type FindPath = Command;

export function findPath(): FindPath { 
    return (dispatch, getState) => {

        const {times, fromCoord, toCoord} = getState();
        try {
            const newPath = solve(times, fromCoord, toCoord);
            
            dispatch(setOptimalPath(newPath));            
        } catch(e) {
            alert(e);
        }
    };
};
