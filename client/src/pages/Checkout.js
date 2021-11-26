import React, { useEffect, useState, Fragment } from "react";
import { useDidMountEffect } from "../auxiliary/reactUtils"
import LoadingPage from "./LoadingPage";

import OrderItems from "../components/checkout/OrderItems";
import {
    ContactInformation,
    DeliveryMethod,
    DeliveryAdress
} from "../components/checkout/CheckoutFields";
import { OrderConfirmed, ConfirmOrder } from "../components/checkout/CheckoutModals";
import { getCartTotal } from "../actions/cartActions";
import { postOrder, userPostOrder } from "../functions/orders";
import { useSelector } from "react-redux";


const deliveryCouriers = [
    { name: "Econt", id: "econt", findOffice: "https://www.econt.com/find-office" },
    { name: "Speedy", id: "speedy", findOffice: "https://www.speedy.bg/bg/speedy-offices" }
];
const deliveryMethods = [{ name: "Delivery to home", id: "home" }, { name: "Delivery to courrier office", id: "office" }];

const CheckoutStates = {
    "DELIVERY_COURIER": 1,
    "DELIVERY_METHOD": 2,
    "DELIVERY_ADDRESS": 3,
}

const Checkout = () => {

    const [checkoutState, setCheckoutState] = useState(CheckoutStates.DELIVERY_COURIER);

    const [selectedCourier, setSelectedCourier] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [deliveryAdress, setDeliveryAddress] = useState({ city: "", address: "" });
    const [contactInformation, setContactInformation] = useState({ phone: "", email: "", name: "" });

    const [methodOptions, setMethodOptions] = useState(deliveryMethods);
    const [courierOptions, setCourierOptions] = useState(deliveryCouriers);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [orderSentLoading, setOrderSentLoading] = useState(false);

    const { user, cart } = useSelector((state) => ({ ...state }));
    const { cartItems } = cart;

    //test
    useEffect(() => {
        setContactInformation({ phone: "1234", email: "test@mail.com", name: "Somename" })
        setDeliveryAddress({ city: "some sity", address: "address 2" })
    }, [])

    const onConfirmOrderClicked = async () => {

        setIsConfirmModalOpen(false);
        setOrderSentLoading(true);

        const products = cartItems.map((p) => {
            return {
                productId: p.product,
                count: p.count,
                price: p.price
            }
        });

        const deliveryInfo = {
            ...deliveryAdress,
            ...contactInformation,
            courrier: selectedCourier.id,
            method: selectedMethod.id
        }

        const totalCost = getCartTotal(products);
        let postFn = null;

        if (user === null) {

            postFn = () => postOrder(products, totalCost, deliveryInfo);
        } else {

            postFn = () => userPostOrder(products, totalCost, deliveryInfo, user.token)
        }
        try {
            let res = await postFn();
            setOrderSentLoading(false);
            //clear cart
            console.log(res);
        } catch (error) {
            alert(error);
            setOrderSentLoading(false);
        }
    }

    useDidMountEffect(() => {
        // const options = [{ "name": "Delivery to home" }, { "name": `Delivery to ${selectedCourier.name} office` }];
        setMethodOptions(prevState => {
            return prevState.map(({ name, id }) => {
                if (id === 'office') {
                    return { name: `Delivery to ${selectedCourier.name} office`, id }
                } else {
                    return { name, id }
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
            case CheckoutStates.DELIVERY_COURIER:
                if (selectedCourier === null) {
                    window.alert("please choose delivery courier");
                } else {
                    setCheckoutState(CheckoutStates.DELIVERY_METHOD)
                }
                break;
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
                    // setCheckoutState(CheckoutStates.DELIVERY_ADDRESS);
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
            case CheckoutStates.DELIVERY_METHOD:
                setCheckoutState(CheckoutStates.DELIVERY_COURIER)
                break;
        }
    }

    const deliveryAddressComponentName = () => {
        // if (!selectedMethod || !selectedCourier) {
        //     return "Delivery Address"
        // }

        if (selectedMethod.id == "office") {
            return `${selectedCourier.name} office address`
        } else {
            return "Delivery Address"
        }
    }

    const getHelperForAddressComponent = () => {

        // if (!selectedMethod || !selectedCourier) {
        //     return (
        //         <h3 className="text-gray-700 text-xl font-medium">
        //             Fill in your address and contact information to finish the order
        //         </h3>
        //     );
        // }

        if (selectedMethod.id == "office") {

            console.log(selectedCourier);
            return (
                <h4 className="text-lg text-gray-500 font-medium">
                    <div>
                        Find <a className="underline text-blue-500" href={selectedCourier.findOffice}>{selectedCourier.name} office</a>
                    </div>
                    <br />
                    Fill in the office address and your contact information to finish the order
                </h4>

            )

        } else {
            return (
                <h4 className="text-lg text-gray-500 font-medium">
                    Fill in your address and contact information to finish the order
                </h4>
            );
        }

    }

    if(orderSentLoading){
        return <LoadingPage />
    }

    return (
        <div className="container max-w-7xl mx-auto px-2">
            <ConfirmOrder
                onConfirmClicked={onConfirmOrderClicked}
                deliveryAdress={deliveryAdress}
                contactInformation={contactInformation}
                setIsOpen={setIsConfirmModalOpen}
                isOpen={isConfirmModalOpen}
            />
            <div className="container mx-auto px-6">
                <h3 className="text-gray-700 text-2xl font-medium">Checkout</h3>
                <div className="flex flex-col lg:flex-row mt-8">
                    <div className="w-full lg:w-1/2 order-2">
                        {/* <div className="flex items-center">
                            <button className="flex text-sm text-blue-500 focus:outline-none"><span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">1</span> Contacts</button>
                            <button className="flex text-sm text-gray-700 ml-8 focus:outline-none"><span className="flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2">2</span> Shipping</button>
                            <button className="flex text-sm text-gray-500 ml-8 focus:outline-none" disabled><span className="flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mr-2">3</span> Payments</button>
                        </div> */}

                        <div className=" lg:w-3/4">

                            {checkoutState === CheckoutStates.DELIVERY_ADDRESS && getHelperForAddressComponent()}

                            {checkoutState === CheckoutStates.DELIVERY_COURIER && (
                                <div>
                                    <DeliveryMethod
                                        selected={selectedCourier}
                                        setSelected={setSelectedCourier}
                                        name={"Delivery Courier"}
                                        options={courierOptions}
                                    />
                                </div>
                            )
                            }
                            {checkoutState === CheckoutStates.DELIVERY_METHOD && (
                                <div>
                                    <DeliveryMethod
                                        selected={selectedMethod}
                                        setSelected={setSelectedMethod}
                                        name={"Delivery Method"}
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
                                    <span className="mx-2">Back step</span>
                                </button>
                                <button
                                    onClick={handleNextClick}
                                    className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                                >
                                    <span>Next step</span>
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
        </div>
    )
}



export default Checkout;