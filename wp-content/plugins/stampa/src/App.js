import React, { Component } from 'react';

import FieldsList from './components/FieldsList';
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
  constructor(props) {
    super(props);

    const store = this.props.store;
    const blockData = stampa.getStampaBlocks();

    if (blockData) {
      store.set('gridColumns', parseInt(blockData.grid.columns));
      store.set('gridRows')(parseInt(blockData.grid.rows));
      store.set('gridGap')(parseInt(blockData.grid.gap));
      store.set('rowHeight')(parseInt(blockData.grid.rowHeight));

      // PHP returns true/false as string, not as boolean.
      blockData.options.hasBackgroundOption =
        blockData.options.hasBackgroundOption == 'true';
      store.set('stampaBlockOptions')(blockData.options);

      const fields = blockData.fields.map(field => {
        field = Object.assign(stampa.getFieldById(field._stampa.id), field);
        field._stampa.startColumn = parseInt(field._stampa.startColumn);
        field._stampa.startRow = parseInt(field._stampa.startRow);
        field._stampa.endRow = parseInt(field._stampa.endRow);
        field._stampa.endColumn = parseInt(field._stampa.endColumn);

        if (!field._values) {
          field._values = {};
        }

        return field;
      });

      store.set('stampaFields')(fields);
    }
  }

  render() {
    return (
      <div className="stampa">
        <FieldsList />
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
