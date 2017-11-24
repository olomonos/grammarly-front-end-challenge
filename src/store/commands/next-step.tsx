import {Command} from './command';
import {setFromCoord} from '../actions';
import {removeStep} from '../actions';

export type NextStep = Command;

export function nextStep(): NextStep { 
    return (dispatch, getState) => {

        const {optimalPath, toCoord} = getState();

        if (optimalPath.length === 1) {
            dispatch(setFromCoord(toCoord));
        }

        dispatch(removeStep());
    };
}
