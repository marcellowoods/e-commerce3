import React, { useState } from "react";
import OrdersTable from "../../components/orders/OrdersTable";
import { getUserOrders } from "../../functions/user"
import { useAsync } from "../../auxiliary/reactUtils"
import { useSelector } from "react-redux";

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

const Orders = () => {

    const [orders, setOrders ] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));


    const onDetailsClicked = (orderId) => {
        console.log(orderId);
    }

    useAsync(
        async () => getUserOrders(user.token),
        (s) => console.log(s),
        null,
        []
    );

    // console.log(orders);

    return (
        <OrdersTable
            orders={testOrders}
            onDetailsClicked={onDetailsClicked}
        />
    )

}



export default Orders;
