import React, { useMemo, useState } from 'react';
import Store from '../store/store';

import stampa from '../stampa';

import SVGGrid from './SVGGrid';

function Grid() {
  const store = Store.useStore();
  const [blocks, setBlocks] = useState([]);

  const [drag, setDragXY] = useState({ x: 0, y: 0, isDragMode: false });

  const handleDragOver = e => {
    e.preventDefault();
    setDragXY({ x: e.clientX, y: e.clientY, hover: true });
  };
  const handleDragLeave = e => setDragXY({ x: 0, y: 0, hover: false });

  // const handleDragLeave = useMemo(e => e =>
  //   setDragXY({ x: 0, y: 0, hover: false }));

  const handleDrop = useMemo(e => e => {
    handleDragLeave();

    const draggedBlockId = store.get('draggedBlockId');

    if (draggedBlockId == null) {
      return;
    }

    const block = stampa.getBlockById(draggedBlockId);
    const coords = stampa.getCellXY();

    block._stampa = {
      key: draggedBlockId + new Date().getTime(),
      column: coords.column,
      row: coords.row,
    };

    console.info(block);

    setBlocks([...blocks, block]);
  });

  const minHeight = 46 * store.get('gridRows') + 'px';
  return (
    <div className="stampa__grid grid">
      <div
        className="grid__content"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          gridTemplateColumns: `repeat(${store.get('gridColumns')}, 1fr)`,
          gridTemplateRows: `repeat(${store.get('gridRows')}, 1fr)`,
          gridGap: `${store.get('gridGap')}px`,
          minHeight,
        }}
      >
        <SVGGrid drag={drag} />
        {blocks.map(block => (
          <div
            dangerouslySetInnerHTML={{ __html: block.html }}
            key={block._stampa.key}
            style={{
              gridRow: block._stampa.row,
              gridColumn: block._stampa.column,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
