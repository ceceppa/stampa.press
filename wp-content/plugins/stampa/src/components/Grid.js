import React, { useMemo, useState } from 'react';
import shortid from 'shortid';

import Store from '../store/store';
import stampa from '../stampa';

import SVGGrid from './SVGGrid';
import Block from './Block';

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

    const draggedBlockId = store.get('draggedBlockId');

    if (draggedBlockId == null) {
      return;
    }

    /**
     * Is a new item or am I moving a one from the board?
     */
    const coords = stampa.getCellXY();
    if (draggedBlockId[0] == '_') {
      for (let i = 0, l = blocks.length; i < l; ++i) {
        const block = blocks[i];

        if (block._stampa.key === draggedBlockId) {
          block._stampa.column = coords.column;
          block._stampa.row = coords.row;

          break;
        }
      }
    } else {
      const block = stampa.getBlockById(draggedBlockId);

      block._stampa = {
        id: draggedBlockId,
        key: `_${shortid.generate()}`,
        column: coords.column,
        row: coords.row,
      };

      setBlocks([...blocks, block]);
    }
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
          <Block block={block} key={block._stampa.key} />
        ))}
      </div>
    </div>
  );
}

export default Grid;
