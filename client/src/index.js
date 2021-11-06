import React from 'react';
import ReactDOM from 'react-dom';

import "./firebase/initFirabseApp";

import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store.js"

//REMOVE composeWithDevTools in production
// const store = createStore(rootReducer, composeWithDevTools());

//cool deisgn
//https://www.tissotwatches.com/en-en/t1204073705100.html
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
