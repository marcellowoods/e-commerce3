import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateCategory, getCategory } from "../../functions/category"
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

    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Image
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">

                <input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    type="text"
                    name="name"
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

    const { user } = useSelector((state) => ({ ...state }));

    const setCategoryParams = (category) => {
        setName(category.name);
        setImagesUrl(product.images);
        setDescription(category.description);
    }

    useAsync(
        async () => getCategory(categorySlugParam),
        (category) => {
            setCategoryParams(category)
        },
        null,
        []
    );

    const handleUpdate = () => {

        //(slug, category, authtoken)
        updateCategory({ name, description, image: imageUrl }, user.token)
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

    // useAsync(
    //     async () => getProductForEdit(productSlugParam, user.token),
    //     ({ product, imagesWithIds }) => {
    //         setProductParams(product);
    //         setUploadedImages(imagesWithIds)
    //     },
    //     setIsProductLoading,
    //     [categories]
    // );

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