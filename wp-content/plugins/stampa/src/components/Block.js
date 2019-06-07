import React from 'react';

import Store from '../store/store';

export default function Block({ block }) {
  const store = Store.useStore();
  const stampaBlock = block._stampa;

  // Allow the block itself to be dragged
  const dragMe = () => {
    store.set('draggedBlockId')(block._stampa.key);
  };

  const startResize = e => {
    e.stopPropagation();

    store.set('resizingBlockPosition')({
      startRow: stampaBlock.startRow,
      startColumn: stampaBlock.startColumn,
      endColumn: stampaBlock.endColumn,
      endRow: stampaBlock.endRow,
    });

    store.set('resizeDirection')(e.target.dataset.resize);
    store.set('resizingBlock')(true);
    store.set('draggedBlockId')(block._stampa.key);
  };

  const gridArea = `${stampaBlock.startRow} / ${
    stampaBlock.startColumn
  } / ${stampaBlock.endRow + stampaBlock.startRow} / ${stampaBlock.endColumn +
    stampaBlock.startColumn}`;

  return (
    <div
      draggable="true"
      className={`grid__block grid__block--${block._stampa.id}`}
      onDragStart={dragMe}
      data-key={block._stampa.key}
      style={{
        gridArea,
      }}
    >
      <p
        dangerouslySetInnerHTML={{ __html: block.html }}
        className="grid__block__content"
      />

      <div
        className="grid__block__resizer grid__block__resizer--width"
        draggable="true"
        data-resize="width"
        onDragStart={startResize}
      />
      <div
        className="grid__block__resizer grid__block__resizer--height"
        data-resize="height"
        draggable="true"
        onDragStart={startResize}
      />
      <div
        className="grid__block__resizer grid__block__resizer--se"
        data-resize="se"
        draggable="true"
        onDragStart={startResize}
      />
    </div>
  );
}
