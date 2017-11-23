import {Command} from './command';
import {getTimes} from '../../utils/get-times';
import {setTimes} from '../actions';

export type GenerateTimes = Command;

export function generateTimes(): GenerateTimes { 
    return (dispatch, getState) => {
    const {nextBuildingSize} = getState();

    const newTimes = getTimes(nextBuildingSize.floors, nextBuildingSize.rooms);

    dispatch(setTimes(newTimes));
    };
};
