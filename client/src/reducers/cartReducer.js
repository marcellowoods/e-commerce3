export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case "CART_ADD_ITEM":
            const item = action.payload;

            return {
                ...state,
                cartItems: [...state.cartItems, item],
            }


        case "CART_REMOVE_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.filter(action.payload),
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
