import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import ProductShopCard from "../components/cards/ProductShopCard"
import { getCategories } from "../functions/category";
import LoadingPage from "./LoadingPage";

import { useTranslation } from 'react-i18next';
import { getTranslatedField } from "../actions/translateActions";
import { t } from "i18next";

const CategoryCard = ({ handleClick, description, image, name, slug }) => {

    return (
        <div onClick={() => handleClick(slug)} className="relative cursor-pointer h-64 rounded-lg overflow-hidden bg-cover bg-center m-4" style={{ backgroundImage: `url(${image})` }}>
            {/* <div className="bg-gray-900 bg-opacity-50 flex items-end h-full">
                <div className="px-10 py-10 max-w-xl">
                    <h2 className="text-2xl text-white font-semibold">{name}</h2>
                    <p className="mt-2  font-normal text-white text-lg">{description}</p>

                </div>
            </div> */}
            <div className="bg-gray-900 bg-opacity-70 absolute width-full inset-x-0 bottom-0">
                <div className="px-5 py-5 max-w-xl">
                    <h2 className="text-2xl text-white font-semibold">{name}</h2>
                    <p className="mt-2  font-normal text-white text-lg">{description}</p>

                </div>
            </div>
        </div>
    )

}

// const Home = () => {
//     return (
//         <div className="container mx-auto pt-6 px-6">
//             <div className="h-64 rounded-md overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144')" }}>
//                 <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
//                     <div className="px-10 max-w-xl">
//                         <h2 className="text-2xl text-white font-semibold">Sport Shoes</h2>
//                         <p className="mt-2 text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
//                         <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
//                             <span>Shop Now</span>
//                             <svg className="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <div className="md:flex mt-8 md:-mx-4">
//                 <div className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144')" }}>
//                     <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
//                         <div className="px-10 max-w-xl">
//                             <h2 className="text-2xl text-white font-semibold">Back Pack</h2>
//                             <p className="mt-2 text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
//                             <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
//                                 <span>Shop Now</span>
//                                 <svg className="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144')" }}>
//                     <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
//                         <div className="px-10 max-w-xl">
//                             <h2 className="text-2xl text-white font-semibold">Games</h2>
//                             <p className="mt-2 text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.</p>
//                             <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
//                                 <span>Shop Now</span>
//                                 <svg className="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

const Home = () => {

    let history = useHistory();

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { t, i18n } = useTranslation();

    const fetchAllCategories = async () => {
        try {
            setIsLoading(true);
            let { data } = await getCategories();
            if (data) {
                setCategories(data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const handleClick = (slugy) => {
        history.push(`/shop/${slugy}`);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <div className="container max-w-7xl mx-auto px-2">
            <div className="grid  grid-cols-1 lg:grid-cols-2">
                {categories.map((c) => {

                    const { description, image, name, slug, _id } = c;

                    const lang = i18n.language;
                    const translatedName = getTranslatedField(c, 'name', lang);
                    const translatedDescription = getTranslatedField(c, 'description', lang);

                    return (
                        <CategoryCard
                            key={name}
                            description={translatedDescription}
                            image={image}
                            name={translatedName}
                            slug={slug}
                            handleClick={handleClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Home;
