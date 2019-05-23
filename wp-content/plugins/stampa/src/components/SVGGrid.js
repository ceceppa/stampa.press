import React, { useRef } from 'react';
import Store from '../store/store';

const SVGGrid = React.memo(function SVGGrid({ columns, rows, drag }) {
  const ref = useRef();
  const store = Store.useStore();

  const xPercentage = 100 / columns;
  const yPercentage = 100 / rows;

  // Calculate which cell to highlight
  let cellX = 0;
  let cellY = 0;

  if (store.get('dragElementId') && ref.current) {
    const clientRect = ref.current.getBoundingClientRect();
    const x = drag.x - clientRect.x;
    const y = drag.y - clientRect.y;
    const cellWidth = clientRect.width / columns;
    const cellHeight = clientRect.height / rows;

    cellX = Math.floor(x / cellWidth);
    cellY = Math.floor(y / cellHeight);
  }

  return (
    <svg width="100" height="100" className="grid__svg" ref={ref}>
      {[...Array(columns)].map((nothing, id) => {
        const x = `${(id + 1) * xPercentage}%`;
        return (
          <line
            key={id}
            x1={x}
            y1="0"
            x2={x}
            y2="100%"
            className="line--column"
          />
        );
      })}
      {[...Array(rows)].map((nothing, id) => {
        const y = `${(id + 1) * yPercentage}%`;
        return (
          <line key={id} x1="0" y1={y} x2="100%" y2={y} className="line--row" />
        );
      })}
      {store.get('dragElementId') && (
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
