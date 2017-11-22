import {Go, go} from './go';
import {SetTimes, setTimes} from './set-times';
import {SetNextBuildingSize, setNextBuildingSize} from './set-next-building-size';
import {SetFromCoord, setFromCoord} from './set-from-coord';
import {SetToCoord, setToCoord} from './set-to-coord';

export type Action
    = Go
    | SetTimes
    | SetNextBuildingSize
    | SetFromCoord
    | SetToCoord ;

export {
    Go, go,
    SetTimes, setTimes,
    SetNextBuildingSize, setNextBuildingSize,
    SetFromCoord, setFromCoord,
    SetToCoord, setToCoord
};
