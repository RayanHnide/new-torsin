import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChatSideBar from './ChatSideBar';
import ChatBox from './ChatBox';
import styles from '../../stylesheet/chat.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAcceptedProposalJobs } from '../../store/actions/chat';

export default function Chat({ id }) {

    const dispatch = useDispatch();
    const queryData = id?.proposalId;

    const [acceptedProposalJobs] = useSelector((Gstate) => [Gstate?.ChatReducers?.acceptedProposalJobs]);   

    useEffect(() => {
        dispatch(getAcceptedProposalJobs());
    }, [acceptedProposalJobs?.length])

    const [person, setPerson] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    const handleMessageClick = (item, index) => {
        item ? setPerson(item) : setPerson(null);
        index + 1 ? setActiveIndex(index) : setActiveIndex(null);
    }

    useEffect(() => {
        if (queryData && !activeIndex) {
            const [setData] = acceptedProposalJobs.filter(item => { return item?.proposalId == queryData || item?.jobId == queryData });
            handleMessageClick(setData)
        }
    }, [queryData, acceptedProposalJobs?.length])

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <ChatSideBar
                        styles={styles}
                        sidebarItems={acceptedProposalJobs}
                        handleMessageClick={handleMessageClick}
                        activeIndex={activeIndex}
                        queryData={queryData}
                    />
                </Col>
                <Col md={8}>
                    <ChatBox
                        styles={styles}
                        person={person}
                        queryData={queryData}
                    />
                </Col>
            </Row>
        </Container>
    )
}
