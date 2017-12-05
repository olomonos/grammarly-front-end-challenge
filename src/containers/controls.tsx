import {connect} from 'react-redux';
import {Controls, Props} from '../components/controls';
import {setNextBuildingSize} from '../store/actions/set-next-building-size';
import {setFromCoord} from '../store/actions/set-from-coord';
import {setToCoord} from '../store/actions/set-to-coord';
import {generateTimes} from '../store/commands';
import {findPath} from '../store/commands';
import {Store} from '../store';

export type StateProps = Pick<Props
    , 'nextBuildingSize' 
    | 'fromCoord'
    | 'toCoord'
    | 'disabled' 
>;

export type DispatchProps = Pick<Props
    , 'onFloorsQuantityInput'
    | 'onRoomsQuantityInput'
    | 'onFromFloorInput'
    | 'onFromRoomInput'
    | 'onToFloorInput'
    | 'onToRoomInput'
    | 'onGenerate'
    | 'onGo'
>;
    
export default connect<StateProps, DispatchProps>(
    (state: Store) => ({
        nextBuildingSize: state.nextBuildingSize,
        fromCoord: state.fromCoord,
        toCoord: state.toCoord,
        disabled: state.optimalPath.length > 0
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
            dispatch(generateTimes());
        },
        onGo() {
            dispatch(findPath());
        }
    })
)(
    Controls
);