import axios from 'axios'
import { roundToTwo } from "../auxiliary/utils"

export const addToCart = (id, size, count) => async (dispatch, getState) => {
    // console.log("add to cart");
    const { data } = await axios.get(`${process.env.REACT_APP_API}/product/${id}`);

    dispatch({
        type: "CART_ADD_ITEM",
        payload: {
            slug: data.slug,
            product: data._id,
            name: data.name,
            image: data.images[0],
            price: data.price,
            countInStock: data.quantity,
            count: count,
            sizeBounds: data.size,
            size: size,
            translations: data.translations
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
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

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: "CART_REMOVE_ITEM",
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const filterCart = () => async (dispatch, getState) => {
    //remove products which are no longer available in the database

    console.log("cart action");

    let cartItems = getState().cart.cartItems;
    if (cartItems.length === 0) {
        return;
    }
    let cartItemsSlugs = cartItems.map(item => item.slug);

    const { data: products } = await axios.get(`/api/products/list-by-slugs/${cartItemsSlugs}`);

    console.log(products);

    //item.product is item.id
    cartItems.forEach(item => {
        let cartElementId = item.product;
        let desiredQuantity = item.count;

        let product = products.find(({ _id }) => _id == cartElementId);

        if (!product) {
            console.log("no product found")

            dispatch(removeFromCart(cartElementId));
        } else {

            let availableQuantity = product.quantity;

            //no desired quantity, remove product from user cart
            if (availableQuantity < desiredQuantity) {
                dispatch(removeFromCart(cartElementId));
                console.log("no product quantity")

                //price has updated, remove product from user cart
            } else if (product.price !== item.price) {
                console.log("no product $")
                dispatch(removeFromCart(cartElementId));

            } else if (availableQuantity !== item.countInStock) {

                let updatedCount = availableQuantity;
                let updatedItem = { ...item, countInStock: updatedCount };

                dispatch({
                    type: "CART_ADD_ITEM",
                    payload: updatedItem,
                })
            }

        }

    });

}
