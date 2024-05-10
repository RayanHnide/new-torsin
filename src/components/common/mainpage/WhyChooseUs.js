import React from 'react';
import styles from '../../../stylesheet/main.module.scss';
import { Col, Container, Image, Row } from 'react-bootstrap';

const data = [
    { title: "Efficiency", desc: "Say goodbye to endless searches. Our intuitive platform swiftly connects freelancers and clients, eliminating the hassle and delays often associated with traditional freelance interactions." },
    { title: "Quality", desc: "We take pride in maintaining a curated network of top-notch freelancers. When you choose [Your Freelance Web App Name], you're choosing excellence and professionalism." },
    { title: "Diversity", desc: "Our platform caters to a wide array of industries and skill sets. From creative to technical, you'll find freelancers who can bring your vision to life." },
    { title: "Trust & Security", desc: "Your peace of mind matters. Our secure environment ensures that your projects and transactions are handled with the utmost care and confidentiality." }
]

export default function WhyChooseUs() {

    return (
        <>
            <div className={`${styles.chooseUsOuter} my-5`}>
                <Container>
                    <Row>
                        <Col lg={7} md={12} className='my-4 d-flex flex-column justify-content-center'>
                            <p className={`${styles.guestHeading} pt-3`}>
                                Why Choose Torsin?
                            </p>
                            <ol className={`${styles.customOl}`}>
                                {data.map((item, index) => (
                                    <li key={index} className={`mt-3`}>
                                        <span className={`${styles.guestTitle}`}>
                                            {index + 1}. {item.title}:
                                        </span>
                                        <span className={`${styles.guestDesc} ms-1`}>
                                            {item.desc}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </Col>
                        <Col md={5} className={`position-relative d-flex align-items-end ${styles.chooseImg}`}>
                            <Image src='/images/choose1.png' className={`${styles.choose1}`} alt='image' />
                            <Image src='/images/choose2.png' className={`${styles.choose2}`} alt='image' />
                            <Image src='/images/choose3.png' className={`${styles.choose3}`} alt='image' />
                            <Image src='/images/choose.png' alt='why us' className={`img img-fluid`} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
