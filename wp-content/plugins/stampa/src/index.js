import React from 'react';
import ReactDOM from 'react-dom';

import Store from './store/store';

import App from './App';
import * as serviceWorker from './serviceWorker';

const stampaElements = document.querySelectorAll('.stampa-app');

if (stampaElements.length) {
  /**
   * Prevent the custom style from the TinyMCE editor to ovewrite the
   * Gutenberg one.
   */
  ReactDOM.render(
    <Store.Container>
      <App />
    </Store.Container>,
    stampaElements[stampaElements.length - 1]
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
