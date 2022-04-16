import React, { Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavigationItems from './NavigationItems';
import SearchBar from './SearchBar.js'
import { getCartIcon, getMobileToggleIcon } from "../../assets/icons";
import AccountDropdown from "./AccountDropdown";
import AdminDropdown from "./AdminDropdown";
import ChangeLangDropdown from "./ChangeLangDropdown";


import "./style.css";

const NavbarRender = ({ mobileNavbarToggle, cartModalToggle, isAdmin }) => {

    return (
        <Fragment>
            {/* bg-purple-900 */}

            <div style={{ borderBottom: '1px solid', borderColor: "#e0e0e0" }} className=" color-main-bg fixed top-0 w-full z-10">
                <div className="container mx-auto px-6 py-4 items-center max-w-7xl flex justify-between">


                    <div className="hidden sm:flex">
                        <ChangeLangDropdown />
                    </div>

                    <span className="transform lg:-translate-x-12 color-main-bold sm:text-center  text-2xl sm:text-3xl font-semibold font-slick">
                        {/* Nina Gems */}
                        Nina&nbsp;Gems
                    </span>

                    <div className="flex items-center justify-end w-full sm:w-auto">
                        <button onClick={cartModalToggle} className="color-main-light focus:outline-none mx-2">
                            {getCartIcon()}
                        </button>


                        <div className="flex">
                            <AccountDropdown />
                        </div>

                        {
                            isAdmin && (
                                <div className="pl-2 flex">
                                    <AdminDropdown />
                                </div>
                            )
                        }


                        <div className="flex sm:hidden ml-2">
                            <button onClick={mobileNavbarToggle} type="button" className="color-main-light hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                                {/* className="h-6 w-6 fill-current" */}
                                {getMobileToggleIcon()}
                            </button>
                        </div>
                    </div>

                </div>
                <nav className={`hidden transform -translate-x-2 container mx-auto px-6  items-center max-w-7xl flex pb-4 sm:flex  flex justify-between`}>

                    <div className="hidden lg:flex pr-64">
                    </div>
                    <div className="">
                        <NavigationItems />
                    </div>

                    <div className="transform translate-x-1">
                        <SearchBar cname={"hidden sm:flex searchbar-w relative mx-auto "} />
                    </div>
                </nav>

            </div>

            {/* empty space for sticky top */}
            <div className="pt-24 sm:pt-36">

            </div>

        </Fragment >
    )
}

const Navbar = () => {

    const { drawerCart, drawerNav, user } = useSelector((state) => ({ ...state }));

    let dispatch = useDispatch();

    //https://stackoverflow.com/questions/54989513/react-prevent-scroll-when-modal-is-open
    //https://www.lambdatest.com/blog/css-position-sticky-tutorial/

    const isAdmin = user && user.role === "admin";

    const mobileToggleOn = () => {
        document.body.style.overflow = 'hidden';
        dispatch({ type: "DRAWER_NAV_TOGGLE", payload: true })
    }

    const mobileToggleOff = () => {
        document.body.style.overflow = 'unset';
        dispatch({ type: "DRAWER_NAV_TOGGLE", payload: false })
    }

    const cartModalOn = () => {
        document.body.style.overflow = 'hidden';
        dispatch({ type: "DRAWER_CART_TOGGLE", payload: true })
    }

    const cartModalOff = () => {
        document.body.style.overflow = 'unset';
        dispatch({ type: "DRAWER_CART_TOGGLE", payload: false })
    }

    const mobileNavbarToggle = () =>
        drawerNav
            ? mobileToggleOff()
            : mobileToggleOn()

    const cartModalToggle = () =>
        drawerCart
            ? cartModalOff()
            : cartModalOn();

    

    return (
        <NavbarRender
            mobileNavbarToggle={mobileNavbarToggle}
            cartModalToggle={cartModalToggle}
            isAdmin={isAdmin}
        />
    )
};

export default Navbar;
