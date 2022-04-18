import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { useDidMountEffect, useAsync } from "../auxiliary/reactUtils"
import LoadingPage from "./LoadingPage";

import OrderItems from "../components/checkout/OrderItems";
import {
    ContactInformation,
    DeliveryMethod,
    DeliveryAdress
} from "../components/checkout/CheckoutFields";
import { ConfirmOrder } from "../components/checkout/CheckoutModals";
import { getCartTotal, clearCart, getFilteredCartData } from "../actions/cartActions";
import { postOrder, userPostOrder } from "../functions/orders";

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from "react-redux";
import { getOrderOptions } from "../functions/orders";

// const selectedCourier = {
//     name: "Econt",
//     id: "econt",
//     findOffice: "https://www.econt.com/find-office",
//     shippingPrice: {
//         home: 7,
//         office: 5
//     }
// };
const deliveryMethods = [{ name: "Delivery to home", id: "home" }, { name: "Delivery to courrier office", id: "office" }];

const CheckoutStates = {
    "DELIVERY_METHOD": 1,
    "DELIVERY_ADDRESS": 2,
}

const Checkout = () => {

    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    let dispatch = useDispatch();

    const [checkoutState, setCheckoutState] = useState(CheckoutStates.DELIVERY_METHOD);

    const [selectedCourier, setSelectedCourier] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [deliveryAdress, setDeliveryAddress] = useState({ city: "", address: "" });
    const [contactInformation, setContactInformation] = useState({ phone: "", email: "", name: "" });

    const [methodOptions, setMethodOptions] = useState(deliveryMethods);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [orderSentLoading, setOrderSentLoading] = useState(false);

    const { user, cart } = useSelector((state) => ({ ...state }));
    const { cartItems } = cart;

    //test
    //remove from production!
    // useEffect(() => {
    //     setContactInformation({ phone: "1234", email: "test@mail.com", name: "Somename" })
    //     setDeliveryAddress({ city: "some sity", address: "address 2" })
    // }, [])

    useAsync(
        async () => getOrderOptions(),
        (data) => setSelectedCourier(data.selectedCourier),
        null,
        []
    );

    const onConfirmOrderClicked = async () => {

        setIsConfirmModalOpen(false);
        setOrderSentLoading(true);

        const products = getFilteredCartData(cartItems);

        const deliveryInfo = {
            ...deliveryAdress,
            ...contactInformation,
            courrier: selectedCourier.id,
            method: selectedMethod.id,
            lang: i18n.language
        }

        const totalCost = getCartTotal(products);
        let postFn = null;

        if (user === null) {

            postFn = () => postOrder(products, totalCost, deliveryInfo);
        } else {

            const userToken = await user.getToken();
            postFn = () => userPostOrder(products, totalCost, deliveryInfo, userToken)
        }
        try {
            //clear cart
            let res = await postFn();
            clearCart(dispatch);
            dispatch({ type: "ORDER_SUCCESS_MODAL_TOGGLE", payload: true });
            navigate("/");

        } catch (error) {
            alert(error);
            setOrderSentLoading(false);
        }
    }



    useDidMountEffect(() => {

        setMethodOptions(prevState => {
            return prevState.map(({ name, id }) => {
                if (id === 'office') {

                    const text = t('delivery to office', { name: selectedCourier.name });
                    const shippingPrice = selectedCourier.shippingPrice.office + t("lv.");
                    return { name: text, id, shippingPrice }

                } else {

                    const shippingPrice = selectedCourier.shippingPrice.home + t("lv.");
                    const text = t('delivery to home');
                    return { name: text, id, shippingPrice }

                }
            })
        });
    }, [selectedCourier]);


    const isFieldsMissing = () => {

        let missingFields = [];

        for (let key in deliveryAdress) {
            if (deliveryAdress[key] === "") {
                missingFields.push(key);
            }
        }

        for (let key in contactInformation) {
            if (contactInformation[key] === "") {
                missingFields.push(key);
            }
        }

        if (missingFields.length) {
            return missingFields;
        }

        return false;
    }

    const handleNextClick = () => {

        switch (checkoutState) {
            case CheckoutStates.DELIVERY_METHOD:
                if (selectedMethod === null) {
                    window.alert("please choose delivery method");
                } else {
                    setCheckoutState(CheckoutStates.DELIVERY_ADDRESS)
                }
                break;
            case CheckoutStates.DELIVERY_ADDRESS:
                const missingFields = isFieldsMissing();
                if (missingFields) {
                    window.alert("missing " + missingFields.join(','));
                } else {

                    setIsConfirmModalOpen(true);
                }
                break;
        }
    }

    const handlePrevClick = () => {

        switch (checkoutState) {
            case CheckoutStates.DELIVERY_ADDRESS:
                setCheckoutState(CheckoutStates.DELIVERY_METHOD)
                break;
        }
    }

    const deliveryAddressComponentName = () => {

        // if (!selectedMethod || !selectedCourier) {
        //     return "Delivery Address"
        // }

        if (selectedMethod.id == "office") {
            const text = t('office address', { name: selectedCourier.name });
            return text;
        } else {
            const text = t("delivery address");
            return text;
        }
    }

    const getHelperForAddressComponent = () => {

        if (selectedMethod.id == "office") {

            return (
                <h4 className="text-lg text-gray-500 font-medium">
                    <div>
                        {t("find")} <a className="underline text-blue-500" href={selectedCourier.findOffice}>{selectedCourier.name} {t("office")} </a>
                    </div>
                    <br />
                    {t("fill in the office address and your contact information to finish the order")}
                </h4>

            )

        } else {
            return (
                <h4 className="text-lg text-gray-500 font-medium">
                    {t("fill in your address and contact information to finish the order")}
                </h4>
            );
        }

    }

    if (orderSentLoading | !selectedCourier) {
        return <LoadingPage />
    }

    return (

        <div className="pt-6 sm:px-12">
            <ConfirmOrder
                onConfirmClicked={onConfirmOrderClicked}
                deliveryAdress={deliveryAdress}
                contactInformation={contactInformation}
                setIsOpen={setIsConfirmModalOpen}
                isOpen={isConfirmModalOpen}
            />
            <h3 className="text-gray-700 text-2xl font-medium">{t('checkout')}</h3>
            <div className="flex flex-col lg:flex-row mt-8">
                <div className="w-full lg:w-1/2 order-2">
                    {/* <div className="flex items-center">
                            <button className="flex text-sm text-blue-500 focus:outline-none"><span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">1</span> Contacts</button>
                            <button className="flex text-sm text-gray-700 ml-8 focus:outline-none"><span className="flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2">2</span> Shipping</button>
                            <button className="flex text-sm text-gray-500 ml-8 focus:outline-none" disabled><span className="flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mr-2">3</span> Payments</button>
                        </div> */}

                    <div className=" lg:w-3/4">

                        {checkoutState === CheckoutStates.DELIVERY_ADDRESS && getHelperForAddressComponent()}


                        {checkoutState === CheckoutStates.DELIVERY_METHOD && (
                            <div>
                                <DeliveryMethod
                                    selected={selectedMethod}
                                    setSelected={setSelectedMethod}
                                    name={t('delivery method')}
                                    options={methodOptions}
                                />
                            </div>
                        )
                        }
                        {checkoutState === CheckoutStates.DELIVERY_ADDRESS && (
                            <div>
                                <DeliveryAdress
                                    name={deliveryAddressComponentName()}
                                    deliveryAdress={deliveryAdress}
                                    setDeliveryAddress={setDeliveryAddress}
                                />
                                <ContactInformation
                                    contactInformation={contactInformation}
                                    setContactInformation={setContactInformation}
                                />

                            </div>
                        )
                        }

                        {/* <DeliveryDate /> */}
                        <div className="flex items-center justify-between mt-8">
                            <button
                                onClick={handlePrevClick}
                                className="flex items-center text-gray-700 text-sm font-medium rounded hover:underline focus:outline-none"
                            >
                                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                                <span className="mx-2">{t("back")}</span>
                            </button>
                            <button
                                onClick={handleNextClick}
                                className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                            >
                                <span>{t("next")}</span>
                                <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-8 flex-shrink-0 order-1 lg:w-1/2 lg:mb-0 lg:order-2">
                    <div className="flex justify-center lg:justify-end">
                        <OrderItems />
                    </div>
                </div>
            </div>
        </div>

    )
}



export default Checkout;