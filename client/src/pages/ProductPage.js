import React, { useState, useEffect } from 'react'
import { useHistory, useParams, useLocation } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard.js";
import LoadingPage from "./LoadingPage";
import { getProduct } from "../functions/product";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from 'react-redux';
import { useAsync, useDidMountEffect } from "../auxiliary/reactUtils";

import { useTranslation } from 'react-i18next';
import { t } from "i18next";
import { getTranslatedField } from "../actions/translateActions";

const ProductPageDesign = () => {

    const { categoryParam } = useParams();

    const product = {
        id: Math.floor(Math.random() * 1000000),
        quantity: 4,
        pName: "casio",
        pPrice: 100,
        pImages: ["https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
            "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6CiNQLY45qBnDNkz5Gca7tsUWtDgVb94g2g&usqp=CAU"]
    }

    const { pName: name, pPrice: price, pImages: images, quantity, id } = product;

    return (
        <div className="container mx-auto pb-8 sm:pt-8 px-3">
            <div className="md:flex md:items-center">
                <div className="w-full h-64 md:w-1/2 lg:h-96">
                    <img className="h-full w-full rounded-md object-cover max-w-lg mx-auto" src="https://images.unsplash.com/photo-1578262825743-a4e402caab76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80" alt="Nike Air" />
                </div>

                <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">

                    <h3 className="text-gray-700 uppercase text-lg">{name}</h3>
                    <span className="text-gray-500 mt-3">${price}</span>
                    <hr className="my-3" />
                    <div className="mt-2">
                        <label className="text-gray-700 text-sm" for="count">Count: </label>
                        <div className="flex items-center mt-1">
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                            <span className="text-gray-700 text-lg mx-2">20</span>
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                        </div>

                    </div>
                    {/* <div className="mt-3">
                        <label className="text-gray-700 text-sm" for="count">Color: </label>
                        <div className="flex items-center mt-1">
                            <button className="h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"></button>
                            <button className="h-5 w-5 rounded-full bg-teal-600 mr-2 focus:outline-none"></button>
                            <button className="h-5 w-5 rounded-full bg-pink-600 mr-2 focus:outline-none"></button>
                        </div>
                    </div> */}


                    <div className="flex items-center mt-3">
                        <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order Now</button>

                        <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

const testProduct = {
    title: 'smart watch',
    price: '$192',
    breadcrumbs: [
        { id: 1, name: 'watches', href: '/watches' },
        // { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [


        "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        'https://images.samsung.com/is/image/samsung/p6pim/bg/2108/gallery/bg-galaxy-watch4-classic-399314-sm-r890nzkaeue-481215856?$720_576_PNG$',
        // 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
        // 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
        "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",


        // 'https://m.media-amazon.com/images/I/71gdBQP+qGL._UY741_.jpg'

    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    // details:
    //     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

const ProductPage = () => {

    const { productSlugParam } = useParams();
    const [product, setProduct] = useState(null);

    const { t, i18n } = useTranslation();

    const dispatch = useDispatch()

    useAsync(
        async () => getProduct(productSlugParam),
        (data) => setProduct(data),
        null,
        [productSlugParam]
    );

    const getTranslatedName = () => {

        let name = null;
        const lang = i18n.language;

        if (product) {
            name = getTranslatedField(product, 'name', lang);
        }

        return name;
    }

    const getTranslatedDescription = () => {

        let description = null;
        const lang = i18n.language;

        if (product) {
            description = getTranslatedField(product, 'description', lang);
        }

        return description;
    }

    const handleAddToCart = (selectedSize) => {
        if (product !== null) {
            dispatch(addToCart(product.slug, selectedSize, 1));
            dispatch({ type: "DRAWER_CART_TOGGLE", payload: true });
        }
    }


    if (product == null) {
        return <LoadingPage />
    }

    return (
        <div className="pt-6">
            <ProductCard
                product={product}
                translatedName={getTranslatedName()}
                translatedDescription={getTranslatedDescription()}
                handleAddToCart={handleAddToCart} />
        </div>

    )
}

export default ProductPage;



