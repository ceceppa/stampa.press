import React, { useRef, useEffect, useState } from 'react';

import Store from '../store/store';

const CSSGrid = React.memo(function SVGGrid() {
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
    const columns = store.get('gridColumns');
    const rows = store.get('gridRows');
    const gap = store.get('gridGap');

    const width = (clientRect.width - gap * (columns - 1)) / columns;
    const height = (clientRect.height + gap) / rows;

    if (store.get('gridShow')) {
      updateBackgroundImage(
        `linear-gradient(to right, #e2e4e7 ${gap}px, transparent 1px), linear-gradient(to bottom, #e2e4e7 ${gap}px, transparent 1px)`
      );
      updateBackgroundPosition(`-${gap}px -${gap}px`);
      updateBackgroundSize(`${width + gap}px ${height}px`);
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
