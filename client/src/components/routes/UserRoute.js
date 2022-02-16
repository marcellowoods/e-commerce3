import React from "react";
import { Route, useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//https://reactrouter.com/web/example/auth-workflow
const UserRoute = ({ children, ...rest }) => {

    let location = useLocation();
    const { user } = useSelector((state) => ({ ...state }));
    // console.log(location.pathname);

    return user ? <Route {...rest} /> : (
        <Redirect
            to={{
                pathname: "/login",
                state: { from: location }
            }}
        />
    )

};

export default UserRoute;
