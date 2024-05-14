// import React from 'react'
// import { Container, Image } from 'react-bootstrap'
// import Moment from 'react-moment';
// import { IconArrowLeft } from 'tabler-icons'

// export default function ViewJob({ job, styles, handleIconClick, handleDeleteJob, handleEditJob }) {

//     const { jobName, jobDescription, priceRate, location, countryName, photos, id } = job;

//     return (
//         <>
//             <div className={`d-flex justify-content-start align-items-center ${styles.publishNav} mb-1`}>
//                 <span className='me-3' role='button'>
//                     <IconArrowLeft onClick={handleIconClick} />
//                 </span>
//                 <span className={`${styles.viewJob} mx-2`}>
//                     Job Details
//                 </span>
//             </div>
//             <Container className={`${styles.viewJobOuterContainer} py-4 px-5`}>
//                 <p className={`${styles.jobServiceName}`}>{job.adminService}</p>
//                 <div className={`d-flex justify-content-between align-items-center`}>
//                     <div className={`d-flex justify-content-start align-items-center`}>
//                         {/* <Image src={photos[0]} className={`img img-fluid ${styles.getImage} me-3`} alt='job' /> */}
//                         <div>
//                             <p className={`${styles.companyName} my-2`}>
//                                 {jobName}
//                             </p>
//                             <p className={`${styles.viewJobRate} my-2`}>
//                                 {
//                                     (job?.projectType == 1 ? 'Hourly' : 'Fixed') + " rate - $" + priceRate
//                                 }
//                             </p>
//                         </div>
//                     </div>
//                     <div className='text-end'>
//                         <div>
//                             <span className={`${styles.viewJobTime}`}>
//                                 <Image src='./images/jobTime.png' className='img img-fluid me-1' alt='job time' />
//                                 <Moment fromNow ago>
//                                     {
//                                         job.createdAt
//                                     }
//                                 </Moment> ago
//                             </span>
//                         </div>
//                         <div>
//                             <span className={`${styles.viewJobTime}`}>
//                                 <Image src='./images/jobLocation.png' className='img img-fluid me-1' alt='job time' />
//                                 {
//                                     location + ", " + countryName
//                                 }
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//                 <hr className='' />

//                 <p className={`${styles.jobTitle}`}>Job Description</p>
//                 <p className={`${styles.jobDescription} ${styles.descFontSize}`} style={{ whiteSpace: 'pre-line' }}>
//                     {
//                         jobDescription
//                     }
//                 </p>
//                 <hr className='' />
//                 <p className={`${styles.jobTitle}`}>Photos</p>
//                 <div className='d-flex align-items-center flex-wrap'>
//                     {
//                         photos?.length ?
//                             photos.map((item, index) => (
//                                 <Image key={index} src={item} className={`img img-fluid m-2 ${styles.multiImages}`} alt='no image' />
//                             ))
//                             :
//                             <div className={`${styles.noImage} w-100 text-center d-flex justify-content-center align-items-center`}>
//                                 <p className={`${styles.jobDescription} ${styles.descFontSize} my-0`}>
//                                     No Photos !
//                                 </p>
//                             </div>
//                     }
//                 </div>
//             </Container >
//             <Container className='text-end mt-4'>
//                 <button className={`${styles.editButton} me-3`} onClick={() => handleEditJob(job)}>Edit</button>
//                 <button className={`${styles.deleteButton} ${styles.editButton}`} onClick={() => handleDeleteJob(id)}>Delete</button>
//             </Container>
//         </>
//     )
// }


import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import Moment from 'react-moment';
// import { IconArrowLeft, IconChevronLeft, IconChevronRight, IconLetterX } from 'tabler-icons';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { encodeData } from '../../helpers/auth';
import { useRouter } from 'next/router';

export default function ViewJob({ job, styles, handleIconClick, handleDeleteJob, handleEditJob }) {

    const { jobName, jobDescription, priceRate, location, countryName, photos, id } = job;
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const router = useRouter();

    const settings =
    {
        centerMode: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1.27,
        slidesToScroll: 1,
        arrow: false,
        // prevArrow: <IconChevronLeft color='grey' />,
        // nextArrow: <IconChevronRight color='grey' />,
        // afterChange: current => setSlideNumber(current)
    };

    const handleEdit = (job) => {
        const data = encodeData({ editData: job });
        router.push(`publish/editjob=${data}`)
    }
    return (
        <>
            <div className={`d-flex justify-content-start align-items-center ${styles.publishNav} mb-1`}>
                <span className='me-3' role='button'>
                    {/* <IconArrowLeft onClick={handleIconClick} /> */}
                </span>
                <span className={`${styles.viewJob} mx-2`}>Job Details</span>
            </div>
            {!lightboxIndex ?
                <>
                    <Container className={`${styles.viewJobOuterContainer} py-4 px-5`}>
                        <p className={`${styles.jobServiceName}`}>{job.adminService[0]?.serviceName}</p>
                        <div className={`d-flex justify-content-between align-items-center`}>
                            <div className={`d-flex justify-content-start align-items-center`}>
                                {/* <Image src={photos[0]} className={`img img-fluid ${styles.getImage} me-3`} alt='job' /> */}
                                <div>
                                    <p className={`${styles.companyName} my-2`}>
                                        {jobName}
                                    </p>
                                    <p className={`${styles.viewJobRate} my-2`}>
                                        {
                                            (job?.projectType == 1 ? 'Hourly' : 'Fixed') + " rate - $" + priceRate
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className='text-end'>
                                <div>
                                    <span className={`${styles.viewJobTime}`}>
                                        <Image src='/images/jobTime.png' className='img img-fluid me-1' alt='job time' />
                                        <Moment fromNow ago>
                                            {
                                                job.createdAt
                                            }
                                        </Moment> ago
                                    </span>
                                </div>
                                <div>
                                    <span className={`${styles.viewJobTime}`}>
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
                        <p className={`${styles.jobDescription} ${styles.descFontSize}`} style={{ whiteSpace: 'pre-line' }}>
                            {
                                jobDescription
                            }
                        </p>
                        <hr className='' />

                        <p className={`${styles.jobTitle}`}>Photos</p>
                        {photos?.length ?
                            photos.map((photo, index) => (
                                <Image
                                    key={index}
                                    src={photo}
                                    className={`img img-fluid m-2 ${styles.multiImages}`}
                                    alt='no image'
                                    role='button'
                                    onClick={() => setLightboxIndex(index + 1)}
                                />
                            ))
                            :
                            <div className={`${styles.noImage} w-100 text-center d-flex justify-content-center align-items-center`}>
                                <p className={`${styles.jobDescription} ${styles.descFontSize} my-0`}>No Photos!</p>
                            </div>

                        }
                    </Container>
                    <Container className='text-end mt-4 mb-2'>
                        <button className={`${styles.editButton} me-3`} onClick={() => handleEdit(job)}>Edit</button>
                        <button className={`${styles.deleteButton} ${styles.editButton}`} onClick={() => handleDeleteJob(id)}>Delete</button>
                    </Container>
                </>
                :
                <Container className={`${styles.viewJobOuterContainer} py-4 px-5 position-relative text-center`}>
                    {/* <IconLetterX
                        role='button'
                        size={22}
                        className={`${styles.iconCross} text-white rounded-5 p-1 bg-danger `}
                        onClick={() => setLightboxIndex(null)}
                    /> */}
                    <div>
                        <Slider {...settings} initialSlide={lightboxIndex - 1} className=''>
                            {photos.map((photo, index) => (
                                <div key={index} className='px-4'>
                                    <Image
                                        src={photo}
                                        className={`img img-fluid m-2 rounded-4 ${styles.slideImage}`}
                                        alt='no image'
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Container>
            }
        </>
    );
}
