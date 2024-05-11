import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap';
import styles from '../../../stylesheet/profile.module.scss';
// import { IconMail, IconUser } from 'tabler-icons';
import { getProfileDetails } from '../../../store/actions/client-action/profile';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import ChangePassword from './ChangePassword';
import { useRouter } from 'next/router';

export default function Profile() {

    const dispatch = useDispatch();
    const [profileList] = useSelector((Gstate) => [Gstate?.ProfileReducers?.profilelist]);
    const [data, setData] = useState(profileList);
    const router = useRouter();

    useEffect(() => {
        dispatch(getProfileDetails())
        setData(profileList)
    }, [profileList?.length])

    const { fullName, email, mobileNo, gender, location, countryName, profileImage } = data;

    return (
        <>
            <Toaster />

            <Container className={``}>
                <div className='d-flex align-items-center mb-3 ms-2'>
                    {/* <IconUser /> */}
                    <p className={`${styles.profileHeading} ms-2 my-0`}>
                        Profile
                    </p>
                </div>
                <Container>
                    <div className={`${styles.profileCard} py-4 px-5`}>
                        <div className={`${styles.imageContainer} d-flex justify-content-between`}>
                            {/* <Image src='./images/Smith.png' className={`img img-fluid`} /> */}
                            <div className={`${styles.imageDiv} `}>
                                <Image alt="user" src={profileImage ? profileImage : "./images/dummyImage.png"} className={`${styles.userProfile} img img-fluid`} />
                            </div>
                            <span>
                                <div
                                    className={`${styles.editProfile} px-3 py-2`}
                                    // onClick={() => setEditProfile(!editProfile)}
                                    onClick={() => router.push('client-profile/update-profile')}
                                >
                                    Edit Profile
                                </div>
                            </span>
                        </div>
                        <div className='my-3'>
                            <div className='pt-1'>
                                <p className={`${styles.personName}`}>
                                    {profileList?.fullName}
                                </p>
                            </div>
                            <div className='d-flex align-items-center my-3'>
                                <Image
                                    src="/images/gender.png"
                                    alt="gender"
                                    className="img img-fluid"
                                    style={{
                                        marginRight: "2px"
                                    }}
                                />
                                <span className={`ms-3 ${styles.personDetails}`}>
                                    {profileList?.gender && profileList?.gender === 1 ? "Male" : "Female"}
                                </span>
                            </div>
                            <div className='d-flex align-items-center my-3'>
                                <Image
                                    src="/images/phone.png"
                                    className="img img-fluid"
                                    alt="phone"
                                />
                                <span className={`ms-3 ${styles.personDetails}`}>
                                    {profileList?.mobileNo}
                                </span>
                            </div>
                            <div className='d-flex align-items-center my-3'>
                                {/* <IconMail size={18} color='grey' /> */}
                                <Image
                                    src="/images/mail.png"
                                    className="img img-fluid"
                                    alt="location"
                                />
                                <span className={`ms-3 ${styles.personDetails}`}>
                                    {profileList?.email}
                                </span>
                            </div>
                            {profileList.location && <div className='d-flex align-items-center my-3'>
                                {/* <IconMapPin size={18} fill='white' color='grey'/> */}
                                <Image
                                    src="/images/location.png"
                                    className="img img-fluid"
                                    alt="location"
                                />
                                <span className={`ms-3 ${styles.personDetails}`}>
                                    {profileList?.location}
                                    {`${profileList?.countryName && !profileList?.location.endsWith(profileList?.countryName) ?
                                        `, ${profileList?.countryName}`
                                        :
                                        ""} `}
                                </span>
                            </div>}
                        </div>
                    </div>
                </Container>
            </Container>

            <ChangePassword
                styles={styles}
            />
        </>
    )
}
