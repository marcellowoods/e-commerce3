import React, { useState, useEffect, Fragment, lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import onAuthStateChanged from "./firebase/firebaseAuthState";
import { useDispatch } from "react-redux";
import { getOrCreateUser } from "./functions/auth";

import Navigation from "./components/navigation"

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/UserRoute";

import LoadingPage from "./pages/LoadingPage";
import Shop from "./pages/Shop";
import ContactPage from "./pages/ContactPage";
import SearchShop from "./pages/SearchShop";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";


import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register";

//TODO
// import Settings from "./pages/user/Settings";
import Orders from "./pages/user/Orders";

import Home from "./pages/Home";

import { filterCart } from "./actions/cartActions";



// import CreateProduct from "./pages/admin/CreateProduct";
// import ListProducts from "./pages/admin/ListProducts";
// import EditProduct from "./pages/admin/EditProduct";

// import CreateCategory from "./pages/admin/CreateCategory";
// import ListCategories from "./pages/admin/ListCategories";
// import EditCategory from "./pages/admin/EditCategory";

// import UpdateOrders from "./pages/admin/UpdateOrders";

const CreateProduct = lazy(() => import("./pages/admin/CreateProduct"));
const ListProducts = lazy(() => import("./pages/admin/ListProducts"));
const EditProduct = lazy(() => import("./pages/admin/EditProduct"));
const CreateCategory = lazy(() => import("./pages/admin/CreateCategory"));
const ListCategories = lazy(() => import("./pages/admin/ListCategories"));
const EditCategory = lazy(() => import("./pages/admin/EditCategory"));
const UpdateOrders = lazy(() => import("./pages/admin/UpdateOrders"));




function Main() {

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

        dispatch(filterCart());

        // cleanup
        return () => unsubscribe();
    }, [dispatch]);

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <Fragment>

            <Navigation />

            <div className="container max-w-7xl mx-auto px-4  pb-24">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/categories" element={<Home />} />
                    <Route exact path="/contact" element={<ContactPage />} />

                    <Route exact path="/shop/" element={<Shop />} />
                    <Route exact path="/shop/:categoryParam" element={<Shop />} />
                    <Route exact path="/shop/:categoryParam/:typeParam" element={<Shop />} />
                    <Route exact path="/shop/:categoryParam/:typeParam/:pageParam/" element={<Shop />} />

                    <Route exact path="/search/" element={<SearchShop />} />
                    <Route exact path="/search/:textParam/" element={<SearchShop />} />
                    <Route exact path="/search/:textParam/:pageParam" element={<SearchShop />} />

                    <Route exact path="/product/:productSlugParam" element={<ProductPage />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/checkout" element={<Checkout />} />

                    <Route exact path="/user/orders" element={<UserRoute Component={Orders} />} />
                    {/* <Route exact path="/user/settings" element={<UserRoute Component={Settings} />} /> */}

                    <Route exact path="/admin/list-categories" element={<AdminRoute Component={ListCategories} />} />
                    <Route exact path="/admin/create-category" element={<AdminRoute Component={CreateCategory} />} />
                    <Route exact path="/admin/edit-category/:categorySlugParam" element={<AdminRoute Component={EditCategory} />} />

                    <Route exact path="/admin/list-products" element={<AdminRoute Component={ListProducts} />} />
                    <Route exact path="/admin/create-product" element={<AdminRoute Component={CreateProduct} />} />
                    <Route exact path="/admin/edit-product/:productSlugParam" element={<AdminRoute Component={EditProduct} />} />

                    <Route exact path="/admin/update-orders" element={<AdminRoute Component={UpdateOrders} />} />



                </Routes>
            </div>
        </Fragment>
    );
}

const App = () => {
    return <Suspense
        fallback={
            <div>
                <LoadingPage />
            </div>
        }
    >
        <Main />
    </Suspense>
}

export default App;




