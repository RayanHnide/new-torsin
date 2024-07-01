 import React, { useEffect, useState } from 'react';
import styles from '../../../stylesheet/payment.module.scss';
import style from "../../../stylesheet/publish.module.scss";
import style1 from "../../../stylesheet/dashboard.module.scss";
import style2 from '../../../stylesheet/contracts.module.scss';
import { Col, Container, Form, Image, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import Moment from 'react-moment';
import Icons from './Icons';
import API from '../../../helpers/api';
import { handleErrorMessage } from '../../../utils/CommonFunctions';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getCardDetails } from '../../../store/actions/client-action/Payment';
import CardDetails from './CardDetails';
import * as stripe from "stripe";
export default function index() {





    const [addCardModal, setAddCardModal] = useState(false);
    const dispatch = useDispatch();

    const [cardDetails] = useSelector((Gstate) => [Gstate.PaymentReducers?.cardDetails])
    const { defaultCardId, paymentMethodsList } = cardDetails || {}

    useEffect(() => {       
        dispatch(getCardDetails())
    }, [paymentMethodsList?.data?.length])

    const validationSchema = yup.object().shape({
        cardNumber: yup
            .string()
            .required('Card number is required')
            .test('valid-card-number', 'Card number should only contain digits and spaces', (value) => {
                const cardNumberWithoutSpaces = value.replace(/\s/g, '');
                return /^[0-9\s]+$/.test(cardNumberWithoutSpaces);
            })
            .test('valid-card-number-length', 'The card number should be between 14 and 16 digits', (value) => {
                const cardNumberWithoutSpaces = value.replace(/\s/g, '');
                return cardNumberWithoutSpaces.length >= 13 && cardNumberWithoutSpaces.length <= 16;
            }),




        expiryDate: yup
            .string()
            .required('Expiry date is required')
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date'),

        cvv: yup
            .string()
            .required('CVV is required')
            .test('valid-cvv', "Special characters and alphabets aren't allowed", (value) => {
                return /^[0-9]+$/.test(value);
            })
            .test('valid-cvv-length', 'CVV should be 3 digits long', (value) => {
                return value.length === 3;
            }),

        name: yup
            .string()
            .required('Name on card is required')
            .matches(/^[a-zA-Z\s]+$/, "Numbers and special characters aren't allowed")
            .min(3, 'Minimum name length is 3 characters')
            .max(30, 'Maximum name length is 30 characters'),
    });

    const handleSubmit = (values) => {

        const data = {
            cardNumber: String(values.cardNumber.replace(/\s/g, '')),
            exp_month: String(values.expiryDate.split('/')[0]),
            exp_year: String(20 + '' + Number(values.expiryDate.split('/')[1])),
            cvc: String(values.cvv),
            name: values.name,
            isDefault: values.isDefault ? 1 : 0,
        }
        API.apiPost("addCard", (data))
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
                    setAddCardModal(false);
                    dispatch(getCardDetails())
                }
            })
            .catch((err) => {
                handleErrorMessage(err);
            });
    };

    const detectCardType = (cardNumber) => {
        const cardTypes = [
            {
                type: 'visa',
                pattern: /^4/,
            },
            {
                type: 'mastercard',
                pattern: /^5[1-5]/,
            },
            {
                type: 'cvc_amex',
                pattern: /^3[47]/,
            },
            {
                type: 'discover',
                pattern: /^(6011|65|64[4-9]|622)/,
            },
            {
                type: 'jcb',
                pattern: /^35/,
            },
            {
                type: 'diners-club',
                pattern: /^36/,
            },
            // Add more card types as needed
        ];

        for (const cardType of cardTypes) {
            if (cardNumber.match(cardType.pattern)) {
                return cardType.type;
            }
        }

        return 'placeholder';
    };

    const handleChangeExpiryDate = (event, setFieldValue) => {
        const { value } = event.target;
        const formattedValue = value.replace(/[^0-9]/g, '');

        if (formattedValue.length <= 2) {
            setFieldValue('expiryDate', formattedValue);
        } else if (formattedValue.length === 3) {
            if (formattedValue.charAt(2) !== '/') {
                const formattedDate = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
                setFieldValue('expiryDate', formattedDate);
            } else {
                setFieldValue('expiryDate', formattedValue);
            }
        } else if (formattedValue.length > 3) {
            const month = formattedValue.slice(0, 2);
            const year = formattedValue.slice(2, 4);
            const formattedDate = month + '/' + year;
            setFieldValue('expiryDate', formattedDate);
        }
    };

    return (
        <>
            <Toaster />
            <Modal
                centered
                contentClassName={`${styles.modalOuter} px-4`}
                show={addCardModal}
                onHide={() => setAddCardModal(false)}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p className={`${styles.modalTitle} mb-0 mt-2`}>
                            Enter Card Information
                        </p>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className={`${styles.cardNum}`}>
                        Card number
                    </p>
                    <Formik
                        initialValues={{
                            cardNumber: '',
                            expiryDate: '',
                            cvv: '',
                            cardType: "placeholder",
                            name: '',
                            isDefault: false,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
                            <Form>
                                <Form.Group className="my-2 position-relative">
                                    <Form.Control
                                        type="text"
                                        placeholder="0000-0000-0000-0000"
                                        className={`${style.formInput} p-3`}
                                        name="cardNumber"
                                        value={values.cardNumber}
                                        onChange={(event) => {                                            
                                            const formattedText = event.target.value
                                                .replace(/\s/g, "")
                                                .replace(/(\d{4})/g, "$1 ")
                                                .trim()
                                            handleChange("cardNumber")(formattedText)
                                            const cardType = detectCardType(formattedText)
                                            handleChange("cardType")(cardType)
                                        }}
                                        isInvalid={!!errors.cardNumber}
                                        maxLength={19}
                                    />
                                    <Image
                                        src={Icons[values.cardType]}
                                        className={`${styles.cardImage}`}
                                        height={45}
                                        width={60}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.cardNumber}</Form.Control.Feedback>
                                </Form.Group>

                                <Row>
                                    <Col md={7}>
                                        <Form.Group className="my-2">
                                            <Form.Control
                                                type="text"
                                                placeholder="MM/YY"
                                                className={`${style.formInput} p-3`}
                                                name="expiryDate"
                                                value={values.expiryDate}
                                                // onChange={handleChange}
                                                onChange={(event) => handleChangeExpiryDate(event, setFieldValue)}
                                                isInvalid={!!errors.expiryDate}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.expiryDate}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={5}>
                                        <Form.Group className="my-2">
                                            <Form.Control
                                                type="text"
                                                placeholder="CVV"
                                                className={`${style.formInput} p-3`}
                                                name="cvv"
                                                value={values.cvv}
                                                onChange={handleChange}
                                                isInvalid={!!errors.cvv}
                                                maxLength={3}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.cvv}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="my-2">
                                    <Form.Control
                                        type="text"
                                        placeholder="Name on Card"
                                        className={`${style.formInput} p-3`}
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className='my-4'>
                                    <Form.Check
                                        inline
                                        label="Set as Default Payment Method"
                                        name="isDefault"
                                        type='checkbox'
                                        className={`${style.publishJobTitle} ${styles.checkbox}`}
                                        id={`inline-1`}
                                        style={{ color: "#0C0900" }}
                                        checked={values.isDefault}
                                        onChange={(event) => {
                                            const value = event.target.checked ? 1 : 0;
                                            setFieldValue("isDefault", value);
                                        }}
                                    />
                                </Form.Group>

                                <div onClick={handleSubmit} className={`text-center ${styles.btnOuter} py-3 d-flex justify-content-center align-items-center my-4`}>
                                    <p className='my-0'>
                                        Save
                                    </p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>

            </Modal>

            <div className={`${style.publishNav}`}>
                <Row className='d-flex justify-content-between align-items-center'>
                    <Col className='my-2'>
                        <p className={`${style1.dashboardTitle} my-0`}>
                            Payment
                        </p>
                    </Col>
                </Row>
            </div>

            {!paymentMethodsList?.data?.length ?
                <>
                    <Container className={`${style2.cardsOuter} my-1`}>
                        <div className={`d-flex flex-wrap justify-content-between align-items-center py-3 px-2`}>
                            <div>
                                <p className={`text-break ${style1.allProposalsTitle} my-0 py-2`}>
                                    Payment Methods
                                </p>
                                <p className={`text-break ${style1.formInputColor} ${style1.allProposalsTitle} my-0 py-2`}>
                                    Select the payment method
                                </p>
                            </div>
                            <div>

                                <div
                                    className={`${style.publishButton} text-center d-flex justify-content-center align-items-center px-5 py-3`}
                                    onClick={() => setAddCardModal(true)}
                                >
                                    <span>
                                        <Image src='/images/addJobIcon.png' className='img img-fluid' alt='publish a job' />
                                    </span>
                                    <span> Add new card </span>
                                </div>
                            </div>
                        </div>
                    </Container>

                    <Container className='d-flex justify-content-center align-items-center mt-5'>
                        <Image src='/images/emptyPayment.png' className='img img-fluid' />
                    </Container>
                </>
                :
                <>
                    <Container className={`${style2.cardsOuter} my-1`}>
                        <div className={`d-flex flex-wrap justify-content-between align-items-center py-3 px-2`}>
                            <div>
                                <p className={`text-break ${style1.allProposalsTitle} my-0 py-2`}>
                                    Payment Methods
                                </p>
                                <p className={`text-break ${style1.formInputColor} ${style1.allProposalsTitle} my-0 py-2`}>
                                    Select the payment method
                                </p>
                            </div>
                            <div>
                                <div
                                    className={`${style.publishButton} text-center d-flex justify-content-center align-items-center px-5 py-3`}
                                    onClick={() => setAddCardModal(true)}
                                >
                                    <span>
                                        <Image src='/images/addJobIcon.png' className='img img-fluid' alt='publish a job' />
                                    </span>
                                    <span> Add new card </span>
                                </div>
                            </div>
                        </div>
                        <hr className={`mt-0 mx-2 ${style1.hr}`} />
                        <CardDetails
                            style={style}
                            styles={styles}
                            style1={style1}
                            style2={style2}
                            detectCardType={detectCardType}
                            cardDetails={cardDetails}
                            paymentMethodsList={paymentMethodsList}
                        />
                    </Container>
                </>
            }
        </>
    )



    
}
