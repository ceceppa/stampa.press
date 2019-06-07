import React, { useRef, useState, useEffect } from 'react';
import shortid from 'shortid';

import Store from '../store/store';
import stampa from '../stampa';

import SVGGrid from './SVGGrid';
import CSSGrid from './CSSGrid';
import Block from './Block';

function Grid() {
  const ref = useRef();
  const store = Store.useStore();
  const [blocks, setBlocks] = useState([]);
  const [drag, setDrag] = useState({});

  const draggedBlockId = store.get('draggedBlockId');

  const handleDragOver = e => {
    e.preventDefault();

    if (draggedBlockId) {
      const clientRect = ref.current.getBoundingClientRect();
      const columns = store.get('gridColumns');
      const rows = store.get('gridRows');
      const gap = store.get('gridGap');

      const x = e.clientX - clientRect.x;
      const y = e.clientY - clientRect.y;
      const cellWidth = (clientRect.width - gap * (columns - 1)) / columns;
      const cellHeight = (clientRect.height - gap * (rows - 1)) / rows;

      const cellX = Math.ceil(x / cellWidth);
      const cellY = Math.ceil(y / cellHeight);

      /**
       * Store the cell position.
       *
       * Because this information doesn't need to cause any
       * re-rendering, we're going to store into a custom object
       */
      if (!Number.isNaN(cellX) && !Number.isNaN(cellY)) {
        setDrag({
          column: cellX,
          row: cellY,
          over: true,
        });
      }
    }
  };

  const handleDragLeave = e => {
    setDrag({ over: false });
  };

  const handleDrop = e => {
    handleDragLeave();

    const draggedBlockId = store.get('draggedBlockId');

    if (draggedBlockId == null) {
      return;
    }

    store.set('resizingBlock')(false);

    /**
     * Is a new item or am I moving a one from the board?
     */
    if (draggedBlockId[0] == '_') {
      for (let i = 0, l = blocks.length; i < l; ++i) {
        const block = blocks[i];

        if (block._stampa.key === draggedBlockId) {
          const resize = store.get('resizeDirection');

          let resizeWidth = false;
          let resizeHeight = false;
          if (resize == 'width') {
            resizeWidth = true;
          } else if (resize == 'height') {
            resizeHeight = true;
          } else if (resize == 'se') {
            resizeWidth = true;
            resizeHeight = true;
          } else {
            block._stampa.startRow = drag.row;
            block._stampa.startColumn = drag.column;
          }

          if (resizeWidth && drag.column >= block._stampa.startColumn) {
            block._stampa.endColumn =
              drag.column - block._stampa.startColumn + 1;
          }

          if (resizeHeight && drag.row >= block._stampa.startRow) {
            block._stampa.endRow = drag.row - block._stampa.startRow + 1;
          }

          break;
        }
      }

      setBlocks(blocks);
    } else {
      const block = stampa.getBlockById(draggedBlockId);

      block._stampa = {
        id: draggedBlockId,
        key: `_${shortid.generate()}`,
        startColumn: drag.column,
        startRow: drag.row,
        endColumn: 1,
        endRow: 1,
      };

      setBlocks([...blocks, block]);
    }
  };

  let gridArea;

  if (store.get('resizingBlock')) {
    let { startRow, startColumn, endRow, endColumn } = store.get(
      'resizingBlockPosition'
    );
    const resize = store.get('resizeDirection');

    if (resize == 'width') {
      endColumn = Math.max(startColumn, drag.column + 1);
      endRow += startRow;
    } else if (resize == 'height') {
      endRow = Math.max(startRow, drag.row + 1);
      endColumn += startColumn;
    } else {
      endColumn = Math.max(startColumn, drag.column + 1);
      endRow = Math.max(startRow, drag.row + 1);
    }

    if (!Number.isNaN(endRow) && !Number.isNaN(endColumn)) {
      gridArea = `${startRow} / ${startColumn} / ${endRow} / ${endColumn}`;
    }
  } else {
    gridArea = `${drag.row} / ${drag.column} / ${drag.row} / ${drag.column}`;
  }

  // gridColumn: drag.column,
  // gridRow: drag.row,

  const minHeight = 46 * store.get('gridRows') + 'px';
  return (
    <div className="stampa__grid grid">
      <div
        className="grid__content"
        ref={ref}
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
        <CSSGrid />
        {/* <SVGGrid drag={drag} /> */}
        {blocks.map(block => (
          <Block block={block} key={block._stampa.key} />
        ))}
        {draggedBlockId && drag.over && (
          <div
            className="grid__highlight"
            style={{
              gridArea,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Grid;
