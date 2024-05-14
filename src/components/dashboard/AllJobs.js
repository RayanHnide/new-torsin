import React, { useEffect, useState } from 'react';
import { getAllJobs, getSearchJobs } from '../../store/actions/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../../stylesheet/dashboard.module.scss";
import Moment from 'react-moment';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
 import { IoChevronDown  } from "react-icons/io5";


import { FaArrowLeft ,FaSearch} from "react-icons/fa";

export default function AllJobs({ handleSearchDiv, handleView, searchData, setSearchData, handleNavigateToHome }) {

    const dispatch = useDispatch();
    const [allJobs, searchJobs] = useSelector((Gstate) => [
        Gstate?.DashboardReducers?.allJobs,
        Gstate?.DashboardReducers?.searchJobs
    ]);

    useEffect(() => {
        dispatch(getAllJobs());
    }, [allJobs?.length])

    useEffect(() => {
        let timeoutId = null;

        const delayedRequest = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                searchData && dispatch(getSearchJobs(searchData));
            }, 1000);
        };

        if (searchData !== '') {
            delayedRequest();
        } else {
            setSearchData(null);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchData?.length]);

    const handleSearch = (e) => {
        setSearchData(e.target.value)
    }

    return (
        <>
            <div className={`${styles.publishNav}`}>
                <Row className='d-flex justify-content-between align-items-center flex-wrap flex-wrap-reverse'>
                    <Col md={6} className='my-2 d-flex'>
                        {!searchData && <span className='pe-2' role='button'>
                            <FaArrowLeft size={20} onClick={handleNavigateToHome} />
                        </span>}
                        <p className={`${styles.dashboardTitle} my-0`}>
                            {!searchData ?
                                ` All Jobs`
                                :
                                `Search Result`
                            }
                        </p>
                    </Col>

                    <Col className={`position-relative my-2`} onClick={handleSearchDiv}>
                        <input
                            type='search'
                            placeholder='Search for job'
                            className={`${styles.searchInput} w-100`}
                            value={searchData}
                            onChange={handleSearch}
                        />
                        <FaSearch
                            size={20}
                            color='gray'
                            className={`${styles.searchIcon}`}
                        />
                    </Col>

                    {/* <Col>
                        <div className={`${styles.searchOuter} d-flex justify-content-start align-items-center px-4 py-2`}>
                            <Image src='./images/filterIcon.png' className='img img-fluid me-1' />
                            <div
                                id='1'
                                className={`${styles.filterOuter} d-flex justify-content-center align-items-center px-3 py-2 mx-2`}
                                onClick={()=>handleFilterBoxClick(id)}
                            >
                                <p className={`${styles.filterItemName} my-0 me-2`}>
                                    Budget
                                </p>
                                <IconChevronDown
                                    size={19}
                                    color='#000C14'
                                />
                            </div>
                            <div className={`${styles.filterOuter} d-flex justify-content-center align-items-center px-3 py-2 mx-2`}>
                                <p className={`${styles.filterItemName} my-0 me-2`}>
                                    Availability
                                </p>
                                <IconChevronDown
                                    size={19}
                                    color='#000C14'
                                />
                            </div>
                            <div className={`${styles.filterOuter} d-flex justify-content-center align-items-center px-3 py-2 mx-2`}>
                                <p className={`${styles.filterItemName} my-0 me-2`}>
                                    Project Type
                                </p>
                                <IconChevronDown
                                    size={19}
                                    color='#000C14'
                                />
                            </div>
                        </div>
                    </Col> */}

                </Row>
            </div>

            <Container className={`${styles.body}`}>
                <Row className='mx-1 my-3'>

                    {!searchData?.length
                        ?
                        allJobs.map((item, index) => (
                            item?.proposalStatus == 0 && <div key={index} className={`row ${(index % 2) == 0 ? styles.oddContainer : styles.evenContainer} my-2 px-4 py-3`} onClick={() => handleView(item, searchData)}>
                                {/* <Col md={1}>
                                    <Image src={item?.photos[0]} className={`img img-fluid ${styles.getImage} my-3 border`} alt='job' />
                                </Col> */}

                                <Col md={12}>
                                    <p className={`${styles.jobTitlePersonName} mb-2 text-capitalize`}>
                                        {item?.jobName}
                                    </p>
                                    <p className={`${styles.jobDescription} mt-0 mb-2 text-capitalize text-break`}>
                                        {item?.jobDescription}
                                    </p>
                                    <p className={`${styles.jobRate}`}>
                                        ${item?.priceRate}
                                    </p>
                                    <hr className='me-3' />
                                    <div className={`d-flex pt-1 flex-wrap`}>
                                        <span className={`d-flex justify-content-center align-items-center me-4`}>
                                            <Image src='./images/jobLocation.png' className='img img-fluid me-1' alt='location' />
                                            <p className={`${styles.jobLocation} my-0 text-capitalize`}>{item?.location + ", " + item?.countryName}</p>
                                        </span>
                                        <span className={`d-flex justify-content-center align-items-center me-4 `}>
                                            <Image src='./images/jobTime.png' className='img img-fluid ' alt='location' />
                                            <p className={`${styles.jobLocation} my-0`}>
                                                <Moment fromNow ago>
                                                    {item?.createdAt}
                                                </Moment> ago
                                            </p>
                                        </span>
                                    </div>
                                </Col>
                            </div>
                        ))
                        :

                        !searchJobs?.length ?
                            <p>No jobs found !</p>
                            :
                            searchJobs?.map((item, index) => (
                                item?.proposalStatus == 0 && <div key={index} className={`row ${(index % 2) == 0 ? styles.oddContainer : styles.evenContainer} my-2 px-4 py-3`} onClick={() => handleView(item, searchData)}>
                                    {/* <Col md={1}>
                                        <Image src={item?.photos[0]} className={`img img-fluid ${styles.getImage} my-3 border`} alt='job' />
                                    </Col> */}

                                    <Col md={12}>
                                        <p className={`${styles.jobTitlePersonName} mb-2 text-capitalize`}>
                                            {item?.jobName}
                                        </p>
                                        {/* <p className={`${styles.jobAdminService} mb-2 text-capitalize`}>
                                            {item?.jobName}
                                        </p> */}
                                        <p className={`${styles.jobDescription} mt-0 mb-2 text-capitalize text-break`}>
                                            {item?.jobDescription}
                                        </p>
                                        <p className={`${styles.jobRate}`}>
                                            ${item?.priceRate}
                                        </p>
                                        <hr className='me-3' />
                                        <div className={`d-flex pt-1`}>
                                            <span className={`d-flex justify-content-center align-items-center me-4`}>
                                                <Image src='./images/jobLocation.png' className='img img-fluid me-1' alt='location' />
                                                <p className={`${styles.jobLocation} my-0 text-capitalize`}>{item?.location + ", " + item?.countryName}</p>
                                            </span>
                                            <span className={`d-flex justify-content-center align-items-center me-4 `}>
                                                <Image src='./images/jobTime.png' className='img img-fluid ' alt='location' />
                                                <p className={`${styles.jobLocation} my-0`}>
                                                    <Moment fromNow ago>
                                                        {item?.createdAt}
                                                    </Moment> ago
                                                </p>
                                            </span>
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
