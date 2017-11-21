import {createStore} from 'redux';
import reducers from './reducers';
// import {getTopScore} from './commands/get-top-score';

export * from './types';

export const store = createStore(reducers);
// store.dispatch(getTopScore());