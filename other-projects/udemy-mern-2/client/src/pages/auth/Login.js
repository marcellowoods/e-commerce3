import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
import { roleBasedRedirect } from "./auxiliary/redirect.js"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();


//https://reactrouter.com/web/example/auth-workflow
const Login = ({ history }) => {
    const [email, setEmail] = useState("gqlreactnode@gmail.com");
    const [password, setPassword] = useState("gggggg");
    const [loading, setLoading] = useState(false);
    let location = useLocation();

    const { user } = useSelector((state) => ({ ...state }));

    let dispatch = useDispatch();

    useEffect(() => {
        {
            if (user && user.token) {
                let isAdmin = user.role === "admin";
                roleBasedRedirect(location, history, isAdmin);
            }
        }

    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(email, password);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            // console.log(result);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id,
                        },
                    });
                    //   roleBasedRedirect(location, history, res);
                })
                .catch((err) => console.log(err));

        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    const googleLogin = async () => {
            signInWithPopup(auth, googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                        // roleBasedRedirect(location, history, res);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    autoFocus
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                />
            </div>

            <br />
            <Button
                onClick={handleSubmit}
                type="primary"
                className="mb-3"
                block
                shape="round"
                icon={<MailOutlined />}
                size="large"
                disabled={!email || password.length < 6}
            >
                Login with Email/Password
            </Button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Login</h4>
                    )}
                    {loginForm()}

                    <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        icon={<GoogleOutlined />}
                        size="large"
                    >
                        Login with Google
                    </Button>

                    <Link to="/forgot/password" className="float-right text-danger">
                        Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
