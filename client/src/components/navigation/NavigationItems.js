
import React from "react";
import { useHistory } from "react-router-dom";

const NavigationItems = () => {

    const history = useHistory();

    const handleHomeClick = () => history.push("/");
    const handleShopClick = () => history.push("/shop");
    const handleCategoriesClick = () => history.push("/shop");
    const handleContactClick = () => history.push("/contact");
    const handleAboutClick = () => history.push("/about");

    const cName = "mt-3 focus:outline-none color-main-light hover:text-gray-900 sm:mx-3 sm:mt-0";

    return (
        <div className="flex flex-col sm:flex-row">
            <button onClick={handleHomeClick} className={cName} >Home</button>
            <button onClick={handleShopClick} className={cName} >Shop</button>
            <button onClick={handleCategoriesClick} className={cName}>Categories</button>
            <button onClick={handleContactClick} className={cName} >Contact</button>
            <button onClick={handleAboutClick} className={cName} >About</button>
        </div>
    );
};

export default NavigationItems;


