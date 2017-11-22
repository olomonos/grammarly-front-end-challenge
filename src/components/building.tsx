import * as React from 'react';
import {Store} from '../store/types';
import {Apartment} from './apartment';

export type Props = {
    building: Store['times']
}

export const Building: React.StatelessComponent<Props> = ({building}) => {
    
    const buildingGridStyles = {
        gridTemplateColumns: 'repeat(' + building[0].length + ', 1fr)',
        gridTemplateRows: 'repeat(' + building.length + ', 1fr)'      
    };
    
    const frontDoorStyles = {
        // position: 'relative',
        // top: '3px',
        width: '50%',
        height: '90%',
        'align-self': 'end',
        borderBottom: 'none',
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0'
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
            </div>
        </div>
    );
};