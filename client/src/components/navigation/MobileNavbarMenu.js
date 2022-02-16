import React, { Fragment, useEffect } from "react";
import NavigationItems from './NavigationItems';
import SearchBar from './SearchBar.js';
import ChangeLangDropdown from "./ChangeLangDropdown";
import { useDispatch, useSelector } from "react-redux";


const MobileNavbarMenu = () => {


    let dispatch = useDispatch();

    const { drawerNav } = useSelector((state) => ({ ...state }));

    const closeMobileNav = () => {
        document.body.style.overflow = 'unset';
        dispatch({ type: "DRAWER_NAV_TOGGLE", payload: false })
    }

    const isMobileNavOpen = () => drawerNav == true;

    useEffect(() => {

        const handleResize = () => {
            
            if (document.body.style.overflow != 'unset') {
                if(window.innerWidth > 630){
                    closeMobileNav();
                }
                
            }
        }

        window.addEventListener('resize', handleResize)
    }, [])

    return (
        <Fragment>
            <div className="visible sm:invisible">
                <div
                    className={`${isMobileNavOpen() ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} z-40 fixed left-0 top-0  w-70 sm:w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white  `}>
                    <div className="flex items-center justify-between">
                        <ChangeLangDropdown />
                        <button onClick={closeMobileNav} className="text-gray-600 focus:outline-none">
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    <div className={`p-3`}>

                        <SearchBar cname={"mobile-searchbar-w relative py-3"} />
                        <NavigationItems closeMobileNav={closeMobileNav} />
                    </div>
                </div>
                {isMobileNavOpen() &&
                    <div
                        className={"modal-backdrop"}
                        onClick={() => {
                            // close modal when outside of modal is clicked
                            closeMobileNav();
                        }}
                    ></div>}
            </div>
        </Fragment >
    );
};



export default MobileNavbarMenu;
