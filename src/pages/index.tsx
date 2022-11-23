import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'Store';
import App from 'Components/App/App';
import 'Assets/fonts/fonts.scss';
import './index.scss';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as Element);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
