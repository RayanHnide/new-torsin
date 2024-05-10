import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
 
export default function TalentProposals({ style, styles, handleProposalBackIconClick, handleReceivedProposal, proposedJobs }) {
    return (
        <>
            <div className={`d-flex justify-content-start align-items-center mb-1 ${style.publishNav}`}>
                <span className='me-2' role='button'>
                    {/* <IconArrowLeft onClick={handleProposalBackIconClick} /> */}
                </span>
                <span className={`${styles.allProposalsTitle} mx-2`}>
                    Proposals
                </span>
            </div>

            <Container className={`${styles.body}`}>
                <Row className='mx-1 mb-3'>
                    {
                        proposedJobs?.map((item, index) => (
                            <div key={index} className={`row ${style.oddContainer} my-2 px-4 py-3`} onClick={() => handleReceivedProposal(item)}>
                                {/* <Col md={1}>
                                    <Image src={item?.image[0]} className={`border img img-fluid ${style.getImage} my-3`} alt='job' />
                                </Col> */}

                                <Col md={12}>
                                    <p className={`${styles.jobTitlePersonName} mb-2`}>
                                        {item?.jobName}
                                    </p>
                                    <p className={`${style.jobDescription} mt-0 mb-2`}>
                                        {item?.jobDescription}
                                    </p>
                                    <div className={`d-flex pt-1`}>
                                        <p className={`${style.proposalsRecieved} my-0 me-2`}>Proposals Recieved - </p>
                                        <p className={`${styles.proposalsCount} my-0`}>{item?.totalCount}</p>
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
