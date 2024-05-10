import { useRouter } from 'next/router';
import styles from '../../stylesheet/paymentMethods.module.scss'
import React from 'react';
import { Container } from 'react-bootstrap';
import { TypeAnimation } from 'react-type-animation';

export default function SuccessPage() {

    const router = useRouter();

    return (
        <>
            <Container className={`border d-flex align-items-center py-5 my-5 ${styles.outerBox}`}>
                <Container className='text-center'>
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed once, initially
                            'Congratulations.',
                            1000
                        ]}
                        speed={50}
                        className='text-break'
                        cursor={false}
                        style={{ fontSize: '3em', fontWeight: '600' }}
                    />
                    <br />
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed once, initially
                            'Your bank has been added successfully.',
                            1000
                        ]}
                        speed={10}
                        cursor={false}
                        style={{ fontSize: '2em', color: '#14226D' }}
                        repeat={Infinity}
                        className='text-break'
                    />

                    <p className='my-5 fs-5 text-center'>
                        <span
                            className={`${styles.clickBtn} me-1`}
                            onClick={() => router.push('/payment')}
                        >
                            Click here
                        </span>
                        to go back to previous page.
                    </p>
                </Container>
            </Container>
        </>
    );
}


