import React, { useState } from "react";
import OrderDetails from "../../components/orders/OrderDetails";
import { getOrders } from "../../functions/admin"
import { useAsync } from "../../auxiliary/reactUtils"
import { useSelector } from "react-redux";
import LoadingPage from "../LoadingPage";

const OrderRow = ({ orderId, orderDate, orderAddress, orderStatus, orderTotal, onDetailsClicked }) => {

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
                    <button onClick={() => onDetailsClicked(orderId)} className="bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-1 px-2  rounded">
                        Details
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                        Update Status
                    </button>
                </div>
            </td>
        </tr>
    )
}


//https://tailwindcomponents.com/component/responsive-table-6
const OrdersTable = ({ onDetailsClicked, orders }) => {

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
    const [isLoading, setIsLoading] = useState(false);
    const [orderSelected, setOrderSelected] = useState(null);

    const { user } = useSelector((state) => ({ ...state }));


    const onDetailsClicked = (orderId) => {
        setIsDetailsOpen((prev) => !prev);
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

            <OrdersTable
                orders={orders}
                onDetailsClicked={onDetailsClicked}
            />
        </div>
    )

}

export default UpdateOrders;
