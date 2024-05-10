import React, { useState } from 'react'
import { Col, Container, Form, Image, Modal, Row } from 'react-bootstrap'
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
 import { FiChevronsLeft} from "react-icons/fi";
import API from '../../helpers/api';
import { handleErrorMessage } from '../../utils/CommonFunctions'
import { getNotificationsList } from '../../store/actions/notifications';

export default function ViewContractDetails({ style, contractStyle, style1, styles, contractDetails, setViewPage, admin_percentage }) {

    const [adminPercentage] = admin_percentage;

    const totalPrice = contractDetails?.milestoneData && contractDetails.milestoneData.reduce((total, milestone) => total + parseFloat(milestone.price), 0);
    const torsinFee = totalPrice * 0.01 * adminPercentage.adminPercentage;
    const receivingAmount = totalPrice - torsinFee;
    const [rejectModal, setRejectModal] = useState(false);
    const [acceptModal, setAcceptModal] = useState(false);
    const dispatch = useDispatch();

    const handleRejectContract = () => {
        const contractId = contractDetails?.contractId;

        API.apiPatch(`talent/update_contract_status/${contractId}/`, {
            'status': parseInt(2)
        })
            .then((response) => {
                if (response) {
                    toast.success(response?.data?.message?.successMessage, {
                        position: "top-right",
                        style: {
                            borderBottom: '4px solid #33a34e',
                            padding: "16px",
                            color: "#3c5f4b",
                            marginRight: "25px",
                        },
                    });
                }
                setRejectModal(false);
                setViewPage(null);
                dispatch(getNotificationsList())
            })
            .catch((err) => {
                handleErrorMessage(err);
            });
    }

    const handleAcceptContract = () => {
        const contractId = contractDetails?.contractId;

        API.apiPatch(`talent/update_contract_status/${contractId}/`, {
            'status': parseInt(1)
        })
            .then((response) => {
                if (response) {
                    toast.success(response?.data?.message?.successMessage, {
                        position: "top-right",
                        style: {
                            borderBottom: '4px solid #33a34e',
                            padding: "16px",
                            color: "#3c5f4b",
                            marginRight: "25px",
                        },
                    });
                }
                setAcceptModal(false);
                setViewPage(null);
                dispatch(getNotificationsList())
            }
            )
            .catch((err) => {
                handleErrorMessage(err);
            });
    }

    return (
        <>
            <Toaster />

            <Modal centered show={rejectModal} onHide={() => setRejectModal(false)} backdrop="static">
                <Modal.Body>
                    <div className='text-center px-5 py-3'>
                        <p className={`${style.deleteJobTitle}`}>Reject Contract?</p>
                        <p className={`${style.deleteJobDesc}`}>Are you sure you want to reject this contract</p>
                        <div className='d-flex justify-content-center align-items-center'>
                            <button className={`${contractStyle.noBtn} mt-2 me-5 fs-5`} onClick={() => setRejectModal(false)}>No</button>
                            <button className={`${contractStyle.createButton} text-white px-5 py-2 mt-2 fs-5`} onClick={handleRejectContract}>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal centered show={acceptModal} onHide={() => setAcceptModal(false)} backdrop="static">
                <Modal.Body>
                    <div className='text-center px-5 py-3'>
                        <p className={`${style.deleteJobTitle}`}>Accept Contract?</p>
                        <p className={`${style.deleteJobDesc}`}>Are you sure you want to accept this contract</p>
                        <div className='d-flex justify-content-center align-items-center'>
                            <button className={`${contractStyle.noBtn} mt-2 me-5 fs-5`} onClick={() => setAcceptModal(false)}>No</button>
                            <button className={`${contractStyle.createButton} text-white px-5 py-2 mt-2 fs-5`} onClick={handleAcceptContract}>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <div className={`d-flex justify-content-start align-items-center ${style1.publishNav} mb-2 pt-4`}>
                <span className='me-2' role='button'>
                    <FiChevronsLeft onClick={() => setViewPage(null)} />
                </span>
                <span className={`${style1.viewJob} mx-2`}>
                    View Contract
                </span>
                {
                    contractDetails &&
                    (
                        contractDetails?.status == '1' ||
                        contractDetails?.status == '2' ||
                        contractDetails?.status == '3'
                    )
                    &&
                    <>
                        <span className='mb-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-math-greater" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M5 18l14 -6l-14 -6"></path>
                            </svg>
                        </span>
                        <span className={`${style1.viewJob} mx-2`}>
                            {
                                contractDetails?.status == '1' ?
                                    'Accepted'
                                    :
                                    contractDetails?.status == '2' ?
                                        'Rejected'
                                        :
                                        contractDetails?.status == '3' &&
                                        'Archived'
                            }
                        </span>
                    </>
                }
            </div>

            <Container>
                <Row className={``}>
                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label className={`${style.skillsLabel}`}>
                            Client Email Address
                        </Form.Label>
                        <Form.Control
                            type="text"
                            disabled
                            className={`${style.skillsFormInput} ${style.formSelect} ${style.formInputColor} p-3 bg-white`}
                            value={contractDetails?.clientEmail}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='contract-name' className='my-2'>
                        <Form.Label className={`${style.skillsLabel}`}>
                            Contract Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            disabled
                            className={`${style.skillsFormInput} ${style.formSelect} p-3 ${style.formInputColor} bg-white`}
                            value={contractDetails?.jobName}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label className={`${style.skillsLabel}`}>
                            Description
                        </Form.Label>
                        <Form.Control
                            as='textarea'
                            rows="4"
                            name="desc"
                            placeholder='Write a short description about the contract'
                            className={`${style.skillsFormInput} ${style.formInputColor} p-3 bg-white`}
                            disabled
                            value={contractDetails?.description}
                        />
                    </Form.Group>

                    <Form.Group controlId="contract-type" className='my-2'>
                        <Form.Label className={`${style.skillsLabel}`}>Contract type</Form.Label>
                        <Form.Control
                            required
                            as="select"
                            type="select"
                            className={`${style.skillsFormInput} ${style.formSelect} ${style.formInputColor} p-3 bg-white`}
                            name="contractType"
                            disabled
                            value={contractDetails?.contractType}
                        >
                            <option hidden className={``}>Select</option>
                            <option value="2" className={`${style.chargeOption}`}>Hourly</option>
                            <option value="1" className={`${style.chargeOption}`}>Fixed</option>
                        </Form.Control>
                    </Form.Group>

                    {
                        contractDetails?.contractType == '2' ?
                            <>
                                <Form.Group controlId='hourly-rate' className='my-2'>
                                    <Form.Label className={`${style.skillsLabel}`}>
                                        Hourly rate
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='$100 /hr'
                                        className={`${style.skillsFormInput} ${style.formInputColor} p-3 bg-white`}
                                        name='amount'
                                        disabled
                                        value={"$" + contractDetails?.amount}
                                    />
                                </Form.Group>

                                <Form.Group controlId='hourly-rate' className='my-2'>
                                    <Form.Label className={`${style.skillsLabel}`}>
                                        Duration
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='duration'
                                        className={`${style.skillsFormInput} ${style.formInputColor} p-3 bg-white`}
                                        name='duration'
                                        disabled
                                        value={contractDetails?.timeDuration}
                                    />
                                </Form.Group>

                                <Form.Group controlId='torsin-fee' className='my-2'>
                                    <Form.Label className={`${style.skillsLabel}`}>
                                        {adminPercentage?.adminPercentage}
                                        % Torsin Fee
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='$3,4 /hr'
                                        className={`${style.skillsFormInput} ${style.formInputColor} p-3 bg-white`}
                                        name='torsin_rate'
                                        disabled
                                        value={"$" + contractDetails?.torsinRate}
                                    />
                                </Form.Group>

                                <Form.Group controlId='receive' className='my-2'>
                                    <Form.Label className={`${style.skillsLabel}`}>
                                        You'll Receive
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='$96.6 /hr'
                                        className={`${style.skillsFormInput} ${style.formInputColor} p-3 bg-white`}
                                        name='received_amount'
                                        disabled
                                        value={"$" + contractDetails?.receivedAmount}
                                    />

                                </Form.Group>

                                <Form.Group className='my-2'>
                                    <Form.Label className={`${style.skillsLabel}`}>
                                        End Date
                                    </Form.Label>
                                    <div>
                                        <Form.Label
                                            htmlFor='undefined'
                                            className={`${style.skillsLabel}`}
                                        >
                                            <input
                                                type="radio"
                                                className='me-3'
                                                id="undefined"
                                                name="end_date"
                                                value="1"
                                                readOnly
                                                checked={contractDetails?.endDate == '1'}
                                            />
                                            Undefined
                                        </Form.Label>
                                    </div>
                                    <div>
                                        <Form.Label
                                            htmlFor='specific'
                                            className={`${style.skillsLabel}`}
                                        >
                                            <input
                                                type="radio"
                                                className='me-3'
                                                id="specific"
                                                name="end_date"
                                                value="2"
                                                readOnly
                                                checked={contractDetails?.endDate == '2'}
                                            />
                                            Specific Date
                                        </Form.Label>
                                    </div>
                                </Form.Group>

                                {
                                    contractDetails?.endDate == '2' &&
                                    <Form.Group>
                                        <Form.Control
                                            placeholder=''
                                            type='date'
                                            name='specific_date'
                                            value={contractDetails?.specificDate}
                                            className={`${style.skillsFormInput} p-3`}
                                        />
                                    </Form.Group>
                                }
                            </>
                            :

                            <>
                                {contractDetails?.milestoneData?.length ?
                                    <div>
                                        <hr className={` ${style1.hr}`} />
                                        <div className='text-center'>
                                            <p className={`my-0 text-align-center`}>
                                                Milestones
                                            </p>
                                        </div>
                                        <hr className={` ${style1.hr}`} />

                                        {contractDetails?.milestoneData.map((milestone, index) => (
                                            <>
                                                <div key={index} className={`${contractStyle.milestoneBoxOuter} my-4`}>
                                                    <Container className='px-4 py-3'>
                                                        <Form.Group controlId={`milestone-name-${index}`} className='mb-2'>
                                                            <Form.Label className={`${style.skillsLabel}`}>
                                                                Milestone Name
                                                            </Form.Label>
                                                            <Form.Control
                                                                type='text'
                                                                placeholder='Enter name'
                                                                className={`${style.skillsFormInput} p-3 ${style.formInputColor} bg-white`}
                                                                value={milestone.name}
                                                                name='name'
                                                                disabled
                                                            />
                                                        </Form.Group>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group controlId={`milestone-start-date-${index}`} className='my-2'>
                                                                    <Form.Label className={`${style.skillsLabel}`}>
                                                                        Start Date
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type='date'
                                                                        placeholder='01/01/2023'
                                                                        name='start_date'
                                                                        className={`${style.skillsFormInput} p-3 ${style.formInputColor} bg-white`}
                                                                        value={milestone.startDate}
                                                                        disabled
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group controlId={`milestone-end-date-${index}`} className='my-2'>
                                                                    <Form.Label className={`${style.skillsLabel}`}>
                                                                        End Date
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type='date'
                                                                        placeholder='01/01/2023'
                                                                        name='end_date'
                                                                        className={`${style.skillsFormInput} p-3 ${style.formInputColor} bg-white`}
                                                                        disabled
                                                                        min={milestone.startDate}
                                                                        value={milestone.endDate}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Form.Group controlId={`milestone-price-${index}`} className='my-2'>
                                                            <Form.Label className={`${style.skillsLabel}`}>
                                                                Milestone Price
                                                            </Form.Label>
                                                            <Form.Control
                                                                type='text'
                                                                placeholder='Enter amount'
                                                                className={`${style.skillsFormInput} p-3 ${style.formInputColor} bg-white`}
                                                                value={"$" + milestone.price}
                                                                disabled
                                                                name='price'
                                                            />
                                                        </Form.Group>
                                                    </Container>
                                                </div>
                                                <hr className={`${style1.hr}`} />

                                                {milestone?.length >= 1 && <div className={`d-flex justify-content-between align-items-center`}>
                                                    <p className={`${style.skillsLabel}`}>
                                                        Milestone Price
                                                    </p>
                                                    <p className={`${style.skillsLabel} text-muted`}>
                                                        $0.00
                                                    </p>
                                                </div>}
                                            </>
                                        ))}

                                        <div className={`d-flex justify-content-between align-items-center`}>
                                            <p className={`${style.skillsLabel}`}>
                                                Amount
                                            </p>
                                            <p className={`${style.skillsLabel} text-muted`}>
                                                ${totalPrice}
                                            </p>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <div className={`d-flex justify-content-between align-items-center mt-3`}>
                                            <p className={`${style.skillsLabel}`}>
                                                Amount
                                            </p>
                                            <p className={`${style.skillsLabel} text-muted`}>
                                                ${contractDetails?.amount}
                                            </p>
                                        </div>
                                    </>
                                }
                                <div className={`d-flex justify-content-between align-items-center`}>
                                    <p className={`${style.skillsLabel}`}>
                                        {adminPercentage?.adminPercentage}
                                        % Torsin Fee
                                    </p>
                                    <p className={`${style.skillsLabel} text-muted`}>
                                        ${!contractDetails?.milestoneData?.length ? contractDetails?.torsinRate : torsinFee}
                                    </p>
                                </div>

                                <div className={`d-flex justify-content-between align-items-center`}>
                                    <p className={`${style.deleteJobTitle} text-black`}>
                                        You'll Receive
                                    </p>
                                    <p className={`${contractStyle.receivePrice}`}>
                                        ${!contractDetails?.milestone?.length ? contractDetails?.receivedAmount : receivingAmount}
                                    </p>
                                </div>
                                <hr className={` ${style1.hr}`} />
                            </>
                    }
                </Row>

                {
                    contractDetails?.status == '0' &&
                    <div className='d-flex justify-content-end align-items-center my-5'>
                        <>
                            <div
                                className={`d-flex justify-content-center align-items-center me-4 ${style1.button}`}
                                onClick={() => setRejectModal(true)}
                            >
                                <Image src='./images/crossIcon.png' className='img img-fluid me-2' alt='cross' />
                                <p className={`${style1.rejectButton} my-0`}>
                                    Reject
                                </p>
                            </div>
                            <div
                                className={`d-flex justify-content-center align-items-center ${contractDetails?.contract_details && contractDetails?.contract_details?.length[0]?.status == '1' ? 'disabledButton' : style1.button}`}
                                onClick={() => setAcceptModal(true)}
                            >
                                <Image src='./images/verifyIcon.png' className='img img-fluid me-2' alt='verify icon' />
                                <p
                                    className={`${style1.acceptButton} my-0`}
                                >
                                    Accept
                                </p>
                            </div>
                        </>
                    </div>
                }
            </Container>
        </>
    )
}
