import {minBy} from 'lodash';
import {Coord, Apt, Building} from '../store';

export function solve(times: number[][], from: Coord, to: Coord): Coord[] {
    
// Check if from & to are inside the building

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

    if (building[from.floor][from.room].passTime === 0) {
        throw 'Oops! The building is barricaded.';               // !!!
    }
    building[from.floor][from.room].distance = 0;

    const destinationApt = building[to.floor][to.room];

    // add building as an argument and the function to top level
    function getNeighbours(
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

    while (unvisited.has(destinationApt)) {
        // use .forEach to find minimum element in order to save an extra array
        let currentApt = minBy(Array.from(unvisited), 'distance');
        if (currentApt !== undefined) {               // When undefined can happened?
            if (currentApt.distance == Infinity) {
                throw 'no path';
            } else {
                let neighbours: Apt[] = getNeighbours(
                    currentApt.coord.floor,
                    currentApt.coord.room
                );

                // let unvisitedNeighbours: Apt[] = [];
                for (let k = 0; k < neighbours.length; k++) {

                    if (unvisited.has(neighbours[k])) {
                        // unvisitedNeighbours.push(neighbours[k]);

                        if (neighbours[k].passTime !== 0) {
                            let newTentativeDistance: Apt['distance'] =
                                currentApt.distance + neighbours[k].passTime;
                            if (newTentativeDistance < neighbours[k].distance) {
                                neighbours[k].distance = newTentativeDistance;
                            }
                }}}
                unvisited.delete(currentApt);
    }}}

    let optPathDESC: Coord[] = [];
    optPathDESC.push(destinationApt.coord);

    let currentApt: Apt = destinationApt;

    while ((currentApt.coord.floor !== from.floor) || 
        (currentApt.coord.room !== from.room)) {

        let neighbours: Apt[] = getNeighbours(
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
        // else {
        //          do we really need this check?
        // }
    }
    return optPathDESC.reverse();
}