import React, { Component } from 'react';

import ComponentsList from './components/ComponentsList';
import GridOptions from './components/GridOptions';
import BlockOptions from './components/BlockOptions';
import FieldOptions from './components/FieldOptions';
import Grid from './components/Grid';

import Store from './store/store';
import stampa from './stampa';

class App extends Component {
  /**
   * Restore the block on page load
   */
  componentDidMount() {
    const store = this.props.store;
    const blockData = stampa.blockData();

    if (blockData) {
      // store.set('gridColumns', parseInt(blockData.grid.columns));
      store.set('gridRows')(parseInt(blockData.grid.rows));
      store.set('gridGap')(parseInt(blockData.grid.gap));

      store.set('stampaBlocks')(blockData.fields);
    }
  }

  render() {
    return (
      <div className="stampa">
        <ComponentsList />
        <Grid />
        <div className="stampa__right">
          <GridOptions />
          <BlockOptions />
          <FieldOptions />
        </div>
      </div>
    );
  }
}

export default Store.withStore(App);
