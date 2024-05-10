import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, Modal, Row, Table } from 'react-bootstrap';
import Icons from './Icons';
// import { IconTrash } from 'tabler-icons';
import API from '../../../helpers/api';
import { handleErrorMessage } from '../../../utils/CommonFunctions';
import { Toaster, toast } from 'react-hot-toast';
import { getCardDetails } from '../../../store/actions/client-action/Payment';
import { useDispatch } from 'react-redux';

export default function CardDetails({ style, styles, style1, style2, cardDetails, paymentMethodsList, detectCardType }) {

    const { defaultCardId } = cardDetails;
    const [deleteModal, setDeleteModal] = useState(null);
    const [defaultModal, setDefaultModal] = useState(null);
    const dispatch = useDispatch();

    const handleDeleteCard = () => {
        API.apiPost('deleteCard', {
            paymentMethodId: deleteModal
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
                    dispatch(getCardDetails())
                    setDeleteModal(null);
                }
            })
            .catch((err) => {
                handleErrorMessage(err);
            })
    }

    const handleDefaultCard = () => {
        API.apiPost('setDefaultCard', {
            paymentMethodId: defaultModal
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
                    dispatch(getCardDetails())
                    setDefaultModal(null);
                }
            })
            .catch((err) => {
                handleErrorMessage(err);
            })
    }

    return (
        <>
            <Toaster />
            <Modal centered show={deleteModal} onHide={() => setDeleteModal(null)} backdrop="static">
                <Modal.Body>
                    <div className='text-center px-5 py-3'>
                        <p className={`${style.deleteJobTitle}`}>Delete saved Card?</p>
                        <p className={`${style.deleteJobDesc}`}>Are you sure you want to delete this saved card this action can't be undone</p>
                        <div>
                            <button className={`${styles.noButton} me-3 py-2 px-4`} onClick={() => setDeleteModal(null)}>No</button>
                            <button className={`${styles.deleteButton} py-2 px-4`} onClick={() => handleDeleteCard()}>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal centered show={defaultModal} onHide={() => setDefaultModal(null)} backdrop="static">
                <Modal.Body>
                    <div className='text-center px-5 py-3'>
                        <p className={`${style.deleteJobTitle}`}>Set default Card?</p>
                        <p className={`${style.deleteJobDesc}`}>Are you sure you want to mark this card default</p>
                        <div>
                            <button className={`${styles.noButton} me-3 py-2 px-4`} onClick={() => setDefaultModal(null)}>No</button>
                            <button className={`${styles.deleteButton} py-2 px-4`} onClick={() => handleDefaultCard()}>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Container className='pb-3'>
                {
                    paymentMethodsList && paymentMethodsList?.data?.map((item, index) => (
                        <>
                            <Row className={`d-flex justify-content-between align-items-center mx-0 px-0 flex-wrap ${styles.table}`}>
                                <Col xs={12} sm={6} md={4} lg={1} xl={1} className='px-0 my-2 text-start'>
                                    <Image
                                        src={Icons[item?.card?.brand]}
                                        className='img img-fluid'
                                        height={45}
                                        width={50}
                                    />
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={3} xl={2} className='px-0 my-2'>
                                    <p className={`${styles.cardNum} my-0`}>
                                        {
                                            ".... .... .... " + item?.card?.last4
                                        }
                                    </p>
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={2} xl={2} className='px-0 my-2'>
                                    <p className={`${styles.cardNum} my-0`}>
                                        {
                                            item?.billing_details?.name
                                        }
                                    </p>
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={2} xl={2} className='px-0 my-2'>
                                    <p className={`${styles.cardNum} my-0`}>
                                        {
                                            item?.card?.exp_month + '/' + item?.card?.exp_year
                                        }
                                    </p>
                                </Col>
                                {/* <Col xs={12} sm={6} md={4} lg={2} xl={2} className='px-0 my-2'>
                                    <div className={`${styles.cardNum} my-0`}>
                                        <span className={`${styles.cvv} px-4 py-1`}>
                                            CVV
                                        </span>
                                    </div>
                                </Col> */}
                                <Col xs={12} sm={6} md={4} lg={2} xl={2} className='px-0 my-2'>
                                    <div className='position-relative'>
                                        <div
                                            className={`px-0 text-center ${item?.id === defaultCardId ? styles.default : styles.defaultOuter} py-2`}
                                            onClick={() => item?.id !== defaultCardId && setDefaultModal(item?.id)}
                                        >
                                            <p className={`${styles.cadNum} my-0`}>
                                                Default
                                            </p>
                                        </div>
                                        <Image
                                            src='./images/greenDot.png'
                                            className={`${item?.id === defaultCardId ? styles.greenDotImg : 'd-none'}`}
                                        />
                                    </div>
                                </Col>

                                <Col xs={12} sm={6} md={4} lg={1} xl={1} className='px-0 my-2'>
                                    <div
                                        className={`d-flex justify-content-center align-items-center ${styles.btn} px-2 py-1`}
                                        // ${item?.id === defaultCardId && 'disabledButton'} if we dont want to delete the default card
                                        onClick={() =>
                                            //  item?.id !== defaultCardId && //if we dont want to delete the default card
                                            setDeleteModal(item?.id)}
                                    >
                                        {/* <IconTrash
                                            size={17}
                                            color='white'
                                        /> */}
                                        <p className={`my-0`}>
                                            Delete
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            <hr className={` mx-2 ${index + 1 == paymentMethodsList?.data?.length ? 'd-none' : style1.hr}`} />
                        </>
                    ))
                }

            </Container>
        </>
    )
}