import React, { Fragment, useState } from 'react'
import { useHistory } from "react-router-dom";
import { RadioGroup } from '@headlessui/react';
import ReactSlider from "react-slider";
import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';
import { t } from 'i18next';

const shopUrl = '/shop';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ColorSelector = ({ selectedColor, setSelectedColor, productColors }) => {

    return (
        <div>
            <h3 className="text-sm text-gray-900 font-medium">Color</h3>

            <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                <div className="flex items-center space-x-3">
                    {productColors.map((color) => (
                        <RadioGroup.Option
                            key={color.name}
                            value={color}
                            className={({ active, checked }) =>
                                classNames(
                                    color.selectedClass,
                                    active && checked ? 'ring ring-offset-1' : '',
                                    !active && checked ? 'ring-2' : '',
                                    '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                )
                            }
                        >
                            <RadioGroup.Label as="p" className="sr-only">
                                {color.name}
                            </RadioGroup.Label>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    color.class,
                                    'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                )}
                            />
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )

}

const SizeSelector = ({ selectedSize, setSelectedSize, productSizes }) => {

    const { t } = useTranslation();

    return (
        <div className="mt-10">
            <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                </a>
            </div>

            <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {productSizes.map((size) => (
                        <RadioGroup.Option
                            key={size.name}
                            value={size}
                            disabled={!size.inStock}
                            className={({ active }) =>
                                classNames(
                                    size.inStock
                                        ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                        : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                )
                            }
                        >
                            {({ active, checked }) => (
                                <>
                                    <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
                                    {size.inStock ? (
                                        <div
                                            className={classNames(
                                                active ? 'border' : 'border-2',
                                                checked ? 'border-indigo-500' : 'border-transparent',
                                                'absolute -inset-px rounded-md pointer-events-none'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <div
                                            aria-hidden="true"
                                            className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                        >
                                            <svg
                                                className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                                viewBox="0 0 100 100"
                                                preserveAspectRatio="none"
                                                stroke="currentColor"
                                            >
                                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                            </svg>
                                        </div>
                                    )}
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}

const InfoModal = ({ isOpen, closeModal }) => {

    const { t } = useTranslation();

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {/* {t("order successful")} */}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {t("select custom if you want to pick a size between small and large")}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        ok
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


//https://codesandbox.io/s/react-tailwind-align-range-slider-ghyf0?file=/src/App.tsx:189-232
const BraceletSizeSelector = ({ selectedSize, setSelectedSize, productSize }) => {

    const { lowerBound, upperBound, stepSize } = productSize;

    const maxSliderValue = upperBound - stepSize;
    const minSliderValue = lowerBound + stepSize;

    const [sizeTypes, setSelectedSizeTypes] =  useState([{ name: "small" }, { name: "large" }, { name: "custom" }]);

    const [selectedSizeType, setSelectedSizeType] = useState(null);

    const handleCustomValueChange = (value) => {
        setSelectedSize(value);
    }

    const isCustomSelected = () => selectedSizeType && selectedSizeType.name == "custom";

    const handleSizeSelect = (selected) => {

        if (selected.name == "large") {
            setSelectedSize(upperBound);
        } else if (selected.name == "small") {
            setSelectedSize(lowerBound);
        } else {
            setSelectedSize(lowerBound + stepSize);
        }
        setSelectedSizeType(selected);
    }

    return (
        <div className="mt-10">

            <div className="flex items-center ">
                <h3 className="text-lg text-transform: capitalize text-gray-900 font-medium">{t("size")}</h3>
                <span className="pl-2 text-xl">{selectedSize} {" "} {selectedSize && t("cm.")}</span>

            </div>

            <div
                className={`${isCustomSelected() ? 'max-h-screen ease-in' : 'max-h-0 ease-in'}  overflow-hidden transition-all transform duration-500`}
            >
                <ReactSlider
                    ariaLabel={"text"}
                    disabled={!isCustomSelected()}
                    step={stepSize}
                    min={minSliderValue}
                    max={maxSliderValue}
                    className="flex items-center w-full h-3 pr-2 mt-8 mb-4 bg-gray-200 rounded-md cursor-grab"
                    thumbClassName=" absolute w-5 h-5 cursor-pointer bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -top-2px"
                    value={selectedSize}
                    onChange={handleCustomValueChange}
                />

            </div>

            <RadioGroup value={selectedSizeType} onChange={handleSizeSelect} className="mt-4">
                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                <div className="flex flex-col lg:flex-row gap-4">
                    {sizeTypes.map((size) => (
                        <RadioGroup.Option
                            key={size.name}
                            value={size}
                            className={({ active }) =>
                                classNames(
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'group cursor-pointer relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                )
                            }
                        >

                            {({ active, checked }) => (
                                <>
                                    <RadioGroup.Label as="p">{t(size.name)}</RadioGroup.Label>
                                    {
                                        (
                                            <div
                                                className={classNames(
                                                    active ? 'border' : 'border-2',
                                                    checked ? 'border-indigo-500' : 'border-transparent',
                                                    'absolute -inset-px rounded-md pointer-events-none'
                                                )}
                                                aria-hidden="true"
                                            />
                                        )
                                    }
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>

            {/* https://zillow.github.io/react-slider/ */}



        </div>
    )
}

const BreadCrumbs = ({ breadcrumbs, name }) => {

    const history = useHistory();

    const pushToPage = (pageUrl) => {
        history.push(shopUrl + pageUrl)
    }

    return (
        <nav aria-label="Breadcrumb">
            <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl">
                {breadcrumbs.map((breadcrumb) => (
                    <li key={breadcrumb.id}>
                        <div className="flex items-center">
                            <button
                                onClick={() => pushToPage(breadcrumb.href)}
                                className="mr-2 text-sm text-xl	 text-gray-900"
                            >
                                {breadcrumb.name}
                            </button>
                            <svg
                                width={16}
                                height={20}
                                viewBox="0 0 16 20"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="w-4 h-5 text-gray-300"
                            >

                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>

                        </div>
                    </li>
                ))}
                <li className="text-sm">
                    <div aria-current="page" className="text-xl	 text-gray-500">
                        {name}
                    </div>
                </li>
            </ol>
        </nav>
    )
}

export {
    ColorSelector,
    SizeSelector,
    BraceletSizeSelector,
    BreadCrumbs
}