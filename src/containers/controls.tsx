import {connect} from 'react-redux';
import {Controls, Props} from '../components/controls';
import {setNextBuildingSize} from '../store/actions/set-next-building-size';
import {setFromCoord} from '../store/actions/set-from-coord';
import {setToCoord} from '../store/actions/set-to-coord';
// import {generate} from '../store/actions/generate';
import {setTimes} from '../store/actions/set-times';
import {getTimes} from '../utils/get-times';
import {Store} from '../store';
// import { nextBuildingSize } from '../store/reducers/next-building-size';
// import {createSelector} from 'reselect';

export type StateProps = Pick<Props
    , 'nextBuildingSize' 
    | 'fromCoord'
    | 'toCoord' >;

export type DispatchProps = Pick<Props
    , 'onFloorsQuantityInput'
    | 'onRoomsQuantityInput'
    | 'onFromFloorInput'
    | 'onFromRoomInput'
    | 'onToFloorInput'
    | 'onToRoomInput'
    | 'onGenerate'
    | 'onGo' >;
    
// const nextBuildingSizeSelector = (state: Store) => state.nextBuildingSize;
// const getNextBuilding = createSelector(
//     nextBuildingSizeSelector,
//     (size) => {
//         return getTimes(size.floors, size.rooms);
//     }
// );
// const newTimes: Store['times'] = getNextBuilding(state);

export default connect<StateProps, DispatchProps>(
    (state: Store) => ({
        nextBuildingSize: state.nextBuildingSize,
        fromCoord: state.fromCoord,
        toCoord: state.toCoord
    }),
    dispatch => ({
        onFloorsQuantityInput(e) {
            dispatch(setNextBuildingSize({floors: Number(e.target.value)}));
        },
        onRoomsQuantityInput(e) {
            dispatch(setNextBuildingSize({rooms: Number(e.target.value)}));
        },
        onFromFloorInput(e) {
            dispatch(setFromCoord({floor: Number(e.target.value)}));
        },
        onFromRoomInput(e) {
            dispatch(setFromCoord({room: Number(e.target.value)}));
        },
        onToFloorInput(e) {
            dispatch(setToCoord({floor: Number(e.target.value)}));
        },
        onToRoomInput(e) {
            dispatch(setToCoord({room: Number(e.target.value)}));
        },
        onGenerate() {
            let newTimes = getTimes(5, 5);  //throught the OwnProps ???
            dispatch(setTimes(newTimes));
        },
        onGo() {
            // dispatch();
        }
    })
)(
    Controls
)