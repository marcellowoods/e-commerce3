import CryptoJS from 'crypto-js';

import React, { useState } from 'react';

const Login = ({ children, sha512 }) => {

    const [passCorrect, setPassCorrect] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        let password = e.target.elements.password?.value;
        const hash = CryptoJS.SHA512(password).toString();

        if (hash == sha512) {
            setPassCorrect(true);
        } else {
            setPassCorrect(false);
        }
    };
    return passCorrect ? (
        <div>
            {children}
        </div>
    ) :
        (
            <div className='h-screen flex bg-gray-bg1'>
                <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                    <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                        Log in 🔐
                    </h1>

                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                id='password'
                                placeholder='Your Password'
                            />
                        </div>

                        <div className='flex justify-center items-center mt-6'>
                            <button
                                className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
};

export default Login;
