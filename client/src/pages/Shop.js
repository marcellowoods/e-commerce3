import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
// import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';
import getPagination from "../components/navigation/getPagination";
import { Menu, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import ProductShopCard from "../components/cards/ProductShopCard"
import LoadingPage from "./LoadingPage";
import { getCategories } from "../functions/category";
import { getProducts } from "../functions/product";

const apiURL = process.env.REACT_APP_API_URL;

const SHOP_PATHNAME = "/shop/";
const PRODUCT_PATHNAME = "/product/";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// let categoies = ["watches", "keyboards", "laptops", "cars", "watches", "keyboards", "laptops", "cars"]

//https://www.youtube.com/watch?v=qJnIJa-cF2M
//https://headlessui.dev/react/menu 
//https://tailwindui.com/components/application-ui/elements/dropdowns 
//https://tailwindui.com/#product-application-ui 
//https://tailwindui.com/components/application-ui/overlays/modals 
const CategoryMenu = ({ allCategories, selectedCategory, setSelectedCategory }) => {

    // const [selectedCategory, setSelectedCategory] = useState(categoies[0]);

    return (
        <Menu style={{ zIndex: 2 }} as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  focus:ring-indigo-500">
                    <h3 className="text-gray-700 text-2xl font-medium">{selectedCategory.name}</h3>
                    <SelectorIcon className="-mr-2 ml-1 mt-2 h-6 w-6" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 "
                enterTo="transform opacity-100"
                leave="transition ease-out duration-300"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0 "
            >
                <Menu.Items style={{ maxHeight: "300px" }} className="overflow-y-auto origin-top-right absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {allCategories.map((categoryObj) => (
                            <Menu.Item key={categoryObj.name}>
                                {({ active }) => (
                                    <a
                                        onClick={() => setSelectedCategory(categoryObj)}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            selectedCategory.slug == categoryObj.slug ? 'bg-gray-100' : "",
                                            'block text-center  px-4 py-4 text-md cursor-pointer'
                                        )}
                                    >
                                        {categoryObj.name}
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

let categoies = ["watches", "keyboards", "laptops"];

const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

const PageComponent = () => {

    const { categorySlug } = useParams();

    const history = useHistory();
    const [products, setProducts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allCategories, setAllCategories] = useState(null);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    // console.log(categorySlug);

    const fetchAllCategories = async () => {

        try {
            let { data } = await getCategories();
            if (data) {
                setAllCategories(data);
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    useEffect(() => {

        fetchAllCategories();
    }, []);

    useDidMountEffect(() => {

        if (allCategories) {
            if (categorySlug) {
                const categoryObj = allCategories.find(c => c.slug == categorySlug);
                setSelectedCategory(categoryObj);
            } else {
                setSelectedCategory(allCategories[0]);
            }
        }

    }, [allCategories])

    // console.log('render')

    useDidMountEffect(() => {


        //https://stackoverflow.com/questions/56053810/url-change-without-re-rendering-in-react-router
        //https://reactjs.org/docs/reconciliation.html
        // const path = SHOP_PATHNAME + selectedCategory.slug;
        // history.replace({ pathname: path });

        fetchProducts();


    }, [page]);

    useDidMountEffect(() => {

        if (page === 0) {
            if (selectedCategory) {
                //https://stackoverflow.com/questions/56053810/url-change-without-re-rendering-in-react-router
                //https://reactjs.org/docs/reconciliation.html
                const path = SHOP_PATHNAME + selectedCategory.slug;
                history.replace({ pathname: path });

                fetchProducts();
            }
        } else {
            setPage(0);

        }

    }, [selectedCategory]);


    const fetchProducts = async () => {
        console.log("fetching products")
        try {
            setIsLoading(true);
            console.log(page);
            let { data } = await getProducts(null, null, page + 1);

            if (data) {
                const perPage = 5;
                console.log(data)
                setProducts(data.data);
                const { total } = data.metadata[0];
                const countPages = Math.ceil(total / perPage);
                setPageCount(countPages);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            alert(error);
        }
    };

    const pushToProductPage = (id) => {
        history.push(PRODUCT_PATHNAME + id)
    }

    const renderProducts = () => (
        <div key={"products"} className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {products && products.map((p) => (
                <ProductShopCard
                    key={p._id}
                    id={p._id}
                    quantity={p.quantity}
                    images={p.images}
                    imageUrl={p.images[0]}
                    price={p.price}
                    name={p.title}
                    onAddClick={(id) => { console.log(`added ${id} to cart`) }}
                    onCardClick={pushToProductPage}
                />
            ))
            }
        </div>
    )

    if (products == null || categoies == null || selectedCategory == null) {

        return (
            <LoadingPage />
        )
    }

    return (
        <Fragment>
            {/* <div class="container mx-auto px-6">
                <AllProduct products={products} />
            </div> */}

            <div className="my-5 sm:my-10">
                <div className="container mx-auto max-w-7xl px-6">

                    <CategoryMenu
                        allCategories={allCategories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                    {/* xl:grid-cols-4 */}
                    {isLoading ? <LoadingPage /> : renderProducts()}

                </div>

                {/* https://github.com/AdeleD/react-paginate */}
                <div className="p-6">
                    {getPagination({
                        curPage: page,
                        pageCount,
                        onPageChange: ({ selected }) => setPage(selected)
                    })}
                </div>

            </div>

        </Fragment >
    );
};

export default PageComponent;
