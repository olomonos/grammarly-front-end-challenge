import {connect} from 'react-redux';
import {Building, Props} from '../components/building';
import {Store} from '../store';

export type StateProps = Pick<Props, 'building'>;

export default connect<StateProps>(
    (state: Store) => ({
        building: state.times,
    })
)(
    Building
)