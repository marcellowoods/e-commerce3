import React, { Fragment } from "react";

import { Dialog, Transition } from '@headlessui/react'
import { useSelector } from "react-redux";
import { getCartTotal } from "../../actions/cartActions";

import { useTranslation } from 'react-i18next';
import { getTranslatedField } from "../../actions/translateActions";
import { Link } from "react-router-dom";
import { roundToTwo } from "../../auxiliary/utils";

const PRODUCT_PAGE_URL = "/product/";

const OrderConfirmed = ({ isOpen, closeModal }) => {

    const { t } = useTranslation();

    return (
        <>

            <Transition appear show={isOpen()} as={Fragment}>
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
                                    {t("order successful")}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {t("your order has been successfully submitted. We’ve sent you an email with all of the details of your order.")}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        ok
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



const ConfirmOrder = ({ isOpen, setIsOpen, deliveryAdress, contactInformation, onConfirmClicked }) => {

    const { t, i18n } = useTranslation();

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const { cart } = useSelector((state) => ({ ...state }));
    const { cartItems: products } = cart;

    const renderSize = (product, selectedSize) => {

        let text = null;

        if (product.sizeBounds) {
            let sizeText = null;
            const { upperBound, lowerBound, stepSize } = product.sizeBounds;
            if (selectedSize == lowerBound) {
                sizeText = "small";
            } else if (selectedSize == upperBound) {
                sizeText = "large";
            } else {
                sizeText = "custom";
            }

            text = t(sizeText) + " " + t("size") + "," + selectedSize + " " + t("cm.");

        } else {

            text = " " + t("size") + "," + selectedSize + " " + t("cm.");

        }


        return text;

    }

    let renderName = (product) => {

        const slug = product.slug;
        const linkString = PRODUCT_PAGE_URL + slug;
        
        const size = product.size;

        const lang = i18n.language;
        const translatedName = getTranslatedField(product, 'name', lang);

        return (
            <div className="flex flex-row">
                <Link to={linkString}>
                    <h3 className="underline">{translatedName} </h3>
                </Link>
                {size && (
                    <h3 className="italic pl-2">{renderSize(product, size)}</h3>
                )}
            </div>
        )
    }

    return (
        <>

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
                                    {t("order")}
                                </Dialog.Title>
                                <div className="mt-2">
                                    {/* <p className="text-sm text-gray-500">
                                        Your payment has been successfully submitted. We’ve sent you
                                        an email with all of the details of your order.
                                    </p> */}

                                    {products && products.map((item) => {

                                        return (
                                            <div className="flex justify-between">
                                                <div className="flex">
                                                    {renderName(item)}
                                                    <h3 className="pl-2 font-medium ">x{item.count}</h3>
                                                </div>
                                                <h3>{roundToTwo(item.price * item.count)} {" "} {t("lv.")}</h3>
                                            </div>
                                        )
                                    })}
                                    <hr />
                                    <div className=" flex justify-between">
                                        <h3>{t("total")}</h3>
                                        <h3>{getCartTotal(products)} {t('lv.')}</h3>
                                    </div>
                                    <div className="pt-6">
                                        <div className="flex">
                                            {t("deliver to")}
                                            <p className="font-medium pl-1">
                                                {contactInformation.name}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            {t("phone")}
                                            <p className="font-medium pl-1">
                                                {contactInformation.phone}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            {t("email")}
                                            <p className="font-medium pl-1">
                                                {contactInformation.email}
                                            </p>
                                        </div>


                                        <div className="flex">
                                            {t("address")}
                                            <div className="font-medium pl-1">
                                                {deliveryAdress.city}
                                                {" "}
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
                                            {t("cancel")}
                                        </button>
                                        <div className="pl-2">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                onClick={() => {
                                                    onConfirmClicked();
                                                    closeModal();
                                                }}
                                            >
                                                {t("confirm")}
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

export { OrderConfirmed, ConfirmOrder }