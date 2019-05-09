import React, { Component } from 'react';

import ComponentsList from './components/ComponentsList';
import BlockOptions from './components/BlockOptions';
import FieldOptions from './components/FieldOptions';
import Grid from './components/Grid';

class App extends Component {
  render() {
    return (
      <div className="stampa">
        <ComponentsList />
        <Grid />
        <div className="stampa__right">
          <BlockOptions />
          <FieldOptions />
        </div>
      </div>
    );
  }
}

export default App;
