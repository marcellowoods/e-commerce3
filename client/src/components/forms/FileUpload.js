import React, { useEffect } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = ({ images, setImages, setLoading, singleUpload = false }) => {

    //https://dev.to/eons/detect-page-refresh-tab-close-and-route-change-with-react-router-v5-3pd

    const { user } = useSelector((state) => ({ ...state }));

    const alertUser = e => {
        e.preventDefault()
        e.returnValue = ''
      }

    const cleanupImages = () => {
        //remove images from cloudianry if product has not been created

        setImages(prevImages => {
            prevImages.forEach(({ public_id }) => {
                console.log(public_id);
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
                    .catch((err) => {
                        console.log(err);
                    });

            })
            return [];
        })
    }

    useEffect(() => {

        window.addEventListener('beforeunload', alertUser)

        
        return () => {
            window.removeEventListener('beforeunload', alertUser)
            cleanupImages();
        }
    }, [])

    const fileUploadAndResize = (e) => {
        // console.log(e.target.files);
        // resize
        let files = e.target.files; // 3

        let allFilesLen = files.length + images.length;
        if (singleUpload && allFilesLen > 1) {
            e.target.value = null;
            alert("upload only one file");
            return;
        }

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
                                let imgObj = res.data;
                                setImages((prev) => [...prev, imgObj]);

                            })
                            .catch((err) => {
                                setLoading(false);
                                console.log("CLOUDINARY UPLOAD ERR", err);
                            });
                    },
                    "base64"
                );
            }
            e.target.value = null;

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
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id;
                });
                setImages(filteredImages);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <>
            <div className={`grid  gap-6 ${singleUpload ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3"} x  mt-1`}>
                {images && images.map((image) => (

                    <span key={image.public_id} className="relative inline-block">
                        <img className="" src={image.url} />
                        <button
                            onClick={() => handleImageRemove(image.public_id)}
                            className="absolute top-0 right-0 px-2 py-1 text-xs font-bold leading-none text-red-100 transform bg-red-600 rounded-full">X</button>
                    </span>

                ))}
            </div>
            {/* "flex items-center  px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500" */}
            <div className="float-right">
                <label className="mt-1 flex cursor-pointer items-center px-2 py-1 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    {singleUpload ? "Choose File" : "Choose Files"}
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

export default FileUpload;
