import React, { useState } from 'react';
import { Col, Container, Form, Image, Modal, Row } from 'react-bootstrap';
 import { FiChevronsLeft,FiChevronsRight } from "react-icons/fi";

import { useRouter } from 'next/router';
import style2 from '../../stylesheet/profile.module.scss';
import { encodeData } from '../../helpers/auth';
import Moment from 'react-moment';

export default function ViewProposal({ setViewItem, style, style1, viewItem }) {

    const router = useRouter();
    const { charges, countryName, jobProjectType, jobPriceRate, adminService, createdAt, photos, jobDescription, jobName, location, message, projectType, images, portfolio, proposalId, proposalStatus, videos, jobId } = viewItem;
    const [viewMore, setViewMore] = useState(false);

    const handleChatNow = () => {
        const data = encodeData({ proposalId: proposalId })
        router.push(`/chats/?id=${data}`);
    }

    return (
        <>
            <div className={`d-flex justify-content-start align-items-center flex-wrap ${style1.publishNav} py-4`}>
                <span className='me-3' role='button'>
                    <FiChevronsLeft onClick={() => setViewItem(null)} />
                </span>
                <span className={`${style1.viewJob} mx-2`}>
                    {viewItem?.jobName}
                </span>
                <span className='mb-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-math-greater" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 18l14 -6l-14 -6"></path>
                    </svg>
                </span>
                <span className={`${style1.viewJob} mx-2`}>
                    View Proposals
                </span>
            </div>
            <Container>
                {!viewMore ?
                    <div className={`row d-flex align-items-center ${style1.jobContainer} my-2 px-4 py-3 mx-1`}>
                        {/* <Col md={1}>
                            <Image src={images[0]} className={`img img-fluid ${style1.getImage}`} alt='job' />
                        </Col> */}

                        <Col md={12}>
                            <p className={`${style1.jobTitle} mb-2`}>
                                {jobName}
                            </p>
                            <p className={`${style1.jobDescription} my-0 text-break`}>
                                {jobDescription}
                            </p>
                            <p className={`text-end my-0 ${style1.viewMoreJobDetails}`} onClick={() => setViewMore(true)}>View More</p>
                        </Col>
                    </div>
                    :
                    <div className={`${style1.jobContainer} my-2 px-5 py-3`}>
                        {/* <Row>
                            <Image src={images[0]} className={`img img-fluid my-3 ${style1.getImage2}`} alt='job' />
                        </Row> */}

                        <Row>
                            <p className={`${style.viewJobNameTitle}`}>
                                {jobName}
                            </p>
                            <Col xs={12} sm={12} md={6} lg={8}>
                                <p className={`${style.viewJobServices}`}>
                                    Service:
                                    <span className='ms-1'>
                                        {adminService}
                                    </span>
                                </p>
                                <p className={`${style.viewJobServices}`}>
                                    Payment Type:
                                    <span className='ms-1'>
                                        {jobProjectType == 1 ? 'Hourly' : 'Fixed'}
                                    </span>
                                </p>
                                <p className={`${style.viewJobServices}`}>
                                    Rates:
                                    <span className='ms-1'>
                                        {`$${jobPriceRate}`}
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
                                <p className={`${style.viewJobServices}`}>
                                    Country:
                                    <span className='ms-1'>
                                        {countryName}
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
                                    images?.length ?
                                        images.map((item, index) => (
                                            <Image key={index} src={item} className={`img img-fluid m-2 ${style1.jobMultiImages}`} alt='image' />
                                        ))
                                        :
                                        <div className={`${style1.noImage} w-100 text-center d-flex justify-content-center align-items-center`}>
                                            <p className={`${style1.jobDescription} ${style1.descFontSize} my-0`}>No Photos!</p>
                                        </div>
                                }
                            </div>
                        </Row>

                        <p className={`text-end mt-3 ${style1.viewMoreJobDetails}`} onClick={() => setViewMore(false)}>View Less</p>
                    </div>
                }
            </Container>

            <Container>
                <Form.Group
                    controlId='message'
                    className='mt-3 mb-2'
                >
                    <Form.Label
                        className={`${style2.skillsLabel}`}
                    >
                        Message
                    </Form.Label>
                    <Form.Control
                        as='textarea'
                        rows='4'
                        name='message'
                        placeholder='Type here...'
                        className={`${style2.skillsFormInput} ${style2.formInputColor} py-3 px-4 bg-white`}
                        value={message ? message : 'N/A'}
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
                                className={`${style2.skillsLabel}`}
                            >
                                Project Type
                            </Form.Label>
                            <Form.Control
                                type='text'
                                className={`${style2.skillsFormInput} ${style2.formInputColor} py-3 px-4 bg-white`}
                                value={projectType ? projectType == 1 ? 'Hourly' : 'Fixed' : 'N/A'}
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
                                className={`${style.skillsLabel}`}
                            >
                                Proposed Charges
                            </Form.Label>
                            <Form.Control
                                type='text'
                                className={`${style2.skillsFormInput} ${style2.formInputColor} py-3 px-4 bg-white`}
                                value={charges ? charges : 'N/A'}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {photos?.length || videos?.length &&
                    <Row className='d-flex align-items-center'>
                        {photos?.length &&
                            <Col>
                                <Form.Group
                                    className='mt-3 mb-2'
                                >
                                    <Form.Label className={`${style2.skillsLabel}`}>
                                        Add Photos
                                    </Form.Label>
                                    {/* <p className={`${style.skillsLabel} mt-4`}>Add Photos</p> */}

                                    {
                                        photos?.length
                                            ?
                                            <div className={`${style2.videoDiv} d-flex ${(photos?.length > 2) ? 'justify-content-between' : 'justify-content-around'} align-items-center flex-wrap py-4`}>
                                                {photos?.map((item, index) => (
                                                    <Image key={index} src={item} className={`img img-fluid ${style2.viewServicesImage} my-2 ${index > 2 ? style2.imgWidth : ''}`} alt='images' />
                                                ))}
                                            </div>
                                            :
                                            <div className={`${style2.videoDiv} ${style2.sizeDiv} d-flex justify-content-center align-items-center py-4`}>
                                                <p className={`${style2.formInputColor} my-0`}>
                                                    N/A
                                                </p>
                                            </div>
                                    }
                                </Form.Group>
                            </Col>
                        }
                        {videos?.length &&
                            <Col>
                                <Form.Group
                                    className='mt-3 mb-2'
                                >
                                    <Form.Label className={`${style2.skillsLabel}`}>
                                        Add Video
                                    </Form.Label>
                                    {videos
                                        ?
                                        <div className={`${style2.videoDiv} d-flex justify-content-center align-items-center py-4`}>
                                            <video width="305" height="160" controls className={`${style2.video}`}>
                                                <source src={videos} type="video/mp4" />
                                            </video>
                                        </div>
                                        :
                                        <div className={`${style2.videoDiv} ${style2.sizeDiv} d-flex justify-content-center align-items-center py-4`}>
                                            <p className={`${style2.formInputColor} my-0`}>
                                                N/A
                                            </p>
                                        </div>
                                    }
                                </Form.Group>
                            </Col>
                        }
                    </Row>
                }
                {portfolio?.length &&
                    <Form.Group
                        controlId='portfolio'
                        className='mt-3 mb-2'
                    >
                        <Form.Label
                            className={`${style2.skillsLabel}`}
                        >
                            Add Portfolio Link
                        </Form.Label>
                        <Form.Control
                            type='text'
                            className={`${style2.skillsFormInput} ${style2.formInputColor} py-3 px-4 bg-white`}
                            disabled
                            value={portfolio ? portfolio : 'N/A'}
                        />
                    </Form.Group>
                }

                <div className='text-end my-5'>
                    <button
                        className={`${style2.skillsAddButton} ${[1, 3].includes(proposalStatus) && 'disabledButton'}`}
                        onClick={handleChatNow}
                        disabled={[1, 3].includes(proposalStatus) ? true : false}
                    >
                        Chat Now
                    </button>
                </div>
            </Container>
        </>
    )
}
