import React, { useEffect, useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import LoadingPage from "../../pages/LoadingPage";
import { currentAdmin } from "../../functions/auth";

const STATE = {
    "NO_USER": 1,
    "CHECK_ADMIN": 2,
    "IS_ADMIN": 3,
    "IS_NOT_ADMIN": 4
}

//https://reactrouter.com/web/example/auth-workflow
const AdminRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
    let location = useLocation();

    const [adminState, setAdminState] = useState(!user ? STATE.NO_USER : STATE.CHECK_ADMIN);

    useEffect(async () => {
        if (user) {
            try {
                setAdminState(STATE.CHECK_ADMIN);
                const token = user.getToken();
                const isAdmin = currentAdmin(token);
                setAdminState(STATE.IS_ADMIN);

            } catch (error) {
                console.log("ADMIN ROUTE ERR", error);
                setAdminState(STATE.IS_NOT_ADMIN);
            }
        }


    }, [user]);

    let getComponent = () => {

        switch (adminState) {

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
                return <Route {...rest} />
        }

    }

    return getComponent();
};

export default AdminRoute;
