export type Store = {
    times: Times,
    from: Coord,
    to: Coord
}

export type Coord = {floor: number, room: number};

export type Apt = {
    coord: Coord,
    passTime: number,
    distance: number
};

export type Building = Apt[][];

export type Times = number[][];