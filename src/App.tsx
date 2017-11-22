import * as React from 'react';
import Controls from './containers/controls';
import Building from './containers/building';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Controls />
        <Building />
      </div>
    );
  }
}

export default App;
