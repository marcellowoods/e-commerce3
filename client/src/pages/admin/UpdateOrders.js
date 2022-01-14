import React, { Fragment, useRef, useState } from "react";
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import OrderDetails from "../../components/orders/OrderDetails";
import { getOrders } from "../../functions/admin";
import { changeStatus } from "../../functions/admin";
import { useAsync, useDidMountEffect } from "../../auxiliary/reactUtils";
import { useSelector } from "react-redux";
import OrdersTable from "../../components/orders/admin/OrdersTable";
import OrderStatusModal from "../../components/orders/admin/OrderStatusModal";
import getPagination from "../../components/navigation/getPagination";
import { useTranslation } from 'react-i18next';

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

const ORDERS_PER_PAGE = 6;

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

    const { t } = useTranslation();

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

    //fetchOrdersEffect
    useAsync(
        async () => {
            const userToken = await user.getToken();
            return getOrders(hideCompleted, page + 1, userToken);
        },
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
                const userToken = await user.getToken();
                await changeStatus(orderSelected._id, newOrderStatus, userToken);

                if(page === 0){
                    const res = await getOrders(hideCompleted, 1, userToken);
                    onSuccessOrders(res.data);
                }else{
                    //getOrders gets handled by fetchOrdersEffect;
                    setPage(0);
                }
                
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

            <OrderStatusModal
                orderStatuses={orderStatuses}
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

                    <h3 className="pl-2 text-xl font-normal">{t("hide completed orders")}</h3>
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
