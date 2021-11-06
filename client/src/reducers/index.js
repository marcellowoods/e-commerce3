import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { drawerCartReducer } from "./drawerCartReducer";
import { drawerNavReducer } from "./drawerNavReducer";
// import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
    user: userReducer,
    drawerCart: drawerCartReducer,
    drawerNav: drawerNavReducer,
    cart: cartReducer,
   // search: searchReducer,
});

export default rootReducer;
