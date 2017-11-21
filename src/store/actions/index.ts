import {Go, go} from './go';
import {SetTimes, setTimes} from './set-times';

export type Action
    = Go
    | SetTimes;

export {
    Go, go,
    SetTimes, setTimes
};
