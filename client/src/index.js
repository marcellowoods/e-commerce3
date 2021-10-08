import React from 'react';
import ReactDOM from 'react-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./firebase/initFirabseApp";

import './index.css';
import App from './App';
import rootReducer from "./reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";

//REMOVE composeWithDevTools in production
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
