import React, { useEffect, useState } from 'react';
import { Container, Form, Image, Row, Col } from 'react-bootstrap';
import Validation from '../../../utils/Validation';
import styles from "../../../stylesheet/main.module.scss";
import style from '../../../stylesheet/register.module.scss';
import OTPInput from 'react-otp-input';
import API from '../../../helpers/api';
import { Toaster, toast } from 'react-hot-toast';
import { handleErrorMessage } from '../../../utils/CommonFunctions';
import { useRouter } from 'next/router';
import { encodeData } from '../../../helpers/auth';

export default function LostPassword() {

    const [disableButton, setdisableButton] = useState(true);
    const [disableOtpBtn, setDisableOtpBtn] = useState(true);
    const [email, setEmail] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [verifyOtpPage, setVerifyOtpPage] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        (email.length) ? setdisableButton(false) : setdisableButton(true);
        (otp.length === 6) ? setDisableOtpBtn(false) : setDisableOtpBtn(true);
    }, [otp?.length, email?.length])

    const handleEmailKeyUp = (e) => {
        e.preventDefault();
        if (e.key == 'Enter') {
            handleOtpSend();
        }
    }

    const handleOtpSend = () => {
        setShowErrors(true);

        if (
            !Validation.email(email) ||
            email.length < 8 ||
            email.length > 30
        ) {
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
        const data = encodeData(email)
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
                router.push(`/lostpassword/reset-password?user=${data}`)
            })
            .catch((err) => {
                setLoading(false);
                handleErrorMessage(err);
            })
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
                                                    isInvalid={showErrors && (!Validation.email(email) || email.length < 8 || email.length > 30)}
                                                    onKeyUp={handleEmailKeyUp}
                                                // maxLength={30}
                                                />
                                                <Form.Control.Feedback type="invalid" className='errorMessage'>
                                                    {!email ? "Please enter email" : (email.length < 8 || email.length > 30) ? "Email length should be between 8 and 30" : "Please enter a valid email"}
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
                                                    className={`ms-2 ${styles.hoverLink}`}
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
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
