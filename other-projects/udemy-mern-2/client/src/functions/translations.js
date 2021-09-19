import axios from "axios";

export const postTranslations = async (arg) =>
    await axios.post(`${process.env.REACT_APP_API}/translate/fields`, arg);

    
export const getTranslations = async () =>
    await axios.get(`${process.env.REACT_APP_API}/translate/fields`);




