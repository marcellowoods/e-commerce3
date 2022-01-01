import React, { useState, useEffect, Fragment } from "react";

import { Switch, Route } from "react-router-dom";
import onAuthStateChanged from "./firebase/firebaseAuthState";
import { useDispatch } from "react-redux";
import { getOrCreateUser } from "./functions/auth";

import Navigation from "./components/navigation"

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/UserRoute";

import LoadingPage from "./pages/LoadingPage";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register";


import Orders from "./pages/user/Orders";
import Settings from "./pages/user/Settings";

import CreateProduct from "./pages/admin/CreateProduct";
import ListProducts from "./pages/admin/ListProducts";
import EditProduct from "./pages/admin/EditProduct";

import CreateCategory from "./pages/admin/CreateCategory";
import ListCategories from "./pages/admin/ListCategories";
import EditCategory from "./pages/admin/EditCategory";

import UpdateOrders from "./pages/admin/UpdateOrders";


import Home from "./pages/Home";

import {
    onIdTokenChanged
} from "firebase/auth";


function App() {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    let onCurrentUserSuccess = (res, getToken) => {

        dispatch({
            type: "LOGGED_IN_USER",
            payload: {
                name: res.data.name,
                email: res.data.email,
                getToken: getToken,
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
                <Route exact path="/shop/:categoryParam?/:typeParam?/:pageParam?/" component={Shop} />
                <Route exact path="/product/:productSlugParam" component={ProductPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/checkout" component={Checkout} />

                <UserRoute exact path="/user/orders" component={Orders} />
                <UserRoute exact path="/user/settings" component={Settings} />

                <AdminRoute exact path="/admin/list-categories" component={ListCategories} />
                <AdminRoute exact path="/admin/create-category" component={CreateCategory} />
                <AdminRoute exact path="/admin/edit-category/:categorySlugParam" component={EditCategory} />

                <AdminRoute exact path="/admin/list-products" component={ListProducts} />
                <AdminRoute exact path="/admin/create-product" component={CreateProduct} />
                <AdminRoute exact path="/admin/edit-product/:productSlugParam" component={EditProduct} />

                <AdminRoute exact path="/admin/update-orders" component={UpdateOrders} />

            </Switch>
        </Fragment>
    );
}

export default App;




