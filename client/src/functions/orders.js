import axios from "axios";

export const userPostOrder = async (products, totalCost, deliveryInfo, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user-order`,
        { products, totalCost, deliveryInfo },
        {
            headers: {
                authtoken,
            },
        }
    );

export const postOrder = async (products, totalCost, deliveryInfo) =>
    await axios.post(
        `${process.env.REACT_APP_API}/order`,
        { products, totalCost, deliveryInfo }
    );

export const getOrderOptions = async () =>
    await axios.get(`${process.env.REACT_APP_API}/orderOptions`);


