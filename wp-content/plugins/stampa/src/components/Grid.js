import React, { useMemo, useState } from 'react';
import Store from '../store/store';

import SVGGrid from './SVGGrid';

function Grid() {
  const store = Store.useStore();
  const [drag, setDragXY] = useState({ x: 0, y: 0, isDragMode: false });

  const handleDragHover = useMemo(e => e =>
    setDragXY({ x: e.clientX, y: e.clientY, hover: true }));
  const handleDragLeave = useMemo(e => e =>
    setDragXY({ x: 0, y: 0, hover: false }));

  const minHeight = 46 * store.get('gridRows') + 'px';
  return (
    <div className="stampa__grid grid">
      <div
        className="grid__content"
        onDragOver={handleDragHover}
        onDragLeave={handleDragLeave}
        style={{ minHeight }}
      >
        <SVGGrid drag={drag} />
      </div>
    </div>
  );
}

export default Grid;
