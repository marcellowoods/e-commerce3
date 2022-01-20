import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./style.css";

import { useTranslation } from 'react-i18next';


const SearchBar = ({ cname }) => {

    const { t } = useTranslation();
    const [text, setText] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(text);
        const url = "/search/" + text + "/1";
        history.push(url);
    }

    const handleInputChange = (e) => {

        const value = e.target.value;
        setText(value);
    }

    return (
        <form onSubmit={handleSubmit} className={cname}>
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>

            <input onChange={handleInputChange} value={text}
                className="w-full color-main-bold border border-gray-500 rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="text" placeholder={t('search')}>
            </input>
        </form>
    )
}

export default SearchBar;