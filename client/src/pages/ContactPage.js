import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { sendMessage } from "../functions/messages";


function ContactPage() {

    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");

    const onSend = async () => {

        await sendMessage(email, name, message);
    };


    return (

        <div className="w-full max-w-xl mx-auto">
            <div className="sm:flex items-center sm:mt-6">
                <div className=" sm:w-72 flex flex-col">
                    <label className="capitalize autocomplete text-base font-semibold leading-none text-gray-800">{t('name')}</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        tabIndex={0}
                        type="name"
                        id="name"
                        className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                    />
                </div>
                <div className="sm:w-72 flex flex-col sm:ml-6 sm:mt-0 mt-4">
                    <label className="capitalize text-base font-semibold leading-none text-gray-800" >{t('email')}</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        tabIndex={0}
                        id="email"
                        type="email"
                        className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" />
                </div>
            </div>

            <div>
                <div className="w-full flex flex-col mt-8">
                    <label className="capitalize text-base font-semibold leading-none text-gray-800">{t('message')}</label>
                    <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        tabIndex={0}
                        aria-label="leave a message"
                        role="textbox"
                        type="message"
                        className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none" defaultValue={""} />
                </div>
            </div>

            <div className="flex items-center justify-center w-full">
                <button onClick={onSend} className="uppercase mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-blue-600 rounded hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:bg-blue-500 focus:outline-none">
                    {t('send')}
                </button>
            </div>

        </div>

    );
}

export default ContactPage;