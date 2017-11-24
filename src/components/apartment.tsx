import * as React from 'react';
import {Apt} from '../store/types';

export type Props = {
    coord: Apt['coord'],
    passTime: number
} & React.HTMLAttributes<HTMLDivElement>;

export const Apartment: React.StatelessComponent<Props> = ({coord, passTime, className = '', ...rest}) => {
    
    let id: string = coord.floor.toString() + ',' + coord.room.toString();

    return (
        <div className={`apartment ${className} ${passTime === 0 ? 'hidden' : ''}`} id={id} {...rest}>
            {passTime}
        </div>
    );
};