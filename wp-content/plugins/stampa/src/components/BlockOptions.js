import React, { useCallback } from 'react';

import Store from '../store/store';

import ToggleGroup from './ToggleGroup';

export default function BlockOptions() {
  const store = Store.useStore();
  const stampaBlockOptions = store.get('stampaBlockOptions');

  const updateBackgroundOption = useCallback(e => {
    stampaBlockOptions.hasBackgroundOption = e.target.checked;

    store.set('stampaBlockOptions')(stampaBlockOptions);
  });

  const updateBlockCssClassName = useCallback(e => {
    stampaBlockOptions.cssClassName = e.target.value;

    store.set('stampaBlockOptions')(stampaBlockOptions);
  });

  return (
    <ToggleGroup
      label="Stampa block Options"
      display="block"
      groupClass="block-options stampa__border--bottom"
    >
      {/*  */}
      <label htmlFor="block-name" className="stampa-number">
        <span
          className="stampa-number__label tooltip"
          data-tooltip="The root css class to use for generating the CSS/"
        >
          Block root css class:
        </span>
        <input
          className="stampa-number__input"
          type="text"
          name="block-name"
          id="block-name"
          value={stampaBlockOptions.cssClassName || ''}
          onChange={updateBlockCssClassName}
        />
      </label>
      {/* Background */}
      <label htmlFor="block-background" className="stampa-number">
        <span
          className="stampa-number__label tooltip"
          data-tooltip="If checked allows the user to set up a background-image for the block."
        >
          Background Image:
        </span>
        <input
          className="stampa-number__input"
          type="checkbox"
          name="block-background"
          id="block-background"
          checked={stampaBlockOptions.hasBackgroundOption}
          onChange={updateBackgroundOption}
        />
      </label>
      {/* full bleed */}
      <label htmlFor="full-bleed" className="stampa-number">
        <span
          className="stampa-number__label tooltip"
          data-tooltip="If checked allows the user to set up a background-image for the block."
        >
          Full bleed:
        </span>
        <input
          className="stampa-number__input"
          type="checkbox"
          name="full-bleed"
          id="full-bleed"
          checked={stampaBlockOptions.fullBleed}
          onChange={updateBackgroundOption}
        />
      </label>
    </ToggleGroup>
  );
}
