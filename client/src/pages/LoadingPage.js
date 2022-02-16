import React from "react";

//https://tailwindcss.com/docs/animation
//https://larainfo.com/blogs/tailwind-css-loading-spinner-example

const LoadingPage = () => {

    return (
        <div className="flex justify-center pt-20">
            <div style={{borderTopColor:"transparent"}}
                className="w-16 h-16 border-4 border-gray-500 border-solid rounded-full animate-spin"></div>
        </div>
    )
}



export default LoadingPage;
