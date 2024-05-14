import React, { useEffect, useState } from 'react'
import styles from "../../stylesheet/dashboard.module.scss";
import style1 from '../../stylesheet/main.module.scss';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function ViewTalent({ query }) {

    const router = useRouter();
    const { jobName, jobDescription, priceRate, location, countryName, photos, adminService, createdAt } = query;
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
                <p className={`${style1.guestHeading} text-capitalize my-0`}>
                    View Job
                </p>
                <div
                    className={`${style1.joinButton} py-2 px-4 cursor-pointer d-flex align-items-center justify-content-center`}
                    onClick={() => router.back()}
                >
                    {/*<IconChevronLeft size={19} />*/}
                    <span>
                        Back
                    </span>
                    
                </div>
            </Container>
            <Container className={`${styles.viewJobOuterContainer} py-4 px-3`}>
                {/* <p className={`${styles.jobServiceName}`}>{adminService}</p> */}
                <div className={`d-flex justify-content-between align-items-center flex-wrap`}>
                    <div className={`d-flex justify-content-start align-items-center`}>
                        {/* <Image src={photos[0]} className={`img img-fluid ${styles.getImage} me-3 border`} alt='job' /> */}
                        <div>
                            <p
                                className={`${styles.companyName} my-2 text-capitalize`}
                                style={{
                                    fontSize: "24px",
                                    color: "#14226D",
                                    fontWeight: "700"
                                }}
                            >
                                {jobName}
                            </p>
                            <p className={`${styles.viewJobRate} my-2`}>
                                ${
                                    priceRate
                                }
                            </p>
                        </div>
                    </div>
                    <div className='text-lg-end'>
                        <div>
                            <span className={`${styles.viewJobTime}`}>
                                <Image src='/images/jobTime.png' className='img img-fluid me-1' alt='job time' />
                                <Moment fromNow ago>
                                    {createdAt}
                                </Moment> ago
                            </span>
                        </div>
                        <div>
                            <span className={`${styles.viewJobTime} text-capitalize`}>
                                <Image src='/images/jobLocation.png' className='img img-fluid me-1' alt='job time' />
                                {
                                    location + ", " + countryName
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <hr className='' />

                <p className={`${styles.jobTitle}`}>Job Description</p>
                <p className={`${styles.jobDescription} text-break`}>
                    {
                        jobDescription
                    }
                </p>
                <hr className='' />
                <p className={`${styles.jobTitle}`}>Photos</p>
                <div className='d-flex align-items-center flex-wrap'>
                    {
                        photos?.length ?
                            photos.map((item, index) => (
                                <Image key={index} src={item} className={`img img-fluid m-2 ${styles.multiImages}`} alt='photos'/>
                            ))
                            :
                            <div className={`${styles.noImage} w-100 text-center d-flex justify-content-center align-items-center`}>
                                <p className={`${styles.jobDescription} ${styles.descFontSize} my-0`}>No Photos!</p>
                            </div>
                    }
                </div>
                <hr />
            </Container>
            {/* <Container className='text-end mt-4 mb-2'>
                <button
                    className={`${styles.applyJobButton} px-5 py-3`}
                    onClick={() => handleApply(job)}
                >
                    Apply for job
                </button>
            </Container> */}
        </>
    )
}