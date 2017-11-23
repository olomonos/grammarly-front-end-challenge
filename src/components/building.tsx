import * as React from 'react';
import {Store, Coord} from '../store/types';
import {Apartment} from './apartment';
import Lift from '../containers/lift';

export type Props = {
    building: Store['times'],
    liftCoord: Coord,
    transitionTime: number,
    onLiftArrived: () => void
}

export class Building extends React.Component<Props> {

    private timeout: number | null = null;

    private setTimeout(fn: () => any, time: number) {
        if (this.timeout !== null) clearTimeout(this.timeout);
        this.timeout = window.setTimeout(fn, time);
    }

    componentWillReceiveProps(props: Props) {
        if (props.liftCoord &&
            props.liftCoord !== this.props.liftCoord
        ) {
            this.setTimeout(() => props.onLiftArrived(), props.transitionTime);
        }
    }

    componentWillUnmount() {
        if (this.timeout !== null) clearTimeout(this.timeout);
    }

    render() {
        const {building, liftCoord, transitionTime} = this.props;

        const liftHeight = 100 / building.length;
        const liftWidth = 100 / building[0].length;
        const liftBottoom = liftHeight * liftCoord.floor;
        const liftLeft = liftWidth * liftCoord.room; 

        const liftStyles = {
            height: liftHeight.toString() + '%',
            width: liftWidth.toString() + '%',
            bottom: liftBottoom.toString() + '%',
            left: liftLeft.toString() + '%',
            transitionDuration: transitionTime.toString() + 'ms'
        };

        const apartments = building.map((floor, i) => {
            return (
                floor.map((room, j) => 
                    <Apartment 
                        key={i.toString() + ',' + j.toString()} 
                        coord={{floor: building.length - i - 1, room: j}}
                        passTime={building[i][j]}
                    /> 
                )
            );
        });
        
        // building entrance
        apartments[building.length - 1][0] = <Apartment
            className='entrance'
            key={'0,0'}
            coord={{floor: 0, room: 0}}
            passTime={building[building.length - 1][0]}            
        />;

        return (
            <div className='building-field'>
                <div 
                    className='building'
                    style={{
                        gridTemplateColumns: 'repeat(' + building[0].length + ', 1fr)',
                        gridTemplateRows: 'repeat(' + building.length + ', 1fr)'      
                    }}
                >
                    {apartments}
                    <Lift style={liftStyles} />
                </div>
            </div>
        );
    }
}