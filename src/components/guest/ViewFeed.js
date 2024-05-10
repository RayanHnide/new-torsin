import React from 'react';
import styles from '../../stylesheet/feeds.module.scss';
import { useRouter } from 'next/router';
// import { IconArrowLeft, IconChevronLeft } from 'tabler-icons';
import { Container } from 'react-bootstrap';
import style1 from '../../stylesheet/main.module.scss';

export default function ViewFeed({ query }) {
 
    const router = useRouter();
    const { feedPhoto, createdAt, feedDescription, feedHeadline, feedType, isActive, isMain } = query;

    return (
        <>
            <Container className='my-4 d-flex justify-content-between align-items-center flex-wrap flex-wrap-reverse'>
                <p className={`${style1.guestHeading} my-0`}>
                    Latest {
                        feedType == 1 ?
                            'Blog'
                            :
                            'News'
                    }
                </p>
                <div
                    className={`${style1.joinButton} py-2 px-4 cursor-pointer d-flex align-items-center justify-content-center`}
                    onClick={() => router.back()}
                >
                    {/*<IconChevronLeft size={19} />*/}
                    <span>
                        Back
                    </span>
                </div>
            </Container>

            <div className={`${style1.chooseUsOuter} py-5`}>
                <Container>
                    <p className={`${styles.viewBlogHeadline}`}>
                        {feedHeadline}
                    </p>

                    <div
                        style={{
                            // Setting the background image using the feedPhoto URL
                            backgroundImage: `url(${feedPhoto})`,
                            backgroundSize: 'cover', // Adjusted to 'contain'
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            height: '250px',
                            width: '100%',
                            borderRadius: '12px'
                        }}
                    />

                    <div className='mt-4'>
                        <p className={`${styles.viewFeedDesc}`} style={{ whiteSpace: 'pre-line' }}>
                            {feedDescription}
                        </p>
                    </div>
                </Container>
            </div>
        </>
    )
}
