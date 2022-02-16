import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCategory } from "../../functions/category"

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
const CreateCategory = () => {

    let history = useHistory();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [translations, setTranslations] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = async () => {

        try {
            const userToken = await user.getToken();
            await createCategory({ name, description, translations, image: imageUrl }, userToken);
            history.push(`/categories`);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                alert(error.response.data);
            }
        }
    };

    return (

        <div className="sm:max-w-lg px-4 mx-auto">

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
                <button onClick={handleSubmit} className="flex items-center  px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Submit</span>
                </button>
            </div>

        </div>
    )
}



export default CreateCategory;