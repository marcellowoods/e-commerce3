import React, { useState, Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import FileUpload from "../../components/forms/FileUpload"
import { getCategories } from "../../functions/category";
import { getProduct, updateProduct } from "../../functions/product";
import { getImageIds } from "../../functions/cloudinary";

import {
    PriceForm,
    NameForm,
    QuantityForm,
    DescriptionForm,
    CategoryForm,
    TranslationsForm,
    SizeForm,
    ImagesForm
} from "../../components/forms/CRUDForms/ProductForms";

import { useDidMountEffect } from "../../auxiliary/reactUtils";
import LoadingPage from "../LoadingPage";

const LIST_PRODUCTS_PATHNAME = "/admin/list-products";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

let isSizeNull = (size) => size.lowerBound === 0 || size.upperBound === 0 || size.stepSize === 0;

let makeEmptySize = () => ({ lowerBound: 0, upperBound: 0, stepSize: 0 });


//more forms
//https://tailwindcomponents.com/component/account-card
//https://tailwindcomponents.com/components/forms?page=2

//TODO
//https://dev.to/eons/detect-page-refresh-tab-close-and-route-change-with-react-router-v5-3pd
const EditProduct = () => {

    const { productSlugParam } = useParams();
    const history = useHistory();

    const [price, setPrice] = useState("");
    const [imagesUrl, setImagesUrl] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [size, setSize] = useState(makeEmptySize());
    const [translations, setTranslations] = useState([]);

    const [isProductLoading, setIsProductLoading] = useState(true);

    const { user } = useSelector((state) => ({ ...state }));

    const setProductParams = (product, categories) => {
        console.log(product.images);
        setPrice(product.price);
        setImagesUrl(product.images);
        setName(product.name);
        setDescription(product.description);
        const productCategory = categories.find(c => c._id == product.category._id);
        if (productCategory) {
            setSelectedCategory(productCategory);
        } else {
            setSelectedCategory(categories[0]);
        }
        if (product.translations) {
            setTranslations(product.translations);
        }
        if (product.size) {
            setSize(product.size);
        }
        setQuantity(product.quantity);


    }

    useEffect(async () => {

        try {
            const userToken = await user.getToken();
            let { data: categoriesData } = await getCategories();
            setCategories(categoriesData);
            let { data: productData } = await getProduct(productSlugParam, userToken);
            setProductParams(productData, categoriesData);
            let { data: imgsWithIds } = await getImageIds(productData.images, userToken);
            if (imgsWithIds.length) {
                setUploadedImages(imgsWithIds);
            }
            setIsProductLoading(false);
        } catch (error) {
            console.error(error);
            setIsProductLoading(false);
        }
    }, [])

    const onSelectCategory = (id) => {
        setSelectedCategory(categories.find((cObj) => cObj._id == id))
    }

    const handleSubmit = async () => {

        let s = isSizeNull(size) ? null : size;

        const productObj = {
            name,
            price,
            quantity,
            description,
            images: imagesUrl,
            category: selectedCategory._id,
            size: s,
            translations
        };

        try {
            const userToken = await user.getToken();
            const confirmed = window.confirm("Update product?");
            if (confirmed) {
                setIsProductLoading(true)
                await updateProduct(productSlugParam, productObj, userToken);
                setIsProductLoading(false)
                history.push(LIST_PRODUCTS_PATHNAME);
            }

        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    if (isProductLoading) {
        return <LoadingPage />
    }

    return (

        <div className="w-full sm:max-w-lg px-4 mx-auto">

            <NameForm
                name={name}
                setName={setName}
            />

            <PriceForm
                price={price}
                setPrice={setPrice}
            />

            <QuantityForm
                quantity={quantity}
                setQuantity={setQuantity}
            />

            <ImagesForm
                imagesUrl={imagesUrl}
                setImagesUrl={setImagesUrl}
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
            />

            <CategoryForm
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
            />

            <DescriptionForm
                description={description}
                setDescription={setDescription}
            />

            <SizeForm
                size={size}
                setSize={setSize}
            />

            <h3 className="pt-12 text-center">translations*</h3>

            <TranslationsForm
                translations={translations}
                setTranslations={setTranslations}
            />

            <div className="p-4 float-right">
                <button onClick={handleSubmit} className="flex items-center  px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Update</span>
                </button>
            </div>

        </div>
    )
}

export default EditProduct;