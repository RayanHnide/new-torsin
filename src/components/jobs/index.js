import React, { useEffect, useState } from 'react';
import style from "../../stylesheet/profile.module.scss"
import styles from "../../stylesheet/jobs.module.scss";
import style1 from '../../stylesheet/dashboard.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import JobData from './JobData.js';
import ViewJob from './ViewJob.js';
import { getActiveJobs, getPastJobs } from '../../store/actions/dashboard';
import Report from './Report.js';
import RatingPage from './RatingPage';
import dynamic from 'next/dynamic';
import { LazyLoader } from '../common/LazyLoader';

const JobData = dynamic(
    () => import('./JobData.js'),
    {
        loading: () => <LazyLoader />
    })

const TABS = [
    { id: 1, label: 'Active Jobs', filter: item => item.jobStatus === 1 },
    { id: 2, label: 'Past Jobs', filter: item => item.jobStatus === 2 },
    { id: 3, label: 'New Jobs', filter: item => item.jobStatus === 3 },
];

export default function Proposals() {

    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const [activeJobs, pastJobs] = useSelector(state => [
        state?.DashboardReducers?.activeJobs,
        state?.DashboardReducers?.pastJobs
    ]);
    const dispatch = useDispatch();
    const [viewItem, setViewItem] = useState(null);
    const [report, setReport] = useState(false);
    const [ratingPage, setRatingPage] = useState(false);
    const [filteredData, setFilteredData] = useState(activeJobs);

    useEffect(() => {
        if (activeTab == 1) {
            dispatch(getActiveJobs());
            setFilteredData(activeJobs)
        }
        if (activeTab == 2) {
            dispatch(getPastJobs());
            setFilteredData(pastJobs)
        }
    }, [activeTab]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        setFilteredData(activeJobs)
    }, [activeJobs?.length])
    // const filteredData = dummyData?.filter(TABS.find(tab => tab.id === activeTab)?.filter) || [];    

    const handleView = (item) => {
        setViewItem(item);
    };

    const renderTabs = () => {
        return (
            <Container>
                <Row className={`${styles.tabsOuter} py-2 px-3 d-flex justify-content-between align-items-center`}>
                    {TABS.map(tab => (
                        <Col
                            lg={3}
                            md={3}
                            sm={4}
                            xs={4}
                            key={tab.id}
                            className={`${styles.tab} ${activeTab === tab.id && styles.activeTab} py-2 text-center`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.label}
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    return (
        <>
            {!viewItem && (
                <>
                    <div className={`${style1.publishNav} py-4`}>
                        <p className={`${styles.myJobsTitle} pt-1`}>
                            My Jobs
                        </p>
                        {renderTabs()}
                    </div>

                    <Container className='px-0 mx-0'>
                        <JobData
                            data={filteredData}
                            style1={style1}
                            // style={style}
                            styles={styles}
                            activeTab={activeTab}
                            handleView={handleView}
                        />
                    </Container>
                </>
            )}
            {viewItem &&
                (!report && !ratingPage ?
                    <ViewJob
                        viewItem={viewItem}
                        setViewItem={setViewItem}
                        style={style}
                        style1={style1}
                        styles={styles}
                        setReport={setReport}
                        activeTab={activeTab}
                        setRatingPage={setRatingPage}
                    />
                    :
                    report && !ratingPage
                        ?
                        <Report
                            style={style}
                            style1={style1}
                            styles={styles}
                            setReport={setReport}
                        />
                        :
                        <RatingPage
                            style={style}
                            style1={style1}
                            styles={styles}
                            viewItem={viewItem}
                            setRatingPage={setRatingPage}
                        />
                )}
        </>
    );
}
