import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUploadCategory = ({ values, setValues, setLoading }) => {

    const { user } = useSelector((state) => ({ ...state }));

    const fileUploadAndResize = (e) => {
        // console.log(e.target.files);
        // resize
        let files = e.target.files; // 3
        let allUploadedFiles = values.images;

        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        // console.log(uri);
                        axios
                            .post(
                                `${process.env.REACT_APP_API}/uploadimages`,
                                { image: uri },
                                {
                                    headers: {
                                        authtoken: user ? user.token : "",
                                    },
                                }
                            )
                            .then((res) => {
                                console.log("IMAGE UPLOAD RES DATA", res);
                                setLoading(false);
                                allUploadedFiles.push(res.data);

                                setValues({ ...values, images: allUploadedFiles });
                            })
                            .catch((err) => {
                                setLoading(false);
                                console.log("CLOUDINARY UPLOAD ERR", err);
                            });
                    },
                    "base64"
                );
            }
        }
        // send back to server to upload to cloudinary
        // set url to images[] in the parent component state - ProductCreate
    };

    const handleImageRemove = (public_id) => {
        setLoading(true);
        // console.log("remove image", public_id);
        axios
            .post(
                `${process.env.REACT_APP_API}/removeimage`,
                { public_id },
                {
                    headers: {
                        authtoken: user ? user.token : "",
                    },
                }
            )
            .then((res) => {
                setLoading(false);
                const { images } = values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id;
                });
                setValues({ ...values, images: filteredImages });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <>
            <div className="grid  gap-6 grid-cols-1  mt-1">
                {values.images &&
                    values.images.map((image) => (
                        // <Badge
                        //     count="X"
                        //     key={image.public_id}
                        //     onClick={() => handleImageRemove(image.public_id)}
                        //     style={{ cursor: "pointer" }}
                        // >
                        //     <Avatar
                        //         src={image.url}
                        //         size={100}
                        //         shape="square"
                        //         className="ml-3"
                        //     />
                        // </Badge>
                        // <button type="button" class="bg-blue-600 text-white p-2 rounded   flex items-center">
                        //     <img className="w-4 h-4" src="https://media.gq-magazine.co.uk/photos/5fca181eea319833403830dc/master/w_2121,c_limit/04112020_Watches_14.jpg" />
                        //     <span class="bg-white p-1 rounded text-blue-600 text-xs ml-2">X</span>
                        // </button>
                        <span className="relative inline-block">
                            <img className="" src={image.url} />
                            <button
                                onClick={() => handleImageRemove(image.public_id)}
                                className="absolute top-0 right-0 px-2 py-1 text-xs font-bold leading-none text-red-100 transform bg-red-600 rounded-full">X</button>
                        </span>

                    ))}
            </div>
            <div className="float-right">
                <label className="mt-3">
                    Choose File
                    <input
                        type="file"
                        multiple
                        hidden
                        accept="images/*"
                        onChange={fileUploadAndResize}
                    />
                </label>
            </div>
        </>
    );
};

export default FileUploadCategory;
