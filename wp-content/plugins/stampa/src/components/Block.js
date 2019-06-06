import React from 'react';

import Store from '../store/store';

export default function Block({ block }) {
  const store = Store.useStore();

  // Allow the block itself to be dragged
  const dragMe = e => {
    store.set('draggedBlockId')(e.target.dataset.key);
  };

  return (
    <div
      dangerouslySetInnerHTML={{ __html: block.html }}
      draggable="true"
      className={`grid__block grid__block--${block._stampa.id}`}
      onDragStart={dragMe}
      data-key={block._stampa.key}
      style={{
        gridRow: block._stampa.row,
        gridColumn: block._stampa.column,
      }}
    />
  );
}
