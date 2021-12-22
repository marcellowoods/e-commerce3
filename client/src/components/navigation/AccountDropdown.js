import React, { Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Menu, Transition } from '@headlessui/react'
import { getProfileIcon } from "../../assets/icons";
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import { useTranslation } from 'react-i18next';

const auth = getAuth();

const getItemClassName = (isActive) => (
    `${isActive ? 'color-main-bold' : 'color-main-light'} focus:outline-none group flex rounded-md items-center w-full px-3 py-3 text-md`
)

const AccountDropdownRender = ({
    handleSettingsClicked,
    handleOrdersClicked,
    handleLoginClicked,
    handleLogoutClicked,
    handleRegisterClicked,
    isLoggedIn
}) => {

    const { t } = useTranslation();

    return (
        <div className="text-right">
            <Menu style={{ zIndex: 12 }} as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button style={{ paddingTop: "6.5px" }} className="color-main-light hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                        {getProfileIcon()}
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
                    {isLoggedIn ?
                        (
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
                                                onClick={handleSettingsClicked}
                                                className={getItemClassName(active)}
                                            >
                                                {t("settings")}
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogoutClicked}
                                                className={getItemClassName(active)}
                                            >
                                                {t("logout")}
                                            </button>
                                        )}
                                    </Menu.Item>

                                </div>
                            </Menu.Items>
                        )
                        :
                        (
                            <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLoginClicked}
                                                className={getItemClassName(active)}
                                            >
                                                {t("login")}
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleRegisterClicked}
                                                className={getItemClassName(active)}
                                            >
                                                {t("register")}
                                            </button>
                                        )}
                                    </Menu.Item>

                                </div>
                            </Menu.Items>
                        )

                    }

                </Transition>
            </Menu>
        </div>
    )
}

const AccountDropdown = () => {

    let history = useHistory();

    const { user } = useSelector((state) => ({ ...state }));

    const isLoggedIn = user !== null;

    const handleSettingsClicked = () => {
        history.push("/user/settings");
    }

    const handleOrdersClicked = () => {
        history.push("/user/orders");
    }

    const handleLoginClicked = () => {
        history.push("/login");
    }

    const handleRegisterClicked = () => {
        history.push("/register");
    }

    const handleLogoutClicked = () => {
        signOut(auth);
    }

    return (
        <AccountDropdownRender
            handleSettingsClicked={handleSettingsClicked}
            handleOrdersClicked={handleOrdersClicked}
            handleLoginClicked={handleLoginClicked}
            handleLogoutClicked={handleLogoutClicked}
            handleRegisterClicked={handleRegisterClicked}
            isLoggedIn={isLoggedIn}
        />
    )

}

export default AccountDropdown;