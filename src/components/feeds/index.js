import React, { useEffect } from 'react';
import dashboardStyle from '../../stylesheet/dashboard.module.scss';
import jobStyle from "../../stylesheet/jobs.module.scss";
import styles from '../../stylesheet/feeds.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds } from '../../store/actions/feeds';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { encodeData } from '../../helpers/auth';

export default function Feeds() {

    const dispatch = useDispatch();
    const router = useRouter();
    const [feedsList] = useSelector((Gstate) => [Gstate?.FeedsReducers?.feedsList]);

    useEffect(() => {
        dispatch(getFeeds());
    }, [feedsList?.length]);

    const mainFeeds = feedsList?.filter((item) => item.isMain);
    const otherFeeds = feedsList?.filter((item) => !item.isMain);

    const sortedFeedsList = [...mainFeeds, ...otherFeeds];

    const handleView = (item) => {
        const data = encodeData(item);
        router.push(`/feeds/viewfeeds=${data}`)
    }

    return (
        <>
            <div className={`${dashboardStyle.publishNav} pt-4 mb-3`}>
                <p className={`${jobStyle.myJobsTitle} mb-0`}>Blogs / News</p>
            </div>

            <Container className='mt-1 px-0'>
                <Row className={`d-flex align-iems-center`}>
                    {sortedFeedsList?.length >= 1 &&
                        sortedFeedsList?.map((item, index) => (
                            item?.isMain ? (
                                <Col key={index} md={12} className='cursor-pointer' onClick={() => handleView(item)}>
                                    <div
                                        style={{
                                            backgroundImage: `url(${item?.feedPhoto})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            height: '280px',
                                            width: '100%',
                                            borderRadius: '12px',
                                            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.08)',
                                        }}
                                        className='py-3 px-4 d-flex flex-column justify-content-between'
                                    >
                                        <p
                                            className={`${styles.mainFeedHeadline} text-break`}
                                            style={{
                                                color: 'white',
                                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                                            }}
                                            title={item?.feedHeadline}
                                        >
                                            {item?.feedHeadline}
                                        </p>
                                        <p
                                            className={`${styles.mainFeedDesc} text-break`}
                                            style={{
                                                color: 'white',
                                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                                            }}
                                            title={item?.feedDescription}
                                        >
                                            {item?.feedDescription}
                                        </p>
                                    </div>
                                </Col>
                            ) : (
                                <Col
                                    key={index}
                                    xs={12} sm={6} md={4}
                                    className='my-3 cursor-pointer'
                                    onClick={() => handleView(item)}
                                >
                                    <div className={`${styles.feedCardOuter} text-break`}>
                                        <Image
                                            src={item?.feedPhoto}
                                            className={`img img-fluid ${styles.feedPhoto} text-center`}
                                            alt='feed image'
                                        />
                                        <div className='p-3'>
                                            <p className={`${styles.feedHeading} my-0 py-1`} title={item?.feedHeadline.length > 33 ? item?.feedHeadline : ""}>
                                                {item?.feedHeadline.length > 33 ? item?.feedHeadline.substr(0, 33) + "..." : item?.feedHeadline}
                                            </p>
                                            <p className={`${styles.feedDesc} text-break my-0 py-1`}>
                                                {
                                                    item?.feedDescription?.length > 40 ? item?.feedDescription.substr(0, 40) + "..." : item?.feedDescription
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            )
                        ))}
                </Row>
            </Container>
        </>
    );
}
