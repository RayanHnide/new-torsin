import React from 'react'
import { Container, Image } from 'react-bootstrap'
import Moment from 'react-moment';
import {FaArrowLeft} from "react-icons/fa6";
// import { IconArrowLeft } from 'tabler-icons'

export default function ViewJobs({ job, styles, handleIconClick, handleApply }) {

    const { jobName, jobDescription, priceRate, location, countryName, photos } = job;

    return (
        <>
            <div className={`d-flex justify-content-start align-items-center pt-4 mb-2 ${styles.publishNav}`}>
                <span className='me-3' role='button'>
                     <FaArrowLeft style={{cursor:'pointer'}} onClick={() => router.back()} />
                </span>
                <span className={`${styles.viewJob} mx-2`}>
                    View Job
                </span>

                {/* <span className='mb-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-math-greater" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 18l14 -6l-14 -6"></path>
                    </svg>
                </span>
                <span className={`${styles.viewJob} mx-2`}>
                    {job.adminService}
                </span> */}
            </div>
            <Container className={`${styles.viewJobOuterContainer} py-4 px-5`}>
                <p className={`${styles.jobServiceName}`}>{job.adminService}</p>
                <div className={`d-flex justify-content-between align-items-center flex-wrap`}>
                    <div className={`d-flex justify-content-start align-items-center`}>
                        {/* <Image src={photos[0]} className={`img img-fluid ${styles.getImage} me-3 border`} alt='job' /> */}
                        <div>
                            <p className={`${styles.companyName} my-2 text-capitalize`}>
                                {jobName}
                            </p>
                            <p className={`${styles.viewJobRate} my-2`}>
                                ${
                                    priceRate
                                }
                            </p>
                                
                        </div>
                    </div>
                    <div className='text-sm-end'>
                        <div>
                            <span className={`${styles.viewJobTime}`}>
                                <Image src='./images/jobTime.png' className='img img-fluid me-1' alt='job time' />
                                <Moment fromNow ago>
                                    {job.createdAt}
                                </Moment> ago
                            </span>
                        </div>
                        <div>
                            <span className={`${styles.viewJobTime} text-capitalize`}>
                                <Image src='./images/jobLocation.png' className='img img-fluid me-1' alt='job time' />
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
                                <Image key={index} src={item} className={`img img-fluid m-2 ${styles.multiImages}`} alt='image' />
                            ))
                            :
                            <div className={`${styles.noImage} w-100 text-center d-flex justify-content-center align-items-center`}>
                                <p className={`${styles.jobDescription} ${styles.descFontSize} my-0`}>No Photos!</p>
                            </div>
                    }
                </div>
            </Container>
            <Container   className='text-sm-end text-center mt-4 mb-2'>
                <button  style={{
                        fontWeight: '400',
                        fontSize: '14px',
                        lineHeight: '140%',

                        cursor: 'pointer',
                        padding: '1.5% 4%',
                        gap: '8px',
                        background: '#0E184D',
                        borderRadius: '12px',
                        fonWeight: '700',
                        color: '#FFFFFF',
                        border: '0',
                    }}
                    className={`${styles.applyJobButton} px-5 py-3`}
                    onClick={() => handleApply(job)}
                >
                    Apply for job
                </button>
            </Container>
        </>
    )
}
