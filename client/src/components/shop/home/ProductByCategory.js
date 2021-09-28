import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout";
import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';
import { getAddToCartIcon } from "../../../assets/icons";
import getPagination from "./getPagination";
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
                    <button onClick={(() => onAddClick(id))} className="focus:outline-none">
                        {getAddToCartIcon()}
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
                {getPagination({
                    pageCount: 5,
                    onPageChange: (p) => console.log(p)
                })}

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
