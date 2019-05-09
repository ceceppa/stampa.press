import React, { useState } from 'react';

export function ComponentItem({ group, blocks }) {
  console.info(group, blocks);
  const items = Object.keys(blocks[group]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="components__group__body">
      <button className="components__group__label stampa__content stampa__border--bottom">
        {group}
        <span aria-hidden="true">
          <svg
            className="components__group__arrow"
            width="24px"
            height="24px"
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
      {items.map(id => (
        <dd key={id} className="components__group__item">
          <img
            className="components__group__image"
            src={blocks[group][id].icon}
            title={blocks[group][id].tooltip}
          />
        </dd>
      ))}
    </div>
  );
}

export default ComponentItem;
