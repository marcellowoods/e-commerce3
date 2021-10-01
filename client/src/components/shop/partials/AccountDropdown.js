import React, { Fragment, useContext } from "react";

import { Menu, Transition } from '@headlessui/react'
import {getProfileIcon } from "../../../assets/icons";


const AccountDropdown = () => {
    return (
        <div className="text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button style={{ paddingTop: "6.5px" }} className="color-main-light hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                        {getProfileIcon()}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-in  duration-300"
                    enterFrom="transform opacity-0 "
                    enterTo="transform opacity-100 "
                    leave="transition ease-in duration-300"
                    leaveFrom="transform opacity-100 "
                    leaveTo="transform opacity-0 "
                >
                    <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'color-main-bold' : 'color-main-light'
                                            } group flex rounded-md items-center w-full px-3 py-3 text-md`}
                                    >
                                        My Account
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'color-main-bold' : 'color-main-light'
                                            } group flex rounded-md items-center w-full px-3 py-3 text-md`}
                                    >
                                        My Orders
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

export default AccountDropdown;