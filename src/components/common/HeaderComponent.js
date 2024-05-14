import React, { memo, useEffect, useState } from "react";
import styles from "../../stylesheet/header.module.scss";
import { Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetails } from "../../store/actions/profile";
import { firebaseCloudMessaging } from '../../firebase_setup/firebase';
import API from "../../helpers/api";
import { setHide } from "../../store/actions/sidebartoggle";
import { useRouter } from "next/router";
import { encodeData } from "../../helpers/auth";
import Link from "next/link";

const HeaderComponent = memo(() => {

  const router = useRouter();

  const dispatch = useDispatch();
  const [profileList, hide] = useSelector((Gstate) => [
    Gstate?.ProfileReducers?.profilelist,
    Gstate?.SidebarReducer?.hide
  ]);

  useEffect(() => {
    dispatch(getProfileDetails());
  }, [profileList?.fullName, profileList?.profileImage]);

  useEffect(() => {
    firebaseCloudMessaging();
    const fcmToken = localStorage.getItem("fcmToken")
    API.apiPut('deviceToken', ({ 'deviceToken': fcmToken }))
  }, [])

  const handleRole = (e) => {
    e.preventDefault();
    // router.push(`https://client-torsin.apponward.com?user=${encodeData(profileList?.email)}`);
    router.push(`http://localhost:3002/dashboard?user=${encodeData(profileList?.email)}`)
  }

  return (
    <>
      <div className={`${styles.mainHeader}`}>
        <Row className="py-2 px-0 mx-md-4 mx-lg-4 mx-xl-4 mx-0">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <Image
                src="/images/torsinLogo.png"
                className="img img-fluid cursor-pointer"
                alt="logo"
                onClick={() => router.push("/dashboard")}
              // onClick={() => {
              //   dispatch(setHide(!hide))
              // }}
              />
              <span
                className={`${styles.torsinLogo} ms - 3 d - none d - sm - block cursor - pointer`}
                onClick={() => router.push("/dashboard")}
              >
                Torsin
              </span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <Link hidden={true} href={`http://localhost:3002/dashboard?user=${encodeData(profileList?.email)}`}>
                <p
                  className="my-0 me-2 cursor-pointer"
                //  onClick={handleRole}
                >
                  Change role
                </p>
              </Link>
              <Image
                src={
                  profileList?.profileImage
                    ? profileList?.profileImage
                    : "/images/dummyImage.png"
                }
                alt="Profile Picture"
                className={`${styles.userProfile} img img - fluid`}
              />
              <p className={`${styles.topRightName} mt - 3 ms - 2`}>
                {profileList?.fullName}
              </p>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
});

export default memo(HeaderComponent);
