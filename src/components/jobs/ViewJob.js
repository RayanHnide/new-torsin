import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Image, Modal, Row } from 'react-bootstrap';
// import { IconArrowLeft } from 'tabler-icons';
import { useRouter } from 'next/router';
import style2 from '../../stylesheet/contracts.module.scss';
import { encodeData } from '../../helpers/auth';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminPercentage } from '../../store/actions/notifications';

export default function ViewJob({ setViewItem, style1, style, styles, viewItem, setReport, setRatingPage, activeTab }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminPercentage())
    }, [])

    const [adminPercentage] = useSelector((Gstate) => [Gstate?.NotificationReducers?.adminPercentage])

    const router = useRouter();
    const [viewMore, setViewMore] = useState(false);
    const [viewMoreContracts, setViewMoreContracts] = useState(false);

    const handleChatNow = () => {
        const data = encodeData({ proposalId: viewItem?.jobId })
        router.push(`/chats/?id=${data}`);
    }

    return (
        <>
            <div className={`d-flex justify-content-start align-items-center ${style1.publishNav} py-4`}>
                <span className='me-3' role='button'>
                    {/*<IconArrowLeft onClick={() => setViewItem(null)} />*/}
                </span>
                <span className={`${style1.viewJob} mx-2`}>
                    {viewItem?.jobName}
                </span>
                <span className='mb-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-math-greater" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 18l14 -6l-14 -6"></path>
                    </svg>
                </span>
                <span className={`${style1.viewJob} mx-2`}>
                    {
                        activeTab == 1 ?
                            'Active Jobs'
                            :
                            activeTab == 2 ?
                                'Past Jobs'
                                :
                                activeTab == 3 &&
                                'New Jobs'
                    }
                </span>
            </div>

            {/* <===============================jobs desc=============================> */}
            <Container className='mx-0 px-0'>
                {!viewMore ?
                    <div className={`row d-flex align-items-center ${style1.jobContainer} my-2 px-4 py-3 mx-0`}>
                        {/* <Col md={1}>
                            <Image
                                src={viewItem?.image[0]}
                                className={`img img-fluid ${style1.getImage} border`} alt='job'
                            />
                        </Col> */}

                        <Col md={12}>
                            <p className={`${style1.jobTitle} mb-2`}>
                                {viewItem?.jobName}
                            </p>
                            <p className={`${style1.jobDescription} my-0 text-break`}>
                                {viewItem?.jobDescription}
                            </p>
                            <p className={`text-end my-0`}>
                                <span className={`${style1.viewMoreJobDetails}`} onClick={() => setViewMore(true)}>
                                    View More
                                </span>
                            </p>
                        </Col>
                    </div>
                    :
                    <div className={`${style1.jobContainer} my-2 px-5 py-3`}>
                        {/* <Row>
                            <Image src={viewItem?.image[0]} className={`img img-fluid my-3 ${style1.getImage2}`} alt='job' />
                        </Row> */}

                        <Row>
                            <p className={`${styles.viewJobNameTitle}`}>
                                {viewItem?.jobName}
                            </p>

                            <Col xs={12} sm={12} md={6} lg={4}>
                                <p className={`${styles.viewJobServices}`}>
                                    Published Date:
                                    <span className='ms-1'>
                                        <Moment format='DD/MM/YY'>
                                            {viewItem?.createdAt}
                                        </Moment>
                                    </span>
                                </p>
                                <p className={`${styles.viewJobServices}`}>
                                    Location:
                                    <span className='ms-1'>
                                        {viewItem?.location}
                                    </span>
                                </p>
                                <p className={`${styles.viewJobServices}`}>
                                    Country:
                                    <span className='ms-1'>
                                        {viewItem?.countryName}
                                    </span>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <p className={`${styles.viewJobDescriptionTitle}`}>
                                Description
                            </p>
                            <p className={`${styles.viewJobDescription} text-break`}>
                                {viewItem?.jobDescription}
                            </p>
                        </Row>
                        <Row>
                            <p className={`${styles.viewJobDescriptionTitle}`}>
                                Photos
                            </p>
                            <div className={`d-flex align-items-center justify-content-start flex-wrap ${style1.videoDiv} py-2`}>
                                {viewItem?.image?.length ?
                                    viewItem?.image.map((item, index) => (
                                        <Image key={index} src={item} className={`img img-fluid m-2 ${styles.jobMultiImages}`} alt='image' />
                                    ))
                                    :
                                    <div className={`${style1.noImage} w-100 text-center d-flex justify-content-center align-items-center`}>
                                        <p className={`${style1.jobDescription} ${style1.descFontSize} my-0`}>No Photos!</p>
                                    </div>
                                }
                            </div>
                        </Row>

                        <p className={`text-end mt-4`}>
                            <span className={`${style1.viewMoreJobDetails}`} onClick={() => setViewMore(false)}>
                                View Less
                            </span>
                        </p>
                    </div>
                }
            </Container>

            {/* <================================contracts desc=======================> */}
            <Container className='mx-0 px-0'>
                {!viewMoreContracts ?
                    <div className={`row d-flex align-items-center ${style1.jobContainer} my-2 px-4 py-3 mx-0`}>
                        <Col>
                            <Form.Group controlId='email' className='my-2'>
                                <Form.Label className={`${style.skillsLabel}`}>
                                    Client Email Address
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    className={`${style.skillsFormInput} ${style.formInputColor} p-3 bg-white`}
                                    value={viewItem.email}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId='contract-name' className='my-2'>
                                <Form.Label className={`${style.skillsLabel}`}>
                                    Contract Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    className={`${style.skillsFormInput} p-3 ${style.formInputColor} bg-white`}
                                    value={viewItem?.jobName}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
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
                                value={viewItem?.contractDesc}
                            />
                        </Form.Group>
                        <p className={`text-end my-0`}>
                            <span className={`${style1.viewMoreJobDetails}`} onClick={() => setViewMoreContracts(true)}>
                                View More
                            </span>
                        </p>
                    </div>
                    :
                    <Row className={`${style1.jobContainer} my-2 px-5 py-3 mx-0`}>
                        <Form.Group controlId='email' className='my-2'>
                            <Form.Label className={`${style.skillsLabel}`}>
                                Client Email Address
                            </Form.Label>
                            <Form.Control
                                type="text"
                                disabled
                                className={`${style.skillsFormInput} ${style.formInputColor} p-3 bg-white`}
                                value={viewItem.email}
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
                                className={`${style.skillsFormInput} p-3 ${style.formInputColor} bg-white`}
                                value={viewItem?.jobName}
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
                                value={viewItem?.contractDesc}
                            />
                        </Form.Group>

                        <Form.Group controlId="contract-type" className='my-2'>
                            <Form.Label className={`${style.skillsLabel}`}>Contract type</Form.Label>
                            <Form.Control
                                required
                                as="select"
                                type="select"
                                className={`${style.skillsFormInput} ${style.formInputColor} p-3 bg-white`}
                                name="contract_type"
                                disabled
                                value={viewItem?.contractType}
                            >
                                <option hidden className={``}>Select</option>
                                <option value="2">Hourly</option>
                                <option value="1">Fixed</option>
                            </Form.Control>
                        </Form.Group>

                        {
                            viewItem?.contractType == '2' ?
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
                                            value={viewItem?.amount}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='duration' className='my-2'>
                                        <Form.Label className={`${style.skillsLabel}`}>
                                            Duration
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='1 hour'
                                            className={`${style.skillsFormInput} ${style.formInputColor} p-3 bg-white`}
                                            name='time_duration'
                                            value={parseInt(viewItem?.timeDuration)}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='torsin-fee' className='my-2'>
                                        <Form.Label className={`${style.skillsLabel}`}>
                                            {adminPercentage[0]?.adminPercentage} % Torsin Fee
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='$3,4 /hr'
                                            className={`${style.skillsFormInput} ${style.formInputColor} p-3 bg-white`}
                                            name='torsin_rate'
                                            disabled
                                            value={viewItem?.torsinRate}
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
                                            value={viewItem?.recievedAmount}
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
                                                    checked={viewItem?.endDate == '1'}
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
                                                    checked={viewItem?.endDate == '2'}
                                                />
                                                Specific Date
                                            </Form.Label>
                                        </div>
                                    </Form.Group>

                                    {
                                        viewItem?.endDate == '2' &&
                                        <Form.Group className='mb-4'>
                                            <Form.Control
                                                placeholder=''
                                                type='date'
                                                name='specific_date'
                                                value={viewItem?.specificDate}
                                                className={`${style.skillsFormInput} p-3`}
                                            />
                                        </Form.Group>
                                    }
                                </>
                                :

                                <>
                                    {viewItem?.milestoneData?.length ?
                                        <div>
                                            <hr className={` ${style1.hr}`} />
                                            <div className='text-center'>
                                                <p className={`my-0 text-align-center`}>
                                                    Milestones
                                                </p>
                                            </div>
                                            <hr className={` ${style1.hr}`} />

                                            {viewItem?.milestoneData.map((milestone, index) => (
                                                <div key={index}>
                                                    <div className={`${style2.milestoneBoxOuter} my-4`}>
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
                                                                            value={milestone?.startDate}
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
                                                                            min={milestone.start_date}
                                                                            value={milestone?.endDate}
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
                                                                    value={milestone.price}
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
                                                </div>
                                            ))}

                                            <div className={`d-flex justify-content-between align-items-center`}>
                                                <p className={`${style.skillsLabel}`}>
                                                    Amount
                                                </p>
                                                <p className={`${style.skillsLabel} text-muted`}>
                                                    ${viewItem?.amount}
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
                                                    ${viewItem?.amount}
                                                </p>
                                            </div>
                                        </>
                                    }
                                    <div className={`d-flex justify-content-between align-items-center`}>
                                        <p className={`${style.skillsLabel}`}>
                                            {adminPercentage[0]?.adminPercentage} % Torsin Fee
                                        </p>
                                        <p className={`${style.skillsLabel} text-muted`}>
                                            ${viewItem?.torsinRate}
                                        </p>
                                    </div>

                                    <div className={`d-flex justify-content-between align-items-center`}>
                                        <p className={`${style.deleteJobTitle} text-black`}>
                                            You'll Receive
                                        </p>
                                        <p className={`${style2.receivePrice}`}>
                                            ${!viewItem?.milestoneData?.length ? viewItem?.recievedAmount : viewItem?.recievedAmount}
                                        </p>
                                    </div>
                                    <hr className={` ${style1.hr}`} />
                                </>
                        }
                        <p className={`text-end`}>
                            <span className={`${style1.viewMoreJobDetails}`} onClick={() => setViewMoreContracts(false)}>
                                View Less
                            </span>
                        </p>
                    </Row>
                }
            </Container>

            {/* <======================================Reports===============================> */}
            <Row className='mx-0 mb-2'>
                {activeTab == 2 &&
                    <Col
                        className={`${styles.boxShadow} me-3 my-2 p-4 d-flex justify-content-center align-items-center ${style1.viewJobOuterContainer}`}
                    >
                        <div className='me-3'>
                            <Image src='./images/jobRating.png' alt='report a problem' className='img img-fluid me-5' />
                        </div>
                        <div className=''>
                            <p className={`${styles.reportProblemTitle} my-1`} onClick={() => setRatingPage(true)} role='button'>Add Ratings & Review</p>
                            <p className={`${styles.reportProblemDesc} my-0`}>Provide rating and review to the client and tell us how you like the job and what better could have been done.</p>
                        </div>
                    </Col>}
                <Col
                    className={`${styles.boxShadow} me-3 my-2 p-4 d-flex justify-content-center align-items-center ${style1.viewJobOuterContainer}`}
                >
                    <div className='me-3'>
                        <Image src='./images/jobReport.png' alt='report a problem' className='img img-fluid me-5' />
                    </div>
                    <div className=''>
                        <p className={`${styles.reportProblemTitle} my-1`} onClick={() => router.push("/help-support/raise-query")} role='button'>Report a problem</p>
                        <p className={`${styles.reportProblemDesc} my-0`}>Report a problem. Please provide us information so that we can better identify your problem. Tell us what went wrong.</p>
                    </div>
                </Col>
                <Col
                    className={`${styles.boxShadow} my-2 p-4 d-flex justify-content-center align-items-center ${style1.viewJobOuterContainer}`}
                >
                    <div className='me-3'>
                        <Image src='./images/jobChat.png' alt='report a problem' className='img img-fluid me-5' />
                    </div>
                    <div className=''>
                        <p className={`${styles.reportProblemTitle} my-1`} onClick={handleChatNow} role='button'>Chats</p>
                        <p className={`${styles.reportProblemDesc} my-0`}>Chat provide rating and review to the client and tell us about the how you like the job and what you like the job and what better could have been done.</p>
                    </div>
                </Col>
            </Row>
            {/* <div className='my-3 text-lg-end text-sm-center px-0'>
                <button
                    className={`${style.skillsAddButton} my-2 px-5 py-3 me-3`}
                // onClick={() => handleCancel()}
                >
                    Request Payment
                </button>
                <button
                    className={`${styles.cancelButton} my-2 px-5 py-3`}
                // onClick={() => handleCompleteActiveJob()}
                >
                    Cancel
                </button>
            </div> */}
        </>
    )
}
