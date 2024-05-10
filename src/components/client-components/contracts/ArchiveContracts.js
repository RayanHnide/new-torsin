import React from 'react'
import { Container, Image } from 'react-bootstrap'
import { Oval } from 'react-loader-spinner';
import Moment from 'react-moment'
// import { IconArrowLeft } from 'tabler-icons';

export default function ArchiveContracts({ styles, data, style1, style, setDetailsId, setArchive }) {

    return (
        <>
            <div className={`d-flex justify-content-start align-items-center ${style.publishNav} mb-1`}>
                <span className='me-2' role='button'>
                    {/* <IconArrowLeft onClick={() => setArchive(null)} /> */}
                </span>
                <span className={`${style1.allProposalsTitle} mx-2`}>
                    Archive Contracts
                </span>
            </div>

            <Container>
                {
                    data?.length ?
                        !data ?
                            <Oval
                                height={50}
                                width={50}
                                color="#0E184D"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#e0e0e0"
                                strokeWidth={8}
                                strokeWidthSecondary={5}
                            />
                            :
                            data?.slice().reverse()?.map((item, index) => (
                                <Container key={index} className={`${styles.cardsOuter} my-3`}>
                                    <div className={`d-flex flex-wrap justify-content-between align-items-center py-3 px-2`}>
                                        <div role='button' onClick={() => setDetailsId(item?.contract_id)}>
                                            <p className={`text-break my-0 ${styles.jobName}`}>
                                                {item?.project_name}
                                            </p>
                                        </div>
                                    </div>
                                    <hr className={`mx-2 my-0 ${style1.hr}`} />
                                    <div className={`d-flex flex-wrap justify-content-between align-items-center py-3 px-2`}>
                                        <div>
                                            <p className={`text-break my-0 ${styles.email}`}>
                                                Email -
                                                <span>
                                                    {item?.email_id}
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
                                    <hr className={`mx-2 my-0 ${style1.hr}`} />
                                    <div className={`d-flex flex-wrap justify-content-between align-items-center py-3 px-2`}>
                                        <p className={`text-break text-danger ${style.addLocationTitle}`}>
                                            Archive
                                        </p>
                                        <div className={`d-flex flex-wrap align-items-center`}>
                                            <Image src='/images/jobTime.png' className={`img img-fluid me-1`} />
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
                        <div className='text-center mt-5'>
                            <Image src='/images/emptyContracts.png' className='img img-fluid' />
                            <p className={`my-0 ${styles.viewJobNameTitle} text-dark mt-3`}>
                                No Contracts Archived
                            </p>
                        </div>
                }
            </Container>
        </>
    )
}
