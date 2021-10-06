import axios from "axios";

export const getOrCreateUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/get-or-create-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const currentUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const currentAdmin = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-admin`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};
