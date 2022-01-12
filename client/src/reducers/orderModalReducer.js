export const orderModalReducer = (state = false, action) => {
    switch (action.type) {
        case "ORDER_SUCCESS_MODAL_TOGGLE":
            return action.payload;
        default:
            return state;
    }
};