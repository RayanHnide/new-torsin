import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import styles from "../../stylesheet/dashboard.module.scss";
import style from "../../stylesheet/profile.module.scss"
import style1 from '../../stylesheet/main.module.scss';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { encodeData } from '../../helpers/auth';
 
import { getSearchJobs } from '../../store/actions/dashboard';
import Moment from 'react-moment';

export default function AllJobs({ query }) {

    const router = useRouter();
    const dispatch = useDispatch();

    const [searchJobs] = useSelector((Gstate) => [
        Gstate?.DashboardReducers?.searchJobs,
         

    ]);

    useEffect(() => {
        if (query) {
            dispatch(getSearchJobs(query));
        }
    }, [query])

    const handleJob = (item) => {
        const data = encodeData(item);
        router.push(`/guest/job/view-job?data=${data}`);
    }

    return (
        <>
            <Container className='my-4 d-flex justify-content-between align-items-center flex-wrap flex-wrap-reverse'>
                <p className={`${style1.guestHeading} text-capitalize my-0`}>
                    Job Results "{query}"
                </p>

                <div
                    className={`${style1.joinButton} py-2 px-4 cursor-pointer d-flex align-items-center justify-content-center`}
                    onClick={() => router.back()}
                >
                    {/*<IconChevronLeft size={19} />*/}
                    <span>
                        Back
                    </span>
                </div>
            </Container>
            <Container className='ps-3'>
                {/* item?.proposalStatus == 0 && */}
                <Row className='mb-3'>
                    {
                        searchJobs?.length > 0 ?
                            searchJobs?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`row mx-0 ${styles.oddContainer} shadow my-2 px-4 py-3`}
                                    onClick={() => handleJob(item)}
                                >
                                    <Col md={12}>
                                        <p className={`${styles.jobTitlePersonName} mb-2 text-capitalize`}>
                                            {item?.jobName} 
                                        </p>
                                        {/* <p className={`${styles.jobAdminService} mb-2 text-capitalize`}>
                                            {item?.jobName}
                                        </p> */}
                                        <p className={`${styles.jobDescription} mt-0 mb-2 text-capitalize text-break`}>
                                            {item?.jobDescription}
                                        </p>
                                        <p className={`${styles.jobRate}`}>
                                            ${item?.priceRate}
                                        </p>
                                        <hr className='me-3' />
                                        <div className={`d-flex pt-1`}>
                                            <span className={`d-flex justify-content-center align-items-center me-4`}>
                                                <Image src='/images/jobLocation.png' className='img img-fluid me-1' alt='location' />
                                                <p className={`${styles.jobLocation} my-0 text-capitalize`}>{item?.location + ", " + item?.countryName}</p>
                                            </span>
                                            <span className={`d-flex justify-content-center align-items-center me-4 `}>
                                                <Image src='/images/jobTime.png' className='img img-fluid ' alt='location' />
                                                <p className={`${styles.jobLocation} my-0`}>
                                                    <Moment fromNow ago>
                                                        {item?.createdAt}
                                                    </Moment> ago
                                                </p>
                                            </span>
                                        </div>
                                    </Col>
                                </div>
                            ))
                            :
                            <p>
                                No jobs found!
                            </p>
                    }

                </Row>
            </Container>
        </>
    )
}

