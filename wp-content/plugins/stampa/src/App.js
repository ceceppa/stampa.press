import React, { Component } from 'react';

import FieldsList from './components/FieldsList';
import GridOptions from './components/GridOptions';
import BlockOptions from './components/BlockOptions';
import FieldOptions from './components/FieldOptions';
import Grid from './components/Grid';

import Store from './store/store';
import stampa from './stampa';
import Hierarchy from './components/Hierarchy';

class App extends Component {
  /**
   * Restore the block on page load
   */
  constructor(props) {
    super(props);

    const store = this.props.store;
    const blockData = stampa.getStampaBlocks();

    if (blockData) {
      store.set('gridColumns')(parseInt(blockData.grid.columns));
      store.set('gridRows')(parseInt(blockData.grid.rows));
      store.set('gridGap')(parseInt(blockData.grid.gap));
      store.set('rowHeight')(parseInt(blockData.grid.rowHeight));
      store.set('stampaBlockTitle')(blockData.blockTitle);

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

    this.updateBlockTitle = this.updateBlockTitle.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keypress', e => {
      if (e.key === 'Delete') {
        stampa.deleteActiveField(this.props.store);
      }
    });
  }

  updateBlockTitle(e) {
    this.props.store.set('stampaBlockTitle')(e.target.value);
  }
  render() {
    return (
      <div className="stampa">
        <GridOptions />

        <div className="stampa__body">
          <FieldsList />

          <div className="stampa__grid">
            <div className="stampa__title">
              <label
                className="screen-reader-text"
                id="title-prompt-text"
                htmlFor="block-title"
              >
                Add block title
              </label>
              <input
                className="stampa__title--input"
                type="text"
                name="block-title"
                id="block-title"
                placeholder="Block title"
                value={this.props.store.get('stampaBlockTitle')}
                onChange={this.updateBlockTitle}
              />
            </div>
            <Grid
              gridColumns={this.props.store.get('gridColumns')}
              gridRows={this.props.store.get('gridRows')}
              gridGap={this.props.store.get('gridGap')}
              gridRowHeight={this.props.store.get('rowHeight')}
            />
          </div>
          <div className="stampa__right">
            <BlockOptions />
            <FieldOptions />
            <Hierarchy />
          </div>
        </div>
      </div>
    );
  }
}

export default Store.withStore(App);
