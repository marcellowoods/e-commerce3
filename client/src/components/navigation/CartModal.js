import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getCartIcon } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
// import { cartListProduct } from "./FetchApi";
// import { isAuthenticate } from "../auth/fetchApi";
// import { cartList } from "../productDetails/Mixins";
// import { subTotal, quantity, totalCost } from "./Mixins";

// const apiURL = process.env.REACT_APP_API_URL;


////////////test data
const items = [
    {
        quantity: 2,
        pName: "rolex",
        pPrice: 2000,
        pImages: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"]
    },
    {
        quantity: 3,
        pName: "swatch",
        pPrice: 500,
        pImages: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"]
    },
    {
        quantity: 3,
        pName: "swatch",
        pPrice: 500,
        pImages: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"]
    },
    {
        quantity: 3,
        pName: "swatch",
        pPrice: 500,
        pImages: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"]
    },
    {
        quantity: 3,
        pName: "swatch",
        pPrice: 500,
        pImages: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"]
    },
    {
        quantity: 3,
        pName: "swatch",
        pPrice: 500,
        pImages: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"]
    },
    {
        quantity: 3,
        pName: "swatch",
        pPrice: 500,
        pImages: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"]
    },
    {
        quantity: 3,
        pName: "swatch",
        pPrice: 500,
        pImages: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"]
    },
    {
        quantity: 3,
        pName: "swatch",
        pPrice: 500,
        pImages: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"]
    }
];
const products = items;
const quantity = (item) => item.quantity;
const subTotal = (id, price) => price;
const removeCartProduct = (id) => { };
////////////test data

const CartModalItem = ({ price, name, quantity, imageLink, removeCartProduct }) => {

    return (
        <div className="flex justify-between mt-6">
            <div className="flex">
                <img className="h-20 w-20 object-cover rounded" src={imageLink} alt="" />
                <div className="mx-3">
                    <h3 className="text-sm text-gray-600">{name}</h3>
                    <div className="flex items-center mt-2">
                        <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <span className="text-gray-700 mx-2">{quantity}</span>
                        <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <span className="text-gray-600">{price}$</span>
        </div>
    )
}

//https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
//https://academind.com/tutorials/reactjs-navbar-side-drawer
//https://www.youtube.com/watch?v=l6nmysZKHFU

const CartModal = (props) => {
    const history = useHistory();

    const { drawerCart } = useSelector((state) => ({ ...state }));

    let dispatch = useDispatch();

    // const products = data.cartProduct;

    const isCartModalOpen = () => drawerCart == true;

    const hasProducts = () => products && products.length !== 0;

    const handleCheckout = () => {
        console.log("handle checkout")
    }

    const closeCartModal = () => {
        if (isCartModalOpen) {
            document.body.style.overflow = 'unset';
            dispatch({ type: "cartModalToggle", payload: false });
        }
    }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         let responseData = await cartListProduct();
    //         if (responseData && responseData.Products) {
    //             dispatch({ type: "cartProduct", payload: responseData.Products });
    //             dispatch({ type: "cartTotalCost", payload: totalCost() });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const removeCartProduct = (id) => {
    //     let cart = localStorage.getItem("cart")
    //         ? JSON.parse(localStorage.getItem("cart"))
    //         : [];
    //     if (cart.length !== 0) {
    //         cart = cart.filter((item) => item.id !== id);
    //         localStorage.setItem("cart", JSON.stringify(cart));
    //         fetchData();
    //         dispatch({ type: "inCart", payload: cartList() });
    //         dispatch({ type: "cartTotalCost", payload: totalCost() });
    //     }
    //     if (cart.length === 0) {
    //         dispatch({ type: "cartProduct", payload: null });
    //         fetchData();
    //         dispatch({ type: "inCart", payload: cartList() });
    //     }
    // };

    // isCartModalOpen

    return (
        <Fragment>
            <div>
                <div 
                    className={`${isCartModalOpen() ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'} z-40 fixed right-0 top-0 max-w-xs w-80 sm:w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300`}>
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
                        <button onClick={closeCartModal} className="text-gray-600 focus:outline-none">
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    <hr className="my-3" />

                    {hasProducts() &&
                        products.map((item, index) => (
                            <CartModalItem
                                key={index}
                                price={item.pPrice}
                                name={item.pName}
                                quantity={item.quantity}
                                imageLink={item.pImages[0]}
                            />
                        )
                        )}

                    {!hasProducts() &&
                        <div className="text-2xl flex m-8 justify-center  font-medium text-gray-700">
                            No products
                            <br />
                            in cart
                        </div>
                    }

                    {/* <a onClick={cartModalOpen} className="cursor-pointer flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                        <svg className="transform rotate-180 h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        <span>Continue shopping</span>
                    </a> */}
                    {/* promo code */}
                    {/* <div className="mt-8">
                    <form className="flex items-center justify-center">
                        <input className="form-input w-48" type="text" placeholder="Add promocode">
                        </input>
                        <button className="ml-3 flex items-center px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            <span>Apply</span>
                        </button>
                    </form>
                </div> */}
                    <a onClick={handleCheckout} className={`cursor-pointer ${hasProducts() ? '' : 'cursor-not-allowed'} flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500`}>
                        <span>
                            Checkout
                        </span>
                        <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </a>
                </div>

                {isCartModalOpen() &&
                    <div
                        className={"modal-backdrop"}
                        onClick={() => {
                            // close modal when outside of modal is clicked
                            closeCartModal();
                        }}
                    ></div>}
            </div>



        </Fragment >
    );
};



export default CartModal;

// let f = () => (
//     <Fragment>
//         {/* Black Overlay */}
//         <div
//             className={`${!data.cartModal ? "hidden" : ""
//                 } fixed top-0 z-30 w-full h-full bg-black opacity-50`}
//         />
//         {/* Cart Modal Start */}
//         <section
//             className={`${!data.cartModal ? "hidden" : ""
//                 } fixed z-40 inset-0 flex items-start justify-end`}
//         >
//             <div
//                 style={{ background: "#303031" }}
//                 className="w-full md:w-5/12 lg:w-4/12 h-full flex flex-col justify-between"
//             >
//                 <div className="overflow-y-auto">
//                     <div className="border-b border-gray-700 flex justify-between">
//                         <div className="p-4 text-white text-lg font-semibold">Cart</div>
//                         {/* Cart Modal Close Button */}
//                         <div className="p-4 text-white">
//                             <svg
//                                 onClick={(e) => cartModalOpen()}
//                                 className="w-6 h-6 cursor-pointer"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                         </div>
//                     </div>
//                     <div className="m-4 flex-col">
//                         {products &&
//                             products.length !== 0 &&
//                             products.map((item, index) => {
//                                 return (
//                                     <Fragment key={index}>
//                                         {/* Cart Product Start */}
//                                         <div className="text-white flex space-x-2 my-4 items-center">
//                                             <img
//                                                 className="w-16 h-16 object-cover object-center"
//                                                 src={`${apiURL}/uploads/products/${item.pImages[0]}`}
//                                                 alt="cartProduct"
//                                             />
//                                             <div className="relative w-full flex flex-col">
//                                                 <div className="my-2">{item.pName}</div>
//                                                 <div className="flex items-center justify-between">
//                                                     <div className="flex items-center justify-between space-x-2">
//                                                         <div className="text-sm text-gray-400">
//                                                             Quantity :
//                                                         </div>
//                                                         <div className="flex items-end">
//                                                             <span className="text-sm text-gray-200">
//                                                                 {quantity(item._id)}
//                                                             </span>
//                                                         </div>
//                                                     </div>
//                                                     <div>
//                                                         {" "}
//                                                         <span className="text-sm text-gray-400">
//                                                             Subtotoal :
//                                                         </span>{" "}
//                                                         ${subTotal(item._id, item.pPrice)}.00
//                                                     </div>{" "}
//                                                     {/* SUbtotal Count */}
//                                                 </div>
//                                                 {/* Cart Product Remove Button */}
//                                                 <div
//                                                     onClick={(e) => removeCartProduct(item._id)}
//                                                     className="absolute top-0 right-0 text-white"
//                                                 >
//                                                     <svg
//                                                         className="w-5 h-5 cursor-pointer"
//                                                         fill="currentColor"
//                                                         viewBox="0 0 20 20"
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                     >
//                                                         <path
//                                                             fillRule="evenodd"
//                                                             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                                             clipRule="evenodd"
//                                                         />
//                                                     </svg>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         {/* Cart Product Start */}
//                                     </Fragment>
//                                 );
//                             })}

//                         {products === null && (
//                             <div className="m-4 flex-col text-white text-xl text-center">
//                                 No product in cart
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <div className="m-4 space-y-4">
//                     <div
//                         onClick={(e) => cartModalOpen()}
//                         className="cursor-pointer px-4 py-2 border border-gray-400 text-white text-center cursor-pointer"
//                     >
//                         Continue shopping
//                     </div>
//                     {data.cartTotalCost ? (
//                         <Fragment>
//                             {isAuthenticate() ? (
//                                 <div
//                                     className="px-4 py-2 bg-black text-white text-center cursor-pointer"
//                                     onClick={(e) => {
//                                         history.push("/checkout");
//                                         cartModalOpen();
//                                     }}
//                                 >
//                                     Checkout ${data.cartTotalCost}.00
//                                 </div>
//                             ) : (
//                                 <div
//                                     className="px-4 py-2 bg-black text-white text-center cursor-pointer"
//                                     onClick={(e) => {
//                                         history.push("/");
//                                         cartModalOpen();
//                                         dispatch({
//                                             type: "loginSignupError",
//                                             payload: !data.loginSignupError,
//                                         });
//                                         dispatch({
//                                             type: "loginSignupModalToggle",
//                                             payload: !data.loginSignupModal,
//                                         });
//                                     }}
//                                 >
//                                     Checkout ${data.cartTotalCost}.00
//                                 </div>
//                             )}
//                         </Fragment>
//                     ) : (
//                         <div className="px-4 py-2 bg-black text-white text-center cursor-not-allowed">
//                             Checkout
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </section>
//         {/* Cart Modal End */}
//     </Fragment>
// )
