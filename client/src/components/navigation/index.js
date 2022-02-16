import Navbar from "./Navbar";
import CartModal from "./CartModal";
import OrderConfirmedModal from "./OrderConfirmedModal";
import MobileNavbarMenu from "./MobileNavbarMenu";

const Navigation = () => {
    return (
        <div>
            <Navbar />
            <CartModal />
            <MobileNavbarMenu />
            <OrderConfirmedModal />
        </div>
    )
}


export default Navigation;
