
import { reauthenticateWithCredential } from "@firebase/auth";
import React from "react";
import { useHistory } from "react-router-dom";
import ChangeLangDropdown from "./ChangeLangDropdown";

import { useTranslation } from 'react-i18next';


const NavigationItems = ({ closeMobileNav = null }) => {

    const { t } = useTranslation();

    const history = useHistory();

    const handleHomeClick = () => history.push("/");
    const handleShopClick = () => history.push("/shop");
    const handleCategoriesClick = () => history.push("/categories");
    const handleContactClick = () => history.push("/contact");
    const handleAboutClick = () => history.push("/about");

    const clickHandler = (e) => {
        const id = e.target.id;

        if (closeMobileNav !== null) {
            closeMobileNav();
        }


        switch (id) {
            case "home":
                handleHomeClick();
                break;
            case "shop":
                handleShopClick();
                break;
            case "categories":
                handleCategoriesClick();
                break;
            case "contact":
                handleContactClick();
                break;
            case "about":
                handleAboutClick();
                break;
        }

    }

    const cName = "text-left text-lg mt-3 focus:outline-none color-main-light hover:text-gray-900 sm:mx-3 sm:mt-0";


    return (
        <div className=" flex flex-col sm:flex-row">
            <div className="flex sm:hidden">
                <ChangeLangDropdown />
            </div>
            <button id="home" onClick={clickHandler} className={cName} >{t('home')}</button>
            <button id="shop" onClick={clickHandler} className={cName} >{t('shop')}</button>
            <button id="categories" onClick={clickHandler} className={cName}>{t('categories')}</button>
            <button id="contact" onClick={clickHandler} className={cName} >{t('contact')}</button>
            <button id="about" onClick={clickHandler} className={cName} >{t('about')}</button>
        </div>
    );
};



export default NavigationItems;


