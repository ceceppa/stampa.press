import React, { Component } from 'react';

import ComponentsList from './components/ComponentsList';
import BlockOptions from './components/BlockOptions';
import FieldOptions from './components/FieldOptions';
import Grid from './components/Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ComponentsList className="left-sidebar"></ComponentsList>
        <Grid className="grid"></Grid>
        <div className="right-sidebar">
          <BlockOptions></BlockOptions>
          <FieldOptions></FieldOptions>
        </div>
      </div>
    );
  }
}

export default App;
