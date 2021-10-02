export const drawerNavReducer = (state = false, action) => {
  switch (action.type) {
    case "DRAWER_NAV_TOGGLE":
      return action.payload;
    default:
      return state;
  }
};
