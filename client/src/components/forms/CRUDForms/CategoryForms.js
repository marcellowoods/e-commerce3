import React, { useState, useEffect } from "react";
import { NameForm, DescriptionForm, TranslationsForm } from "./CommonForms";
import FileUpload from "../FileUpload";


const ImageUrlForm = ({ imageUrl, setImageUrl, uploadedImages, setUploadedImages }) => {

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

    // const [uploadedImages, setUploadedImages] = useState([]);
    const [loading, setLoading] = useState(false);

    // useDidMountEffect to keep the url on load
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

export {
    NameForm,
    DescriptionForm,
    ImageUrlForm,
    TranslationsForm
};