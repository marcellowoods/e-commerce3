import React, { useState, Fragment } from 'react'
import 'react-tridi/dist/index.css';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import { useTranslation } from 'react-i18next';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ElementsMenu = ({ allElements, selectedElement, setSelectedElement, zIndex = 3 }) => {

    //expected elementObj to have name and slug properties
    //allElements = [
    //     { name: "new", slug: "new" },
    //     { name: "best sellers", slug: "best-sellers" }
    // ]

    return (
        <Menu style={{ zIndex }} as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="border-none inline-flex justify-center w-full rounded-md border-gray-300 bg-white text-sm font-small text-gray-700 hover:bg-gray-50 focus:outline-none  focus:ring-indigo-500">
                    <h3 className="text-gray-700 text-xl font-small">{selectedElement.name}</h3>
                    <ChevronDownIcon className=" mr-1  mt-1 h-6 w-6" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 "
                enterTo="transform opacity-100"
                leave="transition ease-out duration-300"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0 "
            >
                <Menu.Items style={{ maxHeight: "300px" }} className="overflow-y-auto origin-top-right absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {allElements.map((elementObj) => (
                            <Menu.Item key={elementObj.name}>
                                {({ active }) => (
                                    <a
                                        onClick={() => setSelectedElement(elementObj)}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            selectedElement.id == elementObj.id ? 'bg-gray-100' : "",
                                            'block text-center  px-4 py-4 text-md cursor-pointer'
                                        )}
                                    >
                                        {elementObj.altName}
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

const languages = [{ name: "Language: BG", altName: "български", id: "bg" }, { name: "Language: EN", altName: "english", id: "en" }];

const ChangeLangDropdown = () => {

    // const [languages, setLanguages] = useState(["български", "english"]);
    const { t, i18n } = useTranslation();
    const languageSelected = languages.find(({id}) => id == i18n.language);
    const [selectedLanguage, setSelectedLanguage] = useState(languageSelected);


    const changeLanguageHandler = (lang) => {
        i18n.changeLanguage(lang.id);
        setSelectedLanguage(lang);
    }

    return (
        <ElementsMenu
            allElements={languages}
            selectedElement={selectedLanguage}
            setSelectedElement={changeLanguageHandler}
        />
    )
}

export default ChangeLangDropdown;