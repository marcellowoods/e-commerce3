import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

//https://github.com/AyaBellazreg/React-Shopping-Cart/tree/master/Shopping-Cart/src/components
//https://medium.com/@ayabellazreg/make-a-simple-shopping-cart-app-using-react-redux-part-2-88117cf1c069

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const filterCart = () => async (dispatch, getState) => {
    //remove products which are no longer available in the database

    let cartItems = getState().cart.cartItems;
    if(cartItems.length === 0){
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
        
        if(!productStillExists){

            dispatch(removeFromCart(cartElementId));
        }else{

            let availableQuantity = productQuantities[cartElementId];
            if(availableQuantity < desiredQuantity){
                dispatch(removeFromCart(cartElementId));

            }else{

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
   

                if(availableQuantity !== item.countInStock){

                    let updatedCount = availableQuantity;
                    let updatedItem = {...item, countInStock: updatedCount};
    
                    //cart_add_item replaces item, no need for removing it first
                    dispatch({
                        type: CART_ADD_ITEM,
                        payload: updatedItem,
                    })
                }
            }

        }

        
    });

}
