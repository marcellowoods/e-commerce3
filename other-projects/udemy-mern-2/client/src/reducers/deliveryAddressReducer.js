export const deliveryAddressReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_ADDRESS":
            return action.payload;
        default:
            return state;
    }
};
