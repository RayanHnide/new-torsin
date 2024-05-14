import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Modal, Row } from 'react-bootstrap';
import Publish from './Publish';
import styles from '../../stylesheet/publish.module.scss';
import style1 from '../../stylesheet/dashboard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminServices, getPublishedJobs } from '../../store/actions/publishJob';
import ViewJob from './ViewJob';
import API from '../../helpers/api';
import { handleErrorMessage } from '../../utils/CommonFunctions';
import { Toaster, toast } from 'react-hot-toast';
import Moment from 'react-moment';
import { useRouter } from 'next/router';
import { encodeData } from '../../helpers/auth';

export default function Home({ query }) {

    const [home, setHome] = useState(true);
    const [publish, setPublish] = useState(false);
    const [viewJob, setViewJob] = useState(false);
    const [deleteJobModal, setDeleteJobModal] = useState(false);
    const [viewItem, setViewItem] = useState(null);
    const [deleteJobId, setDeleteJobId] = useState(null);
    const [editJob, setEditJob] = useState(null);

    const dispatch = useDispatch();

    const [publishedJobs, adminServices] = useSelector((Gstate) => [
        Gstate?.PublishJobReducers?.publishedJobs,
        Gstate?.PublishJobReducers?.adminServices,

    ])

    useEffect(() => {
        dispatch(getPublishedJobs())
    }, [publishedJobs?.length])

    // useEffect(() => {
    //     dispatch(getAdminServices())
    // }, [adminServices?.length]);

    const handlePublish = () => {
        setPublish(true);
    }

    const handleView = (job) => {
        setHome(false);
        setViewJob(true);
        setViewItem(job);
        // const data = encodeData(job);
        // router.push(`/publish/viewjob=${data}`)
    }

    const handleIconClick = () => {
        setHome(true);
        setViewJob(false);
    }

    const router = useRouter();

    useEffect(() => {
        if (query) {
            setHome(true);
            setViewJob(false);
            setPublish(true);
        }
    }, [query])

    const handleEditJob = (item) => {
        setEditJob(item);
        setHome(true);
        setViewJob(false);
        setPublish(true);
    }

    const handleDeleteJob = (id) => {
        setDeleteJobId(id);
        setDeleteJobModal(true);
    }

    const handleDeleteJobModal = () => {
        setDeleteJobModal(false);
    }

    const handleYes = () => {
        setDeleteJobModal(false);

        API.apiPut("deleteJob", { id: deleteJobId })
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
                    setHome(true);
                    setViewJob(false);
                    setDeleteJobId(null);
                    dispatch(getPublishedJobs());
                }
            })
            .catch((err) => {
                handleErrorMessage(err);
            });
    }

    const handleNo = () => {
        setDeleteJobId(null);
        setDeleteJobModal(false);
    }

    return (
        <>
            <Toaster />
            {/* <=========================Delete Job Modal==========================> */}
            <Modal centered show={deleteJobModal} onHide={handleDeleteJobModal} backdrop="static">
                <Modal.Body>
                    <div className='text-center px-5 py-3'>
                        <p className={`${styles.deleteJobTitle}`}>Delete Job</p>
                        <p className={`${styles.deleteJobDesc}`}>Are you sure you want to delete the ongoing posted job</p>
                        <div>
                            <button className={`${styles.deleteJobButton} me-3`} onClick={() => handleYes()}>Yes</button>
                            <button className={`${styles.deleteJobButton} ${styles.noButton}`} onClick={handleNo}>No</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {home ?
                !publish
                    ?
                    <Container>
                        <div className={`d-flex justify-content-between align-items-center ${styles.publishNav}`}>
                            <p className={`${styles.publishJobTitle}`}>Publish a Job</p>
                            <div className={`${styles.publishButton} text-center d-flex justify-content-center align-items-center`} onClick={handlePublish}>
                                <span><Image src='/images/addJobIcon.png' className='img img-fluid' alt='publish a job' /></span>
                                <span> Publish a jobs </span>
                            </div>
                        </div>
                        <Row className='mx-1 mb-2'>
                            {publishedJobs?.length ?

                                publishedJobs?.map((job, id) => (
                                    <div key={id} className={`row ${(id % 2) == 0 ? styles.oddContainer : styles.evenContainer} my-2 px-4 py-3`} onClick={() => handleView(job)}>
                                        {/* <Col md={1} className=''>
                                            <Image src={job.photos[0]} className={`img img-fluid ${styles.getImage} my-3`} alt='job' />
                                        </Col> */}

                                        <Col md={12}>
                                            <p className={`${styles.jobTitle} mb-2`}>
                                                {job.jobName}
                                            </p>
                                            {/* <hr className={`my-0 ${style1.hr}`} /> */}
                                            <p className={`${styles.jobDescription} ${styles.descFontSize} mt-0 mb-2`} style={{ whiteSpace: 'pre-line' }}>
                                                {/* {job.jobDescription.length > 30 ? job.jobDescription.substr(0, 30) + "..." : job?.jobDescription} */}
                                                {job.jobDescription.length > 50 ? job.jobDescription.includes('\n') ? (job.jobDescription.split('\n')[0] + '\n' + job.jobDescription.split('\n')[2]) + "..." : job.jobDescription.substr(0, 80) + "...." : job.jobDescription}
                                            </p>
                                            <p className={`${styles.jobRate}`}>
                                                ${job.priceRate}
                                            </p>
                                            <hr className='me-3' />
                                            <div className={`d-flex pt-1`}>
                                                <span className={`d-flex justify-content-center align-items-center me-4`}>
                                                    <Image src='/images/jobLocation.png' className='img img-fluid me-1' alt='location' />
                                                    <p className={`${styles.jobLocation} my-0`}>{`${job.location + ", " + job.countryName}`}</p>
                                                </span>
                                                <span className={`d-flex justify-content-center align-items-center me-4 `}>
                                                    <Image src='/images/jobTime.png' className='img img-fluid ' alt='location' />
                                                    <p className={`${styles.jobLocation} my-0`}>
                                                        <Moment fromNow ago>
                                                            {
                                                                job.createdAt
                                                            }
                                                        </Moment> ago
                                                    </p>
                                                </span>
                                            </div>
                                        </Col>
                                    </div>
                                ))
                                :
                                <div className='text-center mt-5'>
                                    <p className={`${style1.viewJobPersonName} text-dark mb-0 mt-5 pt-5`}>
                                        No Published jobs   
                                    </p>  
                                </div>
                            }
                        </Row>
                    </Container>
                    :
                    <Publish
                        publishFun={setPublish}
                        editJob={query}
                        adminServices={adminServices}
                        setEditJob={setEditJob}
                        style1={style1}
                    />
                :
                viewJob &&
                <ViewJob
                    job={viewItem}
                    styles={styles}
                    handleIconClick={handleIconClick}
                    handleDeleteJob={handleDeleteJob}
                    handleEditJob={handleEditJob}
                />
            }
        </>
    )
}
