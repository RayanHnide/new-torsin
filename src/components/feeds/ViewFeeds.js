import React from 'react';
import dashboardStyle from '../../stylesheet/dashboard.module.scss';
import jobStyle from '../../stylesheet/jobs.module.scss';
import styles from '../../stylesheet/feeds.module.scss';
import { useRouter } from 'next/router';
// import { IconArrowLeft } from 'tabler-icons';
import { Container } from 'react-bootstrap';

export default function ViewFeeds({ query }) {

    const router = useRouter();
    const { feedPhoto, createdAt, feedDescription, feedHeadline, feedType, isActive, isMain } = query;

    return (
        <>
            <div className={`d-flex justify-content-start align-items-center ${dashboardStyle.publishNav} pt-4 mb-3`}>
                <span className='me-3' role='button'>
                    {/* <IconArrowLeft onClick={() => router.back()} /> */}
                </span>
                <span className={`${jobStyle.myJobsTitle} ms-1`}>
                    View {
                        feedType == 1 ?
                            'Blog'
                            :
                            'News'
                    }
                </span>
            </div>

            <Container>
                <p className={`${styles.viewBlogHeadline} text-break`}>
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
                    <p className={`${styles.viewFeedDesc} text-break`} style={{ whiteSpace: 'pre-line' }}>
                        {feedDescription}
                    </p>
                </div>
            </Container>
        </>
    )
}
