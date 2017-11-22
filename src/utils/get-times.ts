const minFloorOrRoom = 1;
const maxFloorOrRoom = 100;
const minTime: number = 0;
const maxTime: number = 5000;

function getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export function getTimes(floorsQuantity: number, roomsPerFloorsQuantity: number): number[][] {
    let times: number[][] = [];
        
    if (floorsQuantity < minFloorOrRoom) {
        throw "At least one floor should exist!";
    } else if (floorsQuantity > maxFloorOrRoom) {
        throw "It's impossible to have more than 100 floors!";
    } else if (roomsPerFloorsQuantity < minFloorOrRoom) {
        throw "At least one room per floor should exist!";
    } else if (roomsPerFloorsQuantity > maxFloorOrRoom) {
        throw "It's impossible to have more than 100 rooms per floor!";
    } else {
        for (let i = 0; i < roomsPerFloorsQuantity; i++) {
            let floor: number[] = [];
            for (let j = 0; j < roomsPerFloorsQuantity; j++) {
                floor.push(getRndInteger(minTime, maxTime));
            }
            times.push(floor);
        }
    }

    return times;
}