import React from "react";
import OrdersTable from "../../components/orders/OrdersTable";

//test data
const orders = [
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

const Orders = () => {

    const onDetailsClicked = (orderId) => {
        console.log(orderId);
    }

    return (
        <OrdersTable
            orders={orders}
            onDetailsClicked={onDetailsClicked}
        />
    )

}



export default Orders;
