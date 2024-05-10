import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { AiOutlineWarning } from "react-icons/ai";
import styles from "../../stylesheet/notifications.module.scss";
import style1 from '../../stylesheet/dashboard.module.scss';
import style from '../../stylesheet/profile.module.scss';
import contractStyle from '../../stylesheet/contracts.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { getAdminPercentage, getNotificationsList } from "../../store/actions/notifications";
import Moment from "react-moment";
import { getContractDetails } from "../../store/actions/contracts";
import ViewContractDetails from "./ViewContractDetails";
import { Toaster } from "react-hot-toast";
import PaginationComponent from "../common/PaginationComponent";

const initialPaginationState = {
    activePage: 1,
    skip: 0,
    limitPerPage: 6,
    paginatedData: [],
    notificationData: [],
    list: [],
};

export default function Notifications() {

    const dispatch = useDispatch();

    const [notificationList, adminPercentage, contractDetails] = useSelector((Gstate) => [
        Gstate?.NotificationReducers?.notificationList,
        Gstate?.NotificationReducers?.adminPercentage,
        Gstate?.ContractReducers?.contractDetails,
    ])

    const [viewPage, setViewPage] = useState(null);
    const [pagination, setPagination] = useState(initialPaginationState);
    const { activePage, skip, limitPerPage, notificationData, list } = pagination;

    useEffect(() => {
        dispatch(getNotificationsList())
        dispatch(getAdminPercentage())
    }, [notificationList?.length])

    const viewDetails = (detailsId) => {
        dispatch(getContractDetails(detailsId))
        // setViewPage(contractDetails)
        setViewPage(true);
    }

    const onPageChange = (page) => {
        var skipRecords = (page - 1) * limitPerPage;
        const to = limitPerPage * page;
        setPagination((prev) => ({
            ...prev,
            activePage: page,
            skip: JSON.parse(skipRecords),
            paginatedData: list.slice(skipRecords, to),
            notificationData: list.slice(skipRecords, to),
        }));
    };

    useEffect(() => {
        setPagination((prev) => ({ ...prev, list: notificationList }));
    }, [notificationList?.length]);

    useEffect(() => {
        onPageChange(activePage);
    }, [list, activePage]);

    return (
        <>
            <Toaster />

            {!viewPage
                ?
                <>
                    <div className={`d-flex justify-content-start align-items-center py-4 mb-2 ${style1.publishNav}`}>
                        <span className={`${style1.viewJob} mx-2`}>
                            Notifications
                        </span>
                    </div>
                    <Container className={`${styles.fontFamily}`}>
                        <Row>
                            {notificationData.length ?
                                notificationData?.map((data, index) => (
                                    <React.Fragment key={index}>

                                        <Col md={10} className="d-flex align-items-center">
                                            <AiOutlineWarning className={`${data.title.includes("Unread") && styles.blueIcon} me-2`} />
                                            <p
                                                className={`${styles.notifyHeading} my-0 ${data.title.includes("Unread") && styles.blueTitle}`}
                                                role="button"
                                                onClick={() => (data?.type == '1' && viewDetails(data?.renderId))}
                                            >
                                                {data.description}
                                            </p>
                                        </Col>
                                        <Col md={2}>
                                            <p className={`${styles.duration}`}>
                                                <Moment fromNow>
                                                    {data?.createdAt}
                                                </Moment>
                                            </p>
                                        </Col>
                                        <Col md={12}>
                                            <p className={`${styles.notifyBody} mt-3`}>{data.body}</p>
                                        </Col>
                                        <hr />
                                    </React.Fragment>
                                ))
                                :
                                <div className='text-center my-5 pt-4'>
                                    <Image src='./images/emptyNotifications.png' className='img img-fluid' alt="empty notifications"/>
                                </div>
                            }
                        </Row>
                    </Container>
                </>
                :
                <ViewContractDetails
                    style1={style1}
                    contractDetails={contractDetails}
                    contractStyle={contractStyle}
                    style={style}
                    styles={styles}
                    admin_percentage={adminPercentage}
                    setViewPage={setViewPage}
                />
            }

            {!viewPage && <div className={`d-flex justify-content-${list?.length ? 'end' : 'center'} ${!list?.length && 'd-none'}`}>
                <PaginationComponent
                    currentPage={activePage}
                    list={list}
                    skip={skip}
                    limitPerPage={limitPerPage}
                    //   loading={loading}
                    onPageChange={onPageChange}
                />
            </div>}
        </>
    )
}
