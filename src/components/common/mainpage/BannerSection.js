import React, { useEffect, useState } from 'react';
import styles from '../../../stylesheet/main.module.scss';
import style1 from "../../../stylesheet/profile.module.scss";
import { Col, Container, Image } from 'react-bootstrap';
import dashboardStyles from "../../../stylesheet/dashboard.module.scss";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminServices } from '../../../store/actions/profile';
import { useRouter } from 'next/router';
import { encodeData } from '../../../helpers/auth';

export default function BannerSection() {

    const router = useRouter();
    const [adminServices] = useSelector((Gstate) => [
        Gstate?.ProfileReducers?.adminServices,
    ]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOptions = () => {

            dispatch(getAdminServices(inputValue))

            if (Array.isArray(adminServices)) {
                const filteredOptions =
                    inputValue.trim() !== ''
                        ? adminServices?.filter((service) =>
                            service.serviceName.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        : [];

                setOptions(filteredOptions);
            }
        };

        if (inputValue.trim() !== '') {
            fetchOptions();
        } else {
            setOptions([]);
        }
    }, [inputValue, adminServices?.length]);

    const handleOptionSelect = (option) => {
        router.push(`/guest/job?data=${encodeData(option)}`)
    };

    return (
        <>
            <div className={`${styles.bannerOuter}`}>
                <Container className={`${styles.bannerInner} d-flex align-items-center pb-5`}>
                    <Col lg={7}>
                        <p className={`${styles.bannerText} text-break`}>
                            Find
                            <span className='mx-3'>
                                freelance
                            </span>
                            work in an instant, tailored to your needs.
                        </p>
                        <div
                            className="position-relative"
                        >
                            <input
                                type="search"
                                placeholder='Search for services'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className={`${dashboardStyles.searchInput} ${styles.searchOutline} w-100`}
                            />
                            <FaSearch
                                size={20}
                                color='#0E184D'
                                className={`${styles.searchIcon}`}
                            />
                        </div>
                        {
                            Array.isArray(options) && options.length > 0 &&
                            <div className={`${style1.optionsOuter} ${styles.searchOutline} mt-4`}>
                                {options?.map((option, index) => (
                                    <>
                                        <div
                                            key={option.id}
                                            className={`py-2 px-3 ${style1.optionsMenu}`}
                                            style={{
                                                color: "#14226D"
                                            }}
                                            onClick={() => handleOptionSelect(option?.serviceName)}
                                        >
                                            {option.serviceName}
                                        </div>
                                        {
                                            index !== options.length - 1 &&
                                            <hr className={`${style1.hr} m-0`} />
                                        }
                                    </>
                                ))}
                            </div>
                        }
                    </Col> 
                </Container>
            </div>
        </>
    )
}
