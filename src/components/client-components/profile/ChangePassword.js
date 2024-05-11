import React, { useEffect, useState } from 'react';
import { Container, Form, Modal } from 'react-bootstrap';
import style1 from '../../../stylesheet/register.module.scss';
import style from "../../../stylesheet/main.module.scss";
import paymentStyle from '../../../stylesheet/payment.module.scss';
import publishStyle from "../../../stylesheet/publish.module.scss";
 
import { FaChevronDown ,FaChevronUp,FaRegEye,FaLock} from "react-icons/fa";
import { LuEyeOff } from "react-icons/lu";


import Validation from '../../../utils/Validation';
import API from '../../../helpers/api';
import { handleErrorMessage } from '../../../utils/CommonFunctions';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import * as auth from '../../../helpers/auth'

export default function ChangePassword({ styles }) {

    const initial = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    const router = useRouter();
    const [data, setData] = useState(initial);
    const { oldPassword, newPassword, confirmPassword } = data;
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [eyeIcon1, setEyeIcon1] = useState(false);
    const [eyeIcon2, setEyeIcon2] = useState(false);
    const [eyeIcon3, setEyeIcon3] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const [successModal, setSuccessModal] = useState(false);

    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);

    const uppercaseRegex = new RegExp(/[A-Z]/);
    const numberRegex = new RegExp('.*[0-9].*');
    const specialCharRegex = new RegExp('.*[!@#$%^&*()_+{}\\[\\]:;<>,.?/~`|-].*');

    useEffect(() => {
        (oldPassword.length && newPassword.length && confirmPassword.length && newPassword.length >= 8 && hasNumber && hasUppercase && hasSpecialCharacter && newPassword == confirmPassword) ? setDisableButton(false) : setDisableButton(true);
        (oldPassword?.length >= 1) ? setEyeIcon1(true) : setEyeIcon1(false);
        (newPassword?.length >= 1) ? setEyeIcon2(true) : setEyeIcon2(false);
        (confirmPassword?.length >= 1) ? setEyeIcon3(true) : setEyeIcon3(false);
    }, [oldPassword.length, newPassword.length, confirmPassword.length])


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name == 'newPassword') {
            setHasUppercase(uppercaseRegex.test(value));
            setHasNumber(numberRegex.test(value));
            setHasSpecialCharacter(specialCharRegex.test(value))
        }

        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    const handleSubmit = () => {
        setShowErrors(true);
        if (
            !Validation.minOf(oldPassword, 8) ||
            !Validation.password(newPassword) ||
            !Validation.password(confirmPassword) ||
            confirmPassword != newPassword
        ) {
            return;
        }
        //<=============== If we want to add a validation check for current password nd new password===========================>
        // else if (oldPassword == newPassword) {
        //     toast.error("Current password and new password can't be same", {
        //         position: "top-right",
        //         style: {
        //             borderBottom: '4px solid #dc3545',
        //             padding: "16px",
        //             color: "#3c5f4b",
        //             marginRight: "25px",
        //         }
        //     })
        // }
        else {
            setShowErrors(false);
            API.apiPost('changePassword', data)
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
                        setSuccessModal(true)
                    }
                })
                .catch((err) => {
                    handleErrorMessage(err);
                })
        }
    }

    return (
        <>
            <Toaster />

            <Modal centered show={successModal} onHide={() => setSuccessModal(false)} backdrop="static">
                <Modal.Header closeButton style={{ border: "0" }} className="pb-0" />
                <Modal.Body>
                    <div className='text-center px-5 py-3'>
                        <p className={`${publishStyle.deleteJobTitle}`}>Password changed successfully</p>
                        <p className={`${publishStyle.deleteJobDesc} px-4`}>Now you can stay logged in or log off from current active session</p>
                        <div>
                            <button className={`${paymentStyle.deleteButton} me-3 py-3 px-4 fw-bold`} onClick={() => router.push('/dashboard')}>Stay</button>
                            <button className={`${paymentStyle.noButton} py-3 px-4 fw-bold`} onClick={() => auth.logout()}>Log out</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Container className='my-5 px-3 ms-1'>
                <div className='d-flex justify-content-between align-items-center' role='button' onClick={() => setShow(!show)}>
                    <div className='d-flex align-items-center mb-3'>
                        {/* <IconLock /> */}
                        <p className={`${styles.profileHeading} my-0 ms-2`}>
                            Change Password
                        </p>
                    </div>

                    {!show ?
                        <FaChevronDown
                            role='button'
                            onClick={() => setShow(!show)}
                        />
                       
                        :
                        <FaChevronUp
                            role='button'
                            onClick={() => setShow(!show)}
                        />
                       
                    }
                </div>
                <hr className={` mt-0`} />

                {
                    show &&
                    <Container className='px-0'>
                        <div className={`${styles.profileCard} py-3 px-4`}>
                            <Form>
                                <Form.Group className='position-relative my-3'>
                                    <Form.Control
                                        name="oldPassword"
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Current Password"
                                        className={`${style.formInput} py-2 ps-4 rounded-5 position-relative`}
                                        isInvalid={showErrors && !Validation.minOf(oldPassword, 8)}
                                        onKeyDown={handleKeyDown}
                                        maxLength={15}
                                    />
                                    {!showPassword ?
                                        eyeIcon1 && (
                                            !showErrors ?
                                             
                                                <FaRegEye
                                                    size={20}
                                                    color='grey'
                                                    className={`${styles.resetEye} cursor-pointer`}
                                                    onClick={() => setShowPassword(true)}
                                                />
                                                :
                                                <FaRegEye
                                                    size={20}
                                                    color='grey'
                                                    className={`cursor-pointer ${!Validation.minOf(oldPassword, 8) ? styles.resetEye1 : styles.resetEye}`}
                                                    onClick={() => setShowPassword(true)}
                                                />
                                                

                                        )
                                        :
                                        eyeIcon1 && (
                                            !showErrors ?
                                           
                                                <LuEyeOff
                                                    size={20}
                                                    color='grey'
                                                    className={`cursor-pointer ${styles.resetEye}`}
                                                    onClick={() => setShowPassword(false)}
                                                />
                                                :
                                                 
                                                <LuEyeOff
                                                    size={20}
                                                    color='grey'
                                                    className={`cursor-pointer ${!Validation.minOf(oldPassword, 8) ? styles.resetEye1 : styles.resetEye}`}
                                                    onClick={() => setShowPassword(false)}
                                                />
                                        )
                                    }
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!oldPassword
                                            ?
                                            "Please enter current password "
                                            :
                                            oldPassword.length < 8
                                            &&
                                            "Current password length can't be less than 8 characters"
                                        }
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className='position-relative my-3'>
                                    <Form.Control
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={handleChange}
                                        type={showPassword2 ? "text" : "password"}
                                        placeholder="New Password"
                                        className={`${style.formInput} py-2 ps-4 rounded-5 position-relative`}
                                        isInvalid={showErrors && !Validation.password(newPassword)}
                                        onKeyDown={handleKeyDown}
                                        maxLength={15}
                                    />
                                    {!showPassword2 ?
                                        eyeIcon2 && (
                                            !showErrors ?
                                           
                                                <FaRegEye
                                                    size={20}
                                                    color='grey'
                                                    className={`cursor-pointer ${styles.resetEye}`}
                                                    onClick={() => setShowPassword2(true)}
                                                />
                                                :
                                                
                                                <FaRegEye
                                                    size={20}
                                                    color='grey'
                                                    className={`cursor-pointer ${!Validation.minOf(newPassword, 8) ? styles.resetEye1 : styles.resetEye}`}
                                                    onClick={() => setShowPassword2(true)}
                                                />
                                        )
                                        :
                                        eyeIcon2 && (
                                            !showErrors ?
                                                <LuEyeOff
                                                    size={20}
                                                    color='grey'
                                                    className={`cursor-pointer ${styles.resetEye}`}
                                                    onClick={() => setShowPassword2(false)}
                                                />
                                                
                                                :
                                                <LuEyeOff
                                                    size={20}
                                                    color='grey'
                                                    className={`cursor-pointer ${!Validation.minOf(newPassword, 8) ? styles.resetEye1 : styles.resetEye}`}
                                                    onClick={() => setShowPassword2(false)}
                                                />
                                                 
                                        )
                                    }
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!newPassword
                                            ?
                                            "Please enter new password"
                                            :
                                            newPassword.length < 8
                                            &&
                                            "New password length can't be less than 8 characters"
                                        }
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className='position-relative my-3'>
                                    <Form.Control
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                        type={showPassword3 ? "text" : "password"}
                                        placeholder="Confirm New Password"
                                        className={`${style.formInput} py-2 ps-4 rounded-5 position-relative`}
                                        isInvalid={showErrors && (!Validation.password(confirmPassword) || newPassword !== confirmPassword)}
                                        onKeyDown={handleKeyDown}
                                        maxLength={15}
                                    />
                                    {!showPassword3 ?
                                        eyeIcon3 && (
                                            !showErrors ?
                                                <FaRegEye
                                                    size={20}
                                                    color='grey'
                                                    className={`cursor-pointer ${styles.resetEye}`}
                                                    onClick={() => setShowPassword3(true)}
                                                />
                                                 
                                                : 
                                                <FaRegEye
                                                    size={20}
                                                    color='grey'
                                                    className={`cursor-pointer ${(confirmPassword !== newPassword || !Validation.minOf(confirmPassword, 8)) ? styles.resetEye1 : styles.resetEye}`}
                                                    onClick={() => setShowPassword3(true)}
                                                />
                                                
                                        )
                                        :
                                        eyeIcon3 && (
                                            !showErrors ?
                                                <LuEyeOff
                                                    size={20}
                                                    color='grey'
                                                    className={`cursor-pointer ${styles.resetEye}`}
                                                    onClick={() => setShowPassword3(false)}
                                                />
                                                 
                                                :
                                                <LuEyeOff
                                                    size={20}
                                                    color='grey'
                                                    className={`cursor-pointer ${(confirmPassword !== newPassword || !Validation.minOf(confirmPassword, 8)) ? styles.resetEye1 : styles.resetEye}`}
                                                    onClick={() => setShowPassword3(false)}/>
                                                
                                                 
                                        )

                                    }
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!confirmPassword
                                            ? "Please enter confirm new password"
                                            : confirmPassword.length < 8
                                                ? "Password length can't be less than 8 characters"
                                                : confirmPassword.length >= 8 ? newPassword !== confirmPassword
                                                    && "Passwords do not match"
                                                    : ""
                                        }
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group className='pt-1'>
                                    <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id={`default-1}`}
                                        label={`At least one upper case`}
                                        checked={hasUppercase}
                                        readonly='true'
                                        className={`${styles.formInputColor} my-3 ms-2`}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id={`default-2}`}
                                        label={`At least one number`}
                                        checked={hasNumber}
                                        readonly='true'
                                        className={`${styles.formInputColor} my-3 ms-2`}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id={`default-3}`}
                                        label={`At least 8 character`}
                                        checked={newPassword.length >= 8}
                                        readonly='true'
                                        className={`${styles.formInputColor} my-3 ms-2`}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Check // prettier-ignore
                                        type='checkbox'
                                        id={`default-4}`}
                                        label={`At least one special character (E.g @%$)`}
                                        checked={hasSpecialCharacter}
                                        readonly='true'
                                        className={`${styles.formInputColor} my-3 ms-2`}
                                    />
                                </Form.Group>
                            </Form>
                            <div className='d-flex mb-4 justify-content-end'>
                                <button
                                    className={`${style1.registerButton} ${disableButton && "disabledButton"}`}
                                    onClick={handleSubmit}
                                    disabled={disableButton}
                                    title={disableButton && "Please fill all the fields correctly for register !"}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Container>
                }
            </Container>
        </>
    )
}
