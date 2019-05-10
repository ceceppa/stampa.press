import React from 'react';

function SVGGrid({ columns, rows }) {
  const xPercentage = 100 / columns;
  const yPercentage = 100 / rows;

  return (
    <svg width="100" height="100" className="grid__svg">
      {[...Array(columns)].map((nothing, id) => {
        const x = `${(id + 1) * xPercentage}%`;
        return <line key={id} x1={x} y1="0" x2={x} y2="100%" />;
      })}
      {[...Array(rows)].map((nothing, id) => {
        const y = `${(id + 1) * yPercentage}%`;
        return <line key={id} x1="0" y1={y} x2="100%" y2={y} />;
      })}
    </svg>
  );
}

export default SVGGrid;
