import React, { useState, useEffect, Fragment } from "react";

import { Switch, Route } from "react-router-dom";
import onAuthStateChanged from "./auxiliary/firebaseAuthState";
import { useDispatch } from "react-redux";
import { getOrCreateUser } from "./functions/auth";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/UserRoute";

import LoadingPage from "./pages/LoadingPage";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register";

import Navigation from "./components/navigation"
import Orders from "./pages/user/Orders";
import Settings from "./pages/user/Settings";
import CreateProduct from "./pages/admin/CreateProduct";
import CreateCategory from "./pages/admin/CreateCategory";
import Home from "./pages/Home"



function App() {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    let onCurrentUserSuccess = (res, idTokenResult) => {

        dispatch({
            type: "LOGGED_IN_USER",
            payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                address: res.data.address,
                _id: res.data._id,
            },
        });
    }

    let onFirebaseLogout = () => {

        console.log("firebaseLogout")
        dispatch({
            type: "LOGGED_IN_USER",
            payload: null
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(isLoading, setIsLoading, getOrCreateUser, onCurrentUserSuccess, onFirebaseLogout);

        // cleanup
        return () => unsubscribe();
    }, [dispatch]);

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <Fragment>

            <Navigation />

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/categories" component={Home} />
                <Route path="/shop/:categoryParam?/" component={Shop} />
                <Route exact path="/product/:productParam" component={ProductPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                
                <UserRoute exact path="/user/orders" component={Orders} />
                <UserRoute exact path="/user/settings" component={Settings} />
                
                <AdminRoute exact path="/admin/create-product" component={CreateProduct} />
                <AdminRoute exact path="/admin/create-category" component={CreateCategory} />


            </Switch>
        </Fragment>
    );
}

export default App;




