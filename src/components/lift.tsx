import * as React from 'react';
import {Coord} from '../store/types';

export type Props = {
    totalFloors: number,
    totalRooms: number,
    currentCoord: Coord,
    transitionTime: number,
    onLiftArrived: () => void    
} & React.HTMLAttributes<HTMLDivElement>;

export class Lift extends React.Component<Props> {
    private timeout: number | null = null;
    
    private setTimeout(fn: () => void, time: number) {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
        }
        this.timeout = window.setTimeout(fn, time);
    }

    componentWillReceiveProps(props: Props) {
        if (props.currentCoord && (
            props.currentCoord.floor !== this.props.currentCoord.floor ||
            props.currentCoord.room !== this.props.currentCoord.room
        )) {
            this.setTimeout(() => props.onLiftArrived(), props.transitionTime);
        }
    }

    componentWillUnmount() {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
        }
    }
    
    render() {
        const {
            currentCoord,
            totalFloors,
            totalRooms,
            transitionTime,
            onLiftArrived, // so that rest doesn't contain it
            ...rest        
        } = this.props;

        const liftHeight = 100 / totalFloors;
        const liftWidth = 100 / totalRooms;
        const liftBottoom = liftHeight * currentCoord.floor;
        const liftLeft = liftWidth * currentCoord.room; 
    
        const liftStyles = {
            height: liftHeight.toString() + '%',
            width: liftWidth.toString() + '%',
            bottom: liftBottoom.toString() + '%',
            left: liftLeft.toString() + '%',
            transitionDuration: transitionTime.toString() + 'ms'
        };
    
        return (
            <div
                style={liftStyles}
                className="lift-container"
                {...rest}
            >        
                <div className="lift" />
            </div>
        );
    }
}
