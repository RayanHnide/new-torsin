import React from 'react'
import styles from '../../../stylesheet/main.module.scss';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { encodeData } from '../../../helpers/auth';
import Link from 'next/link';

export default function FooterComponent() {

    const router = useRouter();

    const [allServices] = useSelector((Gstate) => [Gstate?.ProfileReducers?.allServices]);

    const handleOptionSelect = (option) => {
        router.push(`/guest/job?data=${encodeData(option)}`)
    };

    return (
        <>
            <div className={`${styles.footerBg} mt-5`}>
                <Container>
                    <footer className='pt-5 pb-2'>
                        <Row>
                            <Col lg={4} md={4} className='mb-3'>
                                <Image src='/images/footerLogo.png' className='mb-2 cursor-pointer' alt='logo' onClick={() => router.push("/")} />
                                <p className={`${styles.footerItem} my-2`}>
                                    The ultimate destination for seamless freelance connections. Our platform was born out of the desire to simplify the freelance experience, offering both freelancers and clients a streamlined way to collaborate and thrive.
                                </p>
                            </Col>

                            <Col md={1} />
                            <Col>
                                <Row>
                                    <Col md={4} className='mb-3'>
                                        <p className={`${styles.footerItemTitle} mt-2 mb-4`}>Categories</p>
                                        {
                                            allServices?.length > 0 && allServices?.map((item, index) => (
                                                <p key={index} className={`${styles.footerItem} text-capitalize mt-3 cursor-pointer`} onClick={() => handleOptionSelect(item?.serviceName)}>
                                                    {item?.serviceName}
                                                </p>
                                            ))
                                        }
                                    </Col>
                                    <Col md={4} className='mb-3'>
                                        <p className={`${styles.footerItemTitle} mt-2 mb-4`}>About</p>
                                        <p className={`${styles.footerItem} my-3`}>Privacy Policy</p>
                                        <p className={`${styles.footerItem} mt-3`}>Terms of Service</p>
                                    </Col>
                                    <Col md={4} className='mb-3'>
                                        <p className={`${styles.footerItemTitle} mt-2 mb-4`}>Community</p>
                                        <Link href={"#blogs"} className='text-decoration-none'><p className={`${styles.footerItem} my-3`} id='blogs'>Blogs</p></Link>
                                        <Link href={"#blogs"} className='text-decoration-none'><p className={`${styles.footerItem} my-3`}>News</p></Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </footer>
                </Container>
            </div>
            <Container>
                <p className={`${styles.copyrightText} my-0 text-center py-3`}>
                    <span
                        style={{
                            fontWeight: "600"
                        }}
                    >
                        Copyright
                    </span>
                    &copy; 2023 Torsin. All rights reserved.
                </p>
            </Container>
        </>
    )
}
