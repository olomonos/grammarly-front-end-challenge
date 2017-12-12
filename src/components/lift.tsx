import * as React from 'react';
import {Coord} from '../store/types';

export type Props = {
    totalFloors: number,
    totalRooms: number,
    targetCoord: Coord,
    transitionTime: number,
    onLiftArrived: () => void    
} & React.HTMLAttributes<HTMLDivElement>;

export type State = {
    currentCoord: Coord
};

export class Lift extends React.Component<Props, State> {
    private animationFrame: number | null = null;
    private start: number | null = null;
    private fromCoord: Coord;
    
    constructor(props: Props) {
        super(props);
        this.state = {
            currentCoord: props.targetCoord
        };
        this.fromCoord = props.targetCoord;
    }

    private step(timestamp: number) {
        const {transitionTime, targetCoord, onLiftArrived} = this.props;
        const fromCoord = this.fromCoord;

        if (!this.start) {
            this.start = timestamp;
        }
        const progress = transitionTime ?  
            Math.min((timestamp - this.start) / transitionTime, 1)
            : 1;
        
        const y = targetCoord.floor - fromCoord.floor;
        const x = targetCoord.room - fromCoord.room;

        this.setState({
            currentCoord: {
                floor: fromCoord.floor + progress * y,
                room: fromCoord.room + progress * x
            }
        });

        if (progress < 1) {
            window.requestAnimationFrame(this.step.bind(this));
        } else {
            onLiftArrived();
            this.animationFrame = null;
            this.start = null;
        }
    }

    componentWillReceiveProps(props: Props) {
        if (this.animationFrame !== null) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.animationFrame = window.requestAnimationFrame(this.step.bind(this));
        if (
            (this.props.targetCoord.floor !== props.targetCoord.floor) || 
            (this.props.targetCoord.room !== props.targetCoord.room)
        ) {
            this.fromCoord.floor = this.props.targetCoord.floor;
            this.fromCoord.room = this.props.targetCoord.room;
        } 
    }

    componentWillUnmount() {
        if (this.animationFrame !== null) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;            
        }
    }
    
    render() {
        const {
            targetCoord,
            totalFloors,
            totalRooms,
            transitionTime,
            onLiftArrived, // so that rest doesn't contain it
            ...rest        
        } = this.props;
        const {currentCoord} = this.state;

        const liftHeight = 100 / totalFloors;
        const liftWidth = 100 / totalRooms;
        const liftBottoom = liftHeight * currentCoord.floor;
        const liftLeft = liftWidth * currentCoord.room; 
    
        const liftStyles = {
            height: liftHeight.toString() + '%',
            width: liftWidth.toString() + '%',
            bottom: liftBottoom.toString() + '%',
            left: liftLeft.toString() + '%',
        };
    
        return (
            <div
                style={liftStyles}
                className="lift-container"
                id="lift"
                {...rest}
            >        
                <div className="lift" />
            </div>
        );
    }
}
