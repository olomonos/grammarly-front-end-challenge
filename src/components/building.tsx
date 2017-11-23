import * as React from 'react';
import {Store, Coord} from '../store/types';
import {Apartment} from './apartment';
import Lift from '../containers/lift';

export type Props = {
    building: Store['times'],
    currentLiftCoord: Coord | undefined,
    fromCoord: Store['fromCoord'],
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

        const {building, currentLiftCoord, fromCoord} = this.props;

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
    
        let liftHeight = 100 / building.length;
        let liftWidth = 100 / building[0].length;
        let liftBottoom: number = liftHeight * fromCoord.floor;
        let liftLeft: number = liftWidth * fromCoord.room; 
        let passTime: number;

        let liftTransitionStyles = {};

        if (currentLiftCoord !== undefined) {
            liftBottoom = liftHeight * currentLiftCoord.floor;
            liftLeft = liftWidth * currentLiftCoord.room;
            passTime = building[building.length - currentLiftCoord.floor - 1][currentLiftCoord.room] / 1000;
        
            liftTransitionStyles = {
                transitionDuration: passTime.toString() + 's, ' + passTime.toString() + 's',
                bottom: liftBottoom.toString() + '%',
                left: liftLeft.toString() + '%'
            };
        }

        let liftStyles = {
            ...{
                height: liftHeight.toString() + '%',
                width: liftWidth.toString() + '%',
                bottom: liftBottoom.toString() + '%',
                left: liftLeft.toString() + '%'
            }, 
            ...liftTransitionStyles
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
                >
                    {apartments}
                    <Lift style={liftStyles} />
                </div>
            </div>
        );
    }
}