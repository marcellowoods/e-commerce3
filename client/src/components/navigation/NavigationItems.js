
import { reauthenticateWithCredential } from "@firebase/auth";
import React from "react";
import { useHistory } from "react-router-dom";

const NavigationItems = ({ closeMobileNav=null }) => {

    const history = useHistory();

    const handleHomeClick = () => history.push("/");
    const handleShopClick = () => history.push("/shop");
    const handleCategoriesClick = () => history.push("/categories");
    const handleContactClick = () => history.push("/contact");
    const handleAboutClick = () => history.push("/about");

    const clickHandler = (e) => {
        const id = e.target.id;

        if(closeMobileNav !== null){
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

    const cName = "text-left mt-3 focus:outline-none color-main-light hover:text-gray-900 sm:mx-3 sm:mt-0";

    return (
        <div className=" flex flex-col sm:flex-row">
            <button id="home" onClick={clickHandler} className={cName} >Home</button>
            <button id="shop" onClick={clickHandler} className={cName} >Shop</button>
            <button id="categories" onClick={clickHandler} className={cName}>Categories</button>
            <button id="contact" onClick={clickHandler} className={cName} >Contact</button>
            <button id="about" onClick={clickHandler} className={cName} >About</button>
        </div>
    );
};



export default NavigationItems;


