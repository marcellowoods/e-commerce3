import React, { Fragment, useReducer } from "react";
import { LayoutContext, layoutState, layoutReducer } from "./components/shop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductByCategory from "./components/shop/home/ProductByCategory";

function App() {
    const [data, dispatch] = useReducer(layoutReducer, layoutState);
    return (
        <Fragment>
            <LayoutContext.Provider value={{ data, dispatch }}>
                <Router>
                <ProductByCategory/>

                </Router>
            </LayoutContext.Provider>
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




