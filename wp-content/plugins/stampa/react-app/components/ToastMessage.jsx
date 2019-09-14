import React, { Fragment, useEffect } from 'react';
import Store from '../store/store';

let showOverlay = true;

/**
 * When doing the autohide you can see the message disapper while
 * the element is sliding up, and that looks very glitchy.
 * So we're using a local variable to make the animation better again.
 */
let latestMessage = null;
let autoHideTiemout = null;

const ToastMessage = function(props) {
  const store = Store.useStore();
  const toastData = store.get('toast');
  const visibleClass = toastData.message ? 'visible' : '';
  const overlayVisibleClass = toastData.message && showOverlay ? 'visible' : '';

  useEffect(() => {
    if (toastData.autoHide) {
      toastData.autoHide = false;
      showOverlay = false;
      latestMessage = toastData.message;

      clearTimeout(autoHideTiemout);
      autoHideTiemout = setTimeout(() => {
        toastData.message = null;
        showOverlay = true;

        store.set('toast')(toastData);

        setTimeout(() => {
          latestMessage = null;
        }, 200);
      }, 5000);

      store.set('toast')(toastData);
    }
  });

  return (
    <Fragment>
      <div className={`toast-overlay ${overlayVisibleClass}`}></div>
      <div className={`toast-message ${visibleClass}`}>
        <span
          className="toast-message__label"
          dangerouslySetInnerHTML={{
            __html: toastData.message || latestMessage,
          }}
        />
        {toastData.button1 && (
          <button
            className="button button-link-delete"
            onClick={toastData.button1Callback}
          >
            {toastData.button1}
          </button>
        )}
        {toastData.button2 && (
          <button className="button" onClick={toastData.button2Callback}>
            {toastData.button2}
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default React.memo(ToastMessage);
