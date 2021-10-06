import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
import { useDispatch, useSelector } from "react-redux";

import {
    getAuth,
    signInWithEmailLink,
    updatePassword
} from "firebase/auth";

const auth = getAuth();

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let dispatch = useDispatch();

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push("/");
    }, [user, history]);

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
        // console.log(window.location.href);
        // console.log(window.localStorage.getItem("emailForRegistration"));
    }, [history]);

    const handleSubmit = async (e) => {

        //https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
        //https://eleven-fifty-academy.gitbook.io/javascript-301-reactnative-gitbook/part-3-navigation-tab-navigator/3.5-checking-authentication-and-user-status
        e.preventDefault();
        // validation
        if (!email || !password) {
            toast.error("Email and password is required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const result = await signInWithEmailLink(auth,
                email,
                window.location.href
            );
            //   console.log("RESULT", result);
            if (result.user.emailVerified) {
                // remove user email fom local storage
                window.localStorage.removeItem("emailForRegistration");
                // get user id token
                let user = auth.currentUser;
                await updatePassword(user, password);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email} disabled />

            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
            />
            <br />
            <button type="submit" className="btn btn-raised">
                Complete Registration
            </button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;
