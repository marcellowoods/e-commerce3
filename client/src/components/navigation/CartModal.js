import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getItemDeleteIcon } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartTotal, removeFromCart } from "../../actions/cartActions";

const CartModalItem = ({
    price,
    productId,
    name,
    slug,
    quantity,
    countInStock,
    imageLink,
}) => {

    const dispatch = useDispatch();

    const increaseQty = () => {
        const newQty = quantity + 1;
        if (newQty <= countInStock) {
            dispatch(addToCart(slug, newQty));
        }
    }

    const removeItem = () => {
        dispatch(removeFromCart(productId));
    }

    const decreateQty = () => {
        const newQty = quantity - 1;
        if (newQty >= 1) {
            dispatch(addToCart(slug, newQty));
        } else {
            removeItem();
        }
    }



    return (
        <div className="flex justify-between mt-6">
            <div className="flex">
                <img className="h-20 w-20 object-cover rounded" src={imageLink} alt="" />
                <div className="mx-3">
                    <h3 className="text-sm text-gray-600">{name}</h3>
                    <div className="flex items-center mt-2">
                        <button
                            onClick={increaseQty}
                            className="text-gray-500 focus:outline-none focus:text-gray-600"
                        >
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <span className="text-gray-700 mx-2">{quantity}</span>
                        <button
                            onClick={decreateQty}
                            className="text-gray-500 focus:outline-none focus:text-gray-600"
                        >
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>

                    </div>
                    <button
                        onClick={removeItem}
                        className="text-gray-500 mt-2 focus:outline-none focus:text-gray-600"
                    >
                        {getItemDeleteIcon()}

                    </button>

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

    const { drawerCart, cart } = useSelector((state) => ({ ...state }));
    const { cartItems: products } = cart;

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
            dispatch({ type: "DRAWER_CART_TOGGLE", payload: false });
        }
    }

    return (
        <Fragment>
            <div>
                <div
                    className={`${isCartModalOpen() ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'} z-40 fixed right-0 top-0 max-w-xs w-70 sm:w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300`}>
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
                                productId={item.product}
                                slug={item.slug}
                                price={item.price}
                                name={item.name}
                                quantity={item.qty}
                                imageLink={item.image}
                                countInStock={item.countInStock}
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


                    {/* <hr className="my-3" /> */}
                    <h3 className="text-right text-lg text-gray-600">total {getCartTotal(products)}$</h3>
                    <hr className="my-3" />

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
