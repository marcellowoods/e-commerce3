export const drawerNavReducer = (state = false, action) => {
  switch (action.type) {
    case "hamburgerToggle":
      return action.payload;
    default:
      return state;
  }
};
