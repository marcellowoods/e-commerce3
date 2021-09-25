import React, { Fragment, createContext } from "react";
// import { Navber, Footer, CartModal } from "../partials";
// import LoginSignup from "../auth/LoginSignup";
import { Navbar, CartModal, MobileNavbarMenu } from "../partials";

export const LayoutContext = createContext();

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div className="flex-grow">
        <Navbar />
        {/* <LoginSignup /> */}
        <CartModal />
        <MobileNavbarMenu />
        {/* All Children pass from here */}
        {children}
      </div>
      {/* <Footer /> */}
    </Fragment>
  );
};

export default Layout;
