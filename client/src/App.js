import React, { useState, useEffect, Fragment } from "react";

import { Switch, Route } from "react-router-dom";
import onAuthStateChanged from "./auxiliary/firebaseAuthState";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/UserRoute";

import LoadingPage from "./pages/LoadingPage";
import Shop from "./pages/Shop";
import Login from "./pages/auth/Login"
import Navigation from "./components/navigation"
import Orders from "./pages/user/Orders";


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
        const unsubscribe = onAuthStateChanged(isLoading, setIsLoading, currentUser, onCurrentUserSuccess, onFirebaseLogout);

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
                <Route exact path="/" component={Shop} />
                <Route exact path="/user/login" component={Login} />
                <UserRoute exact path="/user/orders" component={Orders} />

            </Switch>
        </Fragment>
    );
}

export default App;




