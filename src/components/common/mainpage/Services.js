import React, { useEffect } from 'react';
import styles from '../../../stylesheet/main.module.scss';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServices, getAllServicesClient } from '../../../store/actions/profile';
import { encodeData } from '../../../helpers/auth';
import { useRouter } from 'next/router';

export default function Services() {
    

     
    const dispatch = useDispatch();
    const router = useRouter();
      
    useEffect(() => {
        dispatch(getAllServicesClient())
    }, [])
    
    useEffect(() => {
        dispatch(getAllServices())
    }, [])

    const [allServices] = useSelector((Gstate) => [
        Gstate?.ProfileReducers?.allServices
    ]);
    

    const [allServices1, searchTalentList] = useSelector((Gstate) => [
        Gstate?.PublishJobReducers?.allServices,
        Gstate?.DashboardReducers?.searchTalentList
    ]);

    // dispatch(searchTopRatedTalents(search))

    return (
        <>
            <Container>
                <p className={`${styles.guestHeading}`}>
                    You need it, we've got it
                </p>
            </Container>
            <Container className={`d-flex flex-wrap`}>
                {
                    allServices?.length > 0 && allServices?.map((item, index) => (
                        <div
                        
                            key={index}
                            className={`${styles.serviceName} m-3 px-5 py-4 cursor-pointer`}
                            onClick={() => router.push(`/guest/job?data=${encodeData(item?.serviceName)}`)}
                        >
                            {
                                item?.serviceName
                            }
                        </div>
                    ))
                }
               
            </Container>

            <Container>
                <p className={`${styles.guestHeading}`}>
                    You need it, we've got it
                </p>
            </Container>
            
            <Container className={`d-flex flex-wrap`}>
                {
                    allServices1?.length > 0 && allServices1?.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.serviceName} m-3 px-5 py-4 cursor-pointer`}
                            onClick={() => router.push(`/guest/talent?data=${encodeData(item?.serviceName)}`)}
                        >
                            {
                                item?.serviceName
                            }
                        </div>
                    ))
                }
            </Container>
        </>
    )
}
