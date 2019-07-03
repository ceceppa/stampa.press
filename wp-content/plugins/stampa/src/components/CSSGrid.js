import React, { useRef, useEffect, useState } from 'react';

import Store from '../store/store';

const CSSGrid = React.memo(function SVGGrid({
  gridColumns,
  gridRows,
  gridGap,
  gridHeight,
  showGrid,
}) {
  const ref = useRef();
  const store = Store.useStore();
  const [backgroundSize, updateBackgroundSize] = useState('');
  const [backgroundPosition, updateBackgroundPosition] = useState('');
  const [backgroundImage, updateBackgroundImage] = useState('');

  /**
   * Update the grid on window resize
   */
  let timeout = null;
  window.addEventListener('resize', () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      updateGrid();
    }, 50);
  });

  const updateGrid = () => {
    const clientRect = ref.current.getBoundingClientRect();

    const width =
      (clientRect.width - gridGap * (gridColumns - 1)) / gridColumns;
    const height = (gridHeight + gridGap) / gridRows;
    console.info(gridHeight);
    // const height = (clientRect.height + gridGap) / gridRows;

    if (true) {
      updateBackgroundImage(
        `linear-gradient(to right, #e2e4e7 ${gridGap}px, transparent 1px), linear-gradient(to bottom, #e2e4e7 ${gridGap}px, transparent 1px)`
      );
      updateBackgroundPosition(`-${gridGap}px -${gridGap}px`);
      updateBackgroundSize(`${width + gridGap}px ${height}px`);
    } else {
      updateBackgroundImage('none');
    }
  };

  useEffect(() => {
    updateGrid();
  });

  return (
    <div
      className="css-grid"
      ref={ref}
      style={{ backgroundSize, backgroundImage, backgroundPosition }}
    />
  );
});

export default CSSGrid;
