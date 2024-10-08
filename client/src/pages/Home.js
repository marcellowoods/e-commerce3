import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../functions/category";
import LoadingPage from "./LoadingPage";

import { useTranslation } from 'react-i18next';
import { getTranslatedField } from "../actions/translateActions";

const CategoryCard = ({ handleClick, description, image, name, slug }) => {

    return (
        <div onClick={() => handleClick(slug)} className="relative cursor-pointer h-64 rounded-lg overflow-hidden bg-cover bg-center my-6 sm:mx-6" style={{ backgroundImage: `url(${image})` }}>

            {/* full shade? */}
            {/* <div className="bg-gray-900 bg-opacity-50 flex items-end h-full">
                <div className="px-10 py-10 max-w-xl">
                    <h2 className="text-2xl text-white font-semibold">{name}</h2>
                    <p className="mt-2  font-normal text-white text-lg">{description}</p>

                </div>
            </div> */}

            {/* shade only description */}
            <div className="bg-gray-900 bg-opacity-70 absolute width-full inset-x-0 bottom-0">
                <div className="px-5 py-5 max-w-xl">
                    <h2 className="text-2xl text-white font-semibold">{name}</h2>
                    {description && (
                        <p className="mt-2  font-normal text-white text-lg">{description}</p>
                    )}
                </div>
            </div>
        </div>
    )

}

const Home = () => {

    const navigate = useNavigate();

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
        navigate(`/shop/${slugy}`);
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

        <div className="pt-2 grid  grid-cols-1 lg:grid-cols-2">
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

    )
}

export default Home;
