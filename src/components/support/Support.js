import React from 'react';
import styles from "../../stylesheet/support.module.scss";
import { Image } from 'react-bootstrap';

export default function Support() {
  return (
    <>
      <div className={`${styles.fontFamily}`}>
        <p className={`${styles.title}`}>Help & support</p>
        <p className={`${styles.queryTitle}`}>All Queries</p>

        <div className={`${styles.queryCards} d-flex justify-content-between align-items-center my-2`}>
          <div className='d-flex justify-content-center align-items-center px-4 py-3'>
            <div className={`${styles.imageDiv} me-3`}>
              <Image src="./images/Avatar.png" className='img img-fluid' alt='avatar' />
            </div>
            <div>
              <p className={`${styles.hashCode} my-0`}>#0025<span className={`${styles.queryTitle} ms-1`}>Film Maker</span> </p>
              <p className={`${styles.queryDetails} my-0`}>As a musician I loved the job, the place. Everything was so cool.</p>
            </div>
          </div>
          <div className='me-4'>
            <p className={`${styles.duration}`}>Just now</p>
            <p className={`${styles.status} text-end`}>Open</p>
          </div>
        </div>
        <div className={`${styles.queryCards} ${styles.darkCards} d-flex justify-content-between align-items-center my-2`}>
          <div className='d-flex justify-content-center align-items-center px-4 py-3'>
            <div className={`${styles.imageDiv} me-3`}>
              <Image src="./images/Avatar.png" className='img img-fluid' alt='avatar' />
            </div>
            <div>
              <p className={`${styles.hashCode} my-0`}>#0025<span className={`${styles.queryTitle} ms-1`}>Film Maker</span> </p>
              <p className={`${styles.queryDetails} my-0`}>As a musician I loved the job, the place. Everything was so cool.</p>
            </div>
          </div>
          <div className='me-4'>
            <p className={`${styles.duration}`}>Just now</p>
            <p className={`${styles.status} text-end`}>Open</p>
          </div>
        </div>
        <div className={`${styles.queryCards} d-flex justify-content-between align-items-center my-2`}>
          <div className='d-flex justify-content-center align-items-center px-4 py-3'>
            <div className={`${styles.imageDiv} me-3`}>
              <Image src="./images/Avatar.png" className='img img-fluid' alt='avatar' />
            </div>
            <div>
              <p className={`${styles.hashCode} my-0`}>#0025<span className={`${styles.queryTitle} ms-1`}>Film Maker</span> </p>
              <p className={`${styles.queryDetails} my-0`}>As a musician I loved the job, the place. Everything was so cool.</p>
            </div>
          </div>
          <div className='me-4'>
            <p className={`${styles.duration}`}>Just now</p>
            <p className={`${styles.status} text-end`}>Open</p>
          </div>
        </div>
        <div className={`${styles.queryCards} ${styles.darkCards} d-flex justify-content-between align-items-center my-2`}>
          <div className='d-flex justify-content-center align-items-center px-4 py-3'>
            <div className={`${styles.imageDiv} me-3`}>
              <Image src="./images/Avatar.png" className='img img-fluid' alt='avatar' />
            </div>
            <div>
              <p className={`${styles.hashCode} my-0`}>#0025<span className={`${styles.queryTitle} ms-1`}>Film Maker</span> </p>
              <p className={`${styles.queryDetails} my-0`}>As a musician I loved the job, the place. Everything was so cool.</p>
            </div>
          </div>
          <div className='me-4'>
            <p className={`${styles.duration}`}>Just now</p>
            <p className={`${styles.status} text-end`}>Open</p>
          </div>
        </div>
        <div className={`${styles.queryCards} d-flex justify-content-between align-items-center my-2`}>
          <div className='d-flex justify-content-center align-items-center px-4 py-3'>
            <div className={`${styles.imageDiv} me-3`}>
              <Image src="./images/Avatar.png" className='img img-fluid' alt='avatar' />
            </div>
            <div>
              <p className={`${styles.hashCode} my-0`}>#0025<span className={`${styles.queryTitle} ms-1`}>Film Maker</span> </p>
              <p className={`${styles.queryDetails} my-0`}>As a musician I loved the job, the place. Everything was so cool.</p>
            </div>
          </div>
          <div className='me-4'>
            <p className={`${styles.duration}`}>Just now</p>
            <p className={`${styles.status} text-end`}>Open</p>
          </div>
        </div>
        <div className={`${styles.queryCards} ${styles.darkCards} d-flex justify-content-between align-items-center my-2`}>
          <div className='d-flex justify-content-center align-items-center px-4 py-3'>
            <div className={`${styles.imageDiv} me-3`}>
              <Image src="./images/Avatar.png" className='img img-fluid' alt='avatar' />
            </div>
            <div>
              <p className={`${styles.hashCode} my-0`}>#0025<span className={`${styles.queryTitle} ms-1`}>Film Maker</span> </p>
              <p className={`${styles.queryDetails} my-0`}>As a musician I loved the job, the place. Everything was so cool.</p>
            </div>
          </div>
          <div className='me-4'>
            <p className={`${styles.duration}`}>Just now</p>
            <p className={`${styles.status} text-end`}>Open</p>
          </div>
        </div>
      </div>
    </>
  )
}
