import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import App from './App';
import './index.css';
import { StateType } from './model/store.type';
import rootReducer from './rootReducer';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import Axios from 'axios';
Axios.defaults.withCredentials = true;
const store = createStore<StateType, any, any, any>(rootReducer);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
