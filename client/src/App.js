import React, { Fragment, useReducer } from "react";
// import { LayoutContext, layoutState, layoutReducer } from "./components/shop";
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
                <Login />
                {/* <Shop /> */}

            </Switch>
        </Fragment>
    );
}

export default App;

// import React, { Fragment, useReducer } from "react";
// import ProductByCategory from "./components/shop/home/ProductByCategory";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { LayoutContext, layoutState, layoutReducer } from "./components/shop";

// function App() {
//     const [data, dispatch] = useReducer(layoutReducer, layoutState);
//     return (
//         <Fragment>
//             <LayoutContext.Provider value={{ data, dispatch }}>
//                 <Router>

//                    <p>ef</p>

//                 </Router>
//             </LayoutContext.Provider>
//         </Fragment>
//     );
// }

// export default App;




