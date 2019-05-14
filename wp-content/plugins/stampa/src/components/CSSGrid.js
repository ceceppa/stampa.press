import React from 'react';

function CSSGrid({ columns, rows }) {
  return (
    <div className="grid__css">
      {[...Array(columns * rows)].map((nothing, id) => {
        return <div key={id} className="grid__css__cell" />;
      })}
    </div>
  );
}

export default CSSGrid;
