import React, { useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
 import { FaSearch } from "react-icons/fa";
import style from '../../stylesheet/dashboard.module.scss'
import Moment from 'react-moment';

export default function ChatSideBar({ queryData, styles, sidebarItems, handleMessageClick, activeIndex }) {

    const [inputValue, setInputValue] = useState("");

    return (
        <>
            <div className={`${style.publishNav}`}>
                <div className={`${styles.chatTitle}`}>Chats</div>
                <div
                    className={`position-relative my-2 d-flex justify-content-center align-items-center`}
                >
                    <input
                        type='search'
                        placeholder='Search'
                        name='inputValue'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={`${styles.searchInput} text-dark`}
                    />
                    <FaSearch
                        size={20}
                        className={`${styles.searchIcon}`}
                    />
                </div>
            </div>

            <div className={`${styles.chatSidebarInner} ${!sidebarItems?.length && "d-flex justify-content-center align-items-center"}`}>
                {
                    !sidebarItems?.length ?

                        <div className=''>
                            <Image src='/images/emptyChat.png' />
                        </div>

                        :

                        !inputValue?.length ?

                            sidebarItems?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleMessageClick(item, index)}
                                    className={`pt-3 ${index == 0 && 'pt-3'} ${activeIndex == index && styles.activeBox} ${!activeIndex && (queryData == item?.proposalId || queryData == item?.jobId) && styles.activeBox}`}
                                >
                                    <div className='px-3 d-flex justify-content-between align-items-center' role='button'>
                                        <div className='d-flex align-items-center'>
                                            <Image src={item?.profileImage || './images/dummyImage.png'} className={`img img-fluid ${styles.chatDp} me-3`} alt="profileimage" />
                                            <div className=''>
                                                <p className={`my-0 ${styles.personName}`}>
                                                    {item?.fullName.length > 15 ? item?.fullName.substr(0, 12) + '....' : item?.fullName}
                                                </p>
                                                <p className={`my-0 ${styles.jobName}`}>
                                                    {item?.jobName.length > 15 ? item?.jobName.substr(0, 12) + '....' : item?.jobName}
                                                </p>
                                                <p className={`my-0 ${styles.personChat}`}>
                                                    {item?.jobDescription.length > 15 ? item?.jobDescription.substr(0, 15) + "...." : item?.jobDescription}
                                                </p>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <p className={`${styles.chatTime} text-end`}>
                                                <Moment fromNow ago>
                                                    {item?.createdAt}
                                                </Moment> ago
                                            </p>
                                        </div>
                                    </div>
                                    <hr className={`${styles.hr} mb-0`} />
                                </div>
                            ))
                            :
                            sidebarItems?.filter(item => {
                                return (item?.fullName.toLowerCase().includes(inputValue.toLowerCase()) || item?.jobName.toLowerCase().includes(inputValue.toLowerCase()) || item?.jobDescription.toLowerCase().includes(inputValue.toLowerCase()))
                            }).
                                map((item, index) =>
                                    <div
                                        key={index}
                                        onClick={() => handleMessageClick(item, index)}
                                        className={`pt-3 ${index == 0 && 'pt-3'} ${activeIndex == index && styles.activeBox} ${!activeIndex && (queryData == item?.proposalId || queryData == item?.jobId) && styles.activeBox}`}
                                    >
                                        <div className='px-3 d-flex justify-content-between align-items-center' role='button'>
                                            <div className='d-flex align-items-center'>
                                                <Image src={item?.profileImage || './images/dummyImage.png'} className={`img img-fluid ${styles.chatDp} me-3`} alt="profileimage" />
                                                <div className=''>
                                                    <p className={`my-0 ${styles.personName}`}>
                                                        {item?.fullName.length > 15 ? item?.fullName.substr(0, 12) + '....' : item?.fullName}
                                                    </p>
                                                    <p className={`my-0 ${styles.jobName}`}>
                                                        {item?.jobName.length > 15 ? item?.jobName.substr(0, 12) + '....' : item?.jobName}
                                                    </p>
                                                    <p className={`my-0 ${styles.personChat}`}>
                                                        {item?.jobDescription.length > 15 ? item?.jobDescription.substr(0, 15) + "...." : item?.jobDescription}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <p className={`${styles.chatTime} text-end`}>
                                                    <Moment fromNow ago>
                                                        {item?.createdAt}
                                                    </Moment> ago
                                                </p>
                                            </div>
                                        </div>
                                        <hr className={`${styles.hr} mb-0`} />
                                    </div>
                                )
                }

            </div>
        </>
    )
}
