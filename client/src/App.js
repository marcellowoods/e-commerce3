import React, { Fragment, useReducer } from "react";
import Navbar from './components/shop/partials/Navbar'
import MobileNavbarMenu from './components/shop/partials/MobileNavbarMenu'
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
                    <MobileNavbarMenu />
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
                    <div className=" mx-auto">
                        <img className=" object-cover rounded" src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80" alt="" />
                        <img className=" object-cover rounded" src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80" alt="" />
                    </div>
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
