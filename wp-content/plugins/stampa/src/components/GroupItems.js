import React, { useState } from 'react';

function GroupItems({ group, blocks }) {
  const items = Object.keys(blocks[group]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="components__group__body">
      <button
        className={`components__group__label stampa__content stampa__border--bottom${
          collapsed ? ' collapsed' : ''
        }`}
        type="button"
        onClick={() => setCollapsed(!collapsed)}
      >
        {group}
        <span aria-hidden="true" className="components__group__arrow">
          <svg
            className={collapsed ? 'collpsed' : undefined}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
            focusable="false"
          >
            <g>
              <path fill="none" d="M0,0h24v24H0V0z" />
            </g>
            <g>
              <path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z" />
            </g>
          </svg>
        </span>
      </button>
      <ul
        className="components__items stampa__content"
        style={{ display: collapsed ? 'none' : 'grid' }}
      >
        {items.map(id => {
          const block = blocks[group][id];
          return (
            <li key={id} className="components__item" draggable="true">
              <img
                className="components__image"
                src={block.icon}
                title={block.tooltip}
                draggable="false"
              />
              <span className="components__label">{block.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GroupItems;
