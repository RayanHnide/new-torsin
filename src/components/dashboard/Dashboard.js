  import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Nav, Row } from 'react-bootstrap';
import styles from "../../stylesheet/dashboard.module.scss";
import { useRouter } from 'next/router';
 import { useDispatch, useSelector } from 'react-redux';
 import { FaSearch, FaUser } from "react-icons/fa";
import { getSkillsJobs } from '../../store/actions/dashboard';
import Moment from 'react-moment';
import ViewJobs from './ViewJobs';
import AllJobs from './AllJobs';
import JobApply from './JobApply';
import Blogs from './Blogs';
export default function Dashboard() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const [skillJobs] = useSelector((Gstate) => [Gstate?.DashboardReducers?.skillJobs])
  const [viewData, setViewData] = useState(null);
  const [allJobs, setAllJobs] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [applyJob, setApplyJob] = useState(null);
  const [profilelist] = useSelector((Gstate) => [Gstate?.ProfileReducers?.profilelist]);

  useEffect(() => {
    dispatch(getSkillsJobs());
  }, [skillJobs?.length])

  const handleSearchDiv = () => {
    setAllJobs(true);
    setDisabled(false);
  }

  const handleView = (item) => {
    setViewData(item);
  }

  const handleIconClick = () => {
    // setHome(true);
    setViewData(null);
    setSearchData(searchData);
  }
  const handleNavigateToHome = () => {
    setSearchData(null);
    setAllJobs(false);
    setDisabled(true);
  }
  const handleApply = (item) => {
    setApplyJob(item);
  }
  const handleApplyJobBackIconClick = () => {
    setApplyJob(null);
  }
  return (
      <>
        {
          !viewData
              ?
              !allJobs ?
                  <>
                    <div className={`${styles.publishNav} pb-2`}>
                      <Row className='d-flex justify-content-between align-items-center flex-wrap flex-wrap-reverse'>
                        <Col md={6} sm={12} className='mt-2'>
                          <p className={`${styles.dashboardTitle} my-0`}>
                            Welcome {profilelist?.fullName}
                          </p>
                        </Col>
                        <Col md={6} sm={8} xs={10} className={`position-relative d-flex justify-content-end mt-2 ms-auto`} onClick={handleSearchDiv}>

                          <button style={{
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
                           }}  >
                             All Jops
                           </button>

                        </Col>
                      </Row>
                    </div>
                    <Container className=''>
                      <Blogs />

                    </Container>

                    <Container className={`${styles.body} mb-3 mt-4`}>
                      <p className={`${styles.blogsTitle} mb-0`}>Jobs based on your expertise</p>
                      <Row className='mx-1 mt-1'>
                        {
                          skillJobs.map((item, index) => (
                              item?.proposalStatus == 0 &&
                              <div key={index} className={`row ${(index % 2) == 0 ? styles.oddContainer : styles.evenContainer} my-2 px-4 py-3`} onClick={() => handleView(item)}>
                                {/* <Col md={1}>
                          <Image src={item?.photos[0]} className={`img img-fluid ${styles.getImage} my-4 border`} alt='job' />
                        </Col> */}

                                <Col md={12}>
                                  <p className={`${styles.jobTitlePersonName} mb-2 text-capitalize`}>
                                    {item?.jobName}
                                  </p>
                                  {/* <p className={`${styles.jobAdminService} mb-2 text-capitalize`}>
                            {item?.adminService}
                          </p> */}
                                  <p className={`${styles.jobDescription} mt-0 mb-2 text-break`}>
                                    {item?.jobDescription}
                                  </p>
                                  <p className={`${styles.jobRate}`}>
                                    ${item?.priceRate}
                                  </p>
                                  <hr className='me-3' />
                                  <div className={`d-flex pt-1 flex-wrap`}>
                            <span className={`d-flex justify-content-center align-items-center me-4`}>
                              <Image src='./images/jobLocation.png' className='img img-fluid me-1' alt='location' />
                              <p className={`${styles.jobLocation} my-0`}>{item?.location + ", " + item?.countryName}</p>
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
                  :
                  <AllJobs
                      dispatch={dispatch}
                      styles={styles}
                      handleSearchDiv={handleSearchDiv}
                      handleView={handleView}
                      setSearchData={setSearchData}
                      searchData={searchData}
                      handleNavigateToHome={handleNavigateToHome}
                  />
              :

              !applyJob ?
                  <ViewJobs
                      styles={styles}
                      job={viewData}
                      handleIconClick={handleIconClick}
                      handleApply={handleApply}
                  />
                  :
                  <JobApply
                      handleApplyJobBackIconClick={handleApplyJobBackIconClick}
                      applyJob={applyJob}
                      styles={styles}
                  />
                  
        }
       
      </>
  )
}

