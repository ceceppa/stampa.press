import React, { useRef } from 'react';
import Store from '../store/store';
import stampa from '../stampa';

const SVGGrid = React.memo(function SVGGrid({ drag }) {
  const ref = useRef();
  const store = Store.useStore();

  const columns = store.get('gridColumns');
  const rows = store.get('gridRows');
  const strokeWidth = store.get('gridGap');
  const draggedBlockId = store.get('draggedBlockId');

  const xPercentage = 100 / columns;
  const yPercentage = 100 / rows;
  let halfXGap = 0;
  let halfYGap = 0;

  if (ref.current) {
    const clientRect = ref.current.getBoundingClientRect();
    halfXGap = strokeWidth / clientRect.width / 2;
    halfYGap = strokeWidth / clientRect.height / 2;
  }

  if (drag == null || drag.hover == null) {
    drag = { hover: false };
  }

  // Calculate which cell to highlight
  let cellX = 0;
  let cellY = 0;

  if (draggedBlockId && ref.current) {
    const clientRect = ref.current.getBoundingClientRect();
    const x = drag.x - clientRect.x;
    const y = drag.y - clientRect.y;
    const cellWidth = (clientRect.width - gap * (columns - 1)) / columns;
    const cellHeight = (clientRect.height - gap * (rows - 1)) / rows;

    cellX = Math.floor(x / cellWidth);
    cellY = Math.floor(y / cellHeight);

    if (!Number.isNaN(cellX) && !Number.isNaN(cellY)) {
      stampa.setCellXY(cellX, cellY);
    }
  }

  return (
    <svg width="100" height="100" className="grid__svg" ref={ref}>
      {[...Array(columns - 1)].map((nothing, id) => {
        const x = (id + 1) * xPercentage;
        const percentage = `${x - halfXGap}%`;

        return (
          <line
            key={id}
            x1={percentage}
            y1="0"
            x2={percentage}
            y2="100%"
            className="line--column"
            style={{ strokeWidth }}
          />
        );
      })}
      {[...Array(rows - 1)].map((nothing, id) => {
        const y = (id + 1) * yPercentage;
        const percentage = `${y - halfYGap}%`;

        return (
          <line
            key={id}
            x1="0"
            y1={percentage}
            x2="100%"
            y2={percentage}
            className="line--row"
            style={{ strokeWidth }}
          />
        );
      })}
      {draggedBlockId && drag.hover && (
        <rect
          x={`${cellX * xPercentage}%`}
          y={`${cellY * yPercentage}%`}
          width={`${xPercentage}%`}
          height={`${yPercentage}%`}
          style={{ fill: '#0085ba', stroke: '#e2e4e7', strokeWidth: '4px' }}
        />
      )}
    </svg>
  );
});

export default SVGGrid;
