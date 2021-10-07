import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';
import { getAddToCartIcon } from "../assets/icons";
import getPagination from "../components/navigation/getPagination";
import { Menu, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import ProductShopCard from "../components/cards/ProductShopCard"

const apiURL = process.env.REACT_APP_API_URL;

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// let categoies = ["watches", "keyboards", "laptops", "cars", "watches", "keyboards", "laptops", "cars"]
let categoies = ["watches", "keyboards", "laptops"]
//https://www.youtube.com/watch?v=qJnIJa-cF2M
//https://headlessui.dev/react/menu 
//https://tailwindui.com/components/application-ui/elements/dropdowns 
//https://tailwindui.com/#product-application-ui 
//https://tailwindui.com/components/application-ui/overlays/modals 
const CategoryMenu = () => {

    const [selectedCategory, setSelectedCategory] = useState(categoies[0]);

    return (
        <Menu style={{ zIndex: 2 }} as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <h3 className="text-gray-700 text-2xl font-medium">{selectedCategory}</h3>
                    <SelectorIcon className="-mr-2 ml-1 mt-2 h-6 w-6" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-in duration-300"
                enterFrom="transform opacity-0 "
                enterTo="transform opacity-100"
                leave="transition ease-in duration-300"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0 "
            >
                <Menu.Items style={{ maxHeight: "300px" }} className="overflow-y-auto origin-top-right absolute  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {categoies.map((name) => (
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={() => setSelectedCategory(name)}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            selectedCategory == name ? 'bg-gray-100' : "",
                                            'block text-center  px-4 py-4 text-md cursor-pointer'
                                        )}
                                    >
                                        {name}
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
                <Tridi />
            </div>
            <div className="my-5">
                <div className="container mx-auto px-6">

                    <CategoryMenu />
                    {/* xl:grid-cols-4 */}
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   mt-6">
                        {products && products.map((p) => (
                            <ProductShopCard
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
                <div className="p-6">
                    {getPagination({
                        pageCount: 5,
                        onPageChange: (p) => console.log(p)
                    })}
                </div>

            </div>

        </Fragment >
    );
};

export default PageComponent;
