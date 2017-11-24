import * as React from 'react';
import {Store} from '../store/types';
import {Apartment} from './apartment';
import Lift from '../containers/lift';

export type Props = {
    building: Store['times']
};

export const Building: React.StatelessComponent<Props> = ({building}) => {
    const apartments = building.map((floor, i) => floor.map((room, j) => (
        <Apartment
            key={i.toString() + ',' + j.toString()} 
            coord={{floor: building.length - i - 1, room: j}}
            passTime={building[i][j]}
        />
    )));

    // building entrance
    apartments[building.length - 1][0] = (
        <Apartment
            className="entrance"
            key={'0,0'}
            coord={{floor: 0, room: 0}}
            passTime={building[building.length - 1][0]}            
        />
    );

    return (
        <div className="building-field">
            <div 
                className="building"
                style={{
                    gridTemplateColumns: 'repeat(' + building[0].length + ', 1fr)',
                    gridTemplateRows: 'repeat(' + building.length + ', 1fr)'      
                }}
            >
                {apartments}
            </div>
            <Lift />
        </div>
    );
};
