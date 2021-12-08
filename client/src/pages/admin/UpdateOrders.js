import React, { Fragment, useRef, useState } from "react";
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import OrderDetails from "../../components/orders/OrderDetails";
import { getOrders } from "../../functions/admin";
import { changeStatus } from "../../functions/admin";
import { useAsync, useDidMountEffect } from "../../auxiliary/reactUtils";
import { useSelector } from "react-redux";
import getPagination from "../../components/navigation/getPagination";

import LoadingPage from "../LoadingPage";

const orderStatuses = [
    "Not Processed",
    "Processing",
    "Dispatched",
    "Cancelled",
    "Completed",
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const StatusSelect = ({ selected, setSelected }) => {
    // const [selected, setSelected] = useState(orderStatuses[0])

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    {/* <Listbox.Label className="block text-sm font-medium text-gray-700">Assigned to</Listbox.Label> */}
                    <div className="mt-1 relative">
                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="flex items-center">
                                <span className="ml-2 block truncate">{selected}</span>
                            </span>
                            <span className="ml-2 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {orderStatuses.map((orderStatus) => (
                                    <Listbox.Option
                                        key={orderStatus}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-2 pr-9'
                                            )
                                        }
                                        value={orderStatus}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">

                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {orderStatus}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

// newOrderStatus={newOrderStatus}
// setNewOrderStatus={setNewOrderStatus}

const StatusModal = ({ open, setOpen, orderSelected, onSaveStatusClicked, newOrderStatus, setNewOrderStatus }) => {
    // const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={open} as={Fragment}>

            {/* initialFocus={cancelButtonRef} */}
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
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
                        <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="pb-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Order {orderSelected && orderSelected._id}
                                    </h3>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div> */}
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Select new status
                                        </Dialog.Title>
                                        {/* <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to deactivate your account? All of your data will be permanently removed.
                                                This action cannot be undone.
                                            </p>
                                        </div> */}
                                        <StatusSelect
                                            setSelected={setNewOrderStatus}
                                            selected={newOrderStatus}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={onSaveStatusClicked}
                                >
                                    Save
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
            {/* <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">Shipping address</span>
                {orderAddress}
            </td> */}
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

const ORDERS_PER_PAGE = 6;

//https://tailwindcomponents.com/component/responsive-table-6
const OrdersTable = ({ onDetailsClicked, hideCompleted, onUpdateStatusClicked, orders }) => {

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

        <div className="container max-w-7xl mx-auto pt-6 px-6">
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Order Id</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Date</th>
                        {/* <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Address</th> */}
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
                                // orderAddress={order.deliveryInfo.address}
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
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false)

    const [isLoading, setIsLoading] = useState(false);
    const [orderSelected, setOrderSelected] = useState(null);

    const [newOrderStatus, setNewOrderStatus] = useState(null);
    const [hideCompleted, setHideCompleted] = useState(true);

    const { user } = useSelector((state) => ({ ...state }));

    const hideCompletedToggle = () => {
        setHideCompleted((prev) => !prev)
    }

    const onSuccessOrders = (data) => {

        const { data: ordersData, metadata: ordersMetadata } = data;

        if (ordersData.length === 0) {
            setOrders([]);
            setPageCount(0);
            return;
        }
        const perPage = ORDERS_PER_PAGE;

        setOrders(ordersData);
        const { total } = ordersMetadata[0];
        const countPages = Math.ceil(total / perPage);
        setPageCount(countPages);
    }

    useAsync(
        async () => getOrders(hideCompleted, page + 1, user.token),
        onSuccessOrders,
        setIsLoading,
        [hideCompleted, page]
    );

    console.log(orders);

    useDidMountEffect(() => {

        if (orderSelected) {
            setNewOrderStatus(orderSelected.orderStatus);
        }

    }, [orderSelected])


    const onDetailsClicked = (orderId) => {
        setIsDetailsOpen(true);
        setOrderSelected(orders.find(({ _id }) => _id == orderId));
    }

    const onUpdateStatusClicked = (orderId) => {
        setIsStatusOpen(true);
        setOrderSelected(orders.find(({ _id }) => _id == orderId));
    }

    const onSaveStatusClicked = async () => {
        setIsStatusOpen(false);
        setIsLoading(true);

        try {
            if (orderSelected) {
                await changeStatus(orderSelected._id, newOrderStatus, user.token);
                const res = await getOrders(user.token);
                setOrders(res.data);
            }
            setIsLoading(false);

        } catch (error) {

            console.log(error);
            alert(error);
            setIsLoading(false);
        }
    }

    return (
        <div>
            {orderSelected && (
                <OrderDetails
                    totalCost={orderSelected.totalCost}
                    orderStatus={orderSelected.orderStatus}
                    orderId={orderSelected._id}
                    products={orderSelected.products}
                    isOpen={isDetailsOpen}
                    setIsOpen={setIsDetailsOpen}
                    deliveryInfo={orderSelected.deliveryInfo}
                />
            )
            }

            <StatusModal
                open={isStatusOpen}
                orderSelected={orderSelected}
                setOpen={setIsStatusOpen}
                onSaveStatusClicked={onSaveStatusClicked}
                newOrderStatus={newOrderStatus}
                setNewOrderStatus={setNewOrderStatus}
            />

            {/* https://medium.com/front-end-weekly/build-a-html-toggle-switch-in-just-7-lines-of-code-using-vue-tailwindcss-ed215394fcd */}
            <div className="container max-w-7xl mx-auto pt-12 px-6">
                <div className="flex items-center">
                    <div
                        onClick={hideCompletedToggle}
                        className={classNames(hideCompleted ? 'bg-green-400' : "",
                            "cursor-pointer w-16 h-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out")
                        }
                    >
                        <div className={classNames(hideCompleted ? 'translate-x-6' : "",
                            "bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out")}></div>
                    </div>

                    <h3 className="pl-2 text-xl font-normal">Hide completed orders</h3>
                </div>

            </div >

            {isLoading ? <LoadingPage /> : (

                <OrdersTable
                    orders={orders}
                    hideCompleted={hideCompleted}
                    onDetailsClicked={onDetailsClicked}
                    onUpdateStatusClicked={onUpdateStatusClicked}
                />
            )
            }

            <div className={classNames(isLoading ? "transform translate-y-56" : "",
                "p-6")}>
                {getPagination({
                    curPage: page,
                    pageCount,
                    onPageChange: ({ selected }) => setPage(selected)
                })}
            </div>
        </div >
    )

}

export default UpdateOrders;
