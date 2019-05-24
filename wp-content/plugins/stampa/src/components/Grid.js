import React, { useMemo, useState } from 'react';
import shortid from 'shortid';

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

  const handleDrop = e => {
    handleDragLeave();

    console.info('ciao');
    const draggedBlockId = store.get('draggedBlockId');

    if (draggedBlockId == null) {
      return;
    }

    const block = stampa.getBlockById(draggedBlockId);
    const coords = stampa.getCellXY();

    block._stampa = {
      key: shortid.generate(),
      column: coords.column,
      row: coords.row,
    };

    setBlocks([...blocks, block]);
  };

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
            draggable="true"
            className="grid__block"
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
