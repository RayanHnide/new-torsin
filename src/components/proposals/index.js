import React, { useEffect, useState } from 'react';
import style from "../../stylesheet/jobs.module.scss";
import style1 from '../../stylesheet/dashboard.module.scss';
import { Container, Row } from 'react-bootstrap';
import ProposalsData from './ProposalsData';
import { useDispatch, useSelector } from 'react-redux';
import { getTalentProposalStatus } from '../../store/actions/proposal';
import ViewProposal from './ViewProposal';

const TABS = [
    { id: 1, label: 'Proposed', filter: item => item.proposalStatus === 1 },
    { id: 2, label: 'Accepted', filter: item => item.proposalStatus === 2 },
    { id: 3, label: 'Rejected', filter: item => item.proposalStatus === 3 }
];

export default function Proposals() {
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const proposalStatus = useSelector(state => state?.ProposalReducers?.proposalStatus);
    const dispatch = useDispatch();
    const [viewItem, setViewItem] = useState(null);

    useEffect(() => {
        dispatch(getTalentProposalStatus());
    }, [proposalStatus?.length]);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const filteredData = proposalStatus?.filter(TABS.find(tab => tab.id === activeTab)?.filter) || [];

    const handleView = (item) => {
        setViewItem(item);
    };

    const renderTabs = () => {
        return (
            <Row className='mx-0 px-0'>
                <div className={`${style.tabsOuter} py-2 px-lg-5 d-flex justify-content-between align-items-center`}>
                    {TABS.map(tab => (
                        <div
                            key={tab.id}
                            className={`${style.tab} ${activeTab === tab.id && style.activeTab} px-lg-5 px-md-5 px-sm-5 px-1 py-2`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
            </Row>
        );
    };

    return (
        <>
            {!viewItem && (
                <>
                    <div className={`${style1.publishNav}`}>
                        <p className={`${style.myJobsTitle} pt-3`}>
                            Proposals
                        </p>
                        {renderTabs()}
                    </div>

                    <Container className='mx-0 px-0'>
                        <ProposalsData
                            data={filteredData}
                            style1={style1}
                            handleView={handleView}
                        />
                    </Container>
                </>
            )}
            {viewItem && (
                <ViewProposal
                    viewItem={viewItem}
                    setViewItem={setViewItem}
                    style={style}
                    style1={style1}
                />
            )}
        </>
    );
}
