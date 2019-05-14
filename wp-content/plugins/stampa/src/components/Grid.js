import React, { useMemo, useState } from 'react';

import SVGGrid from './SVGGrid';

function Grid() {
  const [drag, setDragXY] = useState({ x: 0, y: 0, isDragMode: false });
  const columns = 12;
  const rows = 5;

  const handleDragHover = useMemo(e => e =>
    setDragXY({ x: e.clientX, y: e.clientY, isDragMode: true })
  );
  const handleDragLeave = useMemo(e => e =>
    setDragXY({ x: 0, y: 0, isDragMode: false })
  );

  return (
    <div className="stampa__grid grid">
      <div
        className="grid__content"
        onDragOver={handleDragHover}
        onDragLeave={handleDragLeave}
      >
        <SVGGrid rows={rows} columns={columns} drag={drag} />
      </div>
    </div>
  );
}

export default Grid;
