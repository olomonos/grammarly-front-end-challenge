import {Store} from '../types';

export type SetNextBuildingSize = {
    type: 'SetNextBuildingSize', 
    nextSize: Partial<Store['nextBuildingSize']>
};

export function setNextBuildingSize(nextSize: Partial<Store['nextBuildingSize']>): 
    SetNextBuildingSize {
    return {type: 'SetNextBuildingSize', nextSize};
}
