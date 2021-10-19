import React, { Fragment, useContext } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavigationItems from './NavigationItems';
import SearchBar from './SearchBar.js'
import { getCartIcon, getProfileIcon, getMobileToggleIcon } from "../../assets/icons";
import AccountDropdown from "./AccountDropdown";
import AdminDropdown from "./AdminDropdown";

import "./style.css";

// import { logout } from "./Action";
// import { isAdmin } from "../auth/fetchApi";

const logout = () => { }
const isAdmin = () => { }


//navbar with location bubble
const NavbarRender0 = ({ mobileNavbarToggle, cartModalToggle }) => {

    return (
        <Fragment>
            {/* Navbar Section */}
            {/* bg-purple-900 */}

            <div className="color-main-bg fixed top-0 w-full z-10">
                <div className="container mx-auto max-w-7xl px-6 py-4  items-center flex justify-between">

                    <div className="color-main-light flex items-center mr-2">
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z" fill="currentColor" />
                        </svg>
                        {/* <span className="mx-1 text-sm">BG</span> */}
                    </div>

                    <div className="color-main-bold sm:text-center  text-2xl font-semibold">
                        Brand
                    </div>
                    <div className="flex items-center justify-end w-full sm:w-auto">
                        <button onClick={cartModalToggle} className="color-main-light focus:outline-none mx-2">
                            {getCartIcon()}
                        </button>


                        <div className="flex">
                            <AccountDropdown />
                            {/* <button onClick={loginModalToggle} type="button" className="color-main-light hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                                {getProfileIcon()}
                            </button> */}

                        </div>

                        <div className="flex sm:hidden ml-2">
                            <button onClick={mobileNavbarToggle} type="button" className="color-main-light hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                                {/* className="h-6 w-6 fill-current" */}
                                {getMobileToggleIcon()}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
            <div style={{ paddingTop: '72px' }}>
                <nav className={`hidden sm:flex sm:justify-center sm:items-center `}>
                    <NavigationItems />
                </nav>
                <SearchBar cname={"hidden sm:flex relative py-5  max-w-lg mx-auto"} />
            </div>
            {/* End Navber Section */}
        </Fragment >
    )
}

//navbar without location
const NavbarRender = ({ mobileNavbarToggle, cartModalToggle, isAdmin }) => {

    return (
        <Fragment>
            {/* Navbar Section */}
            {/* bg-purple-900 */}

            <div className="color-main-bg fixed top-0 w-full z-10">
                <div className="container mx-auto px-6 py-4  items-center max-w-7xl flex justify-between">

                    <div className="color-main-bold sm:text-center  text-2xl font-semibold">
                        Brand
                    </div>

                    {
                        isAdmin && (
                            <div className="pr-9">
       
                            </div>
                        )
                    }

                    <SearchBar cname={"hidden sm:flex searchbar-w relative mx-auto py-0.5"} />

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

            </div>
            <div style={{ paddingTop: '75px' }}>
                <nav style={{ paddingTop: '5px' }} className={`hidden sm:flex sm:justify-center sm:items-center `}>
                    <NavigationItems />
                </nav>

            </div>
            {/* End Navber Section */}
        </Fragment >
    )
}

const Navbar = (props) => {

    const { drawerCart, drawerNav, user } = useSelector((state) => ({ ...state }));

    let dispatch = useDispatch();

    //https://stackoverflow.com/questions/54989513/react-prevent-scroll-when-modal-is-open

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

    // const loginModalToggle = () =>
    //     data.loginSignupModal
    //         ? dispatch({ type: "loginSignupModalToggle", payload: false })
    //         : dispatch({ type: "loginSignupModalToggle", payload: true });

    const cartModalToggle = () =>
        drawerCart
            ? cartModalOff()
            : cartModalOn();

    //test
    // const data = {cartProduct: ["a", "b"]};
    // const navberToggleOpen = () => { }
    // const loginModalOpen = () => { }
    // const cartModalOpen = () => { }
    //https://www.lambdatest.com/blog/css-position-sticky-tutorial/

    return (
        <NavbarRender
            mobileNavbarToggle={mobileNavbarToggle}
            // loginModalToggle={loginModalToggle}
            cartModalToggle={cartModalToggle}
            isAdmin={isAdmin}
        />
    )
};

export default Navbar;
