import React, { Fragment, useContext, useEffect, useState } from "react";
import { getItemDeleteIcon } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { increaseItemQty, decreaseItemQty, removeFromCart } from "../../actions/cartActions";
import { useTranslation } from 'react-i18next';

const CartItem = ({
    cartItemObj,
    price,
    productId,
    name,
    quantity,
    countInStock,
    imageLink,
    size
}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const increaseQty = () => {
        dispatch(increaseItemQty(cartItemObj));
        
    }

    const removeItem = () => {
        dispatch(removeFromCart(cartItemObj));
    }

    const decreateQty = () => {
        dispatch(decreaseItemQty(cartItemObj));
    }

    const renderSize = () => {
 
        if(size !== null){
            const textSize = t('size');
            const textCm = t('cm.');
            return "(" + textSize + " " + size + textCm + ")";
        }
        return ""
    }

    return (
        <div className="flex justify-between mt-6">
            <div className="flex">
                <img className="h-20 w-20 object-cover rounded" src={imageLink} alt="" />
                <div className="mx-3">
                    <h3 className="text-sm text-gray-600">{name} {renderSize()}</h3>
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
            <span className="text-gray-600">{price}</span>
        </div>
    )
}

export default CartItem;