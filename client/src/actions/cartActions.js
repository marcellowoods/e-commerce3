import axios from 'axios'
import { roundToTwo, deepEqual } from "../auxiliary/utils";

const getDesiredItemQantity = (itemId, cartItems) => {

    const filteredItems = cartItems.filter((item) => item.product == itemId);
    const countSum = filteredItems.reduce((sum, item) => item.count + sum, 0);

    return countSum;
}

const createCartItemFromProduct = (desiredSize, desiredCount, productData) => {

    const item = {
        slug: productData.slug,
        product: productData._id,
        name: productData.name,
        image: productData.images[0],
        price: productData.price,
        countInStock: productData.quantity,
        count: desiredCount,
        sizeBounds: productData.size,
        size: desiredSize,
        translations: productData.translations
    };

    return item;

}

const isStockEnough = (itemId, countToAdd, quantityInStock, cartItems) => {

    const desiredItemQuantity = getDesiredItemQantity(itemId, cartItems);

    return (desiredItemQuantity + countToAdd) <= quantityInStock;

}

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

    const count = existItem.count - 1;

    const productToAdd = createCartItemFromProduct(existItem.size, count, data);

    const hasQuantity = isStockEnough(id, -1, productToAdd.countInStock, cart);

    if (productToAdd.count >= 1 && hasQuantity) {

        const replaceItem = {
            newItem: productToAdd,
            itemToBeReplaced: cartObj
        }

        dispatch({
            type: "CART_REPLACE_ITEM",
            payload: replaceItem,
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

    const count = existItem.count + 1;

    const productToAdd = createCartItemFromProduct(existItem.size, count, data);

    const hasQuantity = isStockEnough(id, 1, productToAdd.countInStock, cart);

    if (hasQuantity) {

        const replaceItem = {
            newItem: productToAdd,
            itemToBeReplaced: cartObj
        }

        dispatch({
            type: "CART_REPLACE_ITEM",
            payload: replaceItem,
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    } else {
        window.alert("not enough quantity in stock");
    }


}

export const addToCart = (id, size) => async (dispatch, getState) => {
    // console.log("add to cart");
    const { data } = await axios.get(`${process.env.REACT_APP_API}/product-by-id/${id}`);

    const count = 1;

    const productToAdd = createCartItemFromProduct(size, count, data);

    const cart = getState().cart.cartItems;

    const compareProducts = (cartProduct) => {

        return cartProduct.product == id && cartProduct.size == size;
    }

    const existItem = cart.find(compareProducts);

    if (existItem) {
        productToAdd.count += existItem.count;
    }

    const hasQuantity = isStockEnough(id, 1, productToAdd.countInStock, cart);

    if (hasQuantity) {

        if (existItem) {
            const replaceItem = {
                newItem: productToAdd,
                itemToBeReplaced: existItem
            }

            dispatch({
                type: "CART_REPLACE_ITEM",
                payload: replaceItem,
            })
        }else{

            dispatch({
                type: "CART_ADD_ITEM",
                payload: productToAdd
            })

        }

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

    //update cart with latest products in database

    let cartItems = getState().cart.cartItems;
    if (cartItems.length === 0) {
        return;
    }

    let cartItemsSlugs = cartItems.map(item => item.slug);

    const { data: productData } = await axios.get(`/api/products/list-by-slugs/${cartItemsSlugs}`);

    const newCartItems = cartItems.map((cartItem) => {

        const newProductData = productData.find(data => cartItem.product == data._id);
        const size = cartItem.size ? cartItem.size : null;
        const count = cartItem.count;

        const productToAdd = createCartItemFromProduct(size, count, newProductData);

        return productToAdd;
    });

    const filteredNewItems = newCartItems.filter((item) => {

        const hasQuantity = isStockEnough(item.product, 0, item.countInStock, newCartItems);

        return hasQuantity;
    })

    clearCart(dispatch);

    //item.product is item.id
    filteredNewItems.forEach(productToAdd => {

        dispatch({
            type: "CART_ADD_ITEM",
            payload: productToAdd
        })

    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}
