import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard.js";
import LoadingPage from "./LoadingPage";
import { getProduct } from "../functions/product";
import { addToCart } from "../actions/cartActions";
import { useDispatch } from 'react-redux';
import { useAsync } from "../auxiliary/reactUtils";

import { useTranslation } from 'react-i18next';
import { getTranslatedField } from "../actions/translateActions";

const ProductPage = () => {

    const { productSlugParam } = useParams();
    const [product, setProduct] = useState(null);

    // console.log(product)

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

    const getTranslatedCategoryName = () => {

        let categoryName = null;
        const lang = i18n.language;

        if (product.category) {
            categoryName = getTranslatedField(product.category, 'name', lang);
        }

        return categoryName;
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
            dispatch(addToCart(product._id, selectedSize));
            dispatch({ type: "DRAWER_CART_TOGGLE", payload: true });
        }
    }


    if (product == null) {
        return <LoadingPage />
    }

    return (
        <div className="pt-6 max-w-6xl mx-auto">
            <ProductCard
                product={product}
                translatedCategoryName={getTranslatedCategoryName()}
                translatedName={getTranslatedName()}
                translatedDescription={getTranslatedDescription()}
                handleAddToCart={handleAddToCart} />
        </div>

    )
}

export default ProductPage;



