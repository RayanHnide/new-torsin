import React, { useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Moment from 'react-moment';
// import { IconArrowLeft } from 'tabler-icons';
import { FaStar } from 'react-icons/fa';

export default function ViewJob({ viewJobItem, style, styles, handleViewJobBackIconClick }) {

    const { personName, personSkill, jobDescription, src, jobRate, jobLocation, jobRating, jobTime } = viewJobItem
    const [rating, setRating] = useState(4);

    const handleRating = (selectedRating) => {
        // setRating(selectedRating);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={`${i <= rating ? styles.active : ""} ${styles.star} me-1`}
                    onClick={() => handleRating(i)}
                    size={20}
                />
            );
        }
        return stars;
    };

    return (
        <>
            <div className={`d-flex justify-content-start align-items-center mb-4  ${style.publishNav}`}>
                <span className='me-3' role='button'>
                    <IconArrowLeft
                        onClick={handleViewJobBackIconClick}
                    />
                </span>
                <span className={`${style.viewJob} mx-2`}>
                    {personName}
                </span>
                <span className='mb-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-math-greater" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 18l14 -6l-14 -6"></path>
                    </svg>
                </span>
                <span className={`${style.viewJob} mx-2`}>
                    Profile
                </span>
            </div>
            <Container className={`${style.viewJobOuterContainer} py-4 px-5`}>
                <p className={`${style.jobServiceName}`}>{personSkill}</p>
                <Row className={`d-flex justify-content-between align-items-end`}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={10} className={`d-flex justify-content-start align-items-center flex-wrap`}>
                        <Image src={src} className={`img img-fluid ${style.getImage2} me-4`} alt='job' />
                        <Row className='m-0 p-0'>
                            <p className={`${styles.viewJobPersonName} my-0`}>
                                {personName}
                            </p>

                            <div className='d-flex justify-content-between align-items-cente flex-wrapr'>
                                <div>
                                    <p className={`my-0 py-2 ${style.addMore}`}>
                                        alesialop@gmail.com
                                    </p>
                                    <p className={`my-0 ${style.addMore}`}>
                                        Female
                                    </p>
                                </div>
                                <div>
                                    <p className={`my-0  py-2 ${style.addMore}`}>
                                        +01 856 58 75357
                                    </p>
                                    <p className={`my-0 ${style.addMore}`}>
                                        Murshid Bazar, Deira, P.O Box 40512, U.A.E
                                    </p>
                                </div>
                            </div>
                        </Row>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={2} className='text-end'>
                        <span className={`${style.viewJobTime}`}>
                            <Image src='/images/jobTime.png' className='img img-fluid me-1' alt='job time' />
                            <Moment fromNow ago>
                                {
                                    // job.createdAt
                                }
                            </Moment> ago
                        </span>
                    </Col>
                </Row>
                <div className='d-flex align-items-center mt-3'>
                    <p className={`${style.jobServiceName} me-3`}>Charges</p>
                    <p className={`${styles.jobServiceNamePersonName}`}>
                        {jobRate} / hour
                    </p>
                </div>
                <hr className={`${styles.hr}`} />

                <p className={`${style.jobServiceName}`}>Job Description</p>
                <p className={`${style.jobDescription}`}>
                    {
                        jobDescription
                    }
                </p>
                <hr className={`${styles.hr}`} />
                <p className={`${style.jobServiceName}`}>Photos</p>
                <div className='d-flex align-items-center flex-wrap'>
                    {
                        // photos?.map((item, index) => (
                        <Image src={src} className={`img img-fluid m-2 ${style.multiImages}`} alt='no image' />
                        // ))
                    }
                </div>
                <hr className={`${styles.hr}`} />
                <p className={`${style.jobServiceName}`}>Videos</p>
                <div className={`d-flex justify-content-start align-items-center flex-wrap`}>
                    <video width="280" height="120" controls className={`${styles.video} m-2`}>
                        <source
                            src=''
                            // src={viewJobProposal?.videos}
                            type="video/mp4" />
                    </video>
                </div>
                <hr className={`${styles.hr}`} />
                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                    <p className={`${style.jobServiceName}`}>Ratings</p>
                    <div className={`${styles.feedbackStars} my-3`}>{renderStars()}</div>
                </div>
                <hr className={`${styles.hr}`} />
            </Container>
            <Container className='text-center my-4'>
                <button
                    className={`${style.nextButton} py-3`}
                // onClick={() => handleOffer(job)}
                >

                    Offer
                </button>
            </Container>
        </>
    )
}