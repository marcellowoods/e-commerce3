import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateCategory, getCategory } from "../../functions/category";
import { getImageIds } from "../../functions/cloudinary";
import { useAsync } from "../../auxiliary/reactUtils"
import LoadingPage from "../LoadingPage";
import FileUpload from "../../components/forms/FileUpload";

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

//more forms
//https://tailwindcomponents.com/component/account-card
//https://tailwindcomponents.com/components/forms?page=2

//TODO
//https://dev.to/eons/detect-page-refresh-tab-close-and-route-change-with-react-router-v5-3pd

// const CategoryUpdate = ({ history, match }) => {
//     const { user } = useSelector((state) => ({ ...state }));

//     const [name, setName] = useState("");
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         loadCategory();
//     }, []);

//     const loadCategory = () =>
//         getCategory(match.params.slug).then((c) => setName(c.data.name));

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // console.log(name);
//         setLoading(true);
//         updateCategory(match.params.slug, { name }, user.token)
//             .then((res) => {
//                 // console.log(res)
//                 setLoading(false);
//                 setName("");
//                 toast.success(`"${res.data.name}" is updated`);
//                 history.push("/admin/category");
//             })
//             .catch((err) => {
//                 console.log(err);
//                 setLoading(false);
//                 if (err.response.status === 400) toast.error(err.response.data);
//             });
//     };

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-md-2">
//                     <AdminNav />
//                 </div>
//                 <div className="col">
//                     {loading ? (
//                         <h4 className="text-danger">Loading..</h4>
//                     ) : (
//                         <h4>Update category</h4>
//                     )}

//                     <CategoryForm
//                         handleSubmit={handleSubmit}
//                         name={name}
//                         setName={setName}
//                     />

//                     <hr />
//                 </div>
//             </div>
//         </div>
//     );
// };

const EditCategory = () => {

    let history = useHistory();
    const { categorySlugParam } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isCategoryLoading, setIsCategoryLoading] = useState(true);

    const { user } = useSelector((state) => ({ ...state }));

    const setCategoryParams = (category) => {
        setName(category.name);
        setImageUrl(category.image);
        setDescription(category.description);
    }

    useEffect(async () => {

        try {
            let { data: category } = await getCategory(categorySlugParam);
            console.log(category);
            setCategoryParams(category);
            let { data: imgsWithIds } = await getImageIds([category.image], user.token);
            setUploadedImages(imgsWithIds);
            setIsCategoryLoading(false);
        } catch (error) {
            console.error(error);
            setIsCategoryLoading(false);
        }
    }, [])

    const handleUpdate = async () => {

        const updatedCategory = { name, description, image: imageUrl };

        try {
            await updateCategory(categorySlugParam, updatedCategory, user.token);
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

        <div className="w-full sm:max-w-lg px-4 mx-auto mt-6">


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

            <div className="p-4 float-right">
                <button onClick={handleUpdate} className="flex items-center  px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Update</span>
                </button>
            </div>

        </div>
    )
}



export default EditCategory;