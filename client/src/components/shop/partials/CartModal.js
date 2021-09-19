import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../index";
// import { cartListProduct } from "./FetchApi";
// import { isAuthenticate } from "../auth/fetchApi";
// import { cartList } from "../productDetails/Mixins";
// import { subTotal, quantity, totalCost } from "./Mixins";

// const apiURL = process.env.REACT_APP_API_URL;

const CartModal = (props) => {
    const history = useHistory();

    const { data, dispatch } = useContext(LayoutContext);
    const products = data.cartProduct;

    const cartModalOpen = () =>
        dispatch({ type: "cartModalToggle", payload: !data.cartModal });

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

    return (
        <Fragment>
            {/* Black Overlay */}
            <div
                className={`${!data.cartModal ? "hidden" : ""
                    } fixed top-0 z-30 w-full h-full bg-black opacity-50`}
            />
            {/* Cart Modal Start */}
            <section
                className={`${!data.cartModal ? "hidden" : ""
                    } fixed z-40 inset-0 flex items-start justify-end`}
            >
                <div
                    style={{ background: "#303031" }}
                    className="w-full md:w-5/12 lg:w-4/12 h-full flex flex-col justify-between"
                >
                   

                </div>

            </section>
            {/* Cart Modal End */}
        </Fragment>
    );
};

export default CartModal;
