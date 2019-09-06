import React, { useState } from 'react';

/**
 * Toggle Group
 *
 * @param {string} label the label
 * @param {children} the children elements
 * @param {display} the style.display value to set when the group is visible
 * @param {groupClass} the extra class to assign to the group
 */
export default function toggleGroup({
  label,
  children,
  display,
  groupClass = null,
  isCollapsed = false,
  groupIcon = null,
}) {
  const [collapsed, setCollapsed] = useState(null);

  if (collapsed == null) {
    setCollapsed(isCollapsed);
  }

  if (display == null) {
    display = 'block';
  }

  return (
    <div className={`toggle-group ${groupClass || ''}`}>
      <button
        className={`toggle-group__button stampa__content stampa__border--bottom ${
          collapsed ? ' collapsed' : ''
        }`}
        type="button"
        onClick={() => setCollapsed(!collapsed)}
      >
        {groupIcon && (
          <img src={groupIcon} alt="" className="toggle-group__icon" />
        )}
        <span className="toggle-group__label">{label}</span>
        <span aria-hidden="true" className="toggle-group__arrow">
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
      <div
        className="toggle-group__content stampa__content"
        style={{ display: collapsed ? 'none' : display }}
      >
        {children}
      </div>
    </div>
  );
}
