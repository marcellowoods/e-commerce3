import React, { Fragment, useReducer } from "react";
import { Switch, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Login from "./pages/auth/Login"
import Navigation from "./components/navigation"


function App() {
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




