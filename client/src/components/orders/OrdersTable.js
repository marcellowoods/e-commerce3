import React from "react";

const OrderRow = ({ orderId, orderDate, orderAddress, orderStatus, onDetailsClicked }) => {

    return (
        <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Order Id</span>{orderId}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Created on</span>{orderDate}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Shipping address</span>{orderAddress}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Status</span>{orderStatus}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                {/* <span className="inline-block w-1/3 md:hidden font-bold">Actions</span> */}
                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">Delete</button> */}
                <button onClick={() => onDetailsClicked(orderId)} className="bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-1 px-2  rounded">
                    Details
                </button>
            </td>
        </tr>
    )
}


//https://tailwindcomponents.com/component/responsive-table-6
const OrdersTable = ({ onDetailsClicked, orders }) => {

    return (

        <div className="container max-w-7xl mx-auto pt-12 px-6">
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Order Id</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Date</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Address</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Status</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"></th>
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {orders.map((order) => {
                        return (
                            <OrderRow
                                orderId={order.orderId}
                                orderDate={order.orderDate}
                                orderAddress={order.orderAddress}
                                orderStatus={order.orderStatus}
                                onDetailsClicked={onDetailsClicked}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default OrdersTable;
