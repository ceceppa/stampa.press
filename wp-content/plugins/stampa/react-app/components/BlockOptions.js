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

  const updateFullWidth = useCallback(e => {
    stampaBlockOptions.fullWidth = e.target.checked;

    store.set('stampaBlockOptions')(stampaBlockOptions);
  });

  const updateIcon = useCallback(e => {
    stampaBlockOptions.icon = e.target.value;

    store.set('stampaBlockOptions')(stampaBlockOptions);
  });

  return (
    <ToggleGroup
      label="Stampa block Options"
      display="block"
      groupClass="block-options stampa__border--bottom"
    >
      {/* BEM root CSS class */}
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
      {/* Block icon */}
      <label htmlFor="block-name" className="stampa-number">
        <span
          className="stampa-number__label tooltip"
          data-tooltip="The dash icon to use. NOTE: the icon name must not include the 'dashicons-' prefix!"
        >
          <a
            href="https://developer.wordpress.org/resource/dashicons/"
            target="_blank"
          >
            Dash icon:
          </a>{' '}
          (
          <span
            className={`dashicons-before dashicons-${stampaBlockOptions.icon}`}
          />
          )
        </span>
        <input
          className="stampa-number__input"
          type="text"
          name="block-name"
          id="block-name"
          value={stampaBlockOptions.icon || ''}
          onChange={updateIcon}
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
      {/* full width */}
      {/* <label htmlFor="full-width" className="stampa-number">
        <span
          className="stampa-number__label tooltip"
          data-tooltip="If checked allows the user to set up a background-image for the block."
        >
          Full width:
        </span>
        <input
          className="stampa-number__input"
          type="checkbox"
          name="full-width"
          id="full-width"
          checked={stampaBlockOptions.fullWidth}
          onChange={updateFullWidth}
        />
      </label> */}
    </ToggleGroup>
  );
}
