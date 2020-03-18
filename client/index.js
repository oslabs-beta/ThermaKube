import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store';

//import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
);
