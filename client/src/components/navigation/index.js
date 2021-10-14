// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import CartModal from "./CartModal";

// export { Navbar, Footer, CartModal };

import Navbar from "./Navbar";
import CartModal from "./CartModal";
import MobileNavbarMenu from "./MobileNavbarMenu";

const Navigation = () => {
    return (
        <div>
            <Navbar />
            {/* <LoginSignup /> */}
            <CartModal />
            <MobileNavbarMenu />
            {/* All Children pass from here */}
        </div>
    )
}


export default Navigation;
