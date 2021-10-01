export const layoutState = {
    user: null,
    navbarHamburger: false,
    cartModal: false,
    loading: false,
};

export const layoutReducer = (state, action) => {
    switch (action.type) {
        case "hamburgerToggle":
            return {
                ...state,
                navbarHamburger: action.payload,
            };
        case "cartModalToggle":
            return {
                ...state,
                cartModal: action.payload,
            };
        case "loading":
            return {
                ...state,
                loading: action.payload,
            };
        case "loggedInUser":
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
