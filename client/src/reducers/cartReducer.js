import { deepEqual } from "../auxiliary/utils";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case "CART_ADD_ITEM":
            const item = action.payload;

            return {
                ...state,
                cartItems: [...state.cartItems, item],
            }
        case "CART_REPLACE_ITEM":
            const {newItem, itemToBeReplaced} = action.payload;

            return {
                ...state,
                cartItems: state.cartItems.map((cartItem) => deepEqual(itemToBeReplaced, cartItem) ? newItem : cartItem),
            }


        case "CART_REMOVE_ITEM":
            const itemToRemove = action.payload;

            return {
                ...state,
                cartItems: state.cartItems.filter((cartItem) => !deepEqual(cartItem, itemToRemove)),
            }
        case "CART_CLEAR":
            return {
                ...state,
                cartItems: [],
            }
        default:
            return state
    }
}
