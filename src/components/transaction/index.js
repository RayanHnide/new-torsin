import React, { useEffect, useState } from 'react';
import styles from "../../stylesheet/jobs.module.scss";
import style1 from '../../stylesheet/dashboard.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTalentPaymentsList } from '../../store/actions/paymentMethods';
import PaymentList from './TransactionList';

const TABS = [
    { id: 1, label: 'Pending', filter: item => item.paymentStatus === 1 },
    { id: 2, label: 'Received', filter: item => item.paymentStatus === 2 },
];

export default function Transaction() {

    const [activeTab, setActiveTab] = useState(TABS[0].id);

    const dispatch = useDispatch();

    const [talentPaymentList] = useSelector((Gstate) => [Gstate?.PaymentMethodReducers?.talentPaymentList])

    useEffect(() => {
        dispatch(getTalentPaymentsList())
    }, [])

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const filteredData = talentPaymentList?.filter(TABS.find(tab => tab.id === activeTab)?.filter) || []

    const renderTabs = () => {
        return (
            <Container>
                <Row className={`${styles.tabsOuter} py-2 px-3 d-flex justify-content-between align-items-center`}>
                    {TABS.map(tab => (
                        <Col
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
            <div className={`${style1.publishNav} pt-4 pb-3`}>
                <p className={`${styles.myJobsTitle} pt-1`}>
                    Payment
                </p>
                {renderTabs()}
            </div>

            <Container className='px-0 mx-0 mt-2'>
                <PaymentList
                    data={filteredData}
                    styles={styles}
                    activeTab={activeTab}
                />
            </Container>
        </>
    );
}
