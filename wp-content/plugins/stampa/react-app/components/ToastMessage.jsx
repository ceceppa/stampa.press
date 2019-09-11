import React, { Fragment } from 'react';
import Store from '../store/store';

const ToastMessage = function(props) {
  const store = Store.useStore();
  const toast = store.get('toast');
  const visibleClass = toast.message ? 'visible' : '';

  return (
    <Fragment>
      <div className={`toast-overlay ${visibleClass}`}></div>
      <div className={`toast-message ${visibleClass}`}>
        <span className="toast-message__label">Message goes here</span>
        <button className="button button-link-delete">Yes</button>
        <button className="button">No</button>
      </div>
    </Fragment>
  );
};

export default React.memo(ToastMessage);
