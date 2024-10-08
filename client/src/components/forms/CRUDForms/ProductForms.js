import React, { useState, Fragment } from "react";
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { NameForm, DescriptionForm, TranslationsForm } from "./CommonForms";
import { useDidMountEffect } from "../../../auxiliary/reactUtils";
import FileUpload from "../FileUpload";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const PriceForm = ({ price, setPrice }) => {
    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">lv.</span>
                </div>
                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    name="price"
                    id="price"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                    placeholder="0.00"
                />

            </div>
        </div>
    )
}

const QuantityForm = ({ quantity, setQuantity }) => {

    const handleChange = (e) => {
        const val = e.target.value;
        if (val >= 1) {
            setQuantity(e.target.value)
        }
    }

    return (
        <div className="p-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">

                <input
                    value={quantity}
                    type="number"
                    onChange={handleChange}
                    name="quantity"
                    id="quantity"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                />

            </div>
        </div>
    )
}

const CategoryForm = ({ categories, selectedCategory, onSelectCategory }) => {

    return (
        <div className="p-4">
            <Listbox value={selectedCategory._id} onChange={onSelectCategory}>
                <Listbox.Label className="block text-sm font-medium text-gray-700">Category</Listbox.Label>
                <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-1 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ease-linear transition-all duration-150">
                        <span className="flex items-center">
                            <span className="ml-3 block truncate">{selectedCategory.name}</span>
                        </span>
                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>

                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {categories.map((category) => (
                                <Listbox.Option
                                    key={category._id}
                                    className={({ active }) =>
                                        classNames(
                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                        )
                                    }
                                    value={category._id}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <div className="flex items-center">
                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                    {category.name}
                                                </span>
                                            </div>

                                            {selected ? (
                                                <span
                                                    className={classNames(
                                                        active ? 'text-white' : 'text-indigo-600',
                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                    )}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

const ImagesForm = ({ imagesUrl, setImagesUrl, uploadedImages, setUploadedImages }) => {

    // const [uploadedImages, setUploadedImages] = useState(
    //     {
    //         images: [
    //             {url: "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
    //             public_id: 123},
    //             {url: "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
    //             public_id: 123}
    //         ]
    //     }
    // )

    const [loading, setLoading] = useState(false);

    useDidMountEffect(() => {

        const urls = uploadedImages.map((img) => img.url);
        console.log(urls);
        setImagesUrl(urls);

    }, [uploadedImages])

    useDidMountEffect(() => {
        //clear uploadedImages after uploading product
        if (imagesUrl.length == 0 && uploadedImages.length > 0) {
            setUploadedImages([]);
        }

    }, [imagesUrl])


    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Images
            </label>

            <div className="pb-4">
                <FileUpload
                    images={uploadedImages}
                    setImages={setUploadedImages}
                    setLoading={setLoading}
                    singleUpload={false}
                />
            </div>

        </div>
    )
}

const SizeForm = ({ size, setSize }) => {

    const { lowerBound, upperBound, stepSize } = size;

    const handleChange = (evt) => {
        const value = evt.target.value;

        setSize((prev) => {

            return {
                ...prev,
                [evt.target.name]: value
            }
        })
    }

    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Size* {"(in cm)"}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">cm</span>
                </div> */}
                <span>lower bound</span>
                <input
                    value={lowerBound}
                    onChange={handleChange}
                    type="text"
                    name="lowerBound"
                    id="lower"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                    placeholder="0"
                />

                <span>upper bound</span>
                <input
                    value={upperBound}
                    onChange={handleChange}
                    type="text"
                    name="upperBound"
                    id="upper"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                    placeholder="0"
                />

                <span>step size</span>
                <input
                    value={stepSize}
                    onChange={handleChange}
                    type="text"
                    name="stepSize"
                    id="step"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                    placeholder="0"
                />

            </div>
        </div>
    )
}

export {
    PriceForm,
    NameForm,
    QuantityForm,
    DescriptionForm,
    CategoryForm,
    TranslationsForm,
    ImagesForm,
    SizeForm
}