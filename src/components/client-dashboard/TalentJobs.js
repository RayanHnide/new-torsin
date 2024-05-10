import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
// import { IconArrowLeft, IconSearch } from 'tabler-icons';

export default function TalentJobs({ jobs, handleTalentBackIconClick, style, styles, handleJobView }) {

    return (
        <>
            <Row className={`d-flex justify-content-between align-items-center ${style.publishNav}`}>
                <Col className='d-flex justify-content-start align-items-center'>
                    <span className='me-2' role='button'>
                        <IconArrowLeft onClick={handleTalentBackIconClick} />
                    </span>
                    <span className={`${styles.dashboardTitle} mx-2`}>
                        All Talents
                    </span>
                </Col>
                <Col
                    className={`position-relative my-2`}
                // onClick={handleSearchDiv}
                >
                    <input
                        type='search'
                        placeholder='Search for job'
                        className={`${styles.searchInput} w-100`}
                    // disabled={disabled}
                    />
                    <IconSearch
                        size={20}
                        color='gray'
                        className={`${styles.searchIcon}`}
                    />
                </Col>
            </Row>

            <Container className={`${styles.body}`}>
                <Row className='mx-1 mb-3'>
                    {
                        jobs?.map((item, index) => (
                            <div key={index} className={`row ${style.oddContainer} my-2 px-4 py-4`} onClick={() => handleJobView(item)}>
                                <Col md={1}>
                                    <Image src={item?.src} className={`img img-fluid ${style.getImage} my-3`} alt='job' />
                                </Col>

                                <Col md={11}>
                                    <p className={`${styles.jobTitlePersonName} mb-2`}>
                                        {item?.personName}
                                        <span className='ms-1'>
                                            ({item?.personSkill})
                                        </span>
                                    </p>
                                    <p className={`${style.jobDescription} mt-0 mb-2`}>
                                        {item?.jobDescription}
                                    </p>
                                    <p className={`${style.jobRate}`}>
                                        {item?.jobRate} / <span className={`${styles.jobTitlePersonName}`}>hour </span>
                                    </p>
                                    <hr className='me-3' />
                                    <div className={`d-flex pt-1`}>
                                        <span className={`d-flex justify-content-center align-items-center me-4`}>
                                            <Image src='/images/jobLocation.png' className='img img-fluid me-1' alt='location' />
                                            <p className={`${style.jobLocation} my-0`}>{item?.jobLocation}</p>
                                        </span>
                                        <span className={`d-flex justify-content-center align-items-center me-4 `}>
                                            <Image src='/images/jobTime.png' className='img img-fluid ' alt='time' />
                                            <p className={`${style.jobLocation} my-0`}>{item?.jobTime}</p>
                                        </span>
                                        <span className={`d-flex justify-content-center align-items-center me-4 `}>
                                            <Image src='/images/star.png' className='img img-fluid me-1' alt='rating' />
                                            <p className={`${style.jobLocation} my-0`}>{item?.jobRating} Ratings</p>
                                        </span>
                                    </div>
                                </Col>
                            </div>
                        ))
                    }

                </Row>
            </Container>
        </>
    )
}
