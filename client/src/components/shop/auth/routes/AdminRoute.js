import React, { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { LayoutContext } from "../../index";
// import LoadingToRedirect from "./LoadingToRedirect";
// import LoadingPage from "../../pages/LoadingPage";
import { currentAdmin } from "./fetchApi";

const LoadingPage = () => <h3>loading</h3>
const LoadingToRedirect = () => <h3>loading to redirect</h3>

const STATE = {
    "NO_USER": 1,
    "CHECK_ADMIN": 2,
    "IS_ADMIN": 3,
    "IS_NOT_ADMIN": 4
}

//https://reactrouter.com/web/example/auth-workflow
const AdminRoute = ({ children, ...rest }) => {

    const { data } = useContext(LayoutContext);
    const user = data.user;

    let location = useLocation();

    const [adminState, setAdminState] = useState(!user ? STATE.NO_USER : STATE.CHECK_ADMIN);

    useEffect(() => {
        if (user && user.token) {
            setAdminState(STATE.CHECK_ADMIN);
            currentAdmin(user.token)
                .then((res) => {
                    console.log("CURRENT ADMIN RES", res);
                    setAdminState(STATE.IS_ADMIN);
                })
                .catch((err) => {
                    console.log("ADMIN ROUTE ERR", err);
                    setAdminState(STATE.IS_NOT_ADMIN);
                });
        }
    }, [user]);

    let getComponent = () => {

        switch(adminState){

            case STATE.NO_USER:
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            case STATE.CHECK_ADMIN:
                return <LoadingPage />

            case STATE.IS_NOT_ADMIN:
                return <LoadingToRedirect />

            
            case STATE.IS_ADMIN:
                return  <Route {...rest} />
        }
       
    }

    return getComponent();
};

export default AdminRoute;
