import React, { useState, useEffect } from 'react'
import ProductSlider from './ProductSlider';
import {
    ColorSelector,
    BraceletSizeSelector,
    ProductCategory
} from "../forms/CardForms/ProductCardForms";

import { useTranslation } from 'react-i18next';

//https://tailwindui.com/components/ecommerce/components/product-overviews
const ProductCard = ({ product, translatedCategoryName, translatedName, translatedDescription, handleAddToCart }) => {

    const { t } = useTranslation();

    //selecting colors is not a feature yet 
    const { size, colors, images, price } = product;

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);


    useEffect(() => {
        window.scrollTo(0, 0);
        if (colors && colors.length) {
            setSelectedColor(colors[0])
        }

    }, [])

    const onAddToCartClick = () => {

        if (size && (selectedSize === null)) {
            window.alert("please select size");
            return;
        }

        handleAddToCart(selectedSize);
    }

    return (
        <div className="">

            <ProductCategory
                translatedProductName={translatedName}
                translatedCategoryName={translatedCategoryName}
                product={product}
            />

            <div className="pt-2 w-full grid grid-cols-1 gap-y-8 gap-x-6 items-center sm:grid-cols-12 lg:gap-x-8">

                {/* change col-span for size change but it has to add to grid-cols-12 */}
                <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-7">

                    <ProductSlider
                        images={images}
                        onPointerDown={() => { }}
                        onPointerUp={() => { }}
                    />
                    <div className="py-12">

                    </div>
                </div>
                {/* change col-span for size change but it has to add to grid-cols-12 */}
                <div className="sm:col-span-5">
                    <h3 class="text-gray-700 uppercase text-xl">{translatedName}</h3>
                    {/* <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">{translatedName}</h2> */}

                    <section aria-labelledby="information-heading" className="">
                        <h3 id="information-heading" className="sr-only">
                            Product information
                        </h3>

                        <span class="text-gray-500 text-xl">{price} {" "} {t("lv.")}</span>
                        {/* <p className="text-2xl text-gray-900">{price} {" "} {t("lv.")}</p> */}
                        <hr class="my-3 mt-5"></hr>

                        {
                            translatedDescription && (
                                <div className="mt-5">
                                    <h3 className="sr-only">{t("description")}</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{translatedDescription}</p>
                                    </div>
                                </div>
                            )
                        }


                    </section>

                    <section aria-labelledby="options-heading" className="mt-5">
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
                            size && (
                                <BraceletSizeSelector
                                    selectedSize={selectedSize}
                                    setSelectedSize={setSelectedSize}
                                    productSize={size}
                                />
                            )
                        }

                    </section>

                    <button
                        onClick={onAddToCartClick}
                        type="submit"
                        className="text-sm font-medium uppercase mt-7 w-full  bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-blue-500"
                    >
                        {t("add to bag")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;