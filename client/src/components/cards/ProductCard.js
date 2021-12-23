import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react';
import ProductSlider from './ProductSlider';

import { useTranslation } from 'react-i18next';

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


//https://tailwindui.com/components/ecommerce/components/product-overviews
const ProductCard = ({ product, translatedName, translatedDescription, handleAddToCart }) => {

    const { t } = useTranslation();

    const { details, highlights, sizes, colors, images, breadcrumbs, price } = product;

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);


    useEffect(() => {
        window.scrollTo(0, 0);
        if (colors && colors.length) {
            setSelectedColor(colors[0])
        }

        if (sizes && sizes.length) {
            setSelectedSize(sizes[0])
        }
    }, [])

    return (
        <div className="mx-auto mt-8 lg:max-w-6xl px-4">
            <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-center sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-7">
                    {/* <img src={product.imageSrc} alt={product.imageAlt} className="object-center object-cover" /> */}
                    <ProductSlider
                        images={images}
                        onPointerDown={() => { }}
                        onPointerUp={() => { }}
                    />
                    <div className="py-12">

                    </div>
                </div>
                <div className="sm:col-span-5">
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">{translatedName}</h2>

                    <section aria-labelledby="information-heading" className="mt-2">
                        <h3 id="information-heading" className="sr-only">
                            Product information
                        </h3>

                        <p className="text-2xl text-gray-900">{price}</p>

                        {
                            translatedDescription && (
                                <div className="mt-10">
                                    <h3 className="sr-only">{t("description")}</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{translatedDescription}</p>
                                    </div>
                                </div>
                            )
                        }


                    </section>

                    <section aria-labelledby="options-heading" className="mt-10">
                        <h3 id="options-heading" className="sr-only">
                            Product options
                        </h3>

                        {
                            colors && (
                                <ColorSelector
                                    selectedColor={selectedColor}
                                    setSelectedColor={setSelectedColor}
                                    productColors={colors}
                                />
                            )
                        }
                        {
                            sizes && (
                                <SizeSelector
                                    selectedSize={selectedSize}
                                    setSelectedSize={setSelectedSize}
                                    productSizes={sizes}
                                />
                            )
                        }

                    </section>

                    <button
                        onClick={handleAddToCart}
                        type="submit"
                        className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {t("add to bag")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;