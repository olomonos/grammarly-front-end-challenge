import {connect} from 'react-redux';
import {Building, Props} from '../components/building';
import {Store} from '../store';
import {removeStep} from '../store/actions/remove-step';

export type StateProps = Pick<Props, 'building' | 'liftCoord' | 'transitionTime'>;

export type DispatchProps = Pick<Props, 'onLiftArrived'>;

export default connect<StateProps, DispatchProps>(
    (state: Store) => ({
        building: state.times,
        liftCoord: state.optimalPath.length > 0 ?
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
            dispatch(removeStep())
        }
    })
)(
    Building
)
