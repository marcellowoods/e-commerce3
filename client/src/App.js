import React, { Fragment, useReducer } from "react";
import Navbar from './components/shop/partials/Navbar'
import CartModal from './components/shop/partials/CartModal'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LayoutContext, layoutState, layoutReducer } from "./components/shop";

function App() {
    const [data, dispatch] = useReducer(layoutReducer, layoutState);
    return (
        <Fragment>
            <LayoutContext.Provider value={{ data, dispatch }}>
                <Router>
                    <Navbar />
                    <CartModal />
                    <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                <h1 className="relative py-3 max-w-xs md:max-w-lg mx-auto">
                    product
                </h1>
                
                </Router>
            </LayoutContext.Provider>
        </Fragment>
    );
}

export default App;
