import * as React from 'react';
// import {Coord} from '../store/types';

export type Props = {
    // currentCoord: Coord
} & React.HTMLAttributes<HTMLDivElement>

export const Lift: React.StatelessComponent<Props> = ({...rest}) => {
    
    // let id: string = coord.floor.toString() + ',' + coord.room.toString();

    return (
        <div className='lift-container' {...rest}>        
            <div className='lift' />
        </div>
    );
};