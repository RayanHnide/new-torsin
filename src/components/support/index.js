import React, { useEffect } from 'react';
import styles from "../../stylesheet/support.module.scss";
import jobStyle from "../../stylesheet/jobs.module.scss";
import dashboardStyle from '../../stylesheet/dashboard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getSupportTicketList } from '../../store/actions/support';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { encodeData } from '../../helpers/auth';
import Moment from 'react-moment';

export default function Support() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [supportTicketList] = useSelector((Gstate) => [
        Gstate?.SupportReducers?.supportTicketList
    ])

    useEffect(() => {
        dispatch(getSupportTicketList())
    }, [supportTicketList?.length])

    const handleViewQuery = (item) => {
        const data = encodeData(item);
        router.push(`/help-support/view-detail=${data}`)
    }

    return (
        <>
            <div className={`${dashboardStyle.publishNav} pt-4 mb-3 d-flex justify-content-between flex-wrap`}>

                <div className='d-flex flex-column'>
                    <p className={`${jobStyle.myJobsTitle}`}>Help & Support</p>
                    <p
                        className={`${styles.queryTitle} mb-0`}
                    >
                        All Queries
                    </p>
                </div>
                <div>
                    <button
                        className={`${dashboardStyle.applyJobButton} px-5 py-3 fw-bold my-2`}
                        onClick={() => router.push('/help-support/raise-query')}
                    >
                        Raise a query
                    </button>
                </div>
            </div>
            <Container className='px-0'>
                {supportTicketList?.length > 0 && supportTicketList?.map((item, index) => (
                    <div
                        key={index}
                        className={`${styles.queryCards} ${index % 2 !== 0 && styles.darkCards} d-flex justify-content-between align-items-center my-2 flex-wrap px-4`}
                        onClick={() => handleViewQuery(item)}
                    >
                        <div className='d-flex justify-content-center align-items-center px py-3'>
                            <div>
                                <p className={`${styles.hashCode} my-0 py-2`}>
                                    #{item?.ticketId}
                                    <span className={`${styles.queryTitle} ms-2 text-break`} style={{ whiteSpace: 'pre-line' }}>
                                        {item?.topicName}
                                    </span>
                                </p>
                                <p className={`${styles.queryDetails} my-0 text-break py-2`} style={{ whiteSpace: 'pre-line' }}>
                                    {item?.description}
                                </p>
                            </div>
                        </div>
                        <div className='me-4'>
                            <p className={`${styles.duration} my-0 py-2`}>
                                {
                                    <Moment fromNow>{item?.createdAt}</Moment>
                                }
                            </p>
                            <p className={`${styles.status} text-end my-0 py-2 ${item?.status == '1' ? 'text-warning' : item?.status == '2' ? 'text-success' : item?.status == '3' ? 'text-danger' : item?.status == '4' && 'Completed'}`}>
                                {
                                    item?.status == '1' ? 'Pending' : item?.status == '2' ? 'Active' : item?.status == '3' ? 'Rejected' : item?.status == '4' && 'Completed'
                                }
                            </p>
                        </div>
                    </div>
                ))}
            </Container>

        </>
    )
}
