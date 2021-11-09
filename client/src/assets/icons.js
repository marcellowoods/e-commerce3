
let getAddToCartIcon = (width = 28, height = 28, cName = "") => {
    return (
        <svg className={`${cName} `} fill="rgba(59, 130, 246, 1)" width={`${width}px`} height={`${height}px`} version="1.1" viewBox="0 0 256 256" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
            <desc>Created with Fabric.js 1.7.22</desc>

            <g transform="translate(128 128) scale(.72)" >
                <g transform="translate(-175.05 -175.05) scale(3.89)">
                    <path d="m72.975 58.994h-41.12c-1.539 0-2.897-1.005-3.347-2.477l-13.309-43.511h-11.699c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5h14.289c1.539 0 2.897 1.005 3.347 2.476l13.309 43.512h36.204l10.585-25.191h-6.021c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5h11.287c1.172 0 2.267 0.587 2.915 1.563s0.766 2.212 0.312 3.293l-13.526 32.191c-0.546 1.299-1.817 2.144-3.226 2.144z" strokeLinecap="round" />
                    <circle cx="28.88" cy="74.33" r="6.16" />
                    <circle cx="74.59" cy="74.33" r="6.16" />
                    <path d="m62.278 19.546h-10.041v-10.04c0-1.933-1.567-3.5-3.5-3.5s-3.5 1.567-3.5 3.5v10.04h-10.04c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5h10.04v10.04c0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5v-10.04h10.041c1.933 0 3.5-1.567 3.5-3.5s-1.567-3.5-3.5-3.5z" strokeLinecap="round" />
                </g>
            </g>
        </svg>
    )
}

let getAddToCartIcon2 = (width = 28, height = 28, cName = "") => {
    return (
        <svg className={`${cName} `} fill="rgba(59, 130, 246, 1)" width={`${width}px`} height={`${height}px`} version="1.1" viewBox="0 0 256 256" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
            <desc>Created with Fabric.js 1.7.22</desc>

            <g transform="translate(128 128) scale(.72)" >
                <g transform="translate(-175.05 -175.05) scale(3.89)">
                    <path d="m72.975 58.994h-41.12c-1.539 0-2.897-1.005-3.347-2.477l-13.309-43.511h-11.699c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5h14.289c1.539 0 2.897 1.005 3.347 2.476l13.309 43.512h36.204l10.585-25.191h-6.021c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5h11.287c1.172 0 2.267 0.587 2.915 1.563s0.766 2.212 0.312 3.293l-13.526 32.191c-0.546 1.299-1.817 2.144-3.226 2.144z" strokeLinecap="round" />
                    <circle cx="28.88" cy="74.33" r="6.16" />
                    <circle cx="74.59" cy="74.33" r="6.16" />
                    <path d="m63.653 21.403c-1.367-1.367-3.582-1.367-4.949 0l-5.404 5.404v-17.3c0-1.933-1.567-3.5-3.5-3.5s-3.5 1.567-3.5 3.5v17.3l-5.404-5.404c-1.366-1.366-3.583-1.367-4.95 0s-1.367 3.583 0 4.95l11.378 11.377c0.163 0.163 0.343 0.309 0.535 0.438 0.084 0.056 0.176 0.095 0.264 0.143 0.112 0.061 0.22 0.129 0.338 0.178 0.115 0.047 0.234 0.075 0.353 0.109 0.1 0.03 0.197 0.068 0.301 0.089 0.226 0.045 0.456 0.069 0.685 0.069s0.459-0.024 0.685-0.069c0.104-0.021 0.2-0.059 0.301-0.089 0.118-0.035 0.238-0.062 0.353-0.109 0.119-0.049 0.227-0.117 0.338-0.178 0.088-0.048 0.18-0.087 0.264-0.143 0.193-0.129 0.372-0.274 0.535-0.438l11.378-11.377c1.367-1.368 1.367-3.583-1e-3 -4.95z" strokeLinecap="round" />
                </g>
            </g>
        </svg>
    )
}

let getCartIcon = (width = 28, height = 28, cName = "") => {
    return (
        <svg className={`${cName} fill-current hover:text-black`} width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
            <circle cx="10.5" cy="18.5" r="1.5" />
            <circle cx="17.5" cy="18.5" r="1.5" />
        </svg>
    )
}

let getProfileIcon = (width = 25, height = 25, cName = "") => {
    return (
        <svg className={`${cName} fill-current hover:text-black`} width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle fill="none" cx="12" cy="7" r="3" />
            <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
        </svg>
    )
}

let getMobileToggleIcon = (width = 25, height = 25, cName = "") => {
    return (
        <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 24 24" className={`${cName} fill-current hover:text-black`}>
            <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
        </svg>
    )
}

let getSettingsIcon = (width = 25, height = 25, cName = "") => {

    return (
        <svg width={`${width}px`} height={`${height}px`} xmlns="http://www.w3.org/2000/svg" className={`${cName} fill-current hover:text-black`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
    )
}

let getAdminIcon = (width = 25, height = 25, cName = "") => {

    return (
        <svg width={`${width}px`} height={`${height}px`} xmlns="http://www.w3.org/2000/svg" className={`${cName}  hover:text-black`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
    )
}

let getItemDeleteIcon = (width = 19, height = 19, cName = "") => {

    return (
        <svg width={`${width}px`} height={`${height}px`} className={`${cName}  hover:text-black`} version="1.1" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">

        <g transform="translate(128 128) scale(.72)" >
            <g transform="translate(-175.05 -175.05) scale(3.89)" fill="#ec0000" strokeLinecap="round">
                <path d="m24.959 68.04c-0.768 0-1.536-0.293-2.121-0.879-1.172-1.171-1.172-3.071 0-4.242l40.081-40.081c1.172-1.172 3.07-1.172 4.242 0 1.172 1.171 1.172 3.071 0 4.242l-40.08 40.081c-0.586 0.586-1.354 0.879-2.122 0.879z" />
                <path d="m65.04 68.04c-0.768 0-1.535-0.293-2.121-0.879l-40.081-40.08c-1.172-1.171-1.172-3.071 0-4.242 1.171-1.172 3.071-1.172 4.242 0l40.081 40.081c1.172 1.171 1.172 3.071 0 4.242-0.586 0.585-1.353 0.878-2.121 0.878z" />
                <path d="m45 90c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45zm0-84c-21.505 0-39 17.495-39 39s17.495 39 39 39 39-17.495 39-39-17.495-39-39-39z" />
            </g>
        </g>
    </svg>
    )
}








export {
    getAddToCartIcon,
    getCartIcon,
    getProfileIcon,
    getMobileToggleIcon,
    getSettingsIcon,
    getAdminIcon,
    getItemDeleteIcon
}