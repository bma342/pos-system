import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axe from '@axe-core/react';
import store from './store'; // Import your store

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000);
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
