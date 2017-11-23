import {Go, go} from './go';
import {SetTimes, setTimes} from './set-times';
import {SetNextBuildingSize, setNextBuildingSize} from './set-next-building-size';
import {SetFromCoord, setFromCoord} from './set-from-coord';
import {SetToCoord, setToCoord} from './set-to-coord';
import {SetOptimalPath, setOptimalPath} from './set-optimal-path';
import {RemoveStep, removeStep} from './remove-step';

export type Action
    = Go
    | SetTimes
    | SetNextBuildingSize
    | SetFromCoord
    | SetToCoord
    | SetOptimalPath
    | RemoveStep ;

export {
    Go, go,
    SetTimes, setTimes,
    SetNextBuildingSize, setNextBuildingSize,
    SetFromCoord, setFromCoord,
    SetToCoord, setToCoord,
    SetOptimalPath, setOptimalPath,
    RemoveStep, removeStep
};
