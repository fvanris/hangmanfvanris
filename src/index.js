import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import {DEBUG} from './Utils';
import store from './Store';
import { hangmanRestart } from "./Actions";
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root');

const render = () => {
    if (DEBUG) {
        console.log("In render()");
    }

    ReactDOM.render(
      <Provider store={store}>
          <App />
      </Provider>,
      rootEl);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

store.subscribe(render);
store.dispatch(hangmanRestart());
