import React, { useEffect, useState } from 'react';
import styles from "../../../stylesheet/contracts.module.scss";
import style from "../../../stylesheet/publish.module.scss"
import style1 from '../../../stylesheet/dashboard.module.scss';
import jstyle from '../../../stylesheet/job.module.scss';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ContractsData from './ContractsData';
// import { IconSend } from 'tabler-icons';
import CreateContract from './CreateContract';
import { getPublishedJobs } from '../../../store/actions/client-action/publishJob';
import { getContractDetails, getContractsList, getAllContractsList, getAdminPercentage } from '../../../store/actions/client-action/contract';
import { Toaster } from 'react-hot-toast';
import { getAcceptedProposalJobs } from '../../../store/actions/client-action/chat';
import ViewContracts from './ViewContracts';
import ArchiveContracts from './ArchiveContracts';
import { Oval } from 'react-loader-spinner';
import { useRouter } from 'next/router';
import { decodeData } from '../../../helpers/auth';

const TABS = [
    { id: 0, label: 'Sent', filter: item => item.status === 0 },
    { id: 1, label: 'Accepted', filter: item => item.status === 1 },
    { id: 2, label: 'Rejected', filter: item => item.status === 2 }
];

export default function Contracts() {

    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const dispatch = useDispatch();
    const [createContract, setCreateContract] = useState(false);
    const [detailsId, setDetailsId] = useState(null);
    const [archive, setArchive] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [queryData, setQueryData] = useState(null);

    const router = useRouter();
    const { query } = router;

    useEffect(() => {
        if (router?.asPath.includes('createcontract')) {

            setCreateContract(true)
            const data = decodeData(query?.createcontract)
            const contractDetails = data?.contractDetails
            setQueryData(contractDetails)
        }
    }, [query])

    const [allContractsList, publishedJobs, contractList, contractDetails, acceptedProposalJobs, adminPercentage] = useSelector((Gstate) => [
        Gstate?.ContractReducers?.allContractsList,
        Gstate?.PublishJobReducers?.publishedJobs,
        Gstate?.ContractReducers?.contractList,
        Gstate?.ContractReducers?.contractDetails,
        Gstate?.ChatReducers?.acceptedProposalJobs,
        Gstate?.ContractReducers?.adminPercentage,
    ])

    useEffect(() => {
        dispatch(getAllContractsList())
    }, [allContractsList?.length, archive])

    useEffect(() => {
        createContract && dispatch(getPublishedJobs())
    }, [publishedJobs?.length, createContract])

    useEffect(() => {
        createContract && dispatch(getAcceptedProposalJobs())
    }, [acceptedProposalJobs?.length, createContract])

    useEffect(() => {
        (createContract || detailsId) && dispatch(getAdminPercentage())
    }, [adminPercentage?.length, createContract, detailsId])

    useEffect(() => {
        dispatch(getContractsList(activeTab))
    }, [contractList?.length, activeTab])

    // useEffect(() => {
    //     if (edit) {
    //         const fetchContractDetails = async () => {
    //             if (detailsId && edit) {
    //                 setIsLoading(true); // Set loading state to true when fetching contractDetails
    //                 await dispatch(getContractDetails(detailsId));
    //                 !editedItem ? setIsLoading(true) : setTimeout(() => {
    //                     setIsLoading(false);
    //                 }, 0);// Set loading state to false when fetching is completed
    //             }
    //         };

    //         if (detailsId && edit) {
    //             fetchContractDetails();
    //             setTimeout(() => {
    //                 setEditedItem(contractDetails)
    //             }, 2000);
    //             // setEditedItem(contractDetails)
    //         }
    //     }
    //     else {
    //         detailsId && dispatch(getContractDetails(detailsId))
    //     }
    // }, [contractDetails?.length]);

    useEffect(() => {
        if (edit && detailsId) {
            dispatch(getContractDetails(detailsId))
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
        else if (detailsId) {
            dispatch(getContractDetails(detailsId))
        }
    }, [contractDetails?.length, edit, detailsId])

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleEdit = (item) => {
        setEdit(true);
        setDetailsId(item?.contractId)
        setCreateContract(true);
    }

    const mailList = acceptedProposalJobs?.filter((item) => { return item?.isHire == '1' })

    const filteredData = contractList?.filter(TABS.find(tab => tab.id === activeTab)?.filter) || [];

    const archivedData = allContractsList?.filter((item) => item?.status == 3)

    const renderTabs = () => {
        return (
            <Container>
                <Row className={`${jstyle.outerTab} py-2 px-3 d-flex justify-content-between align-items-center`}>
                    {TABS.map(tab => (
                        <Col
                            lg={3}
                            md={3}
                            sm={4}
                            xs={4}
                            key={tab.id}
                            className={`${jstyle.tab} ${activeTab === tab.id && jstyle.activeTab} text-center py-2`}
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
            <Toaster />
            {!detailsId && !createContract && !archive ?
                (
                    <>
                        <Row className={`${style.publishNav} mx-0 px-0 mb-3`}>
                            <Col xs={12} sm={4} md={4} >
                                <p className={`${styles.myJobsTitle} pt-2 my-0`}>
                                    Contracts
                                </p>
                            </Col>
                            <Col xs={12} sm={8} md={8} className={`${styles.btnGroup} d-flex justify-content-end align-items-center ps-0`}>
                                <div
                                    className={`${styles.createButon} me-5 px-3 d-flex justify-content-center align-items-center`}
                                    onClick={() => setArchive(true)}
                                >
                                    <Image src='/images/archive.png' className={`img img-fluid`} />

                                    <p className={`${styles.archivedButton} ms-2 my-0 py-2`}>
                                        Archived
                                    </p>
                                </div>
                                <div
                                    className={`${styles.createButton} px-4 d-flex justify-content-center align-items-center`}
                                    onClick={() => { setCreateContract(true) }}
                                >
                                    {/* <IconSend
                                        color='white'
                                    /> */}
                                    <p className={`${styles.email} ms-2 my-0 text-white py-2`}>
                                        Create Contract
                                    </p>
                                </div>
                            </Col>
                            <div className='mt-3'>
                                {renderTabs()}
                            </div>
                        </Row>
                        {/* <div className={`${style.fixOuterTab}`}>
                            {renderTabs()}
                        </div> */}

                        <Container>
                            <ContractsData
                                data={filteredData}
                                styles={styles}
                                style1={style1}
                                style={style}
                                activeTab={activeTab}
                                setDetailsId={setDetailsId}
                                handleEdit={handleEdit}
                            />
                        </Container>
                    </>
                )
                :
                createContract && !archive
                    ?
                    !isLoading ?
                        <CreateContract
                            style={style}
                            styles={styles}
                            style1={style1}
                            mailList={mailList}
                            setCreateContract={setCreateContract}
                            publishedJobs={publishedJobs}
                            editedItem={contractDetails}
                            edit={edit}
                            setEdit={setEdit}
                            setDetailsId={setDetailsId}
                            contractDetails={contractDetails}
                            percentage={adminPercentage}
                            queryData={queryData}
                        />
                        :
                        !contractDetails?.length &&
                        <div className={`${styles.oval}`}>
                            <Oval
                                height={50}
                                width={50}
                                color="#0E184D"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#e0e0e0"
                                strokeWidth={8}
                                strokeWidthSecondary={5}
                            />
                        </div>
                    :
                    archive && !detailsId ?
                        <Container>
                            <ArchiveContracts
                                data={archivedData}
                                styles={styles}
                                style1={style1}
                                style={style}
                                setDetailsId={setDetailsId}
                                setArchive={setArchive}
                            />
                        </Container>
                        :
                        detailsId && !edit &&

                        <ViewContracts
                            style={style}
                            styles={styles}
                            style1={style1}
                            percentage={adminPercentage}
                            setDetailsId={setDetailsId}
                            contractDetails={contractDetails}
                        />
            }
        </>
    );
}


//dhl
//color picker
//15 aug
