import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateCategory, getCategory } from "../../functions/category";
import { getImageIds } from "../../functions/cloudinary";

import LoadingPage from "../LoadingPage";

import {
    NameForm,
    DescriptionForm,
    ImageUrlForm,
    TranslationsForm
} from "../../components/forms/CRUDForms/CategoryForms";


//more forms
//https://tailwindcomponents.com/component/account-card
//https://tailwindcomponents.com/components/forms?page=2

//TODO
//https://dev.to/eons/detect-page-refresh-tab-close-and-route-change-with-react-router-v5-3pd

const EditCategory = () => {

    let history = useHistory();
    const { categorySlugParam } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isCategoryLoading, setIsCategoryLoading] = useState(true);
    const [translations, setTranslations] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    const setCategoryParams = (category) => {
        setName(category.name);
        console.log(category.image);
        setImageUrl(category.image);
        setDescription(category.description);
        if (category.translations) {
            setTranslations(category.translations);
        }
    }

    useEffect(async () => {

        try {
            const userToken = await user.getToken();
            let { data: category } = await getCategory(categorySlugParam);
            console.log(category);
            setCategoryParams(category);
            let { data: imgsWithIds } = await getImageIds([category.image], userToken);
            if (imgsWithIds.length) {
                console.log(imgsWithIds);
                setUploadedImages(imgsWithIds);
            }

            setIsCategoryLoading(false);
        } catch (error) {
            console.error(error);
            setIsCategoryLoading(false);
        }
    }, [])

    const handleUpdate = async () => {

        const updatedCategory = { name, description, image: imageUrl, translations };

        try {
            const userToken = await user.getToken();
            await updateCategory(categorySlugParam, updatedCategory, userToken);
            history.push(`/categories`);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                alert(error.response.data);
            }
        }
    };

    if (isCategoryLoading) {
        return <LoadingPage />
    }

    return (

        <div className="w-full sm:max-w-lg mx-auto">

            <NameForm
                name={name}
                setName={setName}
            />

            <ImageUrlForm
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
            />


            <DescriptionForm
                description={description}
                setDescription={setDescription}
            />

            <h3 className="pt-12 text-center">translations</h3>

            <TranslationsForm
                translations={translations}
                setTranslations={setTranslations}
            />

            <div className="p-4 float-right">
                <button onClick={handleUpdate} className="flex items-center  px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Update</span>
                </button>
            </div>

        </div>
    )
}



export default EditCategory;