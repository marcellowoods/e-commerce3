import React, { useState, Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import FileUpload from "../../components/forms/FileUpload"
import { getCategories } from "../../functions/category";
import { getProduct, updateProduct } from "../../functions/product";
import { getImageIds } from "../../functions/cloudinary";
import { useAsync, useAsyncDidMount, useDidMountEffect } from "../../auxiliary/reactUtils";
import LoadingPage from "../LoadingPage";

const LIST_PRODUCTS_PATHNAME = "/admin/list-products";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const PriceForm = ({ price, setPrice }) => {
    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    name="price"
                    id="price"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                    placeholder="0.00"
                />
                {/* <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                        Currency
                    </label>
                    <select
                        id="currency"
                        name="currency"
                        className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                    </select>
                </div> */}
            </div>
        </div>
    )
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

const QuantityForm = ({ quantity, setQuantity }) => {

    const handleChange = (e) => {
        const val = e.target.value;
        if (val >= 1) {
            setQuantity(e.target.value)
        }
    }

    return (
        <div className="p-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">

                <input
                    value={quantity}
                    type="number"
                    onChange={handleChange}
                    name="quantity"
                    id="quantity"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
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



const CategoryForm = ({ categories, selectedCategory, onSelectCategory }) => {

    return (
        <div className="p-4">
            <Listbox value={selectedCategory._id} onChange={onSelectCategory}>
                <Listbox.Label className="block text-sm font-medium text-gray-700">Category</Listbox.Label>
                <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-1 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ease-linear transition-all duration-150">
                        <span className="flex items-center">
                            <span className="ml-3 block truncate">{selectedCategory.name}</span>
                        </span>
                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>

                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {categories.map((category) => (
                                <Listbox.Option
                                    key={category._id}
                                    className={({ active }) =>
                                        classNames(
                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                        )
                                    }
                                    value={category._id}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <div className="flex items-center">
                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                    {category.name}
                                                </span>
                                            </div>

                                            {selected ? (
                                                <span
                                                    className={classNames(
                                                        active ? 'text-white' : 'text-indigo-600',
                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                    )}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

const ImagesForm = ({ imagesUrl, setImagesUrl, uploadedImages, setUploadedImages }) => {

    // const [uploadedImages, setUploadedImages] = useState(
    //     {
    //         images: [
    //             {url: "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
    //             public_id: 123},
    //             {url: "https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg",
    //             public_id: 123}
    //         ]
    //     }
    // )
    const [loading, setLoading] = useState(false);

    useDidMountEffect(() => {

        const urls = uploadedImages.map((img) => img.url);
        console.log(urls);
        setImagesUrl(urls);

    }, [uploadedImages])

    useDidMountEffect(() => {
        //clear uploadedImages after uploading product
        if (imagesUrl.length == 0 && uploadedImages.length > 0) {
            setUploadedImages([]);
        }

    }, [imagesUrl])


    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Images
            </label>

            <div className="pb-4">
                <FileUpload
                    images={uploadedImages}
                    setImages={setUploadedImages}
                    setLoading={setLoading}
                    singleUpload={false}
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

    const [isProductLoading, setIsProductLoading] = useState(true);

    const { user } = useSelector((state) => ({ ...state }));

    const setProductParams = (product, categories) => {
        console.log(product.images);
        setPrice(product.price);
        setImagesUrl(product.images);
        setName(product.name);
        setDescription(product.description);
        const productCategory = categories.find(c => c._id == product.category._id);
        if(productCategory){
            setSelectedCategory(productCategory);
        }else{
            setSelectedCategory(categories[0]);
        }
        setQuantity(product.quantity);
    }

    useEffect(async () => {

        try {
            const userToken = user.getToken();
            let { data: categoriesData } = await getCategories();
            setCategories(categoriesData);
            let { data: productData } = await getProduct(productSlugParam, userToken);
            setProductParams(productData, categoriesData);
            let { data: imgsWithIds } = await getImageIds(productData.images, userToken);
            if(imgsWithIds.length){
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

        const productObj = {
            name,
            price,
            quantity,
            description,
            images: imagesUrl,
            category: selectedCategory._id
        };

        try {
            const userToken = await user.getToken();
            const confirmed = window.confirm("Update product?");
            if(confirmed){
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

        <div className="w-full sm:max-w-lg px-4 mx-auto mt-6">

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

            <div className="p-4 float-right">
                <button onClick={handleSubmit} className="flex items-center  px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Update</span>
                </button>
            </div>

        </div>
    )
}

export default EditProduct;