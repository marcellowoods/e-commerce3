import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCategory } from "../../functions/category"
import FileUpload from "../../components/forms/FileUpload";
import { useTranslation } from 'react-i18next';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const NameForm = ({ name, setName }) => {
    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                />

            </div>
        </div>
    )
}

const ImageUrlForm = ({ imageUrl, setImageUrl }) => {

    // const [uploadedImages, setUploadedImages] = useState(
    //     {
    //         images: [
    //             {url: "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
    //             public_id: 123},
    //             {url: "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
    //             public_id: 123},
    //         ]
    //     }
    // )

    const [uploadedImages, setUploadedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (uploadedImages.length && uploadedImages[0].url) {
            const url = uploadedImages[0].url
            setImageUrl(url);
        } else {
            setImageUrl("");
        }

    }, [uploadedImages])

    const isInputDisabled = () => uploadedImages.length;

    const onInputChange = (e) => {

        if (isInputDisabled()) {
            window.alert("remove uploaded image first")
        } else {
            setImageUrl(e.target.value)
        }
    }

    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Image
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">

                <input
                    value={imageUrl}
                    onChange={onInputChange}
                    type="text"
                    name="name"
                    disabled={isInputDisabled()}
                    placeholder="paste a link or upload image"
                    id="name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                />

            </div>

            <div className="pb-4">
                <FileUpload
                    images={uploadedImages}
                    setImages={setUploadedImages}
                    setLoading={setLoading}
                    singleUpload={true}
                />
            </div>

        </div>
    )
}

const DescriptionForm = ({ description, setDescription }) => {
    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Description
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">

                <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                />

            </div>
        </div>
    )
}

const Translation = ({ language, description, name, handleEditTranslations }) => {

    return (
        <div className="">

            <NameForm
                name={name}
                setName={(newVal) => handleEditTranslations(language, "name", newVal)}
            />

            <DescriptionForm
                description={description}
                setDescription={(newVal) => handleEditTranslations(language, "description", newVal)}
            />

        </div>
    )

}

//more forms
//https://tailwindcomponents.com/component/account-card
//https://tailwindcomponents.com/components/forms?page=2

//TODO
//https://dev.to/eons/detect-page-refresh-tab-close-and-route-change-with-react-router-v5-3pd
const CreateCategory = () => {

    let history = useHistory();

    const { t, i18n } = useTranslation();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const { user } = useSelector((state) => ({ ...state }));

    const makeTranslationsObj = () => {
        const languagesWithoutEnglish = ["bg"];

        return (
            languagesWithoutEnglish.map(lang => {
                return { lang, description: "", name: "" }
            })
        );
    }

    const [translations, setTranslations] = useState(makeTranslationsObj());

    console.log(translations);

    const handleEditTranslations = (forLanguage, field, newVal) => {

        let translationObj = translations.find((tObj) => tObj.lang == forLanguage);
        let newTranslationObj = { ...translationObj, [field]: newVal };

        setTranslations(prev => {

            let filtered = prev.filter((el) => el.lang != forLanguage);

            return [...filtered, newTranslationObj];
        })
    }

    const renderTranslations = () => {

        return (
            <div>
                {translations.map(({ lang, description, name }) => {

                    console.log(description)
                    return (
                        <>
                            <h3 className="pt-12 text-center">{lang}</h3>
                            <Translation
                                language={lang}
                                description={description}
                                name={name}
                                handleEditTranslations={handleEditTranslations}
                            />
                        </>
                    )
                })}
            </div>
        )
    }

    const handleSubmit = () => {


        createCategory({ name, description, translations, image: imageUrl }, user.token)
            .then((res) => {
                // console.log(res)
                history.push(`/categories`);
            })
            .catch((error) => {
                //https://itnext.io/javascript-error-handling-from-express-js-to-react-810deb5e5e28
                if (error.response) {
                    /*errthe request was made and the server responded
                    with a status code that falls out of the range of 2xx */
                    console.log(error.response.data)
                    alert(error.response.data);
                }
            });
    };

    return (

        <div className="w-full sm:max-w-lg px-4 mx-auto mt-6">

            <NameForm
                name={name}
                setName={setName}
            />

            <ImageUrlForm
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
            />


            <DescriptionForm
                description={description}
                setDescription={setDescription}
            />

            <h3 className="pt-12 text-center">translations</h3>

            {renderTranslations()}

            <div className="p-4 float-right">
                <button onClick={handleSubmit} className="flex items-center  px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Submit</span>
                </button>
            </div>

        </div>
    )
}



export default CreateCategory;