import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Image, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import styles from "../../../stylesheet/main.module.scss";
import dashboardStyles from "../../../stylesheet/dashboard.module.scss";
 import style1 from "../../../stylesheet/profile.module.scss";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminServices } from '../../../store/actions/profile';
import { encodeData } from '../../../helpers/auth';
import { FaSearch } from "react-icons/fa";


export default function NavbarComponent() {

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
            <Navbar expand="lg" style={{ boxShadow: "0px 2px 16px 0px rgba(0, 0, 0, 0.14)" }} className="bg-body-tertiary bg-white" sticky='top'>
                <Container fluid className='mx-4'>
                    <Navbar.Brand>
                        <Link href='/' className='text-decoration-none d-flex align-items-center justify-content-center cursor-pointer'>
                            <Image src="/images/torsinLogo.png" className='img img-fluid' alt='logo' />
                            <span className={`${styles.torsinHeading} mx-3`}>Torsin</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="my-2 my-lg-0 position-relative me-auto w-50 "
                            // style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <input
                                type="search"
                                placeholder='Search for job'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className={`${dashboardStyles.searchInput} ${styles.searchOutline} w-100`}
                            />
                            <FaSearch
                                size={20}
                                color='#0E184D'
                                className={`${dashboardStyles.searchIcon} ${styles.searchIcon}`}
                            />
                            {
                                Array.isArray(options) && options.length > 0 &&
                                <div className={`${style1.optionsOuter} ${styles.searchOutline} mt-4 ${styles.position}`}>
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
                        </Nav>
                        <div className='my-2 my-lg-0'>
                            <button
                                className={`me-3 ${styles.signInButton}`}
                                onClick={() => router.push('/login')}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className='my-2 my-lg-0'>
                            <button
                                className={`${styles.joinButton} py-2 px-4`}
                                onClick={() => router.push('/registration')}
                            >
                                Join
                            </button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
