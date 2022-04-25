import React, { useState } from "react";
import OrdersTable from "../../components/orders/OrdersTable";
import OrderDetails from "../../components/orders/OrderDetails";
import { getUserOrders } from "../../functions/user"
import getUserId from "../../firebase/getUserId"
import { useAsync } from "../../auxiliary/reactUtils"
import { useSelector } from "react-redux";
import LoadingPage from "../LoadingPage";

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
        async () => {
            console.log(user);
            const userToken = await user.getToken();
            return getUserOrders(userToken);
        },
        (s) => setOrders(s),
        setIsLoading,
        []
    );

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className="pt-6">
            {orderSelected && (
                <OrderDetails
                    totalCost={orderSelected.totalCost}
                    products={orderSelected.products}
                    orderId={orderSelected._id}
                    orderStatus={orderSelected.orderStatus}
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



export default Orders;
