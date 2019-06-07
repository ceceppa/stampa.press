import React, { useState } from 'react';

import Store from '../store/store';

import SaveBlock from './BlockOptions/Save';

import ToggleGroup from './ToggleGroup';
import NumberSlider from './NumberSlider';

export default function BlockOptions() {
  const store = Store.useStore();

  return (
    <ToggleGroup
      label="Block Options"
      display="block"
      groupClass="block-options stampa__border--bottom"
    >
      <SaveBlock />
    </ToggleGroup>
  );
}
