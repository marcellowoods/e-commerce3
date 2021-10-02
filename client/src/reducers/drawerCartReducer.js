export const drawerCartReducer = (state = false, action) => {
  switch (action.type) {
    case "DRAWER_CART_TOGGLE":
      return action.payload;
    default:
      return state;
  }
};
