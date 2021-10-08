import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import ProductShopCard from "../components/cards/ProductShopCard"

const categories = [
    {
        description: "cool shoes to wear in the summer",
        name: "shoes",
        _id: "143254id",
        image: 'https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144'
    },
    {
        description: "cool AUTHENTIC watches to wear (they are totally not fake)",
        name: "wrist watch",
        _id: "1432154id",
        image: 'https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144'
    },
    {
        description: "check these Games out, really fun to play with your friends (if you have any)",
        name: "keyboards",
        _id: "1asd254id",
        image: 'https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144'
    },

    {
        description: "check these Games out, really fun to play with your friends (if you have any)",
        name: "games",
        _id: "1asd254id",
        image: 'https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144'
    }
]

const CategoryCard = ({ handleClick, description, image, name, slug }) => {

    return (
        <div className="h-64  rounded-md overflow-hidden bg-cover bg-center m-4" style={{ backgroundImage: `url(${image})` }}>
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                <div className="px-10 max-w-xl">
                    <h2 className="text-2xl text-white font-semibold">{name}</h2>
                    <p className="mt-2 text-gray-400">{description}</p>
                    <button onClick={() => handleClick(slug)} className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                        <span>Shop Now</span>
                        <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
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

    const handleClick = (name) => {
        history.push(`/shop/${name}`);
    }

    return (
        <div className="container mx-auto px-2">
            <div className="grid  grid-cols-1 lg:grid-cols-2    mt-6">
                {categories.map(({ description, image, name, _id }) => {
                    return (
                        <CategoryCard
                            key={name}
                            description={description}
                            image={image}
                            name={name}
                            slug={name}
                            handleClick={handleClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Home;
