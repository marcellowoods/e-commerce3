import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavigationItems from './NavigationItems';
import { LayoutContext } from "../index";
import SearchBar from './SearchBar.js'

const MobileNavbarMenu = (props) => {

    const history = useHistory();

    const { data, dispatch } = useContext(LayoutContext);

    const mobileNavbarToggle = () =>
        data.navberHamburger
            ? dispatch({ type: "hamburgerToggle", payload: false })
            : dispatch({ type: "hamburgerToggle", payload: true });

    const isMobileNavOpen = () => data.navberHamburger == true;

    const closeMobileNav = () => dispatch({ type: "hamburgerToggle", payload: false });

    return (
        <Fragment>
            <div className="visible sm:invisible">
                <div
                    className={`${isMobileNavOpen() ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} z-40 fixed left-0 top-0 max-w-xs w-80 sm:w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white  `}>
                    <div className={`p-3`}>
                        <SearchBar cname={"mobile-searchbar-w relative py-3  mx-auto"}/>
                        <NavigationItems />
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
