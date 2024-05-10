import React, { useEffect } from 'react';
import dashboardStyle from '../../stylesheet/dashboard.module.scss';
import jobStyle from "../../stylesheet/jobs.module.scss";
import styles from '../../stylesheet/feeds.module.scss';
import { Col, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds } from '../../store/actions/feeds';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { IconChevronLeft, IconChevronRight } from 'tabler-icons';
import { encodeData } from '../../helpers/auth';

export default function Blogs() {

    const router = useRouter();
    const dispatch = useDispatch();
    const [feedsList] = useSelector((Gstate) => [Gstate?.FeedsReducers?.feedsList]);

    useEffect(() => {
        dispatch(getFeeds());
    }, [feedsList?.length]);

    const handleView = (item) => {
        const data = encodeData(item);
        router.push(`/feeds/viewfeeds=${data}`)
    }

    const settings = {
        centerMode: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: false,
        // prevArrow: <IconChevronLeft color="grey" />,
        // nextArrow: <IconChevronRight color="grey" />,
        // afterChange: current => setSlideNumber(current)
    };

    return (
        <>

            <div className='mt-3 d-flex justify-content-between align-items-center'>
                <p className={`${dashboardStyle.blogsTitle} mb-0`}>Blogs / News</p>
                <p
                    className={`${dashboardStyle.viewMore} my-0`}
                    onClick={() => router.push(`feeds`)}
                >
                    View more
                </p>
            </div>

            <Container className='px-0 mt-3'>
                <Slider {...settings}>
                    {feedsList?.slice(0, 5)?.map((item, index) => (
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
                                    {item?.feedDescription?.length > 95 ? item?.feedDescription.substr(0, 95) + "..." : item?.feedDescription}
                                </p>
                            </div>
                        </Col>
                    ))}

                </Slider>
            </Container>
        </>)
}
