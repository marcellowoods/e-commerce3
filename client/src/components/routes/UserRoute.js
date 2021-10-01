import React from "react";
import { Route, useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import LoadingToRedirect from "./LoadingToRedirect";

//https://reactrouter.com/web/example/auth-workflow
const UserRoute = ({ children, ...rest }) => {

    let location = useLocation();
    const { user } = useSelector((state) => ({ ...state }));
    // console.log(location.pathname);

    // return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
    return user && user.token ? <Route {...rest} /> : (
        <Redirect
            to={{
                pathname: "/login",
                state: { from: location }
            }}
        />
    )

};

export default UserRoute;
