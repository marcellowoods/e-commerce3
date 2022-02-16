import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cart from "../cart/Cart.js"

import { useTranslation } from 'react-i18next';


//https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
//https://academind.com/tutorials/reactjs-navbar-side-drawer
//https://www.youtube.com/watch?v=l6nmysZKHFU

const CartModal = () => {

    const history = useHistory();

    const { t } = useTranslation();

    const { drawerCart, cart } = useSelector((state) => ({ ...state }));
    const { cartItems: products } = cart;

    let dispatch = useDispatch();

    const isCartModalOpen = () => drawerCart == true;

    const hasProducts = () => products && products.length !== 0;

    const handleCheckout = () => {
        history.push('/checkout')
        closeCartModal();
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
                        <h3 className="text-2xl font-medium text-gray-700">{t('cart')}</h3>
                        <button onClick={closeCartModal} className="text-gray-600 focus:outline-none">
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    <hr className="my-3" />

                    <Cart products={products} />

                    {!hasProducts() &&
                        <div className="text-2xl flex m-8 justify-center  font-medium text-gray-700">

                            {t('cart is empty')}

                        </div>
                    }

                    {/* promo code? */}
                        {/* <div className="mt-8">
                        <form className="flex items-center justify-center">
                            <input className="form-input w-48" type="text" placeholder="Add promocode">
                            </input>
                            <button className="ml-3 flex items-center px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                <span>Apply</span>
                            </button>
                        </form>
                        </div> */}

                    <hr className="my-3" />

                    <button disabled={!hasProducts()} onClick={handleCheckout} className={`cursor-pointer ${hasProducts() ? '' : 'cursor-not-allowed'} flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500`}>
                        <span>
                            {t('checkout')}
                        </span>
                        <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
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
