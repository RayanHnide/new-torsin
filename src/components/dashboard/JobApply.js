import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Image } from 'react-bootstrap';
// import { IconArrowLeft, IconLetterX, IconMessageOff } from 'tabler-icons';
import style from '../../stylesheet/profile.module.scss';
import { BallTriangle } from 'react-loader-spinner';
import { useRouter } from 'next/router';
import Validation from '../../utils/Validation';
import { uploadFileToS3 } from '../../utils/S3';
import { v4 as uuidv4 } from 'uuid';
import API from '../../helpers/api';
import { handleErrorMessage } from '../../utils/CommonFunctions';
import { Toaster, toast } from 'react-hot-toast';

export default function JobApply({ handleApplyJobBackIconClick, styles, applyJob }) {

    const router = useRouter();

    const [userProposal, setUserProposal] = useState({ message: null, video: null, portfolio: null, projectType: null, images: null, charge: null });
    const { message, video, portfolio, projectType, images, charge } = userProposal;
    const [showErrors, setShowErrors] = useState(false);

    const [apiImageUrl, setApiImageUrl] = useState([]);
    const [selectedServiceImages, setSelectedServiceImages] = useState(['./images/uploadImageIcon.png', './images/uploadImageIcon.png', './images/uploadImageIcon.png']);

    const [video1, setVideo1] = useState(null);
    const [videoLoader, setVideoLoader] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);

    const [successPage, setSuccessPage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUserProposal((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleVideoSubmit = (e) => {
        setVideo1(e.target.files[0]);
    }

    useEffect(() => {
        video1 && handleSubmit();
    }, [video1]);

    const handleSubmit = async (e) => {
        const uniqueFileName = `${uuidv4()}`;

        if (video1) {
            try {
                setVideoLoader(true);
                const videoUrl1 = await uploadFileToS3(video1, `${uniqueFileName}_${video1.name}`);

                setVideoUrl(videoUrl1);
                setVideoLoader(false);

            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleVideoChange = () => {
        setVideoUrl("");
        setVideo1("");
    }

    const [clickedIndex, setClickedIndex] = useState('');

    const handleServiceImage = (event, index) => {
        const updatedFiles = [...selectedServiceImages];
        const change = event.target.files[0];
        if (change) {
            setClickedIndex(index);
            updatedFiles[index] = event.target.files[0];
            setSelectedServiceImages(updatedFiles);
        }
    }

    const handleUpload = async (index) => {
        
        const selectedFile = selectedServiceImages[index];

        if (!selectedFile) {
            // alert('Please select a file');
            return;
        }

        const uniqueFileName = `${uuidv4()}`;

        try {
            const res = await uploadFileToS3(selectedFile, `${uniqueFileName}_${selectedFile.name}`, selectedFile.type);

            setSelectedServiceImages((prevUrls) => {
                const updatedUrls = [...prevUrls];
                updatedUrls[index] = res;
                return updatedUrls;
            })

            setApiImageUrl((prev) => {
                const updatedApiUrl = [...prev];
                updatedApiUrl[index] = res;
                return updatedApiUrl
            })
        }
        catch (err) {
            console.log("err", err)
        }
    };

    useEffect(() => {
        handleUpload(clickedIndex);
    }, [clickedIndex])

    const handleSubmitProposal = () => {
        setShowErrors(true);

        if (
            !Validation.minOf(message, 50, 500) ||
            charge && !Validation.numberType2(charge)
        ) {
            return;
        }
        

        else {
            setShowErrors(false);
            if (apiImageUrl.length) {
                userProposal.images = apiImageUrl
            }
            userProposal.video = videoUrl;
            userProposal.job = applyJob.id;
            userProposal.charge = userProposal.charge ? userProposal.charge : null;

            console.log((userProposal))
            API.apiPost("postJobProposal", (userProposal),{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2MjAwODA0LCJpYXQiOjE3MTU1OTYwMDQsImp0aSI6IjFmYzE4OTQ1YTkzMzRlZDg5NjlkNWE5OGJlYWUxZmFjIiwidXNlcl9pZCI6MjUxfQ.v2LLofBkZhexU0deVA0BmMXwP3_0kJ2C-yRE1-DC9tk'
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
                        setSuccessPage(true);
                        setVideo1('');
                        setVideoUrl('');
                    }
                })
                .catch((err) => {
                    handleErrorMessage(err);
                });
        }
    }
     
    setTimeout(() => {
        successPage && router.push('/proposals');
    }, 1000);


    return (
        <>
            <Toaster />
            {!successPage ?
                <>
                
                    <div className={`d-flex justify-content-start align-items-center py-4 mb-2 ${styles.publishNav}`}>
                        <span className='me-3' role='button'>
                            {/*<IconArrowLeft onClick={handleApplyJobBackIconClick} />*/}
                        </span>
                        <span className={`${styles.viewJob} mx-2`}>
                            {
                                applyJob?.adminService
                            }
                        </span>
                        <span className='mb-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-math-greater" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M5 18l14 -6l-14 -6"></path>
                            </svg>
                        </span>
                        <span className={`${styles.viewJob} mx-2`}>
                            Jobs
                        </span>
                        
                    </div>
                    <Container>
                        <div>
                            <p className={`${styles.proposalTitle}`}>
                                Make a Proposal
                            </p>
                        </div>
                        <Form.Group
                            controlId='message'
                            className='mt-3 mb-2'
                        >
                            <Form.Label
                                className={`${style.skillsLabel}`}
                            >
                                Message
                            </Form.Label>
                            <Form.Control
                                as='textarea'
                                rows='4'
                                name='message'
                                placeholder='Type here...'
                                className={`${style.skillsFormInput} py-3 px-4`}
                                value={message}
                                onChange={handleInputChange}
                                maxLength="500"
                                isInvalid={showErrors && !Validation.minOf(message, 50, 500)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {!message ? "Please enter message" : message?.length < 50 ? "Message can't be less than 50 words" : message?.length > 500 && "Message can't be greater than 500 words "}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                           
                            <Col>
                                <Form.Group
                                    controlId='projectType'
                                    className='mt-3 mb-2'
                                >
                                    <Form.Label
                                        className={`${style.skillsLabel}`}
                                    >
                                        Project Type
                                    </Form.Label>
                                    <Form.Select
                                        className={`${style.skillsFormInput} ${style.skillsFormInput1} py-3 px-4`}
                                        name="projectType"
                                        value={projectType}
                                        onChange={handleInputChange}
                                    >
                                        <option hidden className='text-muted'>Select</option>
                                        <option value="1" className={`${styles.chargeOption}`}>Hourly</option>
                                        <option value="2" className={`${styles.chargeOption}`}>Fixed</option>
                                    </Form.Select>
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
                                        placeholder='$ 450.00'
                                        className={`${style.skillsFormInput} py-3 px-4`}
                                        name='charge'
                                        value={charge}
                                        onChange={handleInputChange}
                                        maxLength={5}
                                        isInvalid={charge && showErrors && !Validation.numberType2(charge)}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {
                                            charge && charge == 0 ? "Charge can't be zero" : "Alphabets and special characters are not allowed"
                                        }
                                    </Form.Control.Feedback>

                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='d-flex align-items-center'>
                            <Col>
                                <Form.Group
                                    className='mt-3 mb-2'
                                >
                                    <Form.Label className={`${style.skillsLabel}`}>
                                        Add Photos
                                    </Form.Label>
                                    {/* <p className={`${style.skillsLabel} mt-4`}>Add Photos</p> */}

                                    <div className={`d-flex justify-content-between align-items-center ${style.videoDiv} p-2`}>
                                        {
                                            selectedServiceImages.map((file, index) => (
                                                <div key={index} className={`${style.uploadImageDiv} m-2 d-flex align-items-center justify-content-center`}>
                                                    <Form.Group
                                                        className='mt-3 mb-2'
                                                    >
                                                        <Form.Label htmlFor={`service-image${index}`}>
                                                            <div className={`${(file === './images/uploadImageIcon.png') ? 'text-center' : ''} text-center `}>
                                                                <Image src={file} className={`img img-fluid ${(file !== './images/uploadImageIcon.png') ? style.addServiceImage1 : ''}`} alt='add photos' />
                                                                <p className={`${style.clickHere} text-center ${(file != './images/uploadImageIcon.png') ? 'd-none' : 'my-0'}`}>Click Here</p>
                                                            </div>
                                                            <input id={`service-image${index}`} className='d-none' type="file" name="video[]" accept="image/*" onChange={(e) => handleServiceImage(e, index)} />
                                                        </Form.Label>
                                                    </Form.Group>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group
                                    className='mt-3 mb-2'
                                >
                                    <Form.Label className={`${style.skillsLabel}`}>
                                        Add Video
                                    </Form.Label>
                                    {
                                        !videoLoader && !videoUrl
                                            ?
                                            <Form.Group>
                                                <Form.Label htmlFor='videoFile'>
                                                    <div className={`${style.videoDiv} p-2`}>
                                                        <Image src="./images/videoUploader3.png" alt="video uploader" className={`img img-fluid' ${styles.videoUploadeImg} w-100`} role='button'  />
                                                    </div>
                                                    <input id='videoFile' className='d-none' type="file" name="video1" accept="video/*" onChange={handleVideoSubmit} />
                                                </Form.Label>
                                            </Form.Group>
                                            :
                                            videoLoader ?
                                                <BallTriangle
                                                    height={70}
                                                    width={80}
                                                    radius={5}
                                                    color="#0E184D"
                                                    ariaLabel="ball-triangle-loading"
                                                    wrapperClass={{}}
                                                    wrapperStyle=""
                                                    visible={true}
                                                />
                                                :
                                                <div className={`${style.videoDiv} d-flex justify-content-center align-items-center py-3 position-relative`}>
                                                    {/*<IconLetterX*/}
                                                    {/*    size={17}*/}
                                                    {/*    className={`${style.iconCross}`}*/}
                                                    {/*    onClick={handleVideoChange}*/}
                                                    {/*/>*/}
                                                    Change
                                                    <video width="305" height="150" controls className={`${style.video}`}>
                                                        <source src={videoUrl} type="video/mp4" />
                                                    </video>
                                                </div>
                                    }
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group
                            controlId='portfolio'
                            className='mt-3 mb-2'
                        >
                            <Form.Label
                                className={`${style.skillsLabel}`}
                            >
                                Portfolio Link
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='https://portfolio.link.com'
                                className={`${style.skillsFormInput} py-3 px-4`}
                                name='portfolio'
                                onChange={handleInputChange}
                                value={portfolio}
                            />
                        </Form.Group>

                        <div className='text-end my-5'>
                            <button
                                className={`${style.skillsAddButton}`}
                                onClick={handleSubmitProposal}
                            >
                                Submit
                            </button>
                        </div>
                    </Container>
                </>
                :
                <Container className={`text-center ${styles.outerDiv}`}>
                    <Image src="./images/successProposal.png" className='img img-fluid' alt='job success' />
                </Container>
            
            }
        </>
    )
}