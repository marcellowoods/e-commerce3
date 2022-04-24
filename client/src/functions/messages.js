import axios from "axios";

export const sendMessage = async (email, name, message) =>
    await axios.post(
        `${process.env.REACT_APP_API}/message`,
        { email, name, message },
    );
