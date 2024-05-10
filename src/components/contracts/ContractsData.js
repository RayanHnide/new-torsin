import React from 'react';
import { Container, Image } from 'react-bootstrap';
import Moment from 'react-moment';

export default function ContractsData({ styles, data, style, setDetailsId, handleEdit, activeTab }) {

    return (
        <>
            {/* <Toaster /> */}
            <Container className='mx-0 px-0  my-3'>
                {data?.length ?
                    data?.map((item, index) => (
                        <Container key={index} className={`${styles.cardsOuter} my-3`}>
                            <div className={`d-flex flex-wrap justify-content-between align-items-center py-3 px-2`}>
                                <div role='button' onClick={() => setDetailsId(item?.contractId)}>
                                    <p className={`text-break my-0 ${styles.jobName}`}>
                                        {item?.projectName}
                                    </p>
                                </div>
                            </div>
                            <hr className={`mx-2 my-0 ${styles.hr}`} />
                            <div className={`d-flex flex-wrap justify-content-between align-items-center py-3 px-2`}>
                                <div>
                                    <p className={`text-break my-0 ${styles.email}`}>
                                        Email -
                                        <span>
                                            {item?.email}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p className={`text-break my-0 ${styles.email}`}>
                                        Amount -
                                        <span>
                                            ${item?.amount}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <hr className={`mx-2 my-0 ${styles.hr}`} />
                            <div className={`d-flex flex-wrap justify-content-between align-items-center py-3 px-2`}>
                                <p className={`text-break my-0 ${item?.status == '1' ? 'text-success' : item?.status == '2' ? 'text-danger' : item?.status == '3' && 'text-danger'} ${style.addLocationTitle}`}>
                                    {
                                        item?.status == '1' ? 'Accepted' : item?.status == '2' ? 'Rejected' : item?.status == '3' && 'Archived'
                                    }
                                </p>
                                <div className={`d-flex flex-wrap align-items-center`}>
                                    <Image src='./images/jobTime.png' className={`img img-fluid me-1`} alt='time' />
                                    <p className={`text-break my-0 ${style.viewJobTime}`}>
                                        <Moment fromNow>
                                            {item?.createdAt}
                                        </Moment>
                                    </p>
                                </div>
                            </div>
                        </Container>
                    ))
                    :
                    <div className='text-center mt-5 pt-4'>
                        <Image src='./images/emptyContracts.png' className='img img-fluid' alt='emptycontract' />
                        <p className={`my-0 ${styles.viewJobNameTitle} text-dark mt-3`}>
                            {
                                activeTab == 1 ?
                                    "No Contracts Accepted!"
                                    :
                                    activeTab == 2 ?
                                        "No Contracts Rejected!"
                                        :
                                        activeTab == 3 && "No Contracts Archived!"
                            }
                        </p>
                    </div>
                }
            </Container>
        </>
    )
}
