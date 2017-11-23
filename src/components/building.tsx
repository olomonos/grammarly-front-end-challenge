import * as React from 'react';
import {Store, Coord} from '../store/types';
import {Apartment} from './apartment';
import Lift from '../containers/lift';

export type Props = {
    building: Store['times'],
    currentLiftCoord: Coord | undefined,
    onLiftArrived: () => void
}

export class Building extends React.Component<Props> {

    private timeout: number | null = null;

    private setTimeout(fn: () => any, time: number) {
        if (this.timeout !== null) clearTimeout(this.timeout);
        this.timeout = window.setTimeout(fn, time);
    }

    componentWillReceiveProps(props: Props) {
        if (props.currentLiftCoord &&
            props.currentLiftCoord !== this.props.currentLiftCoord
        ) {
            const currentLiftCoord = props.currentLiftCoord;
            const length = props.building.length;
            const time = props.building[length - currentLiftCoord.floor - 1][currentLiftCoord.room];

            this.setTimeout(() => props.onLiftArrived(), time);
        }
    }

    componentWillUnmount() {
        if (this.timeout !== null) clearTimeout(this.timeout);
    }

    render() {

        const {building, currentLiftCoord} = this.props;

        const buildingGridStyles = {
            gridTemplateColumns: 'repeat(' + building[0].length + ', 1fr)',
            gridTemplateRows: 'repeat(' + building.length + ', 1fr)'      
        };
        
        const frontDoorStyles = {
            width: '50%',
            height: '95%',
            'align-self': 'end',
            borderBottom: 'none',
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0'
        };
    
        let liftWidth: number = 0;
        let liftHeight: number = 0;
        let liftBottoom: number = 0;
        let liftLeft: number = 0; 
        let passTime: number = 0;

        if (currentLiftCoord !== undefined) {
            liftHeight = 100 / building.length;
            liftWidth = 100 / building[0].length;
            // liftBottoom = (100 / building.length) * (building.length - 1);
            // liftLeft = (100 / building[0].length) * (building[0].length - 1);
            liftBottoom = liftHeight * currentLiftCoord.floor;
            liftLeft = liftWidth * currentLiftCoord.room;
            passTime = building[building.length - currentLiftCoord.floor - 1][currentLiftCoord.room] / 1000;
        }

        let liftStyles = {
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
                    // onTransitionEnd={onLiftArrived}
                >
                    {apartments}
                    <Lift 
                        style={liftStyles} 
                        // onTransitionEnd={onLiftArrived} 
                    />
                </div>
            </div>
        );
    }
}