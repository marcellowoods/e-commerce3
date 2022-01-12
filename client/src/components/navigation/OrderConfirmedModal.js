import React, { Fragment } from "react";
import { OrderConfirmed } from "../checkout/CheckoutModals";

import { useDispatch, useSelector } from "react-redux";

const OrderConfirmedModal = () => {

    let dispatch = useDispatch();

    const { orderSuccessModal } = useSelector((state) => ({ ...state }));

    const isModalOpen = () => orderSuccessModal == true;

    const closeModal = () => {
        dispatch({ type: "ORDER_SUCCESS_MODAL_TOGGLE", payload: false });
    }

    return (
        <OrderConfirmed
            isOpen={isModalOpen}
            closeModal={closeModal}
        />
    )
}

export default OrderConfirmedModal;