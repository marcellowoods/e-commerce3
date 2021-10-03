import React, { useState, useEffect, Fragment } from "react";

import onAuthStateChanged from "./auxiliary/firebaseAuthState";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

import { Switch, Route } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import Shop from "./pages/Shop";
import Login from "./pages/auth/Login"
import Navigation from "./components/navigation"


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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(isLoading, setIsLoading, currentUser, onCurrentUserSuccess);

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
                <Route exact path="/login" component={Login} />


            </Switch>
        </Fragment>
    );
}

export default App;




