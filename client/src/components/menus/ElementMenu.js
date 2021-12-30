import React, { Fragment} from "react";
import 'react-tridi/dist/index.css';
import { Menu, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import { getTranslatedField } from "../../actions/translateActions";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

//other menus
//https://www.youtube.com/watch?v=qJnIJa-cF2M
//https://headlessui.dev/react/menu 
//https://tailwindui.com/components/application-ui/elements/dropdowns 
//https://tailwindui.com/#product-application-ui 
//https://tailwindui.com/components/application-ui/overlays/modals 
const ElementsMenu = ({ allElements, selectedElement, setSelectedElement, zIndex=3 }) => {

    const { t, i18n } = useTranslation();


    const getTranslatedName = (el) => {

        const language = i18n.language;
        if(el.translations){
            return getTranslatedField(el, 'name', language);
        }else{
            return t(el.name);
        }
        
    }

    //expected elementObj to have name and slug properties
    //allElements = [
    //     { name: "new", slug: "new" },
    //     { name: "best sellers", slug: "best-sellers" }
    // ]

    return (
        <Menu style={{ zIndex }} as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="border-none inline-flex justify-center w-full rounded-md border-gray-300  p-2 bg-white text-sm  text-gray-700 hover:bg-gray-50 focus:outline-none  focus:ring-indigo-500">
                    <h3 className="text-gray-700 text-2xl font-normal">{getTranslatedName(selectedElement)}</h3>
                    <SelectorIcon className="-mr-2 ml-1 mt-2 h-6 w-6" aria-hidden="true" />
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
                                            selectedElement.slug == elementObj.slug ? 'bg-gray-100' : "",
                                            'block text-center  px-4 py-4 text-md cursor-pointer'
                                        )}
                                    >
                                        {getTranslatedName(elementObj)}
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

export default ElementsMenu;