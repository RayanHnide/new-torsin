import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router';
import style2 from '../../stylesheet/profile.module.scss';
import Moment from 'react-moment';
import style from "../../stylesheet/jobs.module.scss";
import style1 from '../../stylesheet/dashboard.module.scss';

export default function TransactionDetails({ query }) {

    const { receivedAmount, createdAt, photos, jobDescription, jobName, location, projectType, jobId } = query;
    const router = useRouter();

    return (
        <>
            <div className={`d-flex justify-content-start align-items-center ${style1.publishNav} py-4`}>
                <span className='me-3' role='button'>
                    <FaArrowLeft onClick={() => router.back()} />
                </span>
                <span className={`${style1.viewJob} mx-2`}>
                    Payment Details
                </span>
            </div>

            <Container>

                <div className={`${style1.jobContainer} my-2 px-5 py-3`}>
                    <Row>
                        <p className={`${style.viewJobNameTitle}`}>
                            {jobName}
                        </p>
                        <Col xs={12} sm={12} md={6} lg={8}>
                            <p className={`${style.viewJobServices}`}>
                                Payment Type:
                                <span className='ms-1'>
                                    {projectType == 1 ? 'Hourly' : 'Fixed'}
                                </span>
                            </p>
                            <p className={`${style.viewJobServices}`}>
                                Rates:
                                <span className='ms-1'>
                                    {`$${receivedAmount}/${projectType == 1 ? 'hour' : 'week'}`}
                                </span>
                            </p>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={4}>
                            <p className={`${style.viewJobServices}`}>
                                Published Date:
                                <span className='ms-1'>
                                    <Moment format='DD/MM/YY'>
                                        {createdAt}
                                    </Moment>
                                </span>
                            </p>
                            <p className={`${style.viewJobServices}`}>
                                Location:
                                <span className='ms-1'>
                                    {location}
                                </span>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <p className={`${style.viewJobDescriptionTitle}`}>
                            Description
                        </p>
                        <p className={`${style.viewJobDescription} text-break`}>
                            {jobDescription}
                        </p>
                    </Row>
                    <Row>
                        <p className={`${style.viewJobDescriptionTitle}`}>
                            Photos
                        </p>
                        <div className={`d-flex align-items-center justify-content-start flex-wrap ${style2.videoDiv} py-2`}>
                            {
                                photos?.length ?
                                    photos?.map((item, index) => (
                                        <Image key={index} src={item} className={`img img-fluid m-2 ${style1.jobMultiImages}`} alt='image' />
                                    ))
                                    :
                                    <div className={`${style1.noImage} w-100 text-center d-flex justify-content-center align-items-center`}>
                                        <p className={`${style1.jobDescription} ${style1.descFontSize} my-0`}>No Photos!</p>
                                    </div>
                            }
                        </div>
                    </Row>
                </div>
            </Container>
        </>
    )
}
