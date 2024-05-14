import React, { useEffect, useState } from "react";
import styles from "../../stylesheet/sidebar.module.scss";
import { Container, Image, Modal, Nav } from "react-bootstrap";
import { memo } from "react";
import { appMenuItems } from "../../constants/Constant";
import { useRouter } from "next/router";
import { useUserAuth } from "../../firebase_setup/auth/UserAuthContext";
 import { LuChevronsLeft } from "react-icons/lu";
import * as auth from "../../helpers/auth";
import Link from "next/link";

const SidebarComponent = memo((props) => {
  const router = useRouter();
  const [logoutModal, setLogoutModal] = useState(false);
  const { user, logOut } = useUserAuth();
  const [toggle, setToggle] = useState(false);

  const handleLogOut = () => {
    auth.logout();
  }

  const handleToggle = () => {
    setToggle(!toggle);
  }

  return (
      <>
        <Container  >
          <Modal centered show={logoutModal} onHide={() => setLogoutModal(false)} backdrop="static">
            <Modal.Body>
              <div className="mx-4 px-3 text-center pt-3 pb-2">
                <p className={`${styles.confirmLine1}`}>Confirm Logout</p>
                <p className={`${styles.confirmLine2}`}>
                  Are you sure you want to logout <br />from <b>Torsin </b>
                </p>
                <div className="d-flex justify-content-between mx-5">
                  <button className={`${styles.cancelButton} px-4 py-1`} onClick={() => setLogoutModal(false)}>Cancel</button>
                  <button className={`${styles.logoutButton} px-4 py-1`} onClick={handleLogOut}>Logout</button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </Container>

        <div className={`${styles.sidebar}`}>
          {appMenuItems?.map((item, index) => (
              <React.Fragment key={index}>
                {index === appMenuItems.length - 1 ?
                    <div className={`d-flex align-items-center ms-3 ${styles.sidebarItems}`} onClick={() => setLogoutModal(true)}>
                      <Image
                          src={item.Icon}
                          alt="Logo"
                          height="20"
                          width="20"
                          className={`ms-2 me-3 img img-fluid`}
                      />
                      <span className={`${styles.sidebarItemsName}`} onClick={() => setLogoutModal(true)}>
                  {item.name}
                </span>
                    </div>
                    :
                    (
                        <Link
                            href={item.link}
                            key={index}
                            className="text-decoration-none"
                        >
                          <div
                              className={`${router.pathname === item.link && styles.menuItemActive} 
                    ${router.pathname.includes('payment/success') && index == '6' && styles.menuItemActive} 
                    ${(router.pathname.includes('/feeds') && index == '1' ||
                                  router.pathname.includes('profile') && index == '8' ||
                                  router.pathname.includes('transaction') && index == '7' ||
                                  router.pathname.includes('help-support') && index == '11')
                              && styles.menuItemActive}
                      `}
                          >
                            <div
                                className={`
                      d-flex align-items-center ms-3 
                      ${styles.sidebarItems} 
                      ${item.name == 'Dashboard' && 'pt-3'} 
                      ${!router.pathname.includes('/dashboard') && index == 0 && 'my-1'}
                      `}
                            >
                              <Image
                                  src={
                                    router.pathname === item.link ||
                                    router.pathname.includes('payment/success') && index == '6' ||
                                    router.pathname.includes('transaction') && index == '7' ||
                                    router.pathname.includes('/feeds') && index == '1' ||
                                    router.pathname.includes('profile') && index == '8' ||
                                    router.pathname.includes('help-support') && index == '11'
                                        ?
                                        item.IconActive
                                        :
                                        item.Icon
                                  }
                                  alt="Logo"
                                  height="20"
                                  width="20"
                                  className={`ms-2 me-3 img img-fluid`}
                              />
                              <span className={`${styles.sidebarItemsName}`}>
                        {item.name}
                      </span>
                            </div>
                          </div>
                        </Link>
                    )
                }
              </React.Fragment>
          ))}
          <LuChevronsLeft className={`${styles.icon} shadow p-1`} onClick={handleToggle} />
        </div>
      </>
  );
});

export default memo(SidebarComponent);