import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";
import { deliveryAddressReducer } from "./deliveryAddressReducer";
import { CODReducer } from "./CODReducer";


const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    deliveryAddress: deliveryAddressReducer,
    coupon: couponReducer,
    COD: CODReducer
});

export default rootReducer;
