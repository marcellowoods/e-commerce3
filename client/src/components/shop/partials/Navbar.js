import React, { Fragment, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";

// import { logout } from "./Action";
import { LayoutContext } from "../index";
// import { isAdmin } from "../auth/fetchApi";

const logout = () => { }
const isAdmin = () => { }

const Navbar = (props) => {
    const history = useHistory();
    const location = useLocation();

    const { data, dispatch } = useContext(LayoutContext);

    const navberToggleOpen = () =>
        data.navberHamburger
            ? dispatch({ type: "hamburgerToggle", payload: false })
            : dispatch({ type: "hamburgerToggle", payload: true });

    const loginModalOpen = () =>
        data.loginSignupModal
            ? dispatch({ type: "loginSignupModalToggle", payload: false })
            : dispatch({ type: "loginSignupModalToggle", payload: true });

    const cartModalOpen = () =>
        data.cartModal
            ? dispatch({ type: "cartModalToggle", payload: false })
            : dispatch({ type: "cartModalToggle", payload: true });

    const isMobileNavOpen = () => data.navberHamburger == true;
    // const data = {cartProduct: ["a", "b"]};
    // const navberToggleOpen = () => { }
    // const loginModalOpen = () => { }
    // const cartModalOpen = () => { }

    return (
        <Fragment>
            {/* Navbar Section */}
            <div >
            {/* bg-purple-900 */}
                <div className="bg-opacity-50">
                    <div className="container mx-auto px-6 py-3 flex items-center justify-between">
                        <div className="hidden w-full text-gray-600 md:flex md:items-center">
                            {/* className="h-5 w-5" */}
                            <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z" fill="currentColor" />
                            </svg>
                            <span className="mx-1 text-sm">NY</span>
                        </div>
                        <div className="w-full text-gray-700 md:text-center text-2xl font-semibold">
                            Brand
                        </div>
                        <div className="flex items-center justify-end w-full">
                            <button onClick={cartModalOpen} className="text-gray-600 focus:outline-none mx-2">
                                {/* <svg className="h-5 w-5" */}
                                <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                    <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                                    <circle cx="10.5" cy="18.5" r="1.5" />
                                    <circle cx="17.5" cy="18.5" r="1.5" />
                                </svg>
                            </button>

                            <div className="flex">
                                <button onClick={navberToggleOpen} type="button" className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                                    {/* className="h-6 w-6 fill-current" */}
                                    <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24">
                                        <circle fill="none" cx="12" cy="7" r="3" />
                                        <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex sm:hidden ml-2">
                                <button onClick={navberToggleOpen} type="button" className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                                    {/* className="h-6 w-6 fill-current" */}
                                    <svg width="27px" height="27px" viewBox="0 0 24 24" className="fill-current">
                                        <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <nav className={`${isMobileNavOpen() ? "" : "hidden"} sm:flex sm:justify-center sm:items-center `}>

                    <div className="flex flex-col sm:flex-row">
                        <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Home</a>
                        <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Shop</a>
                        <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Categories</a>
                        <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Contact</a>
                        <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">About</a>
                    </div>
                </nav>
                <div  className="relative sm:mt-6 max-w-xs md:max-w-lg mx-auto">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>

                    <input className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="text" placeholder="Search">
                    </input>
                </div>
            </div >
            {/* End Navber Section */}
        </Fragment >
    );
};

export default Navbar;
