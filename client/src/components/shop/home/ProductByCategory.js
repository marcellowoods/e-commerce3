import React, { Fragment, useEffect, useState, useRef } from "react";
import ReactPaginate from 'react-paginate';
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout";
import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';
// import { productByCategory } from "../../admin/products/FetchApi";

const apiURL = process.env.REACT_APP_API_URL;

const Submenu = ({ category }) => {
    const history = useHistory();
    return (
        <Fragment>
            {/* Submenu Section */}
            <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24">
                <div className="flex justify-between items-center">
                    <div className="text-sm flex space-x-3">
                        <span
                            className="hover:text-yellow-700 cursor-pointer"
                            onClick={(e) => history.push("/")}
                        >
                            Shop
                        </span>
                        <span className="text-yellow-700 cursor-default">{category}</span>
                    </div>
                    <div>
                        <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>
            </section>
            {/* Submenu Section */}
        </Fragment>
    );
};

const AllProduct = ({ products }) => {
    const history = useHistory();
    // const category =
    //     products && products.length > 0 ? products[0].pCategory.cName : "";
    const category = "things";
    return (
        <Fragment>
            <Submenu category={category} />
            <section className="m-4 md:mx-8 md:my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products && products.length > 0 ? (
                    products.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="relative col-span-1 m-2">
                                    <img
                                        onClick={(e) => history.push(`/products/${item._id}`)}
                                        className="w-full object-cover object-center cursor-pointer"
                                        // src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                                        src={item.pImages[0]}
                                        alt=""
                                    />
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="text-gray-600 font-light truncate">
                                            {item.pName}
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span>
                                                <svg
                                                    className="w-4 h-4 fill-current text-yellow-700"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="text-gray-700">
                                                {item.pRatings ? item.pRatings.length : 0}
                                            </span>
                                        </div>
                                    </div>
                                    <div>{item.pPrice}.00$</div>
                                    <div className="absolute top-0 right-0 mx-2 my-2 md:mx-4">
                                        <svg
                                            className="w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })
                ) : (
                    <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
                        No product found
                    </div>
                )}
            </section>
        </Fragment>
    );
};

const ProductCard = ({ id, name, price, imageUrl, onAddClick, onCardClick }) => {

    const lastDrag = useRef(Date.now());

    return (
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
            <div className="">

                <div onClick={
                    () => {
                        if (Date.now() - lastDrag.current < 200) {
                            onCardClick(id)
                        }
                    }
                }>
                    {/* <img
                        onClick={(e) => { }}
                        className="flex items-end justify-end h-56 w-full object-cover object-center cursor-pointer"
                        src={imageUrl}
                        alt=""
                    /> */}
                    {/* <Tridi
                        images={[
                            "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4urtfGLUvPlZXxeJYMKwxod4w0y_Jf_hRBQ&usqp=CAU",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-wMRq6WMZSigBcYV8ycb-5z5I88668rPmww&usqp=CAU"
                        ]}
                        // location="./images"
                        format="jpg"
                        // count="2"
                        mousewheel={true}
                        inverse={true}
                        // touchDragInterval={1}
                        onDragStart={() => lastDrag.current = Date.now()}
                        dragInterval={10}
                        touchDragInterval={10}
                    /> */}
                    {/* car */}
                    <Tridi
                        location="./images"
                        format="jpg"
                        count="36"
                        mousewheel={true}
                        inverse={true}
                        // touchDragInterval={1}
                        onDragStart={() => lastDrag.current = Date.now()}
                        dragInterval={1}
                        touchDragInterval={1}
                    />
                </div>

                <div className="float-left px-5 py-3">
                    <h3 className="color-main-light cursor-pointer uppercase">{name}</h3>
                    <span className="text-gray-500 mt-2">${price}</span>
                </div>

                <div className="float-right transform translate-y-4 -translate-x-4">
                    {/* className="p-2 rounded-full  text-white mx-5 mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500" */}
                    <button onClick={(() => onAddClick(id))} className="focus:outline-none">
                        {/* <svg width="28px" height="28px"  fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="blue"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> */}
                        <svg fill="rgba(59, 130, 246, 1)" width="28px" height="28px" version="1.1" viewBox="0 0 256 256" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
                            <desc>Created with Fabric.js 1.7.22</desc>

                            <g transform="translate(128 128) scale(.72)" >
                                <g transform="translate(-175.05 -175.05) scale(3.89)">
                                    <path d="m72.975 58.994h-41.12c-1.539 0-2.897-1.005-3.347-2.477l-13.309-43.511h-11.699c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5h14.289c1.539 0 2.897 1.005 3.347 2.476l13.309 43.512h36.204l10.585-25.191h-6.021c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5h11.287c1.172 0 2.267 0.587 2.915 1.563s0.766 2.212 0.312 3.293l-13.526 32.191c-0.546 1.299-1.817 2.144-3.226 2.144z" stroke-linecap="round" />
                                    <circle cx="28.88" cy="74.33" r="6.16" />
                                    <circle cx="74.59" cy="74.33" r="6.16" />
                                    <path d="m62.278 19.546h-10.041v-10.04c0-1.933-1.567-3.5-3.5-3.5s-3.5 1.567-3.5 3.5v10.04h-10.04c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5h10.04v10.04c0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5v-10.04h10.041c1.933 0 3.5-1.567 3.5-3.5s-1.567-3.5-3.5-3.5z" stroke-linecap="round" />
                                </g>
                            </g>
                        </svg>

                        {/* <svg fill="rgba(59, 130, 246, 1)" width="28px" height="28px" version="1.1" viewBox="0 0 256 256" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
                            <desc>Created with Fabric.js 1.7.22</desc>

                            <g transform="translate(128 128) scale(.72)" >
                                <g transform="translate(-175.05 -175.05) scale(3.89)">
                                    <path d="m72.975 58.994h-41.12c-1.539 0-2.897-1.005-3.347-2.477l-13.309-43.511h-11.699c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5h14.289c1.539 0 2.897 1.005 3.347 2.476l13.309 43.512h36.204l10.585-25.191h-6.021c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5h11.287c1.172 0 2.267 0.587 2.915 1.563s0.766 2.212 0.312 3.293l-13.526 32.191c-0.546 1.299-1.817 2.144-3.226 2.144z" strokeLinecap="round" />
                                    <circle cx="28.88" cy="74.33" r="6.16" />
                                    <circle cx="74.59" cy="74.33" r="6.16" />
                                    <path d="m63.653 21.403c-1.367-1.367-3.582-1.367-4.949 0l-5.404 5.404v-17.3c0-1.933-1.567-3.5-3.5-3.5s-3.5 1.567-3.5 3.5v17.3l-5.404-5.404c-1.366-1.366-3.583-1.367-4.95 0s-1.367 3.583 0 4.95l11.378 11.377c0.163 0.163 0.343 0.309 0.535 0.438 0.084 0.056 0.176 0.095 0.264 0.143 0.112 0.061 0.22 0.129 0.338 0.178 0.115 0.047 0.234 0.075 0.353 0.109 0.1 0.03 0.197 0.068 0.301 0.089 0.226 0.045 0.456 0.069 0.685 0.069s0.459-0.024 0.685-0.069c0.104-0.021 0.2-0.059 0.301-0.089 0.118-0.035 0.238-0.062 0.353-0.109 0.119-0.049 0.227-0.117 0.338-0.178 0.088-0.048 0.18-0.087 0.264-0.143 0.193-0.129 0.372-0.274 0.535-0.438l11.378-11.377c1.367-1.368 1.367-3.583-1e-3 -4.95z" stroke-linecap="round" />
                                </g>
                            </g>
                        </svg> */}


                    </button>
                </div>



            </div>
        </div>
    )
}

const PageComponent = () => {
    const [products, setProducts] = useState(null);
    const { catId } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        let items = [];

        items.push({
            id: Math.floor(Math.random() * 1000),
            quantity: 4,
            pName: "nissan",
            pPrice: 100,
            pImages: ["https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"]
        })

        let item = {
            id: Math.floor(Math.random() * 1000),
            quantity: 2,
            pName: "nissan",
            pPrice: 2000,
            pImages: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4urtfGLUvPlZXxeJYMKwxod4w0y_Jf_hRBQ&usqp=CAU"]
        };
        for (let i = 0; i < 15; i++) {
            items.push(item);
        }
        setProducts(items);
    }

    // const fetchData = async () => {
    //     try {
    //         let responseData = await productByCategory(catId);
    //         if (responseData && responseData.Products) {
    //             setProducts(responseData.Products);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <Fragment>
            {/* <div class="container mx-auto px-6">
                <AllProduct products={products} />
            </div> */}

            {/* the first tridi component doesnt prevent vertical touch move so  that's one way to fix it (weid bug) */}
            {/* https://github.com/nevestuan/react-tridi */}
            <div className="hidden">
                <Tridi

                />
            </div>
            <main className="my-8">
                <div className="container mx-auto px-6">
                    <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
                    <span className="mt-3 text-sm text-gray-500">200+ Products</span>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">

                        {products && products.map((p) => (
                            <ProductCard
                                id={p.id}
                                quantity={3}
                                imageUrl={p.pImages[0]}
                                price={p.pPrice}
                                name={p.pName}
                                onAddClick={(id) => { console.log(`added ${id} to cart`) }}
                                onCardClick={(id) => { alert(`card ${id}`) }}
                            />
                        ))
                        }

                    </div>
                </div>

                {/* https://github.com/AdeleD/react-paginate */}
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={""}
                    pageCount={5}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(p) => console.log(p)}
                    containerClassName={"flex justify-center mt-10"}
                    subContainerClassName={"flex rounded-md"}
                    previousLinkClassName={"py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"}
                    nextLinkClassName={"py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"}
                    pageLinkClassName={"py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"}
                    breakLinkClassName={"py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"}
                    activeLinkClassName={"bg-gray-300"}
                />
            </main>

        </Fragment >
    );
};

const ProductByCategory = (props) => {
    return (
        <Fragment>
            <Layout children={<PageComponent />} />
        </Fragment>
    );
};

export default ProductByCategory;
