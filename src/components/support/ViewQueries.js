import React from 'react';
import dashboardStyle from '../../stylesheet/dashboard.module.scss';
import jobStyle from '../../stylesheet/jobs.module.scss';
import styles from "../../stylesheet/support.module.scss";
import { useRouter } from 'next/router';
// import { IconArrowLeft } from 'tabler-icons';
import { Container, Row, Col } from 'react-bootstrap';
import { encodeData } from '../../helpers/auth';

export default function ViewQueries({ query }) {

    const { status, description, reason, ticketId, topicId, topicName } = query;

    const router = useRouter();

    const handleChat = () => {
        const data = {
            'status': status,
            'ticketId': ticketId,
        }
        const item = encodeData(data)
        router.push(`/help-support/chat=${item}`)
    }

    return (
        <>
            <Container className={`${styles.viewOuter} py-2`}>
                <div className='d-flex justify-content-between align-items-center flex-wrap'>
                    <div className={`d-flex justify-content-start align-items-center py-4`}>
                        <span className='ms-3 me-2' role='button'>
                            {/* <IconArrowLeft onClick={() => router.back()} /> */}
                        </span>
                        <span className={`${jobStyle.myJobsTitle} ms-1`}>
                            View Details
                        </span>
                    </div>
                    {(status == '2' || status == '4') &&
                        <div>
                            <button
                                className={`${dashboardStyle.applyJobButton} py-3 fw-bold px-5`}
                                onClick={handleChat}
                            >
                                {
                                    status == '2' ?
                                        "Chat Now"
                                        :
                                        status == '4' &&
                                        "View Old Chat"
                                }
                            </button>
                        </div>}
                </div>
                <Container className='px-4 pb-3'>
                    <Row>
                        <Col xs={4} md={3} lg={2}>
                            <p className={`${styles.userTitle}`}>
                                Topic Name
                            </p>
                        </Col>
                        <Col>
                            <p className={`${styles.userDetail} text-break`}>
                                {topicName}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} md={3} lg={2}>
                            <p className={`${styles.userTitle}`}>
                                Ticket No.
                            </p>
                        </Col>
                        <Col>
                            <p className={`${styles.userDetail}`}>
                                #{ticketId}
                            </p>
                        </Col>
                    </Row>
                    <div>
                        <p className={`${styles.jobDesc} py-2`}>
                            Inadequate Job Description
                        </p>
                        <p className={`${styles.desc} text-break`}>
                            {description}
                        </p>
                    </div>
                </Container>
            </Container>

            {status == '3' &&
                <Container className={`${styles.viewOuter} my-4 p-4`}>
                    <div className='mx-3'>
                        <p className={`${styles.jobDesc}`}>
                            Reason for Rejection
                        </p>
                        <p className={`${styles.desc}`}>
                            {reason}
                        </p>
                    </div>
                </Container>}
        </>
    )
}
