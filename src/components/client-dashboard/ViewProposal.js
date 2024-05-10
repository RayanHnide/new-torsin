import React, { useState } from 'react';
import { Col, Container, Form, Image, Modal, Row } from 'react-bootstrap';
// import { IconArrowLeft } from 'tabler-icons';
import API from '../../helpers/api';
import { Toaster, toast } from 'react-hot-toast';
import { handleErrorMessage } from '../../utils/CommonFunctions';
import style1 from '../../stylesheet/job.module.scss';
import { useRouter } from 'next/router';
import { encodeData } from '../../helpers/auth';
import { useDispatch } from 'react-redux';
import { getProposalTalentDetails } from '../../store/actions/dashboard';

export default function ViewProposal({ jobId, styles, style, setViewJobProposal, viewJobProposal }) {

    const router = useRouter();
    const [rejectModal, setRejectModal] = useState(false);
    const dispatch = useDispatch();

    const handleRejectProposal = () => {
        API.apiPost('rejectProposal', {
            'jobId': jobId,
            'proposalId': viewJobProposal?.proposalId
        })
            .then((response) => {
                if (response) {
                    toast.success(response?.data?.response?.message?.successMessage, {
                        position: "top-right",
                        style: {
                            borderBottom: '4px solid #33a34e',
                            padding: "16px",
                            color: "#3c5f4b",
                            marginRight: "25px",
                        },
                    });
                }
                setViewJobProposal(null);
                dispatch(getProposalTalentDetails(jobId));
            })
            .catch((err) => {
                handleErrorMessage(err);
            });
    }

    const handleAcceptProposal = () => {
        API.apiPost('acceptProposal', {
            'chatId': viewJobProposal?.proposalId,
            'jobId': jobId,
            'proposalId': viewJobProposal?.proposalId
        })
            .then((response) => {
                if (response) {
                    toast.success(response?.data?.response?.message?.successMessage, {
                        position: "top-right",
                        style: {
                            borderBottom: '4px solid #33a34e',
                            padding: "16px",
                            color: "#3c5f4b",
                            marginRight: "25px",
                        },
                    });
                }
                handleChatNow();
            })
            .catch((err) => {
                handleErrorMessage(err);
            });
    }

    const handleChatNow = () => {
        const data = encodeData({ proposalId: viewJobProposal?.proposalId })
        router.push(`/chats/?id=${data}`);
    }

    return (
        <>
            <Toaster />

            <Modal centered show={rejectModal} onHide={() => setRejectModal(false)} backdrop="static">
                <Modal.Body>
                    <div className='text-center px-5 py-3'>
                        <p className={`${style.deleteJobTitle}`}>Reject Proposal?</p>
                        <p className={`${style.deleteJobDesc}`}>Are you sure you want to reject this proposal</p>
                        <div>
                            <button className={`${style1.cancelJobButton} ${style1.noButton} me-4`} onClick={handleRejectProposal}>Yes</button>
                            <button className={`${style1.cancelJobButton}`} onClick={() => setRejectModal(false)}>No</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <div className={`d-flex justify-content-start align-items-center ${style.publishNav}`}>
                <span className='me-2' role='button'>
                    <IconArrowLeft onClick={() => setViewJobProposal(null)} />
                </span>
                <span className={`${styles.allProposalsTitle} mx-2`}>
                    Proposals Recieved
                </span>
            </div>

            <Container>

                <Form.Group
                    controlId='message'
                    className='mt-3 mb-2'
                >
                    <Form.Label
                        className={`${style.formLabel}`}
                    >
                        Message
                    </Form.Label>
                    <Form.Control
                        as='textarea'
                        rows='4'
                        name='message'
                        placeholder='Type here...'
                        className={`${style.formInput} ${styles.formInputColor} py-3 px-4 bg-white`}
                        value={viewJobProposal?.message}
                        disabled
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group
                            controlId='projectType'
                            className='mt-3 mb-2'
                        >
                            <Form.Label
                                className={`${style.formLabel}`}
                            >
                                Project Type
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='450.00$'
                                className={`${style.formInput} ${styles.formInputColor} py-3 px-4 bg-white`}
                                name='charge'
                                value={viewJobProposal?.projectType ? viewJobProposal?.projectType == '1' ? 'Hourly' : 'Weekly' : 'N/A'}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group
                            controlId='charges'
                            className='mt-3 mb-2'
                        >
                            <Form.Label
                                className={`${style.formLabel}`}
                            >
                                Proposed Charge
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='450.00$'
                                className={`${style.formInput} ${styles.formInputColor} py-3 px-4 bg-white`}
                                name='charge'
                                value={viewJobProposal?.charges ? viewJobProposal?.charges : 'N/A'}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {(viewJobProposal?.photos && viewJobProposal?.photos?.length || viewJobProposal?.videos && viewJobProposal?.videos?.length) &&
                    <Row className='d-flex align-items-center'>
                        {
                            viewJobProposal?.photos && viewJobProposal?.photos?.length &&
                            <Col>
                                <Form.Group
                                    className='mt-3 mb-2'
                                >
                                    <Form.Label className={`${style.formLabel}`}>
                                        Add Photos
                                    </Form.Label>
                                    {/* <p className={`${style.formLabel} mt-4`}>Add Photos</p> */}

                                    {viewJobProposal?.photos && viewJobProposal?.photos?.length ?
                                        <div className={`${styles.videoDiv} d-flex ${(viewJobProposal?.photos?.length > 2) ? 'justify-content-between' : 'justify-content-around'} align-items-center flex-wrap py-2`}>
                                            {
                                                viewJobProposal?.photos?.map((item, index) => (
                                                    <Image key={index} src={item} className={`img img-fluid ${styles.viewServicesImage} my-2 ${index > 2 ? styles.imgWidth : ''}`} alt='images' />
                                                ))
                                            }
                                        </div>
                                        :
                                        <div className={`${styles.videoDiv} ${styles.sizeDiv} d-flex justify-content-center align-items-center py-2`}>
                                            <p className={`${styles.formInputColor} my-0 `}>
                                                N/A
                                            </p>
                                        </div>
                                    }
                                </Form.Group>
                            </Col>
                        }
                        {
                            viewJobProposal?.videos && viewJobProposal?.videos?.length &&
                            <Col>
                                <Form.Group
                                    className='mt-3 mb-2'
                                >
                                    <Form.Label className={`${style.formLabel}`}>
                                        Add Video
                                    </Form.Label>
                                    {viewJobProposal?.videos && viewJobProposal?.videos?.length
                                        ?
                                        <div className={`${styles.videoDiv} d-flex justify-content-center align-items-center py-4`}>
                                            <video width="305" height="160" controls className={`${styles.video}`}>
                                                <source src={viewJobProposal?.videos} type="video/mp4" />
                                            </video>
                                        </div>
                                        :
                                        <div className={`${styles.videoDiv} ${styles.sizeDiv} d-flex justify-content-center align-items-center py-2`}>
                                            <p className={`${styles.formInputColor} my-0 `}>
                                                N/A
                                            </p>
                                        </div>
                                    }
                                </Form.Group>
                            </Col>
                        }
                    </Row>
                }

                {
                    viewJobProposal?.portfolio &&
                    <Form.Group
                        controlId='portfolio'
                        className='mt-3 mb-2'
                    >
                        <Form.Label
                            className={`${style.formLabel}`}
                        >
                            Add Portfolio Link
                        </Form.Label>
                        <Form.Control
                            type='text'
                            className={`${style.formInput} ${styles.formInputColor} py-3 px-4 bg-white`}
                            name='portfolio'
                            value={viewJobProposal?.portfolio ? viewJobProposal?.portfolio : 'N/A'}
                            disabled
                        />
                    </Form.Group>
                }
                <div className='d-flex justify-content-end align-items-center my-5'>
                    {viewJobProposal?.proposalStatus == '1'
                        ?
                        <>
                            <div
                                className={`d-flex justify-content-center align-items-center me-4 ${styles.button} `}
                                // onClick={handleRejectProposal}
                                onClick={() => setRejectModal(true)}
                            >
                                <Image src='/images/crossIcon.png' className='img img-fluid me-2' />
                                <p className={`${styles.rejectButton} my-0`}>
                                    Reject
                                </p>
                            </div>
                            <div
                                className={`d-flex justify-content-center align-items-center ${styles.button}`}
                                onClick={handleAcceptProposal}
                            >
                                <Image src='/images/verifyIcon.png' className='img img-fluid me-2' />
                                <p
                                    className={`${styles.acceptButton} my-0`}
                                >
                                    Accept
                                </p>
                            </div>
                        </>
                        :
                        <button
                            className={`${style.nextButton} ${viewJobProposal?.proposalStatus == '3' && 'disabledButton'} py-3`}
                            onClick={handleChatNow}
                            disabled={viewJobProposal?.proposalStatus == '3' ? true : false}
                        >
                            Chat Now
                        </button>
                    }
                </div>
            </Container>
        </>
    )
}
