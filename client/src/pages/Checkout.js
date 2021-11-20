import React, { useEffect, useState, Fragment } from "react";

import { Dialog, Transition } from '@headlessui/react'

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useDidMountEffect } from "../auxiliary/reactUtils"
import Cart from "../components/cart/Cart"
import { getCartTotal } from "../actions/cartActions";



// const Checkout = () => {
//     return (
//         <div className="container max-w-7xl mx-auto px-2">
//             <div className="container mx-auto px-6">
//                 <h3 className="text-gray-700 text-2xl font-medium">Checkout</h3>
//                 <div className="flex flex-col lg:flex-row mt-8">
//                     <div className="w-full lg:w-1/2 order-2">
//                         <div className="flex items-center">
//                             <button className="flex text-sm text-blue-500 focus:outline-none"><span className="flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2">1</span> Contacts</button>
//                             <button className="flex text-sm text-gray-700 ml-8 focus:outline-none"><span className="flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2">2</span> Shipping</button>
//                             <button className="flex text-sm text-gray-500 ml-8 focus:outline-none" disabled><span className="flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mr-2">3</span> Payments</button>
//                         </div>
//                         <form className="mt-8 lg:w-3/4">
//                             <div>
//                                 <h4 className="text-sm text-gray-500 font-medium">Delivery method</h4>
//                                 <div className="mt-6">
//                                     <button className="flex items-center justify-between w-full bg-white rounded-md border-2 border-blue-500 p-4 focus:outline-none">
//                                         <label className="flex items-center">
//                                             <input type="radio" className="form-radio h-5 w-5 text-blue-600" checked /><span className ="ml-2 text-sm text-gray-700">MS Delivery</span>
//                                         </label>

//                                         <span className="text-gray-600 text-sm">$18</span>
//                                     </button>
//                                     <button className="mt-6 flex items-center justify-between w-full bg-white rounded-md border p-4 focus:outline-none">
//                                         <label className="flex items-center">
//                                             <input type="radio" className="form-radio h-5 w-5 text-blue-600" /><span className ="ml-2 text-sm text-gray-700">DC Delivery</span>
//                                         </label>

//                                         <span className="text-gray-600 text-sm">$26</span>
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="mt-8">
//                                 <h4 className="text-sm text-gray-500 font-medium">Delivery address</h4>
//                                 <div className="mt-6 flex">
//                                     <label className="block w-3/12">
//                                         <select className="form-select text-gray-700 mt-1 block w-full">
//                                             <option>NY</option>
//                                             <option>DC</option>
//                                             <option>MH</option>
//                                             <option>MD</option>
//                                         </select>
//                                     </label>
//                                     <label className="block flex-1 ml-3">
//                                         <input type="text" className="form-input mt-1 block w-full text-gray-700" placeholder="Address" />
//                                     </label>
//                                 </div>
//                             </div>
//                             <div className="mt-8">
//                                 <h4 className="text-sm text-gray-500 font-medium">Date</h4>
//                                 <div className="mt-6 flex">
//                                     <label className="block flex-1">
//                                         <input type="date" className="form-input mt-1 block w-full text-gray-700" placeholder="Date" />
//                                     </label>
//                                 </div>
//                             </div>
//                             <div className="flex items-center justify-between mt-8">
//                                 <button className="flex items-center text-gray-700 text-sm font-medium rounded hover:underline focus:outline-none">
//                                     <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
//                                     <span className="mx-2">Back step</span>
//                                 </button>
//                                 <button className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
//                                     <span>Payment</span>
//                                     <svg className="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                     <div className="w-full mb-8 flex-shrink-0 order-1 lg:w-1/2 lg:mb-0 lg:order-2">
//                         <div className="flex justify-center lg:justify-end">
//                             <div className="border rounded-md max-w-md w-full px-4 py-3">
//                                 <div className="flex items-center justify-between">
//                                     <h3 className="text-gray-700 font-medium">Order total (2)</h3>
//                                     <span className="text-gray-600 text-sm">Edit</span>
//                                 </div>
//                                 <div className="flex justify-between mt-6">
//                                     <div className="flex">
//                                         <img className="h-20 w-20 object-cover rounded" src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80" alt=""/>
//                                         <div className ="mx-3">
//                                         <h3 className ="text-sm text-gray-600">Mac Book Pro</h3>
//                                         <div className ="flex items-center mt-2">
//                                         <button className ="text-gray-500 focus:outline-none focus:text-gray-600">
//                                         <svg className ="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//                                         </button>
//                                         <span className ="text-gray-700 mx-2">2</span>
//                                         <button className ="text-gray-500 focus:outline-none focus:text-gray-600">
//                                         <svg className ="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//                                         </button>
//                                         </div>
//                                         </div>
//                                     </div>
//                                     <span className="text-gray-600">20$</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

const OrderItems = () => {

    const { cart } = useSelector((state) => ({ ...state }));
    const { cartItems: products } = cart;
    const history = useHistory();

    useEffect(() => {

        if (products.length === 0) {
            history.push("/")
        }
    }, [products])

    return (
        <Cart products={products} />
    )
}

const deliveryCouriers = [
    { name: "Econt", id: "econt", findOffice: "https://www.econt.com/find-office" },
    { name: "Speedy", id: "speedy", findOffice: "https://www.speedy.bg/bg/speedy-offices" }
];
const deliveryMethods = [{ name: "Delivery to home", id: "home" }, { name: "Delivery to courrier office", id: "office" }];

const DeliveryMethod = ({ name, options, selected, setSelected }) => {

    const onChangeValue = (event) => {

        const idSelected = event.target.value;
        console.log(idSelected);
        if (idSelected) {
            setSelected(options.find(({ id }) => idSelected === id));
        }

    }

    const renderMethod = (name, id) => {
        return (
            <button key={id} value={id} onClick={onChangeValue} className="mt-6 cursor-pointer flex items-center justify-between w-full bg-white rounded-md border p-4 focus:outline-none">
                <label className="flex items-center">
                    <input
                        checked={selected ? selected.name === name : false}
                        type="radio"
                        value={id}
                        className="form-radio cursor-pointer h-5 w-5 text-blue-600"
                        onChange={onChangeValue}
                    />
                    <span className="ml-2 cursor-pointer text-sm text-gray-700">{name}</span>
                </label>

                {/* <span className="text-gray-600 text-sm">$26</span> */}
            </button>
        )
    }

    return (
        <div>
            <h4 className="text-sm text-gray-500 font-medium">{name}</h4>
            <div className="mt-6">
                {options.map(({ name, id }) => renderMethod(name, id))}
            </div>
        </div>
    )
}


const DeliveryAdress = ({ name, deliveryAdress, setDeliveryAddress }) => {

    const handleAdressChange = (event) => {
        const value = event.target.value;
        setDeliveryAddress((prev) => {
            return { ...prev, address: value }
        })
    }

    const handleCityChange = (event) => {
        const value = event.target.value;
        setDeliveryAddress((prev) => {
            return { ...prev, city: value }
        })
    }

    return (
        <div className="mt-8">
            <h4 className="text-sm text-gray-500 font-medium">{name}</h4>
            <div className="mt-4 flex">
                <label className="block w-3/12">
                    <input
                        onChange={handleCityChange}
                        value={deliveryAdress.city}
                        type="text"
                        placeholder="City"
                        className="form-select text-gray-700 mt-1 block w-full"
                    />
                </label>
                <label className="block flex-1 ml-3">
                    <input
                        onChange={handleAdressChange}
                        value={deliveryAdress.address}
                        type="text"
                        className="form-input mt-1 block w-full text-gray-700"
                        placeholder="Address"
                    />
                </label>
            </div>
        </div>
    )
}

const ContactInformation = ({ contactInformation, setContactInformation }) => {

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setContactInformation((prev) => {
            return { ...prev, email: value }
        })
    }

    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setContactInformation((prev) => {
            return { ...prev, phone: value }
        })
    }

    const handleNameChange = (event) => {
        const value = event.target.value;
        setContactInformation((prev) => {
            return { ...prev, name: value }
        })
    }

    return (
        <div className="mt-8">
            <h4 className="text-sm text-gray-500 font-medium">Contact information</h4>
            <label className="block w-3/12">
                <input
                    onChange={handleNameChange}
                    value={contactInformation.name}
                    type="text"
                    placeholder="name"
                    className="form-select text-gray-700 mt-1 block w-full"
                />
            </label>
            <div className="mt-4 flex">
                <label className="block w-3/12">
                    <input
                        onChange={handlePhoneChange}
                        value={contactInformation.phone}
                        type="tel"
                        placeholder="phone"
                        className="form-select text-gray-700 mt-1 block w-full"
                    />
                </label>
                <label className="block flex-1 ml-3">
                    <input
                        onChange={handleEmailChange}
                        value={contactInformation.email}
                        type="email"
                        className="form-input mt-1 block w-full text-gray-700"
                        placeholder="email"
                    />
                </label>
            </div>

        </div>
    )
}



const DeliveryDate = () => {

    const [deliveryDate, setDeliveryDate] = useState(null);

    const onChangeValue = (event) => {
        const d = event.target.value;
        setDeliveryDate(d)
    }

    return (
        <div className="mt-8">
            <h4 className="text-sm text-gray-500 font-medium">Date</h4>
            <div className="mt-6 flex">
                <label className="block flex-1">
                    <input
                        onChange={onChangeValue}
                        value={deliveryDate}
                        type="date"
                        className="form-input mt-1 block w-full text-gray-700"
                        placeholder="Date" />
                </label>
            </div>
        </div>
    )
}

const CheckoutStates = {
    "DELIVERY_COURIER": 1,
    "DELIVERY_METHOD": 2,
    "DELIVERY_ADDRESS": 3,
}

const OrderConfirmed = ({ isOpen, setIsOpen }) => {
    // let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            {/* <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Open dialog
                </button>
            </div> */}

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Payment successful
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Your payment has been successfully submitted. We’ve sent you
                                        an email with all of the details of your order.
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Got it, thanks!
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

const ConfirmOrder = ({ isOpen, setIsOpen, deliveryAdress, contactInformation }) => {
    // let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const { cart } = useSelector((state) => ({ ...state }));
    const { cartItems: products } = cart;

    return (
        <>
            {/* <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Open dialog
                </button>
            </div> */}

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Order
                                </Dialog.Title>
                                <div className="mt-2">
                                    {/* <p className="text-sm text-gray-500">
                                        Your payment has been successfully submitted. We’ve sent you
                                        an email with all of the details of your order.
                                    </p> */}
                                    {products.map((item, index) => (
                                        <div className="flex justify-between">
                                            <div className="flex">
                                                <h3>{item.name}</h3>
                                                <h3 className="pl-2 text-blue-700">x{item.qty}</h3>
                                            </div>
                                            <h3>{item.price}$</h3>
                                        </div>
                                        // <CartItem
                                        //     key={index}
                                        //     productId={item.product}
                                        //     slug={item.slug}
                                        //     price={item.price}
                                        //     name={item.name}
                                        //     quantity={item.qty}
                                        //     imageLink={item.image}
                                        //     countInStock={item.countInStock}
                                        // />))
                                    ))
                                    }
                                    <hr />
                                    <div className="flex justify-between">
                                        <h3>total</h3>
                                        <h3>{getCartTotal(products)}$</h3>
                                    </div>
                                    <div className="pt-6">
                                        Deliver to
                                        name
                                        phone
                                        <div className="flex">
                                            {deliveryAdress.city}
                                            <div className="pl-2">
                                                {deliveryAdress.address}
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className="mt-4 float-right">
                                    <div className="flex">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <div className="pl-2">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                onClick={closeModal}
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
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
    }, [selectedCourier])

    const handleNextClick = () => {

        switch (checkoutState) {
            case CheckoutStates.DELIVERY_COURIER:
                if (selectedCourier === null) {

                } else {
                    setCheckoutState(CheckoutStates.DELIVERY_METHOD)
                }
                break;
            case CheckoutStates.DELIVERY_METHOD:
                if (selectedMethod === null) {

                } else {
                    setCheckoutState(CheckoutStates.DELIVERY_ADDRESS)
                }
                break;
            case CheckoutStates.DELIVERY_ADDRESS:
                if (selectedMethod === null) {

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

    return (
        <div className="container max-w-7xl mx-auto px-2">
            <ConfirmOrder
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
                            <div className="border rounded-md max-w-md w-full px-4 py-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-gray-700 font-medium">Order</h3>
                                    {/* <span className="text-gray-600 text-sm">Edit</span> */}
                                </div>
                                <OrderItems />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// const Checkout = () => {

//     const [categories, setCategories] = useState([]);

//     // if(isLoading){
//     //     return (
//     //         <LoadingPage />
//     //     )
//     // }

//     return (
//         <div classNameName="container max-w-7xl mx-auto px-2">
//             Checkout
//         </div>
//     )
// }

export default Checkout;