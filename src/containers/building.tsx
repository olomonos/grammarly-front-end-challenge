import {connect} from 'react-redux';
import {Building, Props} from '../components/building';
import {Store} from '../store';
// import {createSelector} from 'reselect';

export type StateProps = Pick<Props, 'building'>;

// const timesSelector = (state: Store) => state.times;
// const getBuilding = createSelector(
//     timesSelector,
//     (times) => {
//         let building: Store['times'] = [];
    
//         for (let y = 0; y < times.length; y++) {
//             let buildingsFloor: number[] = [];
//             for (let x = 0; x < times[0].length; x++) {
//                 buildingsFloor.push(times[times.length - 1 - y][x]);
//             }
//             building.push(buildingsFloor);
//         }

//         return building;
//     }
// );

export default connect<StateProps>(
    (state: Store) => ({
        building: state.times
    }),
    dispatch => ({
    })
)(
    Building
)
