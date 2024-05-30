import React, { useEffect, useState } from 'react';
import styles from "../../stylesheet/main.module.scss";
import { Col, Container, Row, Image, Form, Alert } from 'react-bootstrap';
import RegisterPage from './RegisterPage';
import Validation from '../../utils/Validation';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/router';
import API from "../../helpers/api";
import * as auth from "../../helpers/auth";
import { useUserAuth } from '../../firebase_setup/auth/UserAuthContext';
import { handleErrorMessage } from "../../utils/CommonFunctions";
import { Toaster, toast } from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import axios from "axios";

const initial = {
    email: "",
    password: ""
}

export default function MainPage({ query }) {

    const router = useRouter();
    const [login, setLogin] = useState(true);
    const [showErrors, setShowErrors] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [md7, setmd7] = useState(false);
    const { logIn } = useUserAuth();
    const [error, setError] = useState("");
    const [data, setData] = useState(initial);
    const { email, password } = data;
    const [disableButton, setdisableButton] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            setLogin(false);
        }
    }, [query])

    useEffect(() => {
        (email?.length && password.length) ? setdisableButton(false) : setdisableButton(true);
    }, [email?.length, password?.length])

    const handleChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleLogin = async (e) => {
        setShowErrors(true);
        if (!Validation.mailNumber(email) ||
            !Validation.password(password)
        ) {
            return;
        }
        else {
            setLoading(true);
            setShowErrors(false);

            const isNumber = /^\d+$/.test(email);

            if (isNumber) {
                // dispatch(userLogin({ mobileNo: values.email, password: values.password }));
                data.mobileNo = email;
                delete data.email;
            }

            axios.post("https://admin.torsin.com/api/users/email-login/", (data))
                .then((response) => {
                    if (response) {
                        toast.success(response?.data?.response?.message?.successMessage, {
                            position: "top-right",
                            style: {
                                borderBottom: '4px solid #33a34e',
                                padding: "16px",
                                color: "#3c5f4b",
                                marginRight: "25px",
                            },
                        });
                        auth.login((`Bearer ${response?.data?.access}`));
                        router.push("/dashboard")
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    handleErrorMessage(error);
                });
        }
    }

    const send = (props) => {
        if (props && !login) {
            setmd7(true)
        }
    }

    const logClick = () => {
        setLogin(true)
        setmd7(false)
    }

    const handleRegisterClick = () => {
        setLogin(false);
        setShowErrors(false);
        setData(initial);
    }

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleLogin(e);
        }
    }

    return (
        <>
            <Toaster />
            <div className={`${styles.containerDiv} d-flex align-items-center ${!login && "py-5"}`}>
                <Container className='d-flex align-items-center'>
                    <Row className='d-flex justify-content-center align-items-center'>
                        <Col md={5} className={`${md7 ? "pe-5" : "me-5"} ${styles.headingDiv}`}>
                            <p className={`${styles.welcomeHeading}`}>
                                Welcome to Torsin
                            </p>
                            <p className={`${styles.welcomePara}`}>
                                Work with talented people at the most affordable price to get the most out of your time and cost
                            </p>
                        </Col>
                        {!md7 && <Col md={1}></Col>}
                        <Col md={`${(md7) ? 7 : 5}`}>
                            <div className={`shadow py-4 ${styles.rightContainer}`}>
                                <div className='d-flex mt-4 align-items-center justify-content-center'>
                                    <Image src="./images/torsinLogo.png" className='img img-fluid cursor-pointer' alt='logo' onClick={() => router.push("/")} />
                                    <span className={`${styles.torsinHeading} ms-3 cursor-pointer`} onClick={() => router.push("/")} >Torsin</span>
                                </div>
                                <div className={`px-5 mt-5 mb-4 d-flex align-items-center ${md7 && "justify-content-center"}`}>
                                    <button className={`me-4 ${styles.torsinTabs} ${login && styles.activeTabs}`} onClick={() => router.push('/login')}>
                                        Login
                                    </button>
                                    <button className={`${styles.torsinTabs} ${!login && styles.activeTabs}`} onClick={() => router.push("/registration")}>
                                        Register
                                    </button>
                                </div>
                                {
                                    login ?
                                        <div>
                                            {loading && (
                                                <div className={`${styles.loaderOverlay}`}>
                                                    <Oval
                                                        height={50}
                                                        width={50}
                                                        color="#0E184D"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                        visible={true}
                                                        ariaLabel='oval-loading'
                                                        secondaryColor="#e0e0e0"
                                                        strokeWidth={8}
                                                        strokeWidthSecondary={5}
                                                    />
                                                </div>
                                            )}
                                            <div className={`${loading ? styles.formBlur : ""}`}>
                                                <div className="pt-2 pb-2 px-5">
                                                    <Form.Group>
                                                        <Form.Control
                                                            type="text"
                                                            name="email"
                                                            value={email}
                                                            onChange={handleChange}
                                                            placeholder="Email / Mobile No."
                                                            className={`rounded-5 ${styles.formInput} px-4 py-2`}
                                                            isInvalid={showErrors && !Validation.mailNumber(email)}
                                                            onKeyUp={handleKeyUp}
                                                            maxLength={/^\d+$/.test(email) ? 15 : 50}
                                                            disabled={loading}
                                                        />
                                                        <Form.Control.Feedback type="invalid" className='errorMessage'>
                                                            {
                                                                !email ? "Please enter mobile number or email" : !Validation.mailNumber(email) && "Invalid email or phone number"
                                                            }
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>
                                                <div className="py-3 px-5">
                                                    <Form.Group className="position-relative">
                                                        <Form.Control
                                                            name="password"
                                                            value={password}
                                                            onChange={handleChange}
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Password"
                                                            isInvalid={showErrors && !Validation.password(password)}
                                                            className={`rounded-5 ${styles.formInput} px-4 py-2`}
                                                            onKeyUp={handleKeyUp}
                                                            maxLength={15}
                                                        />
                                                        {!showPassword ?
                                                            (!showErrors ?
                                                                <IoEyeOutline color='grey' className={`${styles.eye}`} onClick={() => setShowPassword(true)} />
                                                                :
                                                                <IoEyeOutline color='grey' className={`${!Validation.password(password) ? styles.errorEye : styles.eye}`} onClick={() => setShowPassword(true)} />
                                                            )
                                                            :
                                                            (!showErrors ?
                                                                <FaRegEyeSlash color='grey' className={`${styles.eye}`} onClick={() => setShowPassword(false)} />
                                                                :
                                                                <FaRegEyeSlash color='grey' className={`${!Validation.password(password) ? styles.errorEye : styles.eye}`} onClick={() => setShowPassword(false)} />
                                                            )
                                                        }
                                                        <Form.Control.Feedback type="invalid" className='errorMessage'>
                                                            {!password ? "Please Enter Password " : password.length < 8 ? "Password length can't be less than 8 characters" : password.length > 15 ? "Password length can't be more than 15 characters" : "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol."}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </div>

                                                <button
                                                    className={`${styles.loginButton} my-2 mx-5 ${disableButton && "disabledButton"}`}
                                                    onClick={handleLogin}
                                                    disabled={disableButton || loading}
                                                >
                                                    {loading ? 'Loading' : 'Login'}
                                                </button>

                                                <hr style={{ border: "1px solid #E0E0E0" }} />
                                                <div className="mx-5 pt-2 mb-4">
                                                    <p
                                                        className={`${styles.lostPassword} ${styles.hoverLink}`}
                                                        onClick={() => router.push('lostpassword')}
                                                        style={{
                                                            fontWeight: "600"
                                                        }}
                                                    >
                                                        Lost Password
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                        // {error && <Alert variant='danger' className='mx-5'>{error?.message}</Alert>}

                                        :
                                        <div>
                                            <RegisterPage send={send} />
                                        </div>
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
