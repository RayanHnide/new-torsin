 import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Nav, Row } from 'react-bootstrap';
import styles from "../../stylesheet/dashboard.module.scss";
import style from "../../stylesheet/publish.module.scss"
import { useRouter } from 'next/router';
// import { IconSearch } from 'tabler-icons';
import TalentJobs from './TalentJobs';
import TalentProposals from './TalentProposals';
import ViewJob from './ViewJob';
import ReceivedProposal from './ReceivedProposal';
import { useDispatch, useSelector } from 'react-redux';
import { getProposalTalentDetails, getProposedJobs, getTopRatedTalents } from '../../store/actions/client-action/dashboard';
import ViewProposal from './ViewProposal';
import { Toaster } from 'react-hot-toast';
import { firebaseCloudMessaging } from "../../firebase_setup/firebase-client"
import { encodeData } from '../../helpers/auth';
import Blogs from './Blogs';
import axios from "axios";

export default function Dashboard() {
    const routertoCreate = useRouter()
    // const handleCreateContract=(item)=>{
    //     const itemData = {
    //         id: item.id,
    //          jopId:'20',
    //         talentId:'18',
    //         talentEmail:'rayan@gmail.com',
    //         jopName:item.jopName
    //
    //
    //     };
    //
    //
    //     // const queryString = encodeURIComponent(JSON.stringify(itemData));
    //     // routertoCreate.push(`/client-contract?data=${queryString}`);
    //     console.log(itemData.talentEmail)
    // }





    ///////////////////////////////
    const dispatch = useDispatch();

    const [proposedJobs, proposedJobsDetails, topRatedTalents] = useSelector((Gstate) => [
       
        Gstate?.DashboardReducersClient?.proposedJobs,
        Gstate?.DashboardReducersClient?.proposedJobsDetails,
        Gstate?.DashboardReducersClient?.topRatedTalents,

    ] );
    useEffect(() => {
        dispatch(getTopRatedTalents())
    }, [topRatedTalents?.length])

    const [profilelist] = useSelector((Gstate) => [Gstate?.ProfileReducers?.profilelist]);
    
    useEffect(() => {
        dispatch(getProposedJobs());
    }, [proposedJobs?.length])

    useEffect(() => {
        firebaseCloudMessaging()
    }, [])
    const router = useRouter();
    const [disabled, setDisabled] = useState(true);
    const [allProposals, setAllProposals] = useState(false);
    const [allJobs, setAllJobs] = useState(false);
    const [viewJobItem, setViewJobItem] = useState(null);
    const [viewReceivedProposalData, setViewReceivedProposalData] = useState(null);
    const [viewJobProposal, setViewJobProposal] = useState(null);
    const handleSearchDiv = () => {
        // setDisabled(false);
    }

    const handleView = () => {

    }

    const handleAllJobs = () => {
        setAllJobs(true);
        setAllProposals(false);
        setViewJobItem(null);
    }

    const handleAllProposals = () => {
        setAllJobs(false);
        setAllProposals(true);
        setViewJobItem(null);
    }

    const handleProposalBackIconClick = () => {
        setAllProposals(false);
    }

    const handleTalentBackIconClick = () => {
        setAllJobs(false);
    }

    const handleViewJobBackIconClick = () => {
        setViewJobItem(null);
    }

    const handleReceivedProposal = (item) => {
        setViewReceivedProposalData(item);
        item && dispatch(getProposalTalentDetails(item?.id))
    }

    const handleReceivedProposalBackIcon = () => {
        setViewReceivedProposalData(null)
    }

    const handleTalent = (item) => {
        const data = encodeData(item);
        router.push(`/dashboard/view-talent=${data}`);
    }

    return (
        <>
            <Toaster />
            {(!allJobs && !allProposals && !viewJobItem && !viewReceivedProposalData)
                ?
                <>
                    <div className={`${style.publishNav} pb-2`}>
                        <Row className='d-flex justify-content-between align-items-center'>
                            <Col className='my-0'>
                                <p className={`${styles.dashboardTitle} mt-2`}>
                                    Hey {profilelist?.fullName},
                                </p>
                            </Col>
                            <Col className={`position-relative mt-2`} onClick={handleSearchDiv}>
                                <input
                                    type='search'
                                    placeholder='Search for job'
                                    className={`${styles.searchInput} w-100`}
                                    disabled={disabled}
                                />
                                {/* <IconSearch
                                    size={20}
                                    color='gray'
                                    className={`${styles.searchIcon}`}
                                /> */}
                            </Col>
                        </Row>

                    </div>

                    <Container className='px-1'>
                        <Blogs />
                    </Container>

                    <div className='mt-3 d-flex justify-content-between align-items-center'>
                        <p className={`${styles.proposalsTitle} my-0`}>Proposals</p>
                        <p
                            className={`${styles.viewMore} my-0`}
                            onClick={handleAllProposals}

                        >
                            View more
                        </p>
                    </div>

                    <Container className={`${styles.body}`}>
                        <Row className='mx-1 mb-3'>
                            {
                                proposedJobs?.map((item, index) => (
                                    [0, 1].includes(index) && <div key={index} className={`row ${style.oddContainer} my-2 px-4 py-3`} onClick={() => handleReceivedProposal(item)}>
                                        {/* <Col md={1}>
                                            <Image src={item?.image ? item?.image[0] : './images/jobDp2.png'} className={`border img img-fluid ${style.getImage} my-3`} alt='job' />
                                        </Col> */}

                                        <Col md={12}>
                                            <p className={`${styles.jobTitlePersonName} mb-2`}>
                                                {item?.jobName}
                                            </p>
                                            <p className={`${style.jobDescription} mt-0 mb-2`}>
                                                {item?.jobDescription}
                                            </p>
                                            <div className={`d-flex pt-1`}>
                                                <p className={`${style.proposalsRecieved} my-0 me-2`}>Proposals Recieved - </p>
                                                <p className={`${styles.proposalsCount} my-0`}>{item?.totalCount }</p>
                                            </div>

                                                 <button className='btn btn-outline-primary' onClick={(()=>{
                                                     // router.push(`/client-contract?id=${item.id}`)
                                                     // handleCreateContract(item)
                                                     const itemData = {
                                                         id: item.id,
                                                         jopId:'20',
                                                         talentId:'18',
                                                         talentEmail:'rayan@gmail.com',
                                                         jopName:item.jopName


                                                     };
                                                     const queryString = encodeURIComponent(JSON.stringify(itemData));
                                                     routertoCreate.push(`/client-contract?data=${queryString}`);

                                                 })} >Create Contract</button>
                                        </Col>
                                    </div>
                                ))
                            }
                        </Row>
                    </Container>

                    <div className={`${style.publishNav2}`}>
                        <div className='mt-3 d-flex justify-content-between align-items-center'>
                            <p className={`${styles.proposalsTitle} my-0`}>Top Rated Talents </p>
                            <p
                                className={`${styles.viewMore} my-0`}
                                onClick={() => router.push(`client-dashboard/all-talents`)}
                            >
                                View more
                            </p>
                        </div>
                    </div>
                    
                    <Container className={`${styles.body}`}>
                         

                        <Row className='mx-1 mb-3'>
                            {
                                topRatedTalents?.slice(0, 5)?.map((item, index) => (
                                    
                                    <div key={index} className={`row ${style.oddContainer} my-2 px-4 py-4`} onClick={() => handleTalent(item)}>
                                        <Col md={1}>
                                            <Image src={item?.profileImage || '/images/dummyImage.png'} className={`border img img-fluid ${style.getImage} my-3`} alt='job' />
                                        </Col>

                                        <Col md={11}>
                                            <p className={`${styles.jobTitlePersonName} mb-2`}>
                                                {item?.fullName}
                                            </p>
                                            <p className={`${style.jobDescription} mt-0 mb-2`}>
                                                {item?.bio}
                                            </p>
                                            <p className={`${styles.jobTitlePersonName} mb-2`}>
                                                {item?.skill.length > 0 && (
                                                    <span className=''>
                                                        {item.skill.length > 2 ? (
                                                            <>
                                                                {item.skill.slice(0, 2).join(', ')}
                                                                <span className={`${styles.more}`} >, (+{item?.skill.length - 2} More)</span>
                                                            </>
                                                        ) : (
                                                            item?.skill.slice(0, 2).join(', ')
                                                        )}
                                                    </span>
                                                )}
                                            </p>
                                            <hr className='me-3' />
                                            <div className={`d-flex pt-1`}>
                                                <span className={`d-flex justify-content-center align-items-center me-4`}>
                                                    <Image src='/images/jobLocation.png' className='img img-fluid me-1' alt='location' />
                                                    <p className={`${style.jobLocation} my-0`}>
                                                        <>
                                                            {item?.location}
                                                            {
                                                                !item?.location.endsWith(item?.countryName) && ", " + item?.countryName
                                                            }
                                                        </>
                                                    </p>
                                                </span>
                                                <span className={`d-flex justify-content-center align-items-center me-4 `}>
                                                    <Image src='/images/star.png' className='img img-fluid me-1' alt='rating' />
                                                    <p className={`${style.jobLocation} my-0`}>
                                                        <>
                                                            {item?.avgRating.toFixed(1)}
                                                            ({item.noofratingGiven >= 100 ? '100+' : item.noofratingGiven})
                                                        </>
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
                !viewJobItem && !viewReceivedProposalData
                    ?
                    (allJobs && !allProposals)
                        ?
                        <TalentJobs
                            style={style}
                            styles={styles}
                            jobs={jobs}
                            handleTalentBackIconClick={handleTalentBackIconClick}
                        />
                        :
                        <TalentProposals
                            style={style}
                            styles={styles}
                            proposedJobs={proposedJobs}
                            handleReceivedProposal={handleReceivedProposal}
                            handleProposalBackIconClick={handleProposalBackIconClick}
                        />
                    :
                    !viewReceivedProposalData
                        ?
                        <ViewJob
                            style={style}
                            styles={styles}
                            viewJobItem={viewJobItem}
                            handleViewJobBackIconClick={handleViewJobBackIconClick}
                        />
                        :
                        !viewJobProposal
                            ?

                            <ReceivedProposal
                                style={style}
                                styles={styles}
                                proposedJobsDetails={proposedJobsDetails}
                                viewReceivedProposalData={viewReceivedProposalData}
                                setViewJobProposal={setViewJobProposal}
                                handleReceivedProposalBackIcon={handleReceivedProposalBackIcon}
                            />
                            :
                            <ViewProposal
                                style={style}
                                styles={styles}
                                setViewJobProposal={setViewJobProposal}
                                viewJobProposal={viewJobProposal}
                                jobId={parseInt(viewReceivedProposalData?.id)}
                            />

            }
        </>
    )
}
