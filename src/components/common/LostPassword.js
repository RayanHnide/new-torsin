import React, { useEffect, useState } from 'react';
import { Container, Form, Image, Row, Col } from 'react-bootstrap';
import Validation from '../../utils/Validation';
import styles from "../../stylesheet/main.module.scss";
import style from '../../stylesheet/register.module.scss';
import OTPInput from 'react-otp-input';
 import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import API from '../../helpers/api';
import { Toaster, toast } from 'react-hot-toast';
import { handleErrorMessage } from '../../utils/CommonFunctions';
import { useRouter } from 'next/router';

export default function LostPassword() {

    const [disableButton, setdisableButton] = useState(true);
    const [disableOtpBtn, setDisableOtpBtn] = useState(true);
    const [disablePasswordBtn, setDisablePasswordBtn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [showErrors2, setShowErrors2] = useState(false);
    const [verifyOtpPage, setVerifyOtpPage] = useState(false);
    const [otp, setOtp] = useState('');
    const [resetPasswordPage, setResetPasswordPage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [eyeIcon1, setEyeIcon1] = useState(false);
    const [eyeIcon2, setEyeIcon2] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        (email.length) ? setdisableButton(false) : setdisableButton(true);
        (password?.length >= 1) ? setEyeIcon1(true) : setEyeIcon1(false);
        (confirmPassword?.length >= 1) ? setEyeIcon2(true) : setEyeIcon2(false);
        (otp.length === 6) ? setDisableOtpBtn(false) : setDisableOtpBtn(true);
        (password?.length && confirmPassword?.length) ? setDisablePasswordBtn(false) : setDisablePasswordBtn(true)
    }, [otp?.length, email?.length, password?.length, confirmPassword?.length])

    const handleEmailKeyUp = (e) => {
        e.preventDefault();
        if (e.key == 'Enter') {
            handleOtpSend();
        }
    }

    const handleOtpSend = () => {
        setShowErrors(true);

        if (!Validation.email(email)) {
            return;
        }
        else {
            setShowErrors(false);
            setLoading(true);
            API.apiPost('lostPasswordOtpSent', {
                'email': email
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
                    setVerifyOtpPage(true);
                })
                .catch((err) => {
                    setLoading(false);
                    handleErrorMessage(err);
                })
        }

    }

    const handleSubmitKeyUp = (e) => {
        e.preventDefault();
        if (e.key == 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        setLoading(true);
        API.apiPost('lostPasswordOtpVerify', {
            'email': email,
            "otp": parseInt(otp)
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
                setResetPasswordPage(true);
            })
            .catch((err) => {
                setLoading(false);
                handleErrorMessage(err);
            })
    }

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
            toast.error("Passwords do not match", {
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
                'email': email,
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
                                    <Image src="./images/torsinLogo.png" className='img img-fluid' alt='logo' />
                                    <span className={`${styles.torsinHeading} ms-3`}>Torsin</span>
                                </div>

                                {!verifyOtpPage ?
                                    <div>
                                        <p className={`mt-4 px-5 mx-1 ${styles.lostPasswordTitle}`}>
                                            Lost Password
                                        </p>

                                        <p className={`px-5 mx-1 my-3 ${styles.lostPasswordDesc}`}>
                                            Please enter your email address, we will send the OTP to reset your password
                                        </p>

                                        <div className="pt-2 pb-2 px-5">
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Email"
                                                    className={`rounded-5 ${styles.formInput} px-4 py-2`}
                                                    isInvalid={showErrors && !Validation.email(email)}
                                                    onKeyUp={handleEmailKeyUp}
                                                />
                                                <Form.Control.Feedback type="invalid" className='errorMessage'>
                                                    {!email ? "Please Enter Email" : "Please enter valid email"}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>

                                        <button
                                            className={`${styles.loginButton} my-2 mx-5 ${(disableButton || loading) && "disabledButton"}`}
                                            onClick={handleOtpSend}
                                            disabled={disableButton || loading}
                                        >
                                            Send OTP
                                        </button>

                                        <hr style={{ border: "1px solid #E0E0E0" }} />
                                        <div className="mx-5 pt-2 mb-4">
                                            <p
                                                className={`${styles.lostPassword}`}
                                            >
                                                Remember Password !
                                                <span
                                                    className='ms-2'
                                                    style={{
                                                        color: "#0E184D",
                                                        fontWeight: '500'
                                                    }}
                                                    onClick={() => router.push('/login')}
                                                >
                                                    Login
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    :
                                    !resetPasswordPage ?
                                        <div className='px-5 mx-1'>
                                            <p className={`mt-4 ${styles.lostPasswordTitle}`}>
                                                Verify OTP
                                            </p>

                                            <p className={`my-3 ${styles.lostPasswordDesc}`} style={{ wordBreak: "break-all" }}>
                                                Please wait till we verify your Email : {email}
                                            </p>

                                            <div className='d-flex justify-content-between'>
                                                <OTPInput
                                                    value={otp}
                                                    onChange={setOtp}
                                                    numInputs={6}
                                                    inputStyle={` text-dark ${style.otpInput} me-4`}
                                                    renderInput={(props) => <input {...props} />}
                                                    shouldAutoFocus="true"
                                                    onClick={handleSubmitKeyUp}
                                                />
                                            </div>

                                            <p className={`${style.otpLast} mt-3`}>
                                                I didn't recieve code?
                                                <span className={`${style.resend} ms-2`} onClick={handleOtpSend}>
                                                    Resend code
                                                </span>
                                            </p>

                                            <button
                                                className={`${styles.loginButton} mt-2 mb-3 ${(disableOtpBtn || loading) && "disabledButton"}`}
                                                onClick={handleSubmit}
                                                disabled={disableOtpBtn || loading}
                                            >
                                                Submit & Verify
                                            </button>
                                        </div>
                                        :
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
                                                    maxLength="15"
                                                    placeholder="Password"
                                                    name="password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={`${style.formInput} ${eyeIcon1 ? style.formPaddingEnd : ""} py-2 px-4 rounded-5`}
                                                    isInvalid={showErrors2 && !Validation.password(password)}
                                                    onKeyUp={handleResetKeyUp}
                                                />
                                                {!showPassword ?
                                                    eyeIcon1 &&
                                                    (!showErrors2 ?
                                                        <IoEyeOutline size={20} color='grey' className={`${style.eye}`} onClick={() => setShowPassword(true)} />
                                                        :
                                                        <IoEyeOutline size={20} color='grey' className={`${!Validation.password(password) ? style.eyeError : style.eye}`} onClick={() => setShowPassword(true)} />
                                                    )
                                                    :
                                                    eyeIcon1 &&
                                                    (!showErrors2 ?
                                                        <FaRegEyeSlash size={20} color='grey' className={`${style.eye}`} onClick={() => setShowPassword(false)} />
                                                        :
                                                        <FaRegEyeSlash size={20} color='grey' className={`${!Validation.password(password) ? style.eyeError : style.eye}`} onClick={() => setShowPassword(false)} />
                                                    )
                                                }
                                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                                    {!password ? "Please enter password " : password.length < 8 ? "Password length can't be less than 8 characters" : password.length > 15 ? "Password length can't be more than 15 characters" : "Password should contain at least 1 uppercase letter, lowercase letter, digit, special symbol."}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className='position-relative my-4'>
                                                <Form.Control
                                                    type={showPassword2 ? "text" : "password"}
                                                    placeholder="Confirm Password"
                                                    maxLength="15"
                                                    name="confirmPassword"
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className={`${style.formInput} ${eyeIcon2 ? style.formPaddingEnd : ""} py-2 px-4 rounded-5`}
                                                    isInvalid={showErrors2 && !Validation.password(confirmPassword)}
                                                    onKeyUp={handleResetKeyUp}
                                                />
                                                {!showPassword2 ?
                                                    eyeIcon2 &&
                                                    (!showErrors2 ?
                                                        <IoEyeOutline size={20} color='grey' className={`${style.eye}`} onClick={() => setShowPassword2(true)} />
                                                        :
                                                        <IoEyeOutline size={20} color='grey' className={`${!Validation.password(confirmPassword) ? style.eyeError : style.eye}`} onClick={() => setShowPassword2(true)} />
                                                    )
                                                    :
                                                    eyeIcon2 &&
                                                    (!showErrors2 ?
                                                        <FaRegEyeSlash size={20} color='grey' className={`${showErrors ? style.eyeError : style.eye}`} onClick={() => setShowPassword2(false)} />
                                                        :
                                                        <FaRegEyeSlash size={20} color='grey' className={`${!Validation.password(confirmPassword) ? style.eyeError : style.eye}`} onClick={() => setShowPassword2(false)} />
                                                    )
                                                }
                                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                                    {!confirmPassword ? "Please enter confirm password " : confirmPassword.length < 8 ? "Password length can't be less than 8 characters" : confirmPassword.length >= 8 ? password !== confirmPassword && "Passwords doesn't matched" : "Password should contain at least 1 uppercase letter, lowercase letter, digit, special symbol."}
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
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
