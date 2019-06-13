import React, { useState } from 'react';

import Store from '../store/store';

import SaveBlock from './BlockOptions/Save';

import ToggleGroup from './ToggleGroup';

export default function BlockOptions() {
  const store = Store.useStore();
  const stampaBlockOptions = store.get('stampaBlockOptions');
  const categories = ['formatting'];
  const pageTitle = store.get('pageTitle');

  function updateBackgroundOption(e) {
    stampaBlockOptions.hasBackgroundOption = e.target.checked;

    store.set('stampaBlockOptions')(stampaBlockOptions);
  }

  function updateBlockTitle(e) {
    stampaBlockOptions.title = e.target.value;

    store.set('stampaBlockOptions')(stampaBlockOptions);
  }

  return (
    <ToggleGroup
      label="Stampa block Options"
      display="block"
      groupClass="block-options stampa__border--bottom"
    >
      {/* Background */}
      <label htmlFor="background" className="stampa-number">
        <span
          className="stampa-number__label tooltip"
          data-tooltip="If checked allows the user to set up a background-image for the block."
        >
          Background Image:
        </span>
        <input
          className="stampa-number__input"
          type="checkbox"
          name="background"
          id="background"
          checked={stampaBlockOptions.hasBackgroundOption}
          onChange={updateBackgroundOption}
        />
      </label>
      <br />
      <SaveBlock />
    </ToggleGroup>
  );
}
