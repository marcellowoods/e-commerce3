import axios from "axios";

import {
    getAuth
} from "firebase/auth";

const auth = getAuth();

const getUserId = () => auth.currentUser.accessToken;

export const userCart = async (cart, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
        { cart },
        {
            headers: {
                authtoken: getUserId(),
            },
        }
    );

export const getUserCart = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authtoken: getUserId(),
        },
    });

export const emptyUserCart = async (authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authtoken: getUserId(),
        },
    });

export const saveUserAddress = async (authtoken, address) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/address`,
        { address },
        {
            headers: {
                authtoken: getUserId(),
            },
        }
    );

export const applyCoupon = async (authtoken, coupon) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart/coupon`,
        { coupon },
        {
            headers: {
                authtoken: getUserId(),
            },
        }
    );

export const createOrder = async (stripeResponse, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/order`,
        { stripeResponse },
        {
            headers: {
                authtoken: getUserId(),
            },
        }
    );

export const getUserOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
        headers: {
            authtoken: getUserId(),
        },
    });




export const getWishlist = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
        headers: {
            authtoken: getUserId(),
        },
    });

export const removeWishlist = async (productId, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
        {},
        {
            headers: {
                authtoken: getUserId(),
            },
        }
    );

export const addToWishlist = async (productId, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/wishlist`,
        { productId },
        {
            headers: {
                authtoken: getUserId(),
            },
        }
    );

export const createCashOrderForUser = async (
    authtoken,
    COD,
    couponTrueOrFalse
) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cash-order`,
        { couponApplied: couponTrueOrFalse, COD },
        {
            headers: {
                authtoken: getUserId(),
            },
        }
    );
