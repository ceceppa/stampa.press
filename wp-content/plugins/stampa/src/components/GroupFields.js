import React, { useState } from 'react';

import Store from '../store/store';
import ToggleGroup from './ToggleGroup';
import stampa from '../stampa';

export default function GroupFields({ group, fields }) {
  const store = Store.useStore();
  const keys = Object.keys(fields[group]);
  const groupLowercase = group.toLowerCase();

  const searchFilter = store.get('searchFilter').toLowerCase();

  return (
    <div className="stampa-fields__group__body">
      <ToggleGroup label={group}>
        <ul className="stampa-fields__items">
          {keys.map(key => {
            const field = fields[group][key];

            return (
              <li
                key={key}
                className="stampa-fields__item tooltip"
                draggable="true"
                onDragStart={e => {
                  stampa.setDraggedField(field);
                  stampa.setDraggedFieldId(key);
                  stampa.setDraggedFieldGroup(groupLowercase);

                  store.set('draggedFieldId')(key);
                  e.dataTransfer.setData('stampa-field-key', key);
                }}
                onDragEnd={() => {
                  stampa.setDraggedField(null);
                  stampa.setDraggedFieldGroup(null);
                  stampa.setDraggedFieldId(null);

                  store.set('draggedFieldId')(null);
                }}
                data-tooltip={field.tooltip}
                style={{
                  display: searchFilter == '' ||
                    groupLowercase.indexOf(searchFilter) >= 0 ||
                    field.label.toLowerCase().indexOf(searchFilter) >= 0
                    ? 'block'
                    : 'none',
                }}
              >
                <img
                  className="stampa-fields__image"
                  src={field.icon}
                  aria-hidden="true"
                  draggable="false"
                />
                <span className="stampa-fields__label">{field.label}</span>
                {field.help &&
                  <a
                    href={field.help}
                    className="stampa-fields__help"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 437.6 437.6"
                    >
                      <path d="M194 142.8c.8 1.6 1.6 3.2 2.4 4.4.8 1.2 2 2.4 2.8 3.6 1.2 1.2 2.4 2.4 4 3.6 1.2.8 2.8 2 4.8 2.4 1.6.8 3.2 1.2 5.2 1.6 2 .4 3.6.4 5.2.4s3.6 0 5.2-.4 3.2-.8 4.4-1.6h.4c1.6-.8 3.2-1.6 4.8-2.8 1.2-.8 2.4-2 3.6-3.2l.4-.4c1.2-1.2 2-2.4 2.8-3.6s1.6-2.4 2-4c0-.4 0-.4.4-.8.8-1.6 1.2-3.6 1.6-5.2.4-1.6.4-3.6.4-5.2s0-3.6-.4-5.2-.8-3.2-1.6-5.2c-1.2-2.8-2.8-5.2-4.8-7.2l-.8-.8c-1.2-1.2-2.4-2-4-3.2-1.6-.8-2.8-1.6-4.4-2.4-1.6-.8-3.2-1.2-4.8-1.6-2-.4-3.6-.4-5.2-.4s-3.6 0-5.2.4-3.2.8-4.8 1.6h-.4c-1.6.8-3.2 1.6-4.4 2.4-1.6 1.2-2.8 2-4 3.2-1.2 1.2-2.4 2.4-3.2 3.6-.8 1.2-1.6 2.8-2.4 4.4-.8 1.6-1.2 3.2-1.6 4.8-.4 2-.4 3.6-.4 5.2s0 3.6.4 5.2c.4 3.2 1.2 4.8 1.6 6.4zM249.6 289.2h-9.2v-98c0-5.6-4.4-10.4-10.4-10.4h-42c-5.6 0-10.4 4.4-10.4 10.4v21.6c0 5.6 4.4 10.4 10.4 10.4h8.4v66.4H188c-5.6 0-10.4 4.4-10.4 10.4v21.6c0 5.6 4.4 10.4 10.4 10.4h61.6c5.6 0 10.4-4.4 10.4-10.4V300c0-6-4.8-10.8-10.4-10.8z" />
                      <path d="M218.8 0C98 0 0 98 0 218.8s98 218.8 218.8 218.8 218.8-98 218.8-218.8S339.6 0 218.8 0zm0 408.8c-104.8 0-190-85.2-190-190s85.2-190 190-190 190 85.2 190 190-85.2 190-190 190z" />
                    </svg>
                  </a>}
              </li>
            );
          })}
        </ul>
      </ToggleGroup>
    </div>
  );
}
