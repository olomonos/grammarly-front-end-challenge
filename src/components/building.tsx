import * as React from 'react';
import {Store} from '../store/types';
import {Apartment} from './apartment';

export type Props = {
    building: Store['times']
}

export const Building: React.StatelessComponent<Props> = ({building}) => {
    
    const buildingGrid = {
        gridTemplateColumns: 'repeat(' + building[0].length + ', 1fr)',
        gridTemplateRows: 'repeat(' + building.length + ', 1fr)'      
    };
    
    let apartments = [];
    apartments = building.map((floor, i) => {
        return (
            floor.map((room, j) => 
                <Apartment key={j} coord={{floor: building.length - i - 1, room: j}} /> 
            )
        );
    });

    return (
        <div className='building-field'>
            <div 
                className='building'
                style={buildingGrid}
            >
                {apartments}
            </div>
        </div>
    );
};