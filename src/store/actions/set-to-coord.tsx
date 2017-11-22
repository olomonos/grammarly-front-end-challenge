import {Coord} from '../types';

export type SetToCoord = {
    type: 'SetToCoord', 
    coord: Partial<Coord>
};

export function setToCoord(coord: Partial<Coord>): SetToCoord {
    return {type: 'SetToCoord', coord};
};