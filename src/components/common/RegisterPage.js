
import React, { use, useEffect, useRef, useState } from 'react';
import { Alert, Col, Container, Form, FormGroup, Image, Row } from 'react-bootstrap';
import styles from "../../stylesheet/register.module.scss";
import { useRouter } from 'next/router';
import { useUserAuth } from '../../firebase_setup/auth/UserAuthContext';
import OtpInput from 'react-otp-input';
import API from '../../helpers/api';
import * as auth from "../../helpers/auth";
import { handleErrorMessage } from '../../utils/CommonFunctions';
import { Toaster, toast } from 'react-hot-toast';
import Validation from "../../utils/Validation";
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';
import "rsuite/dist/rsuite.css";

import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Country } from "country-state-city";
import Select from "react-select";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import axios from "axios";


export default function RegisterPage({ send }) {
    const initial = {
        fullName: "",
        email: "",
        mobileNo: "",
        profileImage: null,

        location: "",
        password: "",
        countryName: "",
        confirmPassword: "",
        phone_Number:""
    }

   const [gender,setGender] = useState('')
     const [data, setData] = useState(initial);
    const [phone_Number,setPhoneNumber] = useState('')
    const { fullName, email, mobileNo, profileImage, location, password, countryName, confirmPassword } = data;
    const [individual, setIndividual] = useState(false);
    const [business, setBusiness] = useState(false);
    const router = useRouter();
    console.log(countryName)
    const [otp, setOtp] = useState("");
    const [confirmOTP, setConfirmOTP] = useState("");
    const [verifyIcon, setVerifyIcon] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [mismatch, setMismatch] = useState(false);
    const { signUp, setUpRecaptcha } = useUserAuth();
    const [OTPModal, setOTPModal] = useState(false);
    const [disableButton1, setdisableButton1] = useState(true);
    const [disableButton2, setdisableButton2] = useState(true);
    const [showVerify, setShowVerify] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [verifyEmailOtpModal, setVerifyEmailOtpModal] = useState(false);
    const [emailOtp, setEmailOtp] = useState("");
    const [emailVerifyIcon, setEmailVerifyIcon] = useState(false);
    const [individualPhone, setIndividualPhone] = useState();
    const [eyeIcon1, setEyeIcon1] = useState(false);
    const [eyeIcon2, setEyeIcon2] = useState(false);
    const [checkbox, setCheckbox] = useState(null);
    const [phone, setPhone] = useState('');
    const [countryId, setCountryId] = useState('');
    const [num, setnum] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none', // Remove the border
            boxShadow: 'none', // Remove the box shadow
            background: '#E8F0FE ',
            padding: '1.4% 0',
        }),
    };

    individual && send("individual", individual)
    business && send("business", business)

    useEffect(() => {
        (fullName.length && email.length && phone.length && gender.length && location.length && password.length && selectedCountry && confirmPassword.length) ? setdisableButton1(false) : setdisableButton1(true);
        (phone?.length > 9) ? setShowVerify(true) : setShowVerify(false);
        (password?.length >= 1) ? setEyeIcon1(true) : setEyeIcon1(false);
        (confirmPassword?.length >= 1) ? setEyeIcon2(true) : setEyeIcon2(false);

    }, [fullName.length, email.length, phone.length, gender.length, location.length, password.length, selectedCountry?.name, confirmPassword.length])

    useEffect(() => {
        business && (fullName.length && email.length && phone.length && location.length && password.length && selectedCountry?.name && confirmPassword.length) ? setdisableButton2(false) : setdisableButton2(true);
        (phone?.length > 9) ? setShowVerify(true) : setShowVerify(false);
    }, [fullName.length, email.length, phone.length, location.length, password.length, selectedCountry?.name, confirmPassword.length])

    useEffect(() => {
        otp.length === 6 && verifyOTP();
    }, [otp.length])

    useEffect(() => {
        emailOtp.length === 6 && verifyEmailOTP();
    }, [emailOtp.length])

    const handleIndividualChange = (e) => {

        const { name, value, checked } = e.target;

        // Update 'selectedPlace' state when the location input field changes
        if (name === "location") {
            setSelectedPlace(value);
        }

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setCheckbox(checked)
    }

    const handleBusinessChange = (e) => {

        const { name, value } = e.target;

        // Update 'selectedPlace' state when the location input field changes
        if (name === "location") {
            setSelectedPlace(value);
        }

        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const [error, setError] = useState("");
     const verifyEmail=()=>{
         axios.post("https://admin.torsin.com/api/users/send-email-verification-code/",{
             email: email
         }).then((res)=>{
             toast.success('We have  sent you  the code via email.please check your inbox ', {
                 position: "top-right",
                 style: {
                     borderBottom: '4px solid #33a34e',
                     padding: "16px",
                     color: "#3c5f4b",
                     marginRight: "25px",
                 },
             });
         }).catch((err)=>console.log(err))
     }
    const handleIndividualRegister = (e) => {
        setShowErrors(true);
        if (!Validation.alphabets(fullName) ||
            Validation.empty(gender) ||
            Validation.empty(location) ||
            // Validation.empty(countryName) ||
            !selectedCountry ||
            !Validation.password(password) ||
            !Validation.email(email) ||
            !Validation.newNumberValidator(phone) ||
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
            // else if (!emailVerifyIcon) {
            //     toast.error("Please verify your email for registration", {
            //         position: "top-right",
            //         style: {
            //             borderBottom: '4px solid #33a34e',
            //             padding: "16px",
            //             color: "#3c5f4b",
            //             marginRight: "25px",
            //         },
            //     });
            //     return;
            // }
            // else if (!verifyIcon) {
            //     toast.error("Please verify your mobile number before registration!", {
            //         position: "top-right",
            //         style: {
            //             borderBottom: '4px solid #33a34e',
            //             padding: "16px",
            //             color: "#3c5f4b",
            //             marginRight: "25px",
            //         },
            //     });
            //     return;
        // }
        else {
            setShowErrors(false);
            data.mobileNo = num.replace(`${countryId}`, '')
            data.countryId = countryId;
            data.countryName = selectedCountry.name

            axios.post("https://admin.torsin.com/api/users/signup/", {
                email:email,
                phone_number:phone,
                password:password,
                fullName:fullName,
                gender: "",
                profileImage: null,
                bio:"loremmmmmmmmmmmmmmm",
                location :location,
                countryId: countryId,
                countryName: countryName
            })
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
                        // auth.login((`Bearer ${response?.data?.response?.data?.token?.access}`));
                        setOpen(true);
                        axios.post("https://admin.torsin.com/api/users/send-email-verification-code/",{
                            email: email
                        }).then((res)=>{
                            toast.success('We have  sent you  the code via email.please check your inbox ', {
                                position: "top-right",
                                style: {
                                    borderBottom: '4px solid #33a34e',
                                    padding: "16px",
                                    color: "#3c5f4b",
                                    marginRight: "25px",
                                },
                            });
                        }).catch((err)=>console.log(err))
                    }
                })
                .catch((error) => {
                    // if (error?.response?.data?.error?.errorMessage === "Email already register") {
                    //     setEmailVerifyIcon(false)
                    //     setEmailOtp("");
                    // }
                    // else if (error?.response?.data?.error?.errorMessage === "Mobile No already register") {
                    //     setVerifyIcon(false);
                    //     setOtp("");
                    // }
                    handleErrorMessage(error);
                });



        }
    }
   const handleLOGIN=()=>{
        axios.post(" https://admin.torsin.com/api/users/verify-email/",{
            email: email,
            email_code: "123456"

        }).then((res)=>{
            console.log(res)
            auth.login((`Bearer ${res?.data?.access}`));
            router.push("/dashboard")
        })
   }
    const handleBusinessRegister = (e) => {
        setShowErrors(true);
        if (Validation.empty(fullName) ||
            // Validation.empty(location) ||
            // Validation.empty(countryName) ||
            !selectedCountry ||
            !selectedPlace ||
            !Validation.password(password) ||
            !Validation.email(email) ||
            !Validation.newNumberValidator(phone) ||
            !Validation.password(confirmPassword)
            // || !checkbox
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
            // else if (!verifyIcon) {
            //     toast.error("Please verify your mobile number before registration!", {
            //         position: "top-right",
            //         style: {
            //             borderBottom: '4px solid #33a34e',
            //             padding: "16px",
            //             color: "#3c5f4b",
            //             marginRight: "25px",
            //         },
            //     });
            //     return;
        // }
        else {
            data.mobileNo = num.replace(`${countryId}`, '')
            data.countryId = countryId;
            data.countryName = selectedCountry?.name
            data.location = selectedPlace

            setShowErrors(false);
            API.apiPost("businessRegistration", (data))
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
                        auth.login((`Bearer ${response?.data?.response?.data?.token?.access}`));
                        router.push("/dashboard")
                    }
                })
                .catch((error) => {
                    if (error?.response?.data?.error?.errorMessage === "Email already register") {
                        setEmailVerifyIcon(false)
                        setEmailOtp("");
                    }
                    else if (error?.response?.data?.error?.errorMessage === "Mobile No already register") {
                        setVerifyIcon(false);
                        setOtp("");
                    }
                    handleErrorMessage(error);
                });
        }


    }

    const sendOtp = async (e) => {
        // const phone = mobileNo.length && mobileNo[0] === "0" ? "+971" + mobileNo.substr(1) : "+91" + mobileNo;

        setError("");
        if (mobileNo === "" || mobileNo === undefined) {
            return setError("Please enter a valid phone number !")
        }

        try {
            const response = await setUpRecaptcha(phone);
            setConfirmOTP(response);
            response && setOTPModal(true);
        }
        catch (err) {
            setError(err.message);
        }
    }

    const sendEmailOtp = () => {
       axios.post("https://admin.torsin.com/api/users/send-email-verification-code/", { "email": email })
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
                    setVerifyEmailOtpModal(true);

                }
            })
            .catch((error) => {
                handleErrorMessage(error);
            });

    }


    const verifyEmailOTP = async (e) => {
        if (emailOtp === "" || emailOtp === null) {
            return;
        }
        API.apiPost("verifyOTP", { "email": email, "otp": parseInt(emailOtp) })
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
                    setEmailVerifyIcon(true);
                    setVerifyEmailOtpModal(false);
                }
            })
            .catch((error) => {
                handleErrorMessage(error);
            });

    }

    const handleEmailOtpModal = () => {
        setVerifyEmailOtpModal(false);
        setEmailOtp("")
    }

    const verifyOTP = async (e) => {
        if (otp === "" || otp === null) {
            return;
        }
        try {
            // debugger
            setError("");
            await confirmOTP.confirm(otp);
            // if (confirmOTP.confirm(otp)) {
            setOTPModal(false);
            setVerifyIcon(true);
            // }
            //         else {
            //     alert("wrong otp");
            // }
        }
        catch (err) {
            toast.error(err.message + "Please enter valid otp", {
                position: "top-right",
                style: {
                    borderBottom: '4px solid #33a34e',
                    padding: "16px",
                    color: "#3c5f4b",
                    marginRight: "25px",
                },
            });
            // setOTPModal(false);
            // setError(err.message);

        }
    }

    const handleMobileOtpModal = () => {
        setOTPModal(false);
        setOtp("");
    }

    const handlePhoneChange = (value, country, e, formattedValue) => {
        setPhone(formattedValue);
        setnum(value)
        setCountryId(country?.dialCode)
    }

    const [selectedPlace, setSelectedPlace] = useState(null);
    const autocompleteRef = useRef(null);

    const handlePlaceChanged = () => {

        const places = autocompleteRef.current.getPlaces();

        if (places?.length > 0) {
            const place = places[0];

            if (place) {
                // Rest of your code for extracting information from the place object
                const streetAddress = place.vicinity;
                const addressdata = place.address_components;
                const allAddress = place.name;

                const zipcodeobj = addressdata.find((obj) =>
                    obj.types.includes("postal_code")
                );
                const zipcode = zipcodeobj ? zipcodeobj.long_name : "";

                let formattedAddress = place.formatted_address;
                if (formattedAddress.startsWith(allAddress)) {
                    formattedAddress = formattedAddress.replace(allAddress, "").trim();
                }
                if (zipcode && formattedAddress.includes(zipcode)) {
                    formattedAddress = formattedAddress.replace(zipcode, "").trim();
                }

                // Concatenate name and formatted_address
                formattedAddress = allAddress + " " + formattedAddress;

                setSelectedPlace(formattedAddress);
            }
        }
    };
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Toaster />


            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title className='text-center'>
                      Verify Your Email
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='text-center'> We sent an Emial to {data.email}</p>
                       <div className='d-flex justify-content-center mt-5'>
                           <input style={{width:'10%',background:'none',border:'1px solid black',borderRadius:'5px'}} className='mx-2' type="text"/>
                           <input style={{width:'10%',background:'none',border:'1px solid black',borderRadius:'5px'}} className='mx-2' type="text"/>
                           <input style={{width:'10%',background:'none',border:'1px solid black',borderRadius:'5px'}} className='mx-2' type="text"/>
                           <input style={{width:'10%',background:'none',border:'1px solid black',borderRadius:'5px'}} className='mx-2' type="text"/>

                       </div>



                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleLOGIN} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>

                    <Button onClick={verifyEmail} appearance="subtle">
                       resend
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal centered show={OTPModal} onHide={handleMobileOtpModal} dialogClassName={`${styles.modalOuter}`} contentClassName={`${styles.modalBody}`}>
                <Modal.Header closeButton style={{ border: "0" }}>
                    <Modal.Title closeButton className='text-center'></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={`d-flex justify-content-center ${styles.imageOtp} mb-3`}>
                        <Image src="./images/otp.png" className='img img-fluid' alt='otp' />
                    </div>
                    <Container className='px-4 text-center'>
                        <p className={`${styles.mobileVerificationTitle} `}>Mobile number verification via OTP</p>
                        <p className={`${styles.mobileVerificationPara} px-4`}>Please enter the verification code send to your mobile number</p>
                        <div className='d-flex justify-content-center'>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                inputStyle={` text-dark ${styles.otpInput} mx-1`}
                                renderInput={(props) => <input {...props} />}
                                shouldAutoFocus="true"
                            />
                        </div>
                        <p className={`${styles.otpLast} mt-3`}>I didn't recieve code? <span className={`${styles.resend}`}>Resend Now</span></p>
                    </Container>
                </Modal.Body>
            </Modal>

            {/* =====================email otp modal============== */}

            <Modal centered show={verifyEmailOtpModal} onHide={handleEmailOtpModal} dialogClassName={`${styles.modalOuter}`} contentClassName={`${styles.modalBody}`}>
                <Modal.Header closeButton style={{ border: "0" }}>
                    <Modal.Title closeButton className='text-center'></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={`d-flex justify-content-center ${styles.imageOtp} mb-3`}>
                        <Image src="./images/Email.png" alt="email" className='img img-fluid' />
                    </div>
                    <Container className='px-4 text-center'>
                        <p className={`${styles.mobileVerificationTitle} `}>Email verification via OTP</p>
                        <p className={`${styles.mobileVerificationPara} px-4`}>Please enter the verification code send to your Email.</p>
                        <div className='d-flex justify-content-center'>
                            <OtpInput
                                value={emailOtp}
                                onChange={setEmailOtp}
                                numInputs={6}
                                inputStyle={` text-dark ${styles.otpInput} mx-1`}
                                renderInput={(props) => <input {...props} />}
                                shouldAutoFocus="true"
                            />
                        </div>
                        <p className={`${styles.otpLast} mt-3`}>I didn't recieve code? <span className={`${styles.resend}`}>Resend Now</span></p>
                    </Container>
                </Modal.Body>
            </Modal>

            <Container className='px-5 my-5'>
                {
                    (!individual && !business) &&
                    <>
                        <div className={`${styles.businessBtn} my-4 text-center`} onClick={() => setIndividual(!individual)}>
                            Individual
                        </div>
                        <div className={`${styles.businessBtn} my-4 text-center`} onClick={() => setBusiness(!business)}>
                            Business
                        </div>
                    </>
                }

                {
                    individual && <>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Row className='my-4'>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    name="fullName"
                                    onChange={handleIndividualChange}
                                    className={`${styles.formInput} py-2 px-4 rounded-5`}
                                    isInvalid={showErrors && !Validation.alphabets(fullName)}
                                />
                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                    {!fullName ? "Please enter full name" : "Digits and/or special characters are not allowed"}
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                {/* <Form.Control
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                    onChange={handleIndividualChange}
                                    className={`${styles.formInput} py-2 px-4 rounded-5`}
                                    isInvalid={showErrors && Validation.empty(location)}
                                />
                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                    {!location && "Please enter location"}
                                </Form.Control.Feedback> */}
                                <LoadScript
                                    googleMapsApiKey="AIzaSyD9HAzCj-r9Zw8dZnQWkNgrkewOc4aRjGc"
                                    libraries={["places"]} // Add "places" library
                                >
                                    <StandaloneSearchBox
                                        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                        onUnmount={(auto) => (autocompleteRef.current = null)}
                                        onPlacesChanged={handlePlaceChanged}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Enter a location"
                                            className={`px-4 ${styles.formInput} py-2 rounded-5 w-100 ${showErrors && !selectedPlace && styles.borderDanger}`}
                                            value={selectedPlace} // Use 'selectedPlace' state instead of 'location' from 'data'
                                            name="location" // Set the name to "location" to update the 'selectedPlace' state
                                            onChange={handleIndividualChange} // Handle changes in the input field
                                            style={{
                                                outline: "none",
                                                padding: "",
                                                textOverflow: "ellipsis",
                                                fontSize: '16px'
                                            }}
                                            isInvalid={showErrors && !selectedPlace}
                                        />
                                    </StandaloneSearchBox>
                                </LoadScript>
                                {showErrors && !selectedPlace && (
                                    <div className="errorMessage text-danger">Please enter location.</div>
                                )}
                            </Col>
                        </Row>
                        <Row className='my-4'>
                            <Col>
                                <Form.Group className="position-relative">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleIndividualChange}
                                        className={`${styles.formInput} py-2 ps-4 rounded-5 ${styles.formPaddingEnd}`}
                                        isInvalid={showErrors && !Validation.email(email)}
                                    />
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!email ? "Please enter email" : "Please enter valid email , e.g example@something.com"}
                                    </Form.Control.Feedback>

                                    {emailVerifyIcon && <Image src="./images/verifyIcon.png" alt="verifyIcon" className={`img img-fluid ${styles.verifyText}`} />}

                                    {
                                        !emailVerifyIcon && Validation.email(email) &&
                                        (
                                            !showErrors ?
                                                <span
                                                    className={`${styles.verifyEmailText}`}
                                                    onClick={sendEmailOtp}
                                                >
                                                    Verify
                                                </span>
                                                :
                                                <span
                                                    className={`${!Validation.email(email) ? styles.verifyEmailTextError : styles.verifyEmailText}`}
                                                    onClick={sendEmailOtp}
                                                >
                                                    Verify
                                                </span>
                                        )
                                    }
                                </Form.Group>
                            </Col>

                            <Col>
                                {/* <Form.Control
                                    type="text"
                                    placeholder="Country"
                                    name="countryName"
                                    onChange={handleIndividualChange}
                                    className={`${styles.formInput} py-2 px-4 rounded-5`}
                                    isInvalid={showErrors && Validation.empty(countryName)}
                                />
                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                    {!countryName && "Please enter your country"}
                                </Form.Control.Feedback> */}
                                <Select
                                    className={`${styles.formInput} px-3 rounded-5 ${showErrors && !selectedCountry && 'borderDanger'}`}
                                    options={Country.getAllCountries()}
                                    name="countryName"
                                    getOptionLabel={(options) => {
                                        return options["name"];
                                    }}
                                    placeholder="Country"
                                    getOptionValue={(options) => {
                                        return options["name"];
                                    }}
                                    value={selectedCountry}
                                    onChange={(item) => {
                                        setSelectedCountry(item);
                                        setShowErrors(false)
                                    }}
                                    isInvalid={showErrors && !selectedCountry}
                                    styles={customStyles} // Apply the custom styles
                                />
                                {showErrors && !selectedCountry && (
                                    <div className="errorMessage text-danger">Please select country.</div>
                                )}
                            </Col>
                        </Row>
                        <Row className='my-4'>
                            <Col>
                                <Form.Group className='position-relative'>
                                    {/* <Form.Control
                                        type="text"
                                        placeholder="Mobile Number"
                                        name="mobileNo"
                                        onChange={handleIndividualChange}
                                        className={`${styles.formInput} py-2 px-4 rounded-5`}
                                        isInvalid={showErrors && !Validation.number(mobileNo)}
                                        maxLength={10}
                                    /> */}

                                    <PhoneInput
                                        country='in'
                                        value={phone}
                                        name='phone'
                                        className={`rounded-5`}
                                        enableSearch={true}
                                        containerClass={``}
                                        buttonClass={`border py-1`}
                                        placeholder="9875647345"
                                        maxLength={15}
                                        isValid={(value, country) => {
                                            if (value.length > 2 && !value.match(/^(05\d\d{7})|\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/)) {
                                                return
                                                // return 'Invalid value: ' + value + ', ' + country.name;
                                            } else if (!value.length) {
                                                return
                                                // 'Please enter mobile number';
                                            } else {
                                                return true;
                                            }
                                        }}
                                        // onChange={phone => setPhone(phone)}
                                        onChange={(value, country, e, formattedValue) => handlePhoneChange(value, country, e, formattedValue)}
                                    />

                                    {/* <PhoneInput
                                        // defaultCountry='IN'
                                        placeholder="Mobile Number"
                                        value={individualPhone}
                                        onChange={setIndividualPhone}
                                        className={`${styles.formInput} py-2 px-4 rounded-5 ${styles.mobileInput}`}
                                    /> */}
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {/* {!phone ? "Please enter mobile no." : "Alphabets and/or special characters are not allowed"} */}
                                    </Form.Control.Feedback>
                                    {verifyIcon && <Image src="./images/verifyIcon.png" alt="verifyIcon" className={`img img-fluid ${styles.verifyText}`} />}
                                    {Validation.newNumberValidator(phone) && !verifyIcon && showVerify && <span className={`${showErrors ? styles.verifyTextError : styles.verifyText}`} onClick={sendOtp}>Verify</span>}
                                </Form.Group>
                                <div className='text-danger errorMessage'>
                                    {phone.length > 2 && !Validation.newNumberValidator(phone) && "Please enter valid mobile no."}
                                </div>
                            </Col>
                            <Col>
                                <Form.Group className='position-relative'>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        maxLength="15"
                                        placeholder="Create Password"
                                        name="password"
                                        onChange={handleIndividualChange}
                                        className={`${styles.formInput} ${eyeIcon1 ? styles.formPaddingEnd : ""} py-2 px-4 rounded-5`}
                                        isInvalid={showErrors && !Validation.password(password)}
                                    />
                                    {!showPassword ?
                                        eyeIcon1 &&
                                        (
                                            !showErrors ?

                                                <IoEyeOutline size={20} color='grey' className={`${styles.eye} cursor-pointer`} onClick={() => setShowPassword(true)} />
                                                :

                                                <IoEyeOutline size={20} color='grey' className={`cursor-pointer ${!Validation.password(password) ? styles.eyeError : styles.eye}`} onClick={() => setShowPassword(true)} />
                                        )
                                        :
                                        eyeIcon1 &&
                                        (
                                            !showErrors ?

                                                <FaRegEyeSlash size={20} color='grey' className={`cursor-pointer ${styles.eye}`} onClick={() => setShowPassword(false)} />
                                                :<FaRegEyeSlash size={20} color='grey' className={`cursor-pointer ${styles.eye}`} onClick={() => setShowPassword(false)} />

                                        )
                                    }
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!password ? "Please enter password " : password.length < 8 ? "Password length can't be less than 8 characters" : password.length > 15 ? "Password length can't be more than 15 characters" : "Password should contain at least 1 uppercase letter, lowercase letter, digit, special symbol."}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div id="recaptcha-container" className={`${verifyIcon ? "d-none" : ""}`} />
                        <Row className='my-4'>
                            <Col>
                                <Form.Select className={`${!gender ? "greyLabel" : styles.formInput} py-2 px-4 rounded-5`} aria-label="Default select example" name="gender" onChange={(e)=>{
                                   setGender(e.target.value)
                                }} isInvalid={showErrors && Validation.empty(gender)}>
                                    <option hidden>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                    {!gender && "Please select gender"}
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Group className='position-relative'>
                                    <Form.Control
                                        type={showPassword2 ? "text" : "password"}
                                        placeholder="Re-enter Password"
                                        maxLength="15"
                                        name="confirmPassword"
                                        onChange={handleIndividualChange}
                                        className={`${styles.formInput} ${eyeIcon2 ? styles.formPaddingEnd : ""} py-2 px-4 rounded-5`}
                                        isInvalid={showErrors && !Validation.password(confirmPassword)}
                                    />
                                    {!showPassword2 ?
                                        eyeIcon2 &&

                                        (!showErrors ?

                                                <IoEyeOutline size={20} color='grey' className={`cursor-pointer ${styles.eye}`} onClick={() => setShowPassword2(true)} />
                                                :
                                                <IoEyeOutline size={20} color='grey' className={`cursor-pointer ${!Validation.password(confirmPassword) ? styles.eyeError : styles.eye}`} onClick={() => setShowPassword2(true)} />
                                        )
                                        :
                                        eyeIcon2 &&
                                        (!showErrors ?
                                                <FaRegEyeSlash size={20} color='grey' className={`cursor-pointer ${styles.eye}`} onClick={() => setShowPassword2(false)} />
                                                :
                                                <FaRegEyeSlash size={20} color='grey' className={`cursor-pointer ${!Validation.password(confirmPassword) ? styles.eyeError : styles.eye}`} onClick={() => setShowPassword2(false)} />
                                        )
                                    }
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!confirmPassword ? "Please enter confirm password " : confirmPassword.length < 8 ? "Password length can't be less than 8 characters" : confirmPassword.length > 15 ? "Password length can't be more than 15 characters" : "Password should contain at least 1 uppercase letter, lowercase letter, digit, special symbol."}
                                        {mismatch && "Passwords don't match"}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div>
                            <Form.Group className='d-flex my-4 justify-content-center align-items-center'>
                                <Form.Check
                                    id='check'
                                    type="checkbox"
                                    className='me-3'
                                    name="checkbox"
                                    onChange={handleIndividualChange}
                                    // isInvalid={showErrors && !checkbox}
                                />
                                <div className='d-flex justify-content-center align-items-center'>
                                    <label htmlFor='check' className={`${styles.agreement}`}>
                                        I have accepted the
                                        <div
                                            className={`${styles.TnC} ms-1`}
                                            // onClick={() => router.push("/t&c")}
                                        >
                                            Terms and Conditions.
                                        </div>
                                    </label>
                                </div>
                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                    {!checkbox && 'Please agree to our terms & conditions'}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className='d-flex my-4 justify-content-center'>
                            <button
                                className={`${styles.registerButton} ${disableButton1 && "disabledButton"}`}
                                onClick={handleIndividualRegister}
                                disabled={disableButton1}
                            >
                                Register
                            </button>
                        </div>
                    </>
                }
                {
                    business && <>
                        <Row className='my-4'>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Business Name"
                                    className={`${styles.formInput} py-2 px-4 rounded-5`}
                                    name="fullName"
                                    onChange={handleBusinessChange}
                                    isInvalid={showErrors && !Validation.alphabets(fullName)}
                                />
                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                    {!fullName ? "Please enter full name" : "Digits and/or special characters are not allowed"}
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                {/* <Form.Control
                                    type="text"
                                    placeholder="Country"
                                    name="countryName"
                                    onChange={handleBusinessChange}
                                    className={`${styles.formInput} py-2 px-4 rounded-5`}
                                    isInvalid={showErrors && Validation.empty(countryName)}
                                />
                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                    {!countryName && "Please enter your country"}
                                </Form.Control.Feedback> */}
                                <Select
                                    className={`${styles.formInput} px-3 rounded-5 ${showErrors && !selectedCountry && 'borderDanger'}`}
                                    options={Country.getAllCountries()}
                                    name="countryName"
                                    getOptionLabel={(options) => {
                                        return options["name"];
                                    }}
                                    placeholder="Country"
                                    getOptionValue={(options) => {
                                        return options["name"];
                                    }}
                                    value={selectedCountry}
                                    onChange={(item) => {
                                        setSelectedCountry(item);
                                        setShowErrors(false)
                                    }}
                                    isInvalid={showErrors && !selectedCountry}
                                    styles={customStyles} // Apply the custom styles
                                />
                                {showErrors && !selectedCountry && (
                                    <div className="errorMessage text-danger">Please select country.</div>
                                )}
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col>
                                <Form.Group className="position-relative">
                                    <Form.Control
                                        type="text"
                                        placeholder="Business Email"
                                        className={`${styles.formInput} ${styles.formPaddingEnd} py-2 px-4 rounded-5`}
                                        name="email"
                                        onChange={handleBusinessChange}
                                        isInvalid={showErrors && !Validation.email(email)}
                                    />
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!email ? "Please enter email" : "Please enter valid email , e.g example@something.com"}
                                    </Form.Control.Feedback>
                                    {emailVerifyIcon && <Image src="./images/verifyIcon.png" alt="verifyIcon" className={`img img-fluid ${styles.verifyText}`} />}
                                    {!emailVerifyIcon && Validation.email(email) && <span className={`${showErrors ? styles.verifyEmailTextError : styles.verifyEmailText}`} onClick={sendEmailOtp}>Verify</span>}
                                </Form.Group>
                            </Col>
                            <Col className='position-relative'>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create Password"
                                    className={`${styles.formInput} ${eyeIcon1 ? styles.formPaddingEnd : ""} py-2 px-4 rounded-5`}
                                    name="password"
                                    maxLength="15"
                                    onChange={handleBusinessChange}
                                    isInvalid={showErrors && !Validation.password(password)}
                                />
                                {!showPassword ?
                                    eyeIcon1 &&
                                    (
                                        !showErrors ?
                                            <IoEyeOutline size={20} color='grey' className={`cursor-pointer ${styles.eye}`} onClick={() => setShowPassword(true)} />
                                            :
                                            <IoEyeOutline size={20} color='grey' className={`cursor-pointer ${!Validation.password(password) ? styles.eyeError : styles.eye}`} onClick={() => setShowPassword(true)} />
                                    )
                                    :
                                    eyeIcon1 &&
                                    (
                                        !showErrors ?
                                            <FaRegEyeSlash size={20} color='grey' className={`cursor-pointer ${styles.eye}`} onClick={() => setShowPassword(false)} />
                                            :
                                            <FaRegEyeSlash size={20} color='grey' className={`cursor-pointer ${!Validation.password(password) ? styles.eyeError : styles.eye}`} onClick={() => setShowPassword(false)} />
                                    )
                                }
                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                    {!password ? "Please enter password " : password.length < 8 ? "Password length can't be less than 8 characters" : password.length > 15 ? "Password length can't be more than 15 characters" : "Password should contain at least one uppercase letter, lowercase letter, digit,special symbol."}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="my-4">
                            <Col className='position-relative'>
                                {/* <Form.Control
                                    type="text"
                                    placeholder="Business Mobile Number"
                                    className={`${styles.formInput} py-2 px-4 rounded-5`}
                                    name="mobileNo"
                                    onChange={handleBusinessChange}
                                    isInvalid={showErrors && !Validation.number(mobileNo)}
                                    maxLength={10}
                                /> */}
                                <PhoneInput
                                    country='in'
                                    value={phone}
                                    name='phone'
                                    className={`rounded-5 position-relative`}
                                    enableSearch={true}
                                    containerClass={``}
                                    buttonClass={`border py-1`}
                                    placeholder="9875647345"
                                    maxLength={15}
                                    isValid={(value, country) => {
                                        if (value.length > 2 && !value.match(/^(05\d\d{7})|\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/)) {
                                            return
                                            // return 'Invalid value: ' + value + ', ' + country.name;
                                        } else if (!value.length) {
                                            return
                                            // 'Please enter mobile number';
                                        } else {
                                            return true;
                                        }
                                    }}
                                    // onChange={phone => setPhone(phone)}
                                    onChange={(value, country, e, formattedValue) => handlePhoneChange(value, country, e, formattedValue)}
                                />
                                <div className='text-danger errorMessage'>
                                    {phone.length > 2 && !Validation.newNumberValidator(phone) && "Please enter valid mobile no."}
                                </div>
                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                    {!phone ? "Please enter mobile no." : "Alphabets and/or special characters are not allowed"}
                                </Form.Control.Feedback>
                                {verifyIcon && <Image src="./images/verifyIcon.png" alt="verify icon" className={`img img-fluid ${styles.verifyText}`} />}
                                {Validation.newNumberValidator(phone) && !verifyIcon && showVerify && <span className={`${styles.verifyText}`} onClick={sendOtp}>Verify</span>}
                            </Col>
                            <Col className='position-relative'>
                                <Form.Control
                                    type={showPassword2 ? "text" : "password"}
                                    placeholder="Re-enter Password"
                                    maxLength="15"
                                    className={`${styles.formInput} ${eyeIcon2 ? styles.formPaddingEnd : ""} py-2 px-4 rounded-5`}
                                    name="confirmPassword"
                                    onChange={handleBusinessChange}
                                    isInvalid={showErrors && !Validation.password(confirmPassword)}
                                />
                                {!showPassword2 ?
                                    eyeIcon2 &&
                                    (
                                        !showErrors ?
                                            <IoEyeOutline size={20} color='grey' className={`cursor-pointer ${styles.eye}`} onClick={() => setShowPassword2(true)} />
                                            :
                                            <IoEyeOutline size={20} color='grey' className={`cursor-pointer ${!Validation.password(confirmPassword) ? styles.eyeError : styles.eye}`} onClick={() => setShowPassword2(true)} />
                                    )
                                    :
                                    eyeIcon2 &&

                                    (
                                        !showErrors ?
                                            <FaRegEyeSlash size={20} color='grey' className={`cursor-pointer ${styles.eye}`} onClick={() => setShowPassword2(false)} />
                                            :
                                            <FaRegEyeSlash size={20} color='grey' className={`cursor-pointer ${!Validation.password(confirmPassword) ? styles.eyeError : styles.eye}`} onClick={() => setShowPassword2(false)} />
                                    )
                                }
                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                    {!confirmPassword ? "Please enter confirm password " : confirmPassword.length < 8 ? "Password length can't be less than 8 characters" : confirmPassword.length > 15 ? "Password length can't be more than 15 characters" : "Password should contain at least one uppercase letter, lowercase letter, digit,special symbol."}
                                    {mismatch && "Passwords don't match"}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <div id="recaptcha-container" className={`${verifyIcon ? "d-none" : ""}`} />
                        <Row className="my-4">
                            <Col md={6} lg={6} sm={6} xs={6}>
                                {/* <Form.Control
                                    type="text"
                                    placeholder="Location"
                                    className={`${styles.formInput} py-2 px-4 rounded-5`}
                                    name="location"
                                    onChange={handleBusinessChange}
                                    isInvalid={showErrors && Validation.empty(location)}
                                />
                                <Form.Control.Feedback type="invalid" className="errorMessage">
                                    {!location && "Please enter location"}
                                </Form.Control.Feedback> */}
                                <LoadScript
                                    googleMapsApiKey="AIzaSyD9HAzCj-r9Zw8dZnQWkNgrkewOc4aRjGc"
                                    libraries={["places"]} // Add "places" library
                                >
                                    <StandaloneSearchBox
                                        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                        onUnmount={(auto) => (autocompleteRef.current = null)}
                                        onPlacesChanged={handlePlaceChanged}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Location"
                                            className={`px-4 ${styles.formInput} py-2 rounded-5 w-100 ${showErrors && !selectedPlace && styles.borderDanger}`}
                                            value={selectedPlace} // Use 'selectedPlace' state instead of 'location' from 'data'
                                            name="location" // Set the name to "location" to update the 'selectedPlace' state
                                            onChange={handleBusinessChange} // Handle changes in the input field
                                            style={{
                                                outline: "none",
                                                padding: "",
                                                textOverflow: "ellipsis",
                                                fontSize: '16px',
                                                border: '1px solid #E0E0E0'
                                            }}
                                            isInvalid={showErrors && !selectedPlace}
                                        />
                                    </StandaloneSearchBox>
                                </LoadScript>
                                {showErrors && !selectedPlace && (
                                    <div className="errorMessage text-danger">Please enter location.</div>
                                )}
                            </Col>
                        </Row>
                        <div className='d-flex my-4 justify-content-center'>
                            <Form.Check
                                id='check'
                                type="checkbox"
                                className='me-3'
                                name="checkbox"
                                onChange={handleIndividualChange}
                                // isInvalid={showErrors && !checkbox}
                            />
                            <div className='d-flex justify-content-center align-items-center'>
                                <label htmlFor='check' className={`${styles.agreement}`}>
                                    I have accepted the
                                    <div
                                        className={`${styles.TnC} ms-1`}
                                        // onClick={() => router.push("/t&c")}
                                    >
                                        Terms and Conditions.
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className='d-flex my-4 justify-content-center'>
                            {/* <button className={`${styles.registerButton}`} onClick={handleBusinessRegister}>Register</button> */}
                            <button
                                className={`${styles.registerButton} ${disableButton2 && "disabledButton"}`}
                                onClick={handleBusinessRegister}
                                disabled={disableButton2}
                            >
                                Register
                            </button>
                        </div>
                    </>
                }
            </Container>
        </>
    )
}
