import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import {
    getAuth,
    sendSignInLinkToEmail
} from "firebase/auth";

const auth = getAuth();

const Register = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {

        if (user) {
            navigate("/")
        };
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };

        await sendSignInLinkToEmail(auth, email, config);
        // save user email in local storage
        window.localStorage.setItem("emailForRegistration", email);
        // clear state
        setEmail("");
    };

    return (
        <div className="sm:pt-4">
            <div className="flex bg-white rounded-lg shadow-lg overflow mx-auto sm:max-w-xl">
                <div className="w-full px-8 sm:py-8 mx-auto">

                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            autoFocus
                        />
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={handleSubmit}
                            disabled={false}
                            className={`${false ? "cursor-not-allowed" : ""} focus:outline-none	 bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600`}>
                            Register
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;
