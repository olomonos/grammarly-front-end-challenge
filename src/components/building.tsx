import * as React from 'react';
import {Store, Coord} from '../store/types';
import {Apartment} from './apartment';
import Lift from '../containers/lift';

export type Props = {
    building: Store['times'],
    currentLiftCoord: Coord | undefined,
    onLiftArrived: () => void
}

// type Props1 = {
//     building: Store['times'],
//     currentLiftCoord: Coord | undefined,
//     onLiftArrived: () => void
// }

// export class Building1 extends React.Component<Props1> {

//     private timeout: number | null = null;

//     private setTimeout(fn: () => any, time: number) {
//         if (this.timeout !== null) clearTimeout(this.timeout);
//         this.timeout = window.setTimeout(fn, time);
//     }

//     componentWillReceiveProps(props: Props1) {
//         if (props.currentLiftCoord &&
//             props.currentLiftCoord !== this.props.currentLiftCoord
//         ) {
//             const currentLiftCoord = props.currentLiftCoord;
//             const length = props.building.length;
//             const time = props.building[length - currentLiftCoord.floor - 1][currentLiftCoord.room];

//             this.setTimeout(() => props.onLiftArrived(), time);
//         }
//     }

//     componentWillUnmount() {
//         if (this.timeout !== null) clearTimeout(this.timeout);
//     }

//     render() {
//         return null;
//     }
// }

export const Building: React.StatelessComponent<Props> = ({
    building, 
    currentLiftCoord,
    onLiftArrived
}) => {
    
    const buildingGridStyles = {
        gridTemplateColumns: 'repeat(' + building[0].length + ', 1fr)',
        gridTemplateRows: 'repeat(' + building.length + ', 1fr)'      
    };
    
    const frontDoorStyles = {
        // transform: 'translate(0, 2px)',
        width: '50%',
        height: '95%',
        'align-self': 'end',
        borderBottom: 'none',
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0'
    };

    // let rowStart: number = building.length;
    // let columnStart: number = 1;
    // let rowEnd: number = building.length + 1;;
    // let columnEnd: number = 2;
    let liftWidth: number = 0;
    let liftHeight: number = 0;
    let liftBottoom: number = 0;
    let liftLeft: number = 0; 
    let passTime: number = 0;

    if (currentLiftCoord !== undefined) {
        // rowStart = building.length - currentLiftCoord.floor;
        // columnStart = currentLiftCoord.room + 1;
        // rowEnd = rowStart + 1;
        // columnEnd = columnStart + 1;
        liftHeight = 100 / building.length;
        liftWidth = 100 / building[0].length;
        liftBottoom = (100 / building.length) * (building.length - 1);
        liftLeft = (100 / building[0].length) * (building[0].length - 1);
        passTime = building[building.length - currentLiftCoord.floor - 1][currentLiftCoord.room] / 1000;
    }

    let liftStyles = {
        // gridArea: rowStart.toString() + ' / ' + columnStart.toString() + ' / ' + rowEnd.toString() + ' / ' + columnEnd.toString(),
        transitionDuration: passTime.toString() + 's, ' + passTime.toString() + 's',
        bottom: liftBottoom.toString() + '%',
        left: liftLeft.toString() + '%',
        height: liftHeight.toString() + '%',
        width: liftWidth.toString() + '%'
    };

    let apartments = [];
    apartments = building.map((floor, i) => {
        return (
            floor.map((room, j) => 
                <Apartment 
                    key={i.toString() + ',' + j.toString()} 
                    coord={{floor: building.length - i - 1, room: j}} 
                /> 
            )
        );
    });

    apartments[building.length - 1][0] = <Apartment
        key={'0,0'}
        coord={{floor: 0, room: 0}} 
        style={frontDoorStyles}
    />;

    return (
        <div className='building-field'>
            <div 
                className='building'
                style={buildingGridStyles}
                // onAnimationEnd={onLiftArrived}           // !!!
            >
                {apartments}
                <Lift 
                    style={liftStyles} 
                    // onAnimationEnd={onLiftArrived}
                    onTransitionEnd={onLiftArrived} 
                />
            </div>
        </div>
    );
};