import {minBy} from 'lodash';
import {Coord, Apt, Building} from '../store';

function getNeighbours(
    building: Building,
    currentFloor: Coord['floor'], 
    currentRoom: Coord['room']  
): Apt[] {
    let neighbours: Apt[] = [];
    if (building[currentFloor - 1] !== undefined) {
        neighbours.push(building[currentFloor - 1][currentRoom]);
    }
    if (building[currentFloor] !== undefined) {
        neighbours.push(building[currentFloor][currentRoom - 1]);
        neighbours.push(building[currentFloor][currentRoom + 1]);            
    }
    if (building[currentFloor + 1] !== undefined) {
        neighbours.push(building[currentFloor + 1][currentRoom]);
    }
    return neighbours;
}

export function solve(times: number[][], from: Coord, to: Coord): Coord[] {
    
    if (
        (from.floor < 0) ||
        (from.room < 0) ||
        (to.floor >= times.length) ||
        (to.room >= times[0].length)
    ) {
        throw 'Start or destination point is outside the building.'
    }
    if (times[times.length - from.floor - 1][from.room] === 0) {
        throw 'Oops! The building is barricaded.';
    }
    if (times[times.length - to.floor - 1][to.room] === 0) {
        throw 'Destination apartment does not exist.'
    }

    const building: Building = [];
    const floorsQuantity = times.length;
    const roomsQuantity = times[0].length;
    const unvisited = new Set<Apt>();
    
    for (let y = 0; y < floorsQuantity; y++) {
        const buildingsFloor: Apt[] = [];
        for (let x = 0; x < roomsQuantity; x++) {
            const apt = {
                coord: {
                    floor: y,
                    room: x
                },
                passTime: times[floorsQuantity - 1 - y][x],
                distance: Infinity
            };
            buildingsFloor.push(apt);
            unvisited.add(apt);
        }
        building.push(buildingsFloor);   
    }

    building[from.floor][from.room].distance = 0;
    const destinationApt = building[to.floor][to.room];

    while (unvisited.has(destinationApt)) {
        // use .forEach to find minimum element in order to save an extra array

        let currentApt = minBy(Array.from(unvisited), 'distance');
//----------

        // let currentApt: Apt = {
        //     coord: {floor: null, room: null},
        //     passTime: null,
        //     distance: Infinity
        // }; 
        // unvisited.forEach(value => {
        //     if (value.distance < currentApt.distance) {
        //         currentApt = value;
        //     }
        // });

//----------
        if (currentApt !== undefined) {
            if (currentApt.distance == Infinity) {
                throw 'no path';
            } else {
                let neighbours: Apt[] = getNeighbours(
                    building,
                    currentApt.coord.floor,
                    currentApt.coord.room
                );

                for (let k = 0; k < neighbours.length; k++) {
                    if (unvisited.has(neighbours[k])) {
                        if (neighbours[k].passTime !== 0) {
                            let newTentativeDistance: Apt['distance'] =
                                currentApt.distance + neighbours[k].passTime;
                            if (newTentativeDistance < neighbours[k].distance) {
                                neighbours[k].distance = newTentativeDistance;
                            }
                }}}                             // curly braces ?
                unvisited.delete(currentApt);
    }} else {
        throw 'currentApt === undefined'
    }}

    let optPathDESC: Coord[] = [];
    optPathDESC.push(destinationApt.coord);

    let currentApt: Apt = destinationApt;

    while ((currentApt.coord.floor !== from.floor) || 
        (currentApt.coord.room !== from.room)) {

        let neighbours: Apt[] = getNeighbours(
            building,
            currentApt.coord.floor,
            currentApt.coord.room
        );

        let minDistCurrentNeighbour = minBy(neighbours, 'distance');

        if (minDistCurrentNeighbour !== undefined) {
            optPathDESC.push(minDistCurrentNeighbour.coord);
            currentApt = minDistCurrentNeighbour;  
        } else {
            throw 'cannot find neighbour';
        }
    }
    return optPathDESC.reverse();
}