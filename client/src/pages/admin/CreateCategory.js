import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCategory } from "../../functions/category"
import FileUploadCategory from "../../components/forms/FileUploadCategory";

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

const ImageUrlForm = ({ image, setImage }) => {

    const [values, setValues] = useState(
        {
            images: [
                "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
                "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
                "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
                "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
                "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
                "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
            ]
        }
    )

    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Image
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">

                <input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="paste a link or upload (todo)"
                    id="name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                />


            </div>

            <div className="pb-4">
                <FileUploadCategory values={values} />
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

//more forms
//https://tailwindcomponents.com/component/account-card
//https://tailwindcomponents.com/components/forms?page=2
const CreateCategory = () => {

    let history = useHistory();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = () => {

        createCategory({ name, description, image }, user.token)
            .then((res) => {
                // console.log(res)
                history.push(`/categories`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (

        <div className="w-full sm:max-w-lg px-4 mx-auto mt-6">

            <NameForm
                name={name}
                setName={setName}
            />

            <ImageUrlForm
                image={image}
                setImage={setImage}
            />


            <DescriptionForm
                description={description}
                setDescription={setDescription}
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