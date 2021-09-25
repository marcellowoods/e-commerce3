import React, { Fragment, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import NavigationItems from './NavigationItems';
import SearchBar from './SearchBar.js'
import "./style.css";

// import { logout } from "./Action";
import { LayoutContext } from "../index";
// import { isAdmin } from "../auth/fetchApi";

const logout = () => { }
const isAdmin = () => { }

const NavbarRender = ({ mobileNavbarToggle, loginModalToggle, cartModalToggle }) => {

    return (
        <Fragment>
            {/* Navbar Section */}
            {/* bg-purple-900 */}
            <div className="color-main-bg fixed top-0 w-full z-10">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="hidden w-full color-main-light sm:flex md:items-center">
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z" fill="currentColor" />
                        </svg>
                        <span className="mx-1 text-sm">NY</span>
                    </div>
                    <div className="w-full color-main-bold sm:text-center text-2xl font-semibold">
                        Brand
                    </div>
                    <div className="flex items-center justify-end w-full">
                        <button onClick={cartModalToggle} className="color-main-light focus:outline-none mx-2">
                            {/* <svg className="h-5 w-5" */}
                            <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24">
                                <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                                <circle cx="10.5" cy="18.5" r="1.5" />
                                <circle cx="17.5" cy="18.5" r="1.5" />
                            </svg>
                        </button>

                        <div className="flex">
                            <button onClick={loginModalToggle} type="button" className="color-main-light hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                                {/* className="h-6 w-6 fill-current" */}
                                <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                                    <circle fill="none" cx="12" cy="7" r="3" />
                                    <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex sm:hidden ml-2">
                            <button onClick={mobileNavbarToggle} type="button" className="color-main-light hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                                {/* className="h-6 w-6 fill-current" */}
                                <svg width="25px" height="25px" viewBox="0 0 24 24" className="fill-current">
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                </svg>
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


//({ mobileNavbarToggle, loginModalToggle, cartModalToggle })
const Navbar = (props) => {
    const history = useHistory();
    const location = useLocation();

    const { data, dispatch } = useContext(LayoutContext);

    const mobileNavbarToggle = () =>
        data.navberHamburger
            ? dispatch({ type: "hamburgerToggle", payload: false })
            : dispatch({ type: "hamburgerToggle", payload: true });

    const loginModalToggle = () =>
        data.loginSignupModal
            ? dispatch({ type: "loginSignupModalToggle", payload: false })
            : dispatch({ type: "loginSignupModalToggle", payload: true });

    const cartModalToggle = () =>
        data.cartModal
            ? dispatch({ type: "cartModalToggle", payload: false })
            : dispatch({ type: "cartModalToggle", payload: true });

    const isMobileNavOpen = () => data.navberHamburger == true;
    //test
    // const data = {cartProduct: ["a", "b"]};
    // const navberToggleOpen = () => { }
    // const loginModalOpen = () => { }
    // const cartModalOpen = () => { }
    //https://www.lambdatest.com/blog/css-position-sticky-tutorial/

    return (
        <NavbarRender
            mobileNavbarToggle={mobileNavbarToggle}
            loginModalToggle={loginModalToggle}
            cartModalToggle={cartModalToggle}
        />
    )
};

export default Navbar;
