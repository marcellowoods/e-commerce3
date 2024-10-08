import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCategories } from "../../functions/category";
import { createProduct as createProductRequest } from "../../functions/product"
import { useAsync } from "../../auxiliary/reactUtils";
import { useTranslation } from 'react-i18next';

import {
    PriceForm,
    NameForm,
    QuantityForm,
    DescriptionForm,
    CategoryForm,
    TranslationsForm,
    ImagesForm,
    SizeForm
} from "../../components/forms/CRUDForms/ProductForms";

let makeEmptySize = () => ({ lowerBound: 0, upperBound: 0, stepSize: 0 });

let isSizeNull = (size) => size.lowerBound === 0 || size.upperBound === 0 || size.stepSize === 0;

//more forms
//https://tailwindcomponents.com/component/account-card
//https://tailwindcomponents.com/components/forms?page=2

//TODO
//https://dev.to/eons/detect-page-refresh-tab-close-and-route-change-with-react-router-v5-3pd
const CreateProduct = () => {

    const { user } = useSelector((state) => ({ ...state }));

    const [price, setPrice] = useState("");

    const [imagesUrl, setImagesUrl] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(makeEmptySize());

    //todo translate fields
    const { t } = useTranslation();

    const [translations, setTranslations] = useState([]);

    useAsync(
        getCategories,
        (categories) => {
            setCategories(categories);
            setSelectedCategory(categories[0]);
        },
        null,
        []
    );

    const onSelectCategory = (id) => {
        setSelectedCategory(categories.find((cObj) => cObj._id == id))
    }

    const handleSubmit = async () => {

        try {
            const userToken = await user.getToken();

            let s = isSizeNull(size) ? null : size;

            await createProductRequest({
                name,
                price,
                quantity,
                description,
                size: s,
                images: imagesUrl,
                category: selectedCategory._id,
                translations
            }, userToken);

            alert("product created");
            setPrice("");
            setImagesUrl([]);
            setName("");
            setDescription("");
            setSize(makeEmptySize());
            setSelectedCategory(categories[0]);
            setQuantity(1);
            setTranslations([]);

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.err)
                alert(error.response.data.err);
            }
        }
    };

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
                    <span>Submit</span>
                </button>
            </div>

        </div>
    )
}



export default CreateProduct;