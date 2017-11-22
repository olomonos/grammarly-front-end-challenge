import {minBy} from 'lodash';
import {Coord, Apt, Building} from '../store';

export function solve(times: number[][], from: Coord, to: Coord): Apt[] {
    
// Check if from & to are inside the building

    let building: Building = [];
    const floorsQuantity = times.length;
    const roomsQuantity = times[0].length;
    
    for (let y = 0; y < floorsQuantity; y++) {
        let buildingsFloor: Apt[] = [];

        for (let x = 0; x < roomsQuantity; x++) {
            buildingsFloor.push({
                coord: {
                    floor: y,
                    room: x
                },
                passTime: times[floorsQuantity - 1 - y][x],
                distance: Infinity
            });
        }
        building.push(buildingsFloor);   
    }

    if (building[from.floor][from.room].passTime === 0) {
        throw 'Oops! The building is barricaded.';               // !!!
    }
    building[from.floor][from.room].distance = 0;

    let unvisited = new Set<Apt>();
    for (let j = 0; j < floorsQuantity; j++) {
        for (let i = 0; i < roomsQuantity; i++) {
            unvisited.add(building[j][i]);
        }
    }

    let destinationApt = building[to.floor][to.room];

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
        let currentApt = minBy([...unvisited], 'distance');
        if (currentApt !== undefined) {               // When undefined can happened?
            if (currentApt.distance == Infinity) {
                // Consider this case!
                break;
            } else {
                let neighbours: Apt[] = getNeighbours(
                    currentApt.coord.floor,
                    currentApt.coord.room
                );

                let unvisitedNeighbours: Apt[] = [];
                for (let k = 0; k < neighbours.length; k++) {

                    if (unvisited.has(neighbours[k])) {
                        unvisitedNeighbours.push(neighbours[k]);

                        if (neighbours[k].passTime !== 0) {
                            let newTentativeDistance: Apt['distance'] =
                                currentApt.distance + neighbours[k].passTime;
                            if (newTentativeDistance < neighbours[k].distance) {
                                neighbours[k].distance = newTentativeDistance;
                            }
                }}}
                unvisited.delete(currentApt);
    }}}

    let optPathDESC: Apt[] = [];
    optPathDESC.push(destinationApt);

    let currentApt: Apt = destinationApt;
    // Check if we have 1x1 building (or not?)

    while ((currentApt.coord.floor !== from.floor) || 
        (currentApt.coord.room !== from.room)) {

        let neighbours: Apt[] = getNeighbours(
            currentApt.coord.floor,
            currentApt.coord.room
        );

        let minDistCurrentNeighbour: Apt | undefined = minBy(neighbours, 'distance');

        if (minDistCurrentNeighbour !== undefined) {
            optPathDESC.push(minDistCurrentNeighbour);
            currentApt = minDistCurrentNeighbour;  
        } 
        // else {
        //          do we really need this check?
        // }
    }
    return optPathDESC.reverse();
}