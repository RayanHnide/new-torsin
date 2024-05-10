import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import Moment from 'react-moment'

export default function JobData({ data, style1, styles, handleView, activeTab }) {

    return (
        <>
            <Row className='mx-0 mb-3'>
                {
                    data.length ?
                        data?.map((item, index) => (
                            <div
                                key={index}
                                className={`row mx-0 my-1 px-4 py-3 
                            ${style1.oddContainer} ${styles.boxShadow1}
                            ${activeTab == 1 ? style1.oddContainer : activeTab == 2 && style1.evenContainer} 
                            ${activeTab == 1 ? styles.boxShadow1 : activeTab == 2 && styles.boxShadow2}
                             `}
                                onClick={() => handleView(item)}
                            >
                                {/* <Col md={1}>
                                    <Image src={item?.image.length ? item?.image[0] : item?.profileImage} className={`img img-fluid border my-3 ${style1.getImage}`} alt='job' />
                                </Col> */}

                                <Col md={12}>
                                    <p className={`${style1.jobTitle} mb-2`}>
                                        {item?.jobName}
                                    </p>
                                    <p className={`${style1.jobDescription} mt-0 mb-2 text-break`}>
                                        {item?.jobDescription}
                                    </p>
                                    <p className={`${style1.jobRate}`}>
                                        {item?.JobRate}
                                    </p>
                                    <hr className='me-3' />
                                    <div className={`d-flex pt-1 flex-wrap`}>
                                        <span className={`d-flex justify-content-center align-items-center me-4`}>
                                            <Image src='./images/jobLocation.png' className='img img-fluid me-1' alt='location' />
                                            <p className={`${style1.jobLocation} my-0`}>{item?.location}, {item?.countryName}</p>
                                        </span>
                                        <span className={`d-flex justify-content-center align-items-center`}>
                                            <Image src='./images/jobTime.png' className='img img-fluid ' alt='location' />
                                            <p className={`${style1.jobLocation} my-0`}>
                                                <Moment fromNow className='ms-1'>
                                                    {item?.createdAt}
                                                </Moment>
                                            </p>
                                        </span>
                                    </div>
                                </Col>
                            </div>
                        ))
                        :
                        <div className='text-center mt-5 pt-4'>
                            <Image src='./images/emptyJobs.png' className='img img-fluid' alt='empty jobs' />
                            <p className={`my-0 ${styles.viewJobNameTitle} text-dark mt-3`}>
                                {
                                    activeTab == 1 ?
                                        "No Ongoing Jobs!"
                                        :
                                        activeTab == 2 ?
                                            "No Past Jobs!"
                                            :
                                            activeTab == 3 && "No New Jobs!"
                                }
                            </p>
                        </div>
                }
            </Row>
        </>
    )
}
