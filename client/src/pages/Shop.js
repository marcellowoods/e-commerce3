import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';
import { getAddToCartIcon } from "../assets/icons";
import getPagination from "../components/navigation/getPagination";
import { Menu, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const apiURL = process.env.REACT_APP_API_URL;

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// let categoies = ["watches", "keyboards", "laptops", "cars", "watches", "keyboards", "laptops", "cars"]
let categoies = ["watches", "keyboards", "laptops"]
//https://www.youtube.com/watch?v=qJnIJa-cF2M
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

// const CategoryMenu = ({ category }) => {

//     // https://dev.to/fayaz/vue-tailwindcss-a-match-made-in-heaven-animated-dropdown-1nm
//     //https://tailwind-dropdown.surge.sh/
//     const [isOpen, setIsOpen] = useState(false);

//     const allCategories = [
//         { name: "Wrist Watch", _id: "23143" },
//         { name: "Phones", _id: "1463235" },
//         { name: "Keyboards", _id: "1432123435" },
//     ];

//     const categoryName = "Wrist Watch";
//     const handleOpen = () => {
//         setIsOpen(!isOpen)
//     }

//     return (
//         // <Fragment>
//         //     <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
//         //     <span className="mt-3 text-sm text-gray-500">200+ Products</span>
//         // </Fragment>

//         <Fragment>
//             <div className="relative text-left inline-block">
//                 <span >
//                     <button
//                         onClick={handleOpen}
//                         type="button"
//                         className="px-4 py-6 inline-flex items-center justify-between w-full rounded-md border border-gray-300 h-10  bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-800 transition ease-in-out duration-150 btn-focus"
//                         id="options-menu"
//                         aria-haspopup="true"
//                         aria-expanded="true"
//                     >
//                         <h3 className="text-gray-700 text-2xl font-medium"> {categoryName} </h3>
//                         <img
//                             src="https://s.svgbox.net/hero-solid.svg?ic=chevron-down&fill=grey-800"
//                             className="-mr-2 ml-1 h-6 w-6"
//                         />
//                     </button>
//                 </span >
//                 {/* https://headlessui.dev/react/menu */}
//                 {/* https://digital-flowers.github.io/react-animated-css.html */}
//                 {/* https://tailwindui.com/components/application-ui/elements/dropdowns */}
//                 {/* https://tailwindui.com/#product-application-ui */}
//                 {/* https://tailwindui.com/components/application-ui/overlays/modals */}
//                     <Animated style={{ zIndex: 5 }} className={` absolute pt-1`} animationIn="fadeIn" animationOut="fadeOut" animationInDuration={400} animationOutDuration={400} isVisible={isOpen}>

//                         <div
//                             className="rounded-md bg-white shadow-xs p-10 flex"
//                         >
//                             <div className="">
//                                 <p className="pb-10">watches</p>
//                                 <p className="pb-10">Phones</p>
//                                 <p >keyboards</p>
//                             </div>
//                             <div className="border-t border-gray-100"></div>
//                             <div class="border-t border-gray-100"></div>
//                             <div class="py-1">
//                             </div>
//                         </div>

//                     </Animated>



//             </div>

//             {/* <div className=" pt-2 text-sm text-gray-500">200+ Products</div> */}
//         </Fragment >


//     );
// };

const ProductCard = ({ id, name, price, imageUrl, onAddClick, onCardClick }) => {

    const lastDrag = useRef(Date.now());

    return (
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
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
            {/* <div className="hidden">
                <Tridi />
            </div> */}
            <div className="my-5">
                <div className="container mx-auto px-6">

                    <CategoryMenu />
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
