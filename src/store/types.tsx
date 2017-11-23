
export type Store = {
    times: Times,
    fromCoord: Coord,
    toCoord: Coord,
    optimalPath: Coord[],
    nextBuildingSize: BuildingSize
}

export type Coord = {floor: number, room: number};

export type Apt = {
    coord: Coord,
    passTime: number,
    distance: number
};

export type Building = Apt[][];

export type Times = number[][];

export type BuildingSize = {
    floors: number,
    rooms: number
};