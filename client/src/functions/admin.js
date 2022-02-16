import axios from "axios";

export const getOrders = async (hideCompleted, page, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/admin/orders`, { hideCompleted, page },
        {
            headers: {
                authtoken,
            },
        });

export const changeOrderStatus = async (orderId, orderStatus, authtoken) =>
    await axios.put(
        `${process.env.REACT_APP_API}/admin/order-status`,
        { orderId, orderStatus },
        {
            headers: {
                authtoken,
            },
        }
    );
