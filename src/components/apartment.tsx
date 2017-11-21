import * as React from 'react';
import {Apt} from '../store/types';

export type Props = {
    coord: Apt['coord']
} & React.HTMLAttributes<HTMLDivElement>

export const Apartment: React.StatelessComponent<Props> = ({coord, ...rest}) => {
    
    let id: string = coord.floor.toString() + ',' + coord.room.toString();

    return (
        <div className='apartment' id={id} {...rest}>
        </div>
    );
};