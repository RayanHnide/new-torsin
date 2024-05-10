import React, { useEffect, useState } from 'react';
import styles from "../../stylesheet/contracts.module.scss";
import style from '../../stylesheet/dashboard.module.scss';
import style1 from '../../stylesheet/profile.module.scss';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
 import { getContractDetails, getContractsList, getAllContractsList } from '../../store/actions/contracts';
import { Toaster } from 'react-hot-toast';
import ContractsData from './ContractsData';
import ViewContracts from './ViewContracts';

const TABS = [
    { id: 1, label: 'Accepted', filter: item => item.status === 1 },
    { id: 2, label: 'Rejected', filter: item => item.status === 2 },
    { id: 3, label: 'Archived', filter: item => item.status === 3 }
];

export default function Contracts() {
   
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const dispatch = useDispatch();
    const [detailsId, setDetailsId] = useState(null);

    const [allContractsList, contractList, contractDetails] = useSelector((Gstate) => [
        Gstate?.ContractReducers?.allContractsList,
        Gstate?.ContractReducers?.contractList,
        Gstate?.ContractReducers?.contractDetails,
    ])

    useEffect(() => {
        dispatch(getAllContractsList())
    }, [allContractsList?.length])

    useEffect(() => {
        dispatch(getContractsList(activeTab))
    }, [contractList?.length, activeTab])

    useEffect(() => {
        detailsId && dispatch(getContractDetails(detailsId))
    }, [detailsId])

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const filteredData = contractList?.filter(TABS.find(tab => tab.id === activeTab)?.filter) || [];

    const renderTabs = () => {
        return (
            <Container className='px-0'>
                <div className={`${styles.tabsOuter} py-2 px-5 d-flex justify-content-between align-items-center`}>
                    {TABS.map(tab => (
                        <div
                            key={tab.id}
                            className={`${styles.tab} ${activeTab === tab.id && styles.activeTab} px-5 py-2`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
            </Container>
        );
    };

    return (
        <>
            <Toaster />
            {!detailsId ?
                (
                    <>
                        <div className={`${style.publishNav}`}>
                            <p className={`${styles.myJobsTitle} pt-3`}>
                                Contracts
                            </p>
                            {renderTabs()}
                        </div>

                        <Container className='px-0'>
                            <ContractsData
                                data={contractList}
                                styles={styles}
                                activeTab={activeTab}
                                style={style}
                                setDetailsId={setDetailsId}
                            // handleEdit={handleEdit}
                            />
                        </Container>
                    </>
                )
                :
                <ViewContracts
                    style={style}
                    styles={styles}
                    style1={style1}
                    setDetailsId={setDetailsId}
                    contractDetails={contractDetails}
                />
            }
        </>
    );
}
