import React, { Fragment } from "react";
import {  useSelector } from "react-redux";

import { Menu, Transition } from '@headlessui/react'
import { getAdminIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";

import { useTranslation } from 'react-i18next';

const getItemClassName = (isActive) => (
    `${isActive ? 'color-main-bold' : 'color-main-light'} focus:outline-none group flex rounded-md items-center w-full px-3 py-3 text-md`
)


const AdminDropdownRender = ({
    handleOrdersClicked,
    handleProductsClicked,
    handleCategoriesClicked,
}) => {

    const { t } = useTranslation();

    return (
        <div className="text-right">
            <Menu style={{ zIndex: 12 }} as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button style={{ paddingTop: "6.5px" }} className="color-main-light hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                        {getAdminIcon()}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out  duration-300"
                    enterFrom="transform opacity-0 "
                    enterTo="transform opacity-100 "
                    leave="transition ease-out duration-300"
                    leaveFrom="transform opacity-100 "
                    leaveTo="transform opacity-0 "
                >


                    <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleOrdersClicked}
                                        className={getItemClassName(active)}
                                    >
                                        {t("orders")}
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleProductsClicked}
                                        className={getItemClassName(active)}
                                    >
                                        {t("products")}
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleCategoriesClicked}
                                        className={getItemClassName(active)}
                                    >
                                        {t("categories")}
                                    </button>
                                )}
                            </Menu.Item>

                        </div>
                    </Menu.Items>





                </Transition>
            </Menu>
        </div>
    )
}

const AdminDropdown = () => {

    const navigate = useNavigate();

    const { user } = useSelector((state) => ({ ...state }));

    const isLoggedIn = user !== null;

    const handleOrdersClicked = () => {
        navigate("/admin/update-orders");
    }

    const handleProductsClicked = () => {
        navigate("/admin/list-products");
    }

    const handleCategoriesClicked = () => {
        navigate("/admin/list-categories");
    }


    return (
        <AdminDropdownRender
            handleOrdersClicked={handleOrdersClicked}
            handleProductsClicked={handleProductsClicked}
            handleCategoriesClicked={handleCategoriesClicked}
        />
    )

}

export default AdminDropdown;