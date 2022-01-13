import React from 'react';
import ReactDOM from 'react-dom';

import "./firebase/initFirabseApp";

import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store.js"
import './i18n';

//REMOVE composeWithDevTools in production
// const store = createStore(rootReducer, composeWithDevTools());

//cool deisgn
//https://www.tissotwatches.com/en-en/t1204073705100.html

//TODO
//https://expressjs.com/en/advanced/best-practice-security.html
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
