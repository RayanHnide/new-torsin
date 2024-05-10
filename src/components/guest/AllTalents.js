import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import styles from "../../stylesheet/dashboard.module.scss";
import style from "../../stylesheet/publish.module.scss"
import style1 from '../../stylesheet/main.module.scss';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { encodeData } from '../../helpers/auth';
// import { IconChevronLeft } from 'tabler-icons';
import { getTalentDetails } from '../../store/actions/talentDetails';

export default function AllTalents({ query }) {

    const router = useRouter();
    const dispatch = useDispatch();

    const [talentDetails] = useSelector((Gstate) => [
        Gstate?.TalentReducers?.talentDetails
    ])
    const handleTalent = (item) => {
        const data = encodeData(item);
        router.push(`/guest/talent/view-talent?data=${data}`);
    }

    useEffect(() => {
        if (query) {
            dispatch(getTalentDetails(query))
        }
    }, [query])

    return (
        <>
            <Container className='my-4 d-flex justify-content-between align-items-center flex-wrap flex-wrap-reverse'>
                <p className={`${style1.guestHeading} text-capitalize my-0`}>
                    Talent Results "{query}"
                </p>
                <div
                    className={`${style1.joinButton} py-2 px-4 cursor-pointer d-flex align-items-center justify-content-center`}
                    onClick={() => router.back()}
                >
                    {/* <IconChevronLeft size={19} /> */}
                    <span>
                        Back
                    </span>
                </div>
            </Container>
            <Container>
                <Row className='mb-3'>
                    {
                        talentDetails?.length > 0 ?
                            talentDetails.map((item, index) => (
                                <div
                                    key={index}
                                    className={`row ${style.oddContainer} mx-0 shadow my-2 px-4 py-4`}
                                    onClick={() => handleTalent(item)}
                                >
                                    <Col md={1}>
                                        <Image src={item?.profileImage || '/images/dummyImage.png'} className={`img img-fluid ${style.getImage} my-3`} alt='job' />
                                    </Col>

                                    <Col md={11}>
                                        <p className={`${styles.jobTitlePersonName} text-capitalize mb-2`}>
                                            {item?.fullName}
                                        </p>
                                        <p className={`${style.jobDescription} mt-0 mb-2`}>
                                            {item?.bio}
                                        </p>
                                        <p className={`${styles.jobTitlePersonName} mb-2`}>
                                            {item?.skill?.length > 0 && (
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

                                        {/* <p className={`${style.jobRate}`}>
                                        {item?.jobRate} / <span className={`${styles.jobTitlePersonName}`}>hour </span>
                                    </p> */}
                                        <hr className='me-3' />
                                        <div className={`d-flex pt-1`}>
                                            <span className={`d-flex justify-content-center align-items-center me-4`}>
                                                <Image src='/images/jobLocation.png' className='img img-fluid me-1' alt='location' />
                                                <p className={`${style.jobLocation} my-0`}>
                                                    <>
                                                        {item?.location}
                                                        {
                                                            !item?.location.endsWith(item?.country) && ", " + item?.country
                                                        }
                                                    </>
                                                </p>
                                            </span>
                                            {/* <span className={`d-flex justify-content-center align-items-center me-4 `}>
                                                <Image src='/images/star.png' className='img img-fluid me-1' alt='rating' />
                                                <p className={`${style.jobLocation} my-0`}>
                                                    <>
                                                        {item?.avgRating?.toFixed(1)}
                                                        ({item?.noofratingGiven >= 100 ? '100+' : item?.noofratingGiven})
                                                    </>
                                                </p>
                                            </span> */}
                                        </div>
                                    </Col>
                                </div>
                            ))
                            :
                            <p>
                                No talents found!
                            </p>
                    }

                </Row>
            </Container>
        </>
    )
}
