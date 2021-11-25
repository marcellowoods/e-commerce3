import axios from 'axios'
import { roundToTwo } from "../auxiliary/utils"

export const addToCart = (id, count) => async (dispatch, getState) => {
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

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: "CART_REMOVE_ITEM",
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const filterCart = () => async (dispatch, getState) => {
    //remove products which are no longer available in the database

    let cartItems = getState().cart.cartItems;
    if (cartItems.length === 0) {
        return;
    }
    let cartItemsIds = cartItems.map(item => item.product);

    const { data } = await axios.get(`/api/products/updateCount/${cartItemsIds}`);
    //object {"productId": quantity}
    let productQuantities = data;

    console.log(data);

    //item.product is item.id
    cartItems.forEach(item => {
        let cartElementId = item.product;
        let desiredQuantity = item.qty;

        let productStillExists = cartElementId in productQuantities;

        if (!productStillExists) {

            dispatch(removeFromCart(cartElementId));
        } else {

            let availableQuantity = productQuantities[cartElementId];
            if (availableQuantity < desiredQuantity) {
                dispatch(removeFromCart(cartElementId));

            } else {

                //test
                // {
                //     let updatedCount = 1;
                //     let updatedItem = {...item, countInStock: updatedCount};

                //     //cart_add_item replaces it, no need for removing it first
                //     dispatch({
                //         type: CART_ADD_ITEM,
                //         payload: updatedItem,
                //     })
                // }


                if (availableQuantity !== item.countInStock) {

                    let updatedCount = availableQuantity;
                    let updatedItem = { ...item, countInStock: updatedCount };

                    //cart_add_item replaces item, no need for removing it first
                    dispatch({
                        type: "CART_ADD_ITEM",
                        payload: updatedItem,
                    })
                }
            }

        }


    });

}
