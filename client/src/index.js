import React from 'react';
import ReactDOM from 'react-dom';

import "./firebase/initFirabseApp";

import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store.js"
import './Translations/i18n';

//TODO remove from production
import Protect from './Protect'

//REMOVE composeWithDevTools in production
// const store = createStore(rootReducer, composeWithDevTools());

//cool deisgn
//https://www.tissotwatches.com/en-en/t1204073705100.html

//TODO
//https://expressjs.com/en/advanced/best-practice-security.html



//with pass
//create sha512 hash - https://emn178.github.io/online-tools/sha512.html
ReactDOM.render(
    <Protect
        boxTitle={""}
        sha512='b2eacf41227ba7fa7c24f10c838800c260415503aea327bbbc168e514509cf74c7328bd175b931dd70626031bf69bdfa66956094c144007fa9bd67568a7d9735'>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </Protect>,
    document.getElementById('root')
);

//without pass
// ReactDOM.render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </Provider>,
//     document.getElementById('root')
// );
