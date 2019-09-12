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
        <span
          className="toast-message__label"
          dangerouslySetInnerHTML={{ __html: toast.message }}
        />
        {toast.button1 && (
          <button
            className="button button-link-delete"
            onClick={toast.button1Callback}
          >
            {toast.button1}
          </button>
        )}
        {toast.button2 && (
          <button className="button" onClick={toast.button2Callback}>
            {toast.button2}
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default React.memo(ToastMessage);
