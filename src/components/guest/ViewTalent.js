import React, { useEffect, useState } from 'react'
import styles from "../../stylesheet/dashboard.module.scss";
import style from "../../stylesheet/publish.module.scss"
import style1 from '../../stylesheet/main.module.scss';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Moment from 'react-moment';
// import { IconArrowLeft, IconChevronLeft } from 'tabler-icons';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function ViewTalent({ query }) {

    const router = useRouter();
    const { avgRating, bio, country, email, fullName, gender, location, mobileNo, noofratingGiven, profileImage, skills, service, reciverId } = query;
    const [rating, setRating] = useState(4);

    const handleRating = (selectedRating) => {
        // setRating(selectedRating);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={`${i <= rating ? styles.active : ""} ${styles.star} me-1`}
                    onClick={() => handleRating(i)}
                    size={20}
                />
            );
        }
        return stars;
    };

    return (
        <>
            <Container className='my-4 d-flex justify-content-between align-items-center flex-wrap flex-wrap-reverse'>
                <p className={`${style1.guestHeading} fw-bold text-capitalize my-0`}>
                    Talent - {fullName}
                </p>
                <div
                    className={`${style1.joinButton} py-2 px-4 cursor-pointer d-flex align-items-center justify-content-center`}
                    onClick={() => router.back()}
                >
                    {/* <IconChevronLeft size={19} /> */}
                    <span>
                        Back
                    </span>
                </div>
            </Container>
            <Container className={`${style.viewJobOuterContainer} py-4 px-5 shadow`}>
                <Row className={`d-flex justify-content-between align-items-end`}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className={`d-flex justify-content-start align-items-center flex-wrap`}>
                        <Image src={profileImage || '/images/dummyImage.png'} className={`img img-fluid ${style.getImage2} me-4`} alt='job' />
                        <Row className='mx-0 my-3 p-0'>
                            <p style={{  color: "#14226D",}} className={`${styles.viewJobPersonName} fs-2 fw-bold my-0 text-capitalize`}>
                                {fullName}  
                            </p>

                            <div className='d-flex justify-content-between align-items-cente flex-wrap'>
                                <div>
                                    <p className={`my-0 py-2 ${style.addMore}`}>
                                        <span
                                            style={{
                                                color: "#14226D",
                                                fontWeight: "500"
                                            }}
                                        >
                                            Email : </span>
                                        {email}
                                    </p>
                                    <p className={`my-0 ${style.addMore}`}>
                                        <span
                                            style={{
                                                color: "#14226D",
                                                fontWeight: "500"
                                            }}
                                        >Gender : </span>
                                        {
                                            gender == '1' ? 'Male' : 'Female'
                                        }
                                    </p>
                                </div>
                                <div>
                                    <p className={`my-0  py-2 ${style.addMore}`}>
                                        <span
                                            style={{
                                                color: "#14226D",
                                                fontWeight: "500"
                                            }}
                                        >
                                            Mobile : </span>
                                        {
                                            mobileNo
                                        }
                                    </p>
                                    <p className={`my-0 ${style.addMore}`}>
                                        <>
                                            <span
                                                style={{
                                                    color: "#14226D",
                                                    fontWeight: "500"
                                                }}
                                            >
                                                Address : </span>
                                            {location}
                                            {
                                                !location.endsWith(country) && ", " + country
                                            }
                                        </>
                                    </p>
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Row>
                <div className='d-flex align-items-center mt-3'>
                    <p className={`${style.jobServiceName} col-md-1 me-3 my-0`}>Skills :</p>
                    <p className={`${styles.jobServiceNamePersonName} text-capitalize my-0`}>
                        {skills?.length > 0 && skills?.slice(0, skills?.length).join(', ')}
                    </p>
                </div>
                <hr className={`${styles.hr}`} />

                <p className={`${style.jobServiceName}`}>Bio :</p>
                <p className={`${style.jobDescription}`}>
                    {
                        bio
                    }
                </p>
                {/*<hr className={`${styles.hr}`} />
                <p className={`${style.jobServiceName}`}>Photos</p>
                 <div className='d-flex align-items-center flex-wrap'>
                    {
                        // photos?.map((item, index) => (
                        <Image src={''} className={`img img-fluid m-2 ${style.multiImages}`} alt='no image' />
                        // ))
                    }
                </div>
                <hr className={`${styles.hr}`} />
                <p className={`${style.jobServiceName}`}>Videos</p>
                <div className={`d-flex justify-content-start align-items-center flex-wrap`}>
                    <video width="280" height="120" controls className={`${styles.video} m-2`}>
                        <source
                            src=''
                            // src={viewJobProposal?.videos}
                            type="video/mp4" />
                    </video>
                </div>
                <hr className={`${styles.hr}`} />
                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                    <p className={`${style.jobServiceName}`}>Ratings</p>
                    <div className={`${styles.feedbackStars} my-3`}>{renderStars()}</div>
                </div>
                <hr className={`${styles.hr}`} /> */}
            </Container>
            <Container className='text-center my-4'>
                <button
                    className={`${style.nextButton} py-3`}
                // onClick={() => handleOffer(job)}
                >

                    Offer
                </button>
            </Container>
        </>
    )
}