import {Store} from '../types';

export type SetOptimalPath = {type: 'SetOptimalPath', path: Store['optimalPath']};

export function setOptimalPath(path: Store['optimalPath']): SetOptimalPath {
    return {type: 'SetOptimalPath', path};
};