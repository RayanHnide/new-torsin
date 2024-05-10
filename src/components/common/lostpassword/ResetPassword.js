import React, { useEffect, useState } from 'react';
import { Container, Form, Image, Row, Col } from 'react-bootstrap';
import Validation from '../../../utils/Validation';
import styles from "../../../stylesheet/main.module.scss";
import style from '../../../stylesheet/register.module.scss';
import OTPInput from 'react-otp-input';

import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

import API from '../../../helpers/api';
import { Toaster, toast } from 'react-hot-toast';
import { handleErrorMessage } from '../../../utils/CommonFunctions';
import { useRouter } from 'next/router';

export default function LostPassword({ query }) {

    const [disablePasswordBtn, setDisablePasswordBtn] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showErrors2, setShowErrors2] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        (password?.length && confirmPassword?.length) ? setDisablePasswordBtn(false) : setDisablePasswordBtn(true)
    }, [password?.length, confirmPassword?.length])

    const handleResetKeyUp = (e) => {
        e.preventDefault();
        if (e.key == 'Enter') {
            handleReset();
        }
    }

    const handleReset = () => {
        setShowErrors2(true);

        if (
            !Validation.password(password) ||
            !Validation.password(confirmPassword)
        ) {
            return
        }
        else if (confirmPassword !== password) {
            toast.error("Password doesn't matched", {
                position: "top-right",
                style: {
                    borderBottom: '4px solid #33a34e',
                    padding: "16px",
                    color: "#3c5f4b",
                    marginRight: "25px",
                },
            });
            return;
        }
        else {
            setShowErrors2(false);
            setLoading(true);
            API.apiPost('resetPassword', {
                'email': query,
                'newPassword': password,
                'confirmPassword': confirmPassword
            })
                .then((res) => {
                    if (res) {
                        toast.success(res?.data?.response?.message?.successMessage, {
                            position: "top-right",
                            style: {
                                borderBottom: '4px solid #33a34e',
                                padding: "16px",
                                color: "#3c5f4b",
                                marginRight: "25px",
                            },
                        });
                    }
                    setLoading(false);
                    router.push('/login');
                })
                .catch((err) => {
                    setLoading(false);
                    handleErrorMessage(err);
                })
        }
    }

    return (
        <>
            <Toaster />
            <div className={`${styles.containerDiv} d-flex align-items-center py-5`}>
                <Container className='d-flex align-items-center'>
                    <Row className='d-flex justify-content-center align-items-center'>
                        <Col md={5} className={`me-5 ${styles.headingDiv}`}>
                            <p className={`${styles.welcomeHeading}`}>
                                Welcome to Torsin
                            </p>
                            <p className={`${styles.welcomePara}`}>
                                Work with talented people at the most affordable price to get the most out of your time and cost
                            </p>
                        </Col>
                        <Col md={1} />
                        <Col md={5}>
                            <div className={`shadow py-4 ${styles.rightContainer}`}>
                                <div className='d-flex mt-4 align-items-center justify-content-center'>
                                    <Image src="/images/torsinLogo.png" className='img img-fluid' />
                                    <span className={`${styles.torsinHeading} ms-3`}>Torsin</span>
                                </div>

                                <div className='px-5 mx-1'>
                                    <p className={`mt-4 ${styles.lostPasswordTitle}`}>
                                        Reset Password
                                    </p>

                                    <p className={`my-3 ${styles.lostPasswordDesc}`}>
                                        Its important for you to choose a strong password to keep your account safe and secure
                                    </p>

                                    <Form.Group className='position-relative my-2'>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            maxLength="30"
                                            placeholder="Password"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`${style.formInput} ${style.formPaddingEnd} py-2 px-4 rounded-5`}
                                            isInvalid={showErrors2 && !Validation.password(password)}
                                            onKeyUp={handleResetKeyUp}
                                        />
                                        {!showPassword ?

                                            (!showErrors2 ?
                                                <IoEyeOutline size={20} color='grey' className={`${style.eye}`} onClick={() => setShowPassword(true)} />
                                                :
                                                <IoEyeOutline size={20} color='grey' className={`${!Validation.password(password) ? (password.length < 8 || password.length > 15) ? style.eyeError : style.eyeError2 : style.eye}`} onClick={() => setShowPassword(true)} />
                                            )
                                            :

                                            (!showErrors2 ?
                                                <FaRegEyeSlash size={20} color='grey' className={`${style.eye}`} onClick={() => setShowPassword(false)} />
                                                :
                                                <FaRegEyeSlash size={20} color='grey' className={`${!Validation.password(password) ? (password.length < 8 || password.length > 15) ? style.eyeError : style.eyeError2 : style.eye}`} onClick={() => setShowPassword(false)} />
                                            )
                                        }
                                        <Form.Control.Feedback type="invalid" className="errorMessage">
                                            {!password ? "Please enter password " : password.length < 8 ? "Password length can't be less than 8 characters" : password.length > 30 ? "Password length can't be more than 30 characters" : "Password should contain at least 1 uppercase letter, lowercase letter, digit, special symbol."}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className='position-relative my-4'>
                                        <Form.Control
                                            type={showPassword2 ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            maxLength="30"
                                            name="confirmPassword"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`${style.formInput} ${style.formPaddingEnd} py-2 px-4 rounded-5`}
                                            isInvalid={showErrors2 && !Validation.password(confirmPassword)}
                                            onKeyUp={handleResetKeyUp}
                                        />
                                        {!showPassword2 ?

                                            (!showErrors2 ?
                                                <IoEyeOutline size={20} color='grey' className={`${style.eye}`} onClick={() => setShowPassword2(true)} />
                                                :
                                                <IoEyeOutline size={20} color='grey' className={`${!Validation.password(confirmPassword) ? (confirmPassword.length < 8 || confirmPassword.length > 15) ? style.eyeError : style.eyeError2 : style.eye}`} onClick={() => setShowPassword2(true)} />
                                            )
                                            :
                                            (!showErrors2 ?
                                                <FaRegEyeSlash size={20} color='grey' className={`${showErrors ? style.eyeError : style.eye}`} onClick={() => setShowPassword2(false)} />
                                                :
                                                <FaRegEyeSlash size={20} color='grey' className={`${!Validation.password(confirmPassword) ? (confirmPassword.length < 8 || confirmPassword.length > 15) ? style.eyeError : style.eyeError2 : style.eye}`} onClick={() => setShowPassword2(false)} />
                                            )
                                        }
                                        <Form.Control.Feedback type="invalid" className="errorMessage">
                                            {!confirmPassword ? "Please enter confirm password " : confirmPassword.length < 8 ? "Password length can't be less than 8 characters" : confirmPassword.length > 30 ? "Password length can't be more than 30 characters" : "Password should contain at least 1 uppercase letter, lowercase letter, digit, special symbol."}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <button
                                        className={`${styles.loginButton} mt-2 mb-3 ${(disablePasswordBtn || loading) && "disabledButton"}`}
                                        onClick={handleReset}
                                        disabled={disablePasswordBtn || loading}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
