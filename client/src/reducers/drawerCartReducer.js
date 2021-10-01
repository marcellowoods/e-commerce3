export const drawerCartReducer = (state = false, action) => {
  switch (action.type) {
    case "cartModalToggle":
      return action.payload;
    default:
      return state;
  }
};
