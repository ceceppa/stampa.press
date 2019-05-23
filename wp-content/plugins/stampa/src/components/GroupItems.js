import React, { useState } from 'react';
import Store from '../store/store';
import ToggleGroup from './ToggleGroup';

function GroupItems({ group, blocks }) {
  const store = Store.useStore();

  const items = Object.keys(blocks[group]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="components__group__body">
      <ToggleGroup label={group}>
        <ul className="components__items">
          {items.map(id => {
            const block = blocks[group][id];
            return (
              <li
                key={id}
                className="components__item tooltip"
                draggable="true"
                onDragStart={() => store.set('draggedBlock')(block)}
                onDragEnd={() => store.set('draggedBlock')(null)}
                data-tooltip={block.tooltip}
              >
                <img
                  className="components__image"
                  src={block.icon}
                  aria-hidden="true"
                  draggable="false"
                />
                <span className="components__label">{block.label}</span>
              </li>
            );
          })}
        </ul>
      </ToggleGroup>
    </div>
  );
}

export default GroupItems;
