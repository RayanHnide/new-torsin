import React from 'react'
import { Image, Row } from 'react-bootstrap'
import Moment from 'react-moment'
import supportStyle from "../../stylesheet/support.module.scss";
import paymentStyles from "../../stylesheet/payment.module.scss";
import { encodeData } from '../../helpers/auth';
import { useRouter } from 'next/router';

export default function TransactionList({ data, styles, activeTab }) {

    const router = useRouter();

    return (
        <>
            <Row className='mx-0 mb-3'>
                {
                    data.length ?
                        data?.map((item, index) => (
                            <div
                                key={index}
                                className={`${supportStyle.queryCards} d-flex justify-content-between align-items-center my-2 flex-wrap ps-4`}
                                style={{
                                    boxShadow: "0px 10px 60px 0px rgba(20, 34, 109, 0.10)"
                                }}
                                onClick={() => {
                                    const enData = encodeData(item)
                                    router.push(`/transaction/details?data=${enData}`)
                                }}
                            >
                                <div className='d-flex justify-content-center align-items-center py-3'>
                                    <div>
                                        <p className={`${supportStyle.hashCode} mt-0 mb-1`}>
                                            <span className={`${supportStyle.queryTitle} text-break`} style={{ whiteSpace: 'pre-line' }}>
                                                {item?.jobName}
                                            </span>
                                        </p>
                                        <p className={`${activeTab == 1 ? paymentStyles.pendingText : paymentStyles.successText} my-0 text-break `} style={{ whiteSpace: 'pre-line' }}>
                                            {
                                                activeTab == 1 ? "Payment yet to receive $" + item?.receivedAmount :
                                                    " Payment received $" + item?.receivedAmount
                                            }

                                        </p>
                                    </div>
                                </div>
                                <div className='me-4 py-3'>
                                    <p className={`${paymentStyles.view} text-md-end my-0}`}>
                                        View Job
                                    </p>
                                    <p className={`${supportStyle.duration} my-0`}>
                                        {
                                            <Moment format="DD/MM/YYYY hh:mm a">{item?.createdAt}</Moment>
                                        }
                                    </p>
                                </div>
                            </div>

                        ))
                        :
                        <div className='text-center mt-5 pt-4'>
                            <Image src='./images/emptyJobs.png' className='img img-fluid' alt='empty jobs' />
                            <p className={`my-0 ${styles.viewJobNameTitle} text-dark mt-3`}>
                                {
                                    activeTab == 1 ?
                                        "No pending payment!"
                                        :

                                        "No received payment!"
                                }
                            </p>
                        </div>
                }
            </Row>
        </>
    )
}
