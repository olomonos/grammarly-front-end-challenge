import {connect} from 'react-redux';
import {Lift} from '../components/lift';
import {Store} from '../store';

// export type StateProps = Pick<Props, 'currentCoord'>;

export default connect(
    (state: Store) => ({
        // currentCoord: state.fromCoord
    }),
    dispatch => ({
    })
)(
    Lift
)
