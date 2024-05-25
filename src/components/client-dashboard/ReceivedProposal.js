 import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import {useRouter} from "next/router";
// import { IconArrowLeft } from 'tabler-icons';

export default function ReceivedProposal({ style, styles, handleReceivedProposalBackIcon, viewReceivedProposalData, proposedJobsDetails, setViewJobProposal }) {
    const { id,  jobDescription, totalCount } = viewReceivedProposalData;
    const router = useRouter()

    return (
        <>
            <div className={`d-flex justify-content-start align-items-center ${style.publishNav} ${styles.proposalNavPadding}`}>
                <span className='me-2' role='button'>
                    {/*<IconArrowLeft onClick={handleReceivedProposalBackIcon} />*/}
                </span>
                <span className={`${styles.allProposalsTitle} mx-2`}>
                    Proposals Recieved
                </span>
            </div>

            <Container className={`${styles.proposalsNav}`}>
                <Row key={id} className={`${style.oddContainer} my-2 py-3 mb-3 px-4`}>
                    {/* <Col md={1}>
                        <Image src={viewReceivedProposalData?.image[0]} className={`img img-fluid ${style.getImage} my-3 border`} alt='job' />
                    </Col> */}

                    <Col md={12}>
                        <p className={`${styles.jobTitlePersonName} mb-2`}>
                            {viewReceivedProposalData?.jobName}
                        </p>
                        <p className={`${style.jobDescription} mt-0 mb-2`}>
                            {jobDescription}
                        </p>

                        <div className={`d-flex pt-1`}>
                            <p className={`${style.proposalsRecieved} my-0 me-2`}>Proposals Recieved - </p>
                            <p className={`${styles.proposalsCount} my-0`}>{totalCount}</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container className={`${styles.proposalsOuter} px-5 py-3`}>
                {proposedJobsDetails?.length ?
                    proposedJobsDetails?.map((item, index) => (
                        <div key={index}>


                            <Row className={`d-flex justify-content-between align-items-center`}>
                                <Col className='d-flex justify-content-start align-items-center'>

                                    <div>
                                        <Image src={`${item?.profileImage ? item?.profileImage : '/images/dummyImage.png'}`} className={`border img img-fluid ${style.getImage} me-3`} alt='job' />
                                    </div>
                                    <div>
                                        <p className={`${style.companyName} my-1`}>
                                            {`${item?.fullName || 'John Smith'}`}
                                            {item.charges}
                                        </p>

                                        <div className='d-flex justify-content-between align-items-center'>
                                            <span className={`d-flex justify-content-center align-items-center me-4 `}>
                                                <Image src='/images/jobTime.png' className='img img-fluid me-1' alt='time' />
                                                <p className={`${style.jobLocation} my-0`}>
                                                    <Moment fromNow ago>
                                                        {item?.createdAt}
                                                    </Moment> ago
                                                </p>
                                            </span>
                                            <span className={`d-flex justify-content-center align-items-center me-4`}>
                                                <Image src='/images/jobLocation.png' className='img img-fluid me-1' alt='location' />
                                                <p className={`${style.jobLocation} my-0`}>{item?.location}</p>
                                            </span>
                                        </div>
                                    </div>

                                </Col>

                                <Col md={2} className='text-end'>
                                    {item?.proposalStatus != '1' &&
                                        <p className={`${item?.proposalStatus == '2' ? 'text-success' : 'text-danger'}`}                                        >
                                            {
                                                item?.proposalStatus == '2'
                                                    ?
                                                    'Accepted'
                                                    :
                                                    'Rejected'
                                            }
                                        </p>
                                    }
                                    <p
                                        className={`${styles.viewMore} my-0`}
                                        onClick={() => setViewJobProposal(item)}
                                    >
                                        View
                                    </p>
                                </Col>
                            </Row>
                            <div className='d-flex justify-content-end'>
                                {(item?.proposalStatus === '2' || item?.proposalStatus === 2) && (
                                    <button className='mt-3' style={{
                                        fontWeight: '900',
                                        fontSize: '14px',
                                        lineHeight: '60%',
                                        cursor: 'pointer',
                                        padding: '13px',
                                        gap: '8px',
                                        background: '#0E184D',
                                        borderRadius: '12px',
                                        color: '#FFFFFF',
                                        border: '0',
                                    }} onClick={() => {
                                        const itemData = {
                                            id: item.id,
                                            jobId: item.jobId,
                                            talentId: item.talentId,
                                            talentEmail: item.talentEmail,
                                            page: false,
                                            jobName: item.jobName
                                        };

                                        const queryString = encodeURIComponent(JSON.stringify(itemData));
                                        router.push(`/client-contract?data=${queryString}`);
                                        console.log(item.jobName);
                                    }}>
                                        Create Contract
                                    </button>
                                )}
                            </div>
                            <hr className={`${styles.hr}`} />
                        </div>

                    ))
                    :
                    <p className='text-center my-0'>
                        No proposals
                    </p>
                }
            </Container >
        </>

    )
}
