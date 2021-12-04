import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'

import OrderDetails from "../../components/orders/OrderDetails";
import { getOrders } from "../../functions/admin"
import { useAsync } from "../../auxiliary/reactUtils"
import { useSelector } from "react-redux";

import LoadingPage from "../LoadingPage";

const StatusModal = ({ open, setOpen }) => {
    // const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            
            {/* initialFocus={cancelButtonRef} */}
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto"  onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {/* <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" /> */}
                        <Dialog.Overlay className="fixed inset-0 " />

                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Deactivate account
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to deactivate your account? All of your data will be permanently removed.
                                                This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setOpen(false)}
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

const OrderRow = ({ orderId,
    orderDate,
    orderAddress,
    orderStatus,
    orderTotal,
    onDetailsClicked,
    onUpdateStatusClicked
}) => {

    return (
        <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">Order Id</span>
                {orderId}
            </td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">Created on</span>
                {orderDate}
            </td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">Shipping address</span>
                {orderAddress}
            </td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">Status</span>
                {orderStatus}
            </td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Total</span>{orderTotal}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                {/* <span className="inline-block w-1/3 md:hidden font-bold">Actions</span> */}
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">Delete</button> */}
                <div className="flex justify-between">
                    <button onClick={() => onDetailsClicked(orderId)}
                        className="bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-1 px-2  rounded">
                        Details
                    </button>
                    <button onClick={() => onUpdateStatusClicked(orderId)} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                        Update Status
                    </button>
                </div>
            </td>
        </tr>
    )
}


//https://tailwindcomponents.com/component/responsive-table-6
const OrdersTable = ({ onDetailsClicked, onUpdateStatusClicked, orders }) => {

    const getDate = (dateStr) => {

        let options = {
            weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "numeric",

        }

        let date = new Date(dateStr);
        let d = date.getDate();
        var m = date.getMonth() + 1;
        return date.toLocaleDateString("bg");
    }

    return (

        <div className="container max-w-7xl mx-auto pt-12 px-6">
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Order Id</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Date</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Address</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Status</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Total</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {orders.map((order) => {
                        return (
                            <OrderRow
                                orderId={order._id}
                                orderDate={getDate(order.createdAt)}
                                orderAddress={order.deliveryInfo.address}
                                orderStatus={order.orderStatus}
                                orderTotal={order.totalCost}
                                onDetailsClicked={onDetailsClicked}
                                onUpdateStatusClicked={onUpdateStatusClicked}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}

//test data
const testOrders = [
    {
        orderId: 1234,
        orderDate: "12",
        orderAddress: "some street",
        orderStatus: "delivered"
    },
    {
        orderId: 1235,
        orderDate: "15",
        orderAddress: "some street 2",
        orderStatus: "delivered"
    },
    {
        orderId: 12358,
        orderDate: "18",
        orderAddress: "some street 3",
        orderStatus: "delivered"
    }
]



const UpdateOrders = () => {

    const [orders, setOrders] = useState([]);

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false)

    const [isLoading, setIsLoading] = useState(false);
    const [orderSelected, setOrderSelected] = useState(null);

    const { user } = useSelector((state) => ({ ...state }));


    const onDetailsClicked = (orderId) => {
        setIsDetailsOpen((prev) => !prev);
        setOrderSelected(orders.find(({ _id }) => _id == orderId));
    }

    const onUpdateStatusClicked = (orderId) => {
        setIsStatusOpen((prev) => !prev);
        setOrderSelected(orders.find(({ _id }) => _id == orderId));
    }


    useAsync(
        async () => getOrders(user.token),
        (s) => setOrders(s),
        setIsLoading,
        []
    );

    console.log(orders);

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div>
            {orderSelected && (
                <OrderDetails
                    totalCost={orderSelected.totalCost}
                    products={orderSelected.products}
                    isOpen={isDetailsOpen}
                    setIsOpen={setIsDetailsOpen}
                    deliveryInfo={orderSelected.deliveryInfo}
                />
            )
            }

            <StatusModal
                open={isStatusOpen}
                setOpen={setIsStatusOpen}
            />

            <OrdersTable
                orders={orders}
                onDetailsClicked={onDetailsClicked}
                onUpdateStatusClicked={onUpdateStatusClicked}
            />
        </div>
    )

}

export default UpdateOrders;
