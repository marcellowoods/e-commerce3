import React from "react";
import { Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//https://reactrouter.com/web/example/auth-workflow
const UserRoute = ({Component}) => {

    let location = useLocation();
    const { user } = useSelector((state) => ({ ...state }));
    // console.log(location.pathname);

    return user ? <Component /> : (
        <Navigate
            to={{
                pathname: "/login",
                state: { from: location }
            }}
        />
    )

};

export default UserRoute;
