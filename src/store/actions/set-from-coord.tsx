import {Coord} from '../types';

export type SetFromCoord = {
    type: 'SetFromCoord', 
    coord: Partial<Coord>
};

export function setFromCoord(coord: Partial<Coord>): SetFromCoord {
    return {type: 'SetFromCoord', coord};
}