import {connect} from 'react-redux';
import {Building, Props} from '../components/building';
import {Store} from '../store';
import {removeStep} from '../store/actions/remove-step';

export type StateProps = Pick<Props, 'building' | 'currentLiftCoord'>;

export type DispatchProps = Pick<Props, 'onLiftArrived'>;

export default connect<StateProps, DispatchProps>(
    (state: Store) => ({
        building: state.times,
        currentLiftCoord: state.optimalPath[0]
    }),
    dispatch => ({
        onLiftArrived() {
            dispatch(removeStep())
        }
    })
)(
    Building
)
