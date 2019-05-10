import React, { Component } from 'react';

import SVGGrid from './SVGGrid';

function Grid() {
  const columns = 12;
  const rows = 6;

  return (
    <div className="stampa__grid grid">
      <div className="grid__content">
        <SVGGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default Grid;
