import React, { useEffect } from 'react'
import { Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
 import { FiChevronsLeft } from "react-icons/fi";

import { getAdminPercentage } from '../../store/actions/notifications';

export default function ViewContracts({ style, styles, style1, contractDetails, setDetailsId }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminPercentage())
    }, [])

    const [adminPercentage] = useSelector((Gstate) => [Gstate?.NotificationReducers?.adminPercentage])


    return (
        <>
            <div className={`d-flex justify-content-start align-items-center ${style.publishNav} mb-1 pt-4`}>
                <span className='me-2' role='button'>
                    <FiChevronsLeft onClick={() => setDetailsId(null)} />
                </span>
                <span className={`${styles.myJobsTitle} mx-2`}>
                    View Contract
                </span>
            </div>

            <Container>
                <Row className={`mb-2`}>
                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label className={`${style1.skillsLabel}`}>
                            Client Email Address
                        </Form.Label>
                        <Form.Control
                            type="text"
                            disabled
                            className={`${style1.skillsFormInput} ${style1.formInputColor} p-3 bg-white`}
                            value={contractDetails?.clientEmail}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='contract-name' className='my-2'>
                        <Form.Label className={`${style1.skillsLabel}`}>
                            Contract Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            disabled
                            className={`${style1.skillsFormInput} p-3 ${style1.formInputColor} bg-white`}
                            value={contractDetails?.jobName}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label className={`${style1.skillsLabel}`}>
                            Description
                        </Form.Label>
                        <Form.Control
                            as='textarea'
                            rows="4"
                            name="desc"
                            placeholder='Write a short description about the contract'
                            className={`${style1.skillsFormInput} ${style1.formInputColor} p-3 bg-white`}
                            disabled
                            value={contractDetails?.description}
                        />
                    </Form.Group>

                    <Form.Group controlId="contract-type" className='my-2'>
                        <Form.Label className={`${style1.skillsLabel}`}>Contract type</Form.Label>
                        <Form.Control
                            required
                            as="select"
                            type="select"
                            className={`${style1.skillsFormInput} ${style1.formInputColor} p-3 bg-white`}
                            name="contract_type"
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
                                    <Form.Label className={`${style1.skillsLabel}`}>
                                        Hourly rate
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='$100 /hr'
                                        className={`${style1.skillsFormInput} ${style1.formInputColor} p-3 bg-white`}
                                        name='amount'
                                        disabled
                                        value={`$${contractDetails?.amount}`}
                                    />
                                </Form.Group>

                                <Form.Group controlId='duration' className='my-2'>
                                    <Form.Label className={`${style1.skillsLabel}`}>
                                        Duration
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='1 hour'
                                        className={`${style1.skillsFormInput} ${style1.formInputColor} p-3 bg-white`}
                                        name='time_duration'
                                        value={contractDetails?.timeDuration}
                                        disabled
                                    />
                                </Form.Group>


                                <Form.Group controlId='torsin-fee' className='my-2'>
                                    <Form.Label className={`${style1.skillsLabel}`}>
                                        {adminPercentage[0]?.adminPercentage} % Torsin Fee
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='$3,4 /hr'
                                        className={`${style1.skillsFormInput} ${style1.formInputColor} p-3 bg-white`}
                                        name='torsin_rate'
                                        disabled
                                        value={contractDetails?.torsinRate}
                                    />
                                </Form.Group>

                                <Form.Group controlId='receive' className='my-2'>
                                    <Form.Label className={`${style1.skillsLabel}`}>
                                        You'll Receive
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='$96.6 /hr'
                                        className={`${style1.skillsFormInput} ${style1.formInputColor} p-3 bg-white`}
                                        name='received_amount'
                                        disabled
                                        value={contractDetails?.receivedAmount}
                                    />

                                </Form.Group>

                                <Form.Group className='my-2'>
                                    <Form.Label className={`${style1.skillsLabel}`}>
                                        End Date
                                    </Form.Label>
                                    <div>
                                        <Form.Label
                                            htmlFor='undefined'
                                            className={`${style1.skillsLabel}`}
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
                                            className={`${style1.skillsLabel}`}
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
                                            className={`${style1.skillsFormInput} p-3`}
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
                                                <div key={index} className={`${styles.milestoneBoxOuter} my-4`}>
                                                    <Container className='px-4 py-3'>
                                                        <Form.Group controlId={`milestone-name-${index}`} className='mb-2'>
                                                            <Form.Label className={`${style1.skillsLabel}`}>
                                                                Milestone Name
                                                            </Form.Label>
                                                            <Form.Control
                                                                type='text'
                                                                placeholder='Enter name'
                                                                className={`${style1.skillsFormInput} p-3 ${style1.formInputColor} bg-white`}
                                                                value={milestone.name}
                                                                name='name'
                                                                disabled
                                                            />
                                                        </Form.Group>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group controlId={`milestone-start-date-${index}`} className='my-2'>
                                                                    <Form.Label className={`${style1.skillsLabel}`}>
                                                                        Start Date
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type='date'
                                                                        placeholder='01/01/2023'
                                                                        name='start_date'
                                                                        className={`${style1.skillsFormInput} p-3 ${style1.formInputColor} bg-white`}
                                                                        value={milestone.startDate}
                                                                        disabled
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                                <Form.Group controlId={`milestone-end-date-${index}`} className='my-2'>
                                                                    <Form.Label className={`${style1.skillsLabel}`}>
                                                                        End Date
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        type='date'
                                                                        placeholder='01/01/2023'
                                                                        name='end_date'
                                                                        className={`${style1.skillsFormInput} p-3 ${style1.formInputColor} bg-white`}
                                                                        disabled
                                                                        min={milestone.startDate}
                                                                        value={milestone.endDate}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Form.Group controlId={`milestone-price-${index}`} className='my-2'>
                                                            <Form.Label className={`${style1.skillsLabel}`}>
                                                                Milestone Price
                                                            </Form.Label>
                                                            <Form.Control
                                                                type='text'
                                                                placeholder='Enter amount'
                                                                className={`${style1.skillsFormInput} p-3 ${style1.formInputColor} bg-white`}
                                                                value={milestone.price}
                                                                disabled
                                                                name='price'
                                                            />
                                                        </Form.Group>
                                                    </Container>
                                                </div>
                                                <hr className={`${style1.hr}`} />

                                                {milestone?.length >= 1 && <div className={`d-flex justify-content-between align-items-center`}>
                                                    <p className={`${style1.skillsLabel}`}>
                                                        Milestone Price
                                                    </p>
                                                    <p className={`${style1.skillsLabel} text-muted`}>
                                                        $0.00
                                                    </p>
                                                </div>}
                                            </>
                                        ))}

                                        <div className={`d-flex justify-content-between align-items-center`}>
                                            <p className={`${style1.skillsLabel}`}>
                                                Amount
                                            </p>
                                            <p className={`${style1.skillsLabel} text-muted`}>
                                                ${contractDetails?.amount}
                                            </p>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <div className={`d-flex justify-content-between align-items-center mt-3`}>
                                            <p className={`${style1.skillsLabel}`}>
                                                Amount
                                            </p>
                                            <p className={`${style1.skillsLabel} text-muted`}>
                                                ${contractDetails?.amount}
                                            </p>
                                        </div>
                                    </>
                                }
                                <div className={`d-flex justify-content-between align-items-center`}>
                                    <p className={`${style1.skillsLabel}`}>
                                        {adminPercentage[0]?.adminPercentage} % Torsin Fee
                                    </p>
                                    <p className={`${style1.skillsLabel} text-muted`}>
                                        ${contractDetails?.torsinRate}
                                    </p>
                                </div>

                                <div className={`d-flex justify-content-between align-items-center`}>
                                    <p className={`${style.deleteJobTitle} text-black`}>
                                        You'll Receive
                                    </p>
                                    <p className={`${styles.receivePrice}`}>
                                        ${contractDetails?.receivedAmount}
                                    </p>
                                </div>
                                <hr className={` ${style1.hr}`} />
                            </>
                    }
                </Row>
            </Container>

        </>
    )
}
