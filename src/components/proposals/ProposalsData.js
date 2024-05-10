import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import Moment from 'react-moment'

export default function ProposalsData({ data, style1, handleView }) {
    return (
        <>
            <Row className='mx-0 px-0 my-3'>
                {
                    data.length ?
                        data?.map((item, index) => (
                            <div
                                key={index}
                                className={`row ${style1.oddContainer} my-2 px-4 py-3 mx-0`}
                                onClick={() => handleView(item)}
                            >
                                {/* <Col md={1}>
                                    <Image src={item?.images[0]} className={`img img-fluid my-3 ${style1.getImage} border`} alt='job' />
                                </Col> */}

                                <Col md={12}>
                                    <p className={`${style1.jobTitle} mb-2`}>
                                        {item?.jobName}
                                    </p>
                                    <p className={`${style1.jobDescription} mt-0 mb-2 text-break`}>
                                        {item?.jobDescription}
                                    </p>
                                    <p className={`${style1.jobRate}`}>
                                        {item?.charges ? '$' + item?.charges : ''}
                                    </p>
                                    <hr className='me-3' />
                                    <div className={`d-flex pt-1`}>
                                        <span className={`d-flex justify-content-center align-items-center me-4`}>
                                            <Image src='./images/jobLocation.png' className='img img-fluid me-1' alt='location' />
                                            <p className={`${style1.jobLocation} my-0`}>{item?.location}, {item?.countryName}</p>
                                        </span>
                                        <span className={`d-flex justify-content-center align-items-center me-4 `}>
                                            <Image src='./images/jobTime.png' className='img img-fluid ' alt='location' />
                                            <p className={`${style1.jobLocation} my-0`}>
                                                <Moment fromNow>
                                                    {item?.createdAt}
                                                </Moment>
                                            </p>
                                        </span>
                                    </div>
                                </Col>
                            </div>
                        ))
                        :
                        <div className='text-center mt-5 pt-5'>
                            <Image src='./images/emptyProposal.png' className='img img-fluid' alt='empty' />
                        </div>
                }
            </Row >
        </>
    )
}
