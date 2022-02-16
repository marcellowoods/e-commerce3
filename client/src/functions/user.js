import axios from "axios";

//todo
// export const saveUserAddress = async (authtoken, address) =>
//     await axios.post(
//         `${process.env.REACT_APP_API}/user/address`,
//         { address },
//         {
//             headers: {
//                 authtoken,
//             },
//         }
//     );

export const getUserOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
        headers: {
            authtoken,
        },
    });
