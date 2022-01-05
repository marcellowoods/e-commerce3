import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react';
import ReactSlider from "react-slider"

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

    console.log(productSizes)

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


//https://codesandbox.io/s/react-tailwind-align-range-slider-ghyf0?file=/src/App.tsx:189-232
const BraceletSizeSelector = ({ selectedSize, setSelectedSize, productSizes }) => {

    // console.log(productSizes);
    // const lowerBound = productSizes.lowerBound;
    // const upperBound = productSizes.upperBound;
    // const stepSize = productSizes.stepSize;

    const [sizes, setSizes] = useState(
        [{ value: 50, name: "S" }, { value: 150, name: "L" }, { value: 0, name: "custom" }]
    );

    const isCustomSelected = () => selectedSize && selectedSize.name == "custom";

    // console.log(isCustomSelected())

    const [value, setValue] = React.useState(0)

    useEffect(() => {
        // setSelectedSize(sizes[0]);
    }, [])

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
                    {sizes.map((size) => (
                        <RadioGroup.Option
                            key={size.name}
                            value={size}
                            className={({ active }) =>
                                classNames(
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                )
                            }
                        >

                            {({ active, checked }) => (
                                <>
                                    <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
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
            <div
                className={`${isCustomSelected() ? 'max-h-screen' : 'max-h-0'} py-4 overflow-hidden transition-all duration-300 transform`}
            >
                {/* <label>React Slider</label> */}

                <ReactSlider

                    step={5}
                    min={0}
                    max={75}
                    className="w-full h-3 pr-2 my-4 bg-gray-200 rounded-md cursor-grab"
                    thumbClassName="absolute w-5 h-5 cursor-grab bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 -top-2px"
                    value={value}
                    onChange={(value) => {
                        setValue(value)
                    }}
                />

                <span>{value}</span>

            </div>


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