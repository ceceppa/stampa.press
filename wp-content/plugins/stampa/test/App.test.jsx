import React from 'react';
import ReactDOM from 'react-dom';

import App from '../src/App';
import Store from '../src/store/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Store.Container>
      <App />
    </Store.Container>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
