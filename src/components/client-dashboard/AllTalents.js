import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
// import { IconArrowLeft, IconSearch } from 'tabler-icons';
import styles from "../../stylesheet/dashboard.module.scss";
import style from "../../stylesheet/publish.module.scss"
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { encodeData } from '../../helpers/auth';
import { getTopRatedTalents, searchTopRatedTalents } from '../../store/actions/client-action/dashboard';
import LazyLoader from '../common/LazyLoader';
import { Oval } from 'react-loader-spinner';

export default function AllTalents() {

    const router = useRouter();
    const dispatch = useDispatch();

    const [topRatedTalents, searchTalentList] = useSelector((Gstate) => [
        Gstate?.DashboardReducersClient?.topRatedTalents,
        Gstate?.DashboardReducersClient?.searchTalentList
    ])

    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTalent = (item) => {
        const data = encodeData(item);
        router.push(`/dashboard/view-talent=${data}`);
    }

    useEffect(() => {
        dispatch(getTopRatedTalents())
    }, [topRatedTalents?.length])

    useEffect(() => {
        dispatch(searchTopRatedTalents(search))
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [search?.length])


    return (
        <>
            <Row className={`d-flex justify-content-between align-items-center ${style.publishNav}`}>
                <Col className='d-flex justify-content-start align-items-center'>
                    <span className='me-2' role='button'>
                        {/* <IconArrowLeft onClick={() => router.back()} /> */}
                    </span>
                    <span className={`${styles.dashboardTitle} mx-2`}>
                        {!search ?
                            `All Talents`
                            :
                            `Search Users`
                        }
                    </span>
                </Col>
                <Col
                    className={`position-relative my-2`}
                // onClick={handleSearchDiv}
                >
                    <input
                        type='search'
                        placeholder='Search for talents by skills'
                        className={`${styles.searchInput} w-100`}
                        name='search'
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setLoading(true)
                        }}
                    />
                    {/* <IconSearch
                        size={20}
                        color='gray'
                        className={`${styles.searchIcon}`}
                    /> */}
                </Col>
            </Row>
            <Container className={`${styles.body}`}>
                <Row className='mx-1 mb-3'>
                    {
                        !search ?
                            topRatedTalents?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`row ${style.oddContainer} my-2 px-4 py-4`}
                                    onClick={() => handleTalent(item)}
                                >
                                    <Col md={1}>
                                        <Image src={item?.profileImage || '/images/dummyImage.png'} className={`img img-fluid ${style.getImage} my-3`} alt='job' />
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
                            :
                            loading ?
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "40%",
                                        top: "40vh"
                                    }}
                                >
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
                                searchTalentList?.length > 0 ?
                                    searchTalentList?.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`row ${style.oddContainer} my-2 px-4 py-4`}
                                            onClick={() => handleTalent(item)}
                                        >
                                            <Col md={1}>
                                                <Image src={item?.profileImage || '/images/dummyImage.png'} className={`img img-fluid ${style.getImage} my-3`} alt='job' />
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
