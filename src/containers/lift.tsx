import {connect} from 'react-redux';
import {Store} from '../store';
import {Lift, Props} from '../components/lift';
import {nextStep} from '../store/commands/next-step';

export type StateProps = Pick<Props
    , 'totalFloors'
    | 'totalRooms'
    | 'currentCoord'
    | 'transitionTime'
>;

export type DispatchProps = Pick<Props, 'onLiftArrived'>;

export default connect<StateProps, DispatchProps>(
    (state: Store) => ({
        totalFloors: state.times.length,
        totalRooms: state.times[0].length,
        currentCoord:  state.optimalPath.length > 0 ?
            state.optimalPath[0] :
            state.fromCoord,
        transitionTime: state.optimalPath.length > 0 ?
            state.times[
                state.times.length - state.optimalPath[0].floor - 1
            ][
                state.optimalPath[0].room
            ] : 0    
    }),
    dispatch => ({
        onLiftArrived() {
            dispatch(nextStep());            
        }
    })
)(
    Lift
)