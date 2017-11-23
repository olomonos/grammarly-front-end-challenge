import {connect} from 'react-redux';
import {Building, Props} from '../components/building';
import {Store} from '../store';
import {removeStep} from '../store/actions/remove-step';

export type StateProps = Pick<Props, 'building' | 'currentLiftCoord' | 'fromCoord'>;

export type DispatchProps = Pick<Props, 'onLiftArrived'>;

export default connect<StateProps, DispatchProps>(
    (state: Store) => ({
        building: state.times,
        currentLiftCoord: state.optimalPath[0],
        fromCoord: state.fromCoord
    }),
    dispatch => ({
        onLiftArrived() {
            dispatch(removeStep())
        }
    })
)(
    Building
)
