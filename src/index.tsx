import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'App/App';
import store from './store';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as Element);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
