import {Store} from '../types';

export type SetTimes = {type: 'SetTimes', times: Store['times']};

export function setTimes(times: Store['times']): SetTimes {
    return {type: 'SetTimes', times};
}