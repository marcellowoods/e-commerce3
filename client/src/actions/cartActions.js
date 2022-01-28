import axios from 'axios'
import { roundToTwo, deepEqual } from "../auxiliary/utils";

export const decreaseItemQty = (cartObj) => async (dispatch, getState) => {
    // console.log("add to cart");

    const id = cartObj.product;

    const cart = getState().cart.cartItems;

    const compareProducts = (cartObjFromArray) => {

        return deepEqual(cartObj, cartObjFromArray);
    }

    const existItem = cart.find(compareProducts);

    if (!existItem) {
        return;
    }

    const { data } = await axios.get(`${process.env.REACT_APP_API}/product-by-id/${id}`);

    let productToAdd = {
        slug: data.slug,
        product: data._id,
        name: data.name,
        image: data.images[0],
        price: data.price,
        countInStock: data.quantity,
        count: existItem.count - 1,
        sizeBounds: data.size,
        size: existItem.size,
        translations: data.translations
    };

    if (productToAdd.count >= 1 && productToAdd.count <= productToAdd.countInStock) {

        dispatch({
            type: "CART_REMOVE_ITEM",
            payload: cartObj,
        })


        dispatch({
            type: "CART_ADD_ITEM",
            payload: productToAdd
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    } else {
        dispatch(removeFromCart(cartObj));
        
    }

}

export const increaseItemQty = (cartObj) => async (dispatch, getState) => {

    const id = cartObj.product;
    // console.log("add to cart");

    const cart = getState().cart.cartItems;

    const compareProducts = (cartObjFromArray) => {

        return deepEqual(cartObj, cartObjFromArray);
    }

    const existItem = cart.find(compareProducts);

    if (!existItem) {
        return;
    }

    const { data } = await axios.get(`${process.env.REACT_APP_API}/product-by-id/${id}`);

    console.log(data);

    let productToAdd = {
        slug: data.slug,
        product: data._id,
        name: data.name,
        image: data.images[0],
        price: data.price,
        countInStock: data.quantity,
        count: existItem.count + 1,
        sizeBounds: data.size,
        size: existItem.size,
        translations: data.translations
    };

    if (productToAdd.count <= productToAdd.countInStock) {

        dispatch({
            type: "CART_REMOVE_ITEM",
            payload: cartObj,
        })


        dispatch({
            type: "CART_ADD_ITEM",
            payload: productToAdd
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    } else {
        window.alert("not enough quantity in stock");
    }


}

export const addToCart = (id, size) => async (dispatch, getState) => {
    // console.log("add to cart");
    const { data } = await axios.get(`${process.env.REACT_APP_API}/product-by-id/${id}`);

    let productToAdd = {
        slug: data.slug,
        product: data._id,
        name: data.name,
        image: data.images[0],
        price: data.price,
        countInStock: data.quantity,
        count: 1,
        sizeBounds: data.size,
        size: size,
        translations: data.translations
    };

    const cart = getState().cart.cartItems;

    const compareProducts = (cartProduct) => {

        return cartProduct.product == id && cartProduct.size == size;
    }

    const existItem = cart.find(compareProducts);

    if (existItem) {
        productToAdd.count += existItem.count;
    }

    if (productToAdd.count <= productToAdd.countInStock) {

        if (existItem) {
            dispatch({
                type: "CART_REMOVE_ITEM",
                payload: existItem,
            })
        }

        dispatch({
            type: "CART_ADD_ITEM",
            payload: productToAdd
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    } else {
        window.alert("not enough quantity in stock");
    }


}

export const getCartTotal = (cartItems) => {

    const totalPrice = cartItems.reduce((total, product) => {
        return total + (roundToTwo(product.price) * product.count);
    }, 0);

    return roundToTwo(totalPrice);
}

export const clearCart = (dispatch) => {
    localStorage.setItem('cartItems', []);
    dispatch({ type: "CART_CLEAR" });
}

export const removeFromCart = (cartObj) => (dispatch, getState) => {

    dispatch({
        type: "CART_REMOVE_ITEM",
        payload: cartObj,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const filterCart = () => async (dispatch, getState) => {
    //remove products which are no longer available in the database

    // console.log("cart action");

    // let cartItems = getState().cart.cartItems;
    // if (cartItems.length === 0) {
    //     return;
    // }
    // let cartItemsSlugs = cartItems.map(item => item.slug);

    // const { data: products } = await axios.get(`/api/products/list-by-slugs/${cartItemsSlugs}`);

    // console.log(products);

    // //item.product is item.id
    // cartItems.forEach(item => {
    //     let cartElementId = item.product;
    //     let desiredQuantity = item.count;

    //     let product = products.find(({ _id }) => _id == cartElementId);

    //     if (!product) {
    //         console.log("no product found")

    //         dispatch(removeFromCart(item));
    //     } else {

    //         let availableQuantity = product.quantity;

    //         //no desired quantity, remove product from user cart
    //         if (availableQuantity < desiredQuantity) {
    //             dispatch(removeFromCart(item));
    //             console.log("no product quantity")

    //             //price has updated, remove product from user cart
    //         } else if (product.price !== item.price) {
    //             console.log("no product $")
    //             dispatch(removeFromCart(item));

    //         } else if (availableQuantity !== item.countInStock) {

    //             let updatedCount = availableQuantity;
    //             let updatedItem = { ...item, countInStock: updatedCount };

    //             dispatch({
    //                 type: "CART_ADD_ITEM",
    //                 payload: updatedItem,
    //             })
    //         }

    //     }

    // });

}
