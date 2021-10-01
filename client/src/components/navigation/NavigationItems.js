
import React from "react";
import { useHistory } from "react-router-dom";

const NavigationItems = () => {

    // const history = useHistory();

    return (
        <div className="flex flex-col sm:flex-row">
            <a className="mt-3 color-main-light hover:underline sm:mx-3 sm:mt-0" href="#">Home</a>
            <a className="mt-3 color-main-light hover:underline sm:mx-3 sm:mt-0" href="#">Shop</a>
            <a className="mt-3 color-main-light hover:underline sm:mx-3 sm:mt-0" href="#">Categories</a>
            <a className="mt-3 color-main-light hover:underline sm:mx-3 sm:mt-0" href="#">Contact</a>
            <a className="mt-3 color-main-light hover:underline sm:mx-3 sm:mt-0" href="#">About</a>
        </div>
    );
};

export default NavigationItems;


