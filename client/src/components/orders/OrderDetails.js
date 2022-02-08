import React, { Fragment } from "react";

import { Dialog, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";
import { getTranslatedField } from "../../actions/translateActions";

import { useTranslation } from 'react-i18next';


const PRODUCT_PAGE_URL = "/product/"

const OrderDetails = ({ isOpen, orderStatus, orderId, products, totalCost, setIsOpen, deliveryInfo }) => {
    // let [isOpen, setIsOpen] = useState(true)

    const { t, i18n } = useTranslation();

    const { method, city, courrier, address, phone, email, name } = deliveryInfo;

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const renderSize = (selectedSize) => {

        const { sizeText, sizeValue } = selectedSize;

        let text = t(sizeText) + " " + t("size") + "," + sizeValue + " " + t("cm.");;

        return text;

    }

    let renderName = (product, name, count, selectedSize) => {

        if (product == null) {
            return (
                <div className="">
                    <div className="flex">
                        <h3>{name}</h3>
                        <h3 className="pl-2 font-medium ">x{count}</h3>
                    </div>
                    {selectedSize && (
                        <h3 className="italic">{renderSize(selectedSize)}</h3>
                    )}
                </div>
            )
        }

        const slug = product.slug;
        const linkString = PRODUCT_PAGE_URL + slug;
        const lang = i18n.language;
        const translatedName = getTranslatedField(product, 'name', lang);

        return (
            <div className="">
                <div className="flex">
                    <Link to={linkString}>
                        <h3 className="underline">{translatedName} </h3>
                    </Link>
                    <h3 className="pl-2 font-medium ">x{count}</h3>
                </div>
                {selectedSize && (
                    <h3 className="italic ">{renderSize(selectedSize)}</h3>
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
                                    <div>
                                        {t("order")}
                                        {" " + orderId}
                                    </div>
                                    <div>
                                        {t("status")}
                                        {" " + t(orderStatus)}
                                    </div>
                                </Dialog.Title>
                                <div className="mt-6">
                                    {/* <p className="text-sm text-gray-500">
                                        Your payment has been successfully submitted. We’ve sent you
                                        an email with all of the details of your order.
                                    </p> */}
                                    {products.map((item, index) => (
                                        <div className="flex justify-between items-center">
                                            <div className="flex pt-2">
                                                {renderName(item.product, item.name, item.selectedCount, item.selectedSize)}
                                            </div>
                                            <h3>{item.priceTimesCount} {" "} {t("lv.")}</h3>
                                        </div>
                                    ))
                                    }
                                    <hr />
                                    <div className="flex justify-between">
                                        <h3>{t("total")}</h3>
                                        <h3>{totalCost} {" "} {t("lv.")}</h3>
                                    </div>
                                    <div className="pt-6">
                                        {/* <div className="flex">
                                            Deliver to
                                            <p className="font-medium pl-1">
                                                {name}
                                            </p>
                                        </div> */}

                                        <div className="flex">
                                            {t("phone")}
                                            <p className="font-medium pl-1">
                                                {phone}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            email
                                            <p className="font-medium pl-1">
                                                {email}
                                            </p>
                                        </div>


                                        <div className="flex">
                                            {t("delivery courrier")}
                                            <p className="font-medium pl-1">
                                                {courrier}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            {t("type")}
                                            <p className="font-medium pl-1">
                                                {method === "office" ? t("delivery to office", { name: courrier }) : t("delivery to home")}
                                            </p>
                                        </div>
                                        <div className="flex">
                                            {t("address")}
                                            <div className="font-medium pl-1">
                                                {city}
                                                {" "}
                                                {address}
                                            </div>

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

export default OrderDetails;