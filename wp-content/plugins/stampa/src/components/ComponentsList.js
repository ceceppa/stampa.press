/* global stampa */
import React, { Component } from 'react';
import ComponentItem from './ComponentItem';

function ComponentsList() {
  const blocks =
    window.stampa && window.stampa.blocks ? window.stampa.blocks : [];
  const keys = Object.keys(blocks);

  return (
    <div className="componentsList">
      {keys.map(group => (
        <dl key={group}>
          <dt>{group}</dt>
          {Object.keys(blocks[group]).map(id => (
            <dd key={id}>
              <img
                src={blocks[group][id].icon}
                title={blocks[group][id].tooltip}
              />
            </dd>
          ))}
        </dl>
      ))}
    </div>
  );
}

export default ComponentsList;
