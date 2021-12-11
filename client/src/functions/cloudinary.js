import axios from "axios";

export const getImageIds = async (imageUrls, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/get-images-ids`, { imageUrls },
        {
            headers: {
                authtoken,
            },
        });


