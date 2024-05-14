import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {Container, Dropdown, Image, Modal, Nav} from "react-bootstrap";
 import { FiChevronsLeft,FiChevronsRight } from "react-icons/fi";
 import { useUserAuth } from "../../firebase_setup/auth/UserAuthContext";
import styles from "../../stylesheet/sidebar.module.scss";
import { ClientMenu, CommonMenu, appMenuItems } from "../../constants/Constant";
import { useDispatch, useSelector } from "react-redux";
import * as auth from '../../helpers/auth';
import { setOpen } from "../../store/actions/sidebartoggle";
import Accordion from 'react-bootstrap/Accordion';


const OwnSidebar = ({ children }) => {


    const router = useRouter();
    const { user, logOut } = useUserAuth();


    const [logoutModal, setLogoutModal] = useState(false);

    const toggle = useSelector((Gstate) => Gstate?.SidebarReducer?.toggle)
    const dispatch = useDispatch();

    const handleLogOut = () => {
        auth.logout();
    }

    const handleToggle = () => {
        dispatch(setOpen(!toggle))
    }

    const handleLinkClick = () => {
        if (isSmallScreen()) {
            // setIsOpen(false);
            dispatch(setOpen(false))
        }
    };

    const isSmallScreen = () => {
        return window.innerWidth < 1142; // Adjust the breakpoint as per your requirements
    };

    useEffect(() => {
        const handleResize = () => {
            if (isSmallScreen()) {
                dispatch(setOpen(false))
            } else {
                dispatch(setOpen(false))
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLinkClick1 = (e) => {


        setDropdownOpen(true);

    };


    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);



    return (
        <>
            <Container className="bg-info">
                <Modal
                    centered
                    show={logoutModal}
                    onHide={() => setLogoutModal(false)}
                    backdrop="static"
                    
                >
                    <Modal.Body>
                        <div className="mx-4 px-3 text-center pt-3 pb-2">
                            <p className={`${styles.confirmLine1}`}>Confirm Logout</p>
                            <p className={`${styles.confirmLine2}`}>
                                Are you sure you want to logout <br />
                                from <b>Torsin </b>
                            </p>
                            <div className="d-flex justify-content-between mx-5">
                                <button
                                    className={`${styles.cancelButton} px-4 py-1`}
                                    onClick={() => setLogoutModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`${styles.logoutButton} px-4 py-1`}
                                    onClick={handleLogOut}
                                >
                                    Logouts
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </Container>
            <Container className={`${styles.mainBoxsideBar}`}>
                <div
                    className={`sidebar ${toggle ? styles.sideba : ""} `}
                    style={{ width: toggle ? "230px" : "50px" }}
                >

                    {isSmallScreen && toggle ? (
                        <FiChevronsLeft
                            className={`${styles.icon} shadow p-1`}
                            onClick={handleToggle}
                        />
                    ) : (
                        <FiChevronsRight
                            className={`${styles.iconR} shadow p-1`}
                            onClick={handleToggle}
                        />
                    )}

                    <Dropdown className='d-flex justify-content-center'>
                        <Dropdown.Toggle style={{backgroundColor:'#2c3d97',fontSize:'100%'}}  className='w-100 mt-2' id="dropdown-basic">
                            Talent
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {appMenuItems.map((item, index) => (
                                <>

                                        <Link
                                            href={item.link}
                                            key={index}
                                            className="text-decoration-none"
                                            onClick={handleLinkClick}
                                            title={!toggle ? item?.name : ""}
                                        >
                                            <div
                                                className={`${router.pathname.includes(item.link) && styles.menuItemActive} ${!toggle && 'py-2 '}`}
                                            >
                                                <div
                                                    className={`d-flex align-items-center ${styles.sidebarItems
                                                    } ${item.name == "Dashboard" && "pt-2"} ${!router.pathname.includes("/dashboard") &&
                                                    index == 0 && "my-1"}`}
                                                >
                                                    <Image
                                                        src={
                                                            router.pathname.includes(item.link)
                                                                ? item.IconActive
                                                                : item.Icon
                                                        }
                                                        height="20"
                                                        width="20"
                                                        alt="Logo"
                                                        className={`me-3 img img-fluid ${!toggle && styles.showIcon} ${toggle ? "ms-4" : "ms-3"}`}
                                                    />

                                                    {toggle && (
                                                        <div className={`${styles.sidebarItemsName}`}>
                                                            {item.name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>

                                </>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>


                    <div ref={dropdownRef}>
                        <Dropdown show={dropdownOpen} onToggle={() => setDropdownOpen(!dropdownOpen)}>
                            <Dropdown.Toggle style={{backgroundColor:'#2c3d97'}} className='w-100 mt-2' id="dropdown-basic">
                                Client
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {ClientMenu.map((item, index) => (
                                    <Link href={item.link} key={index} className="text-decoration-none" onClick={handleLinkClick1} title={!toggle ? item?.name : ""}>
                                        <div className={`${router.pathname.includes(item.link) && styles.menuItemActive} ${!toggle && 'py-2 '}`}>
                                            <div className={`d-flex align-items-center ${styles.sidebarItems} ${item.name == "Dashboard" && "pt-2"} ${!router.pathname.includes("/dashboard") && index == 0 && "my-1"}`}>
                                                <Image src={router.pathname.includes(item.link) ? item.IconActive : item.Icon} height="20" width="20" alt="Logo" className={`me-3 img img-fluid ${!toggle && styles.showIcon} ${toggle ? "ms-4" : "ms-3"}`}/>
                                                {toggle && (
                                                    <div className={`${styles.sidebarItemsName}`}>
                                                        {item.name}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>



                  <div className='mt-4'>
                      {CommonMenu.map((item, index) => (
                          <>
                              {index === CommonMenu.length - 1 ? (
                                  <div
                                      className={`d-flex align-items-center ${styles.sidebarItems} ${!toggle && 'py-2'}`}
                                      onClick={() => setLogoutModal(true)}
                                  >
                                      <Image
                                          src={item.Icon}
                                          alt="Logo"
                                          height="20"
                                          width="20"
                                          className={`me-3 img img-fluid ${!toggle && styles.showIcon} ${toggle ? "ms-4" : "ms-3"}`}
                                      />
                                      {toggle && (
                                          <div
                                              className={`${styles.sidebarItemsName}`}
                                              onClick={() => setLogoutModal(true)}
                                          >
                                              {item.name}
                                          </div>
                                      )}
                                  </div>
                              ) : (
                                  <Link
                                      href={item.link}
                                      key={index}
                                      className="text-decoration-none"
                                      onClick={handleLinkClick}
                                      title={!toggle ? item?.name : ""}
                                  >
                                      <div
                                          className={`${router.pathname.includes(item.link) && styles.menuItemActive} ${!toggle && 'py-2 '}`}
                                      >
                                          <div
                                              className={`d-flex align-items-center ${styles.sidebarItems
                                              } ${item.name == "Dashboard" && "pt-2"} ${!router.pathname.includes("/dashboard") &&
                                              index == 0 && "my-1"}`}
                                          >
                                              <Image
                                                  src={
                                                      router.pathname.includes(item.link)
                                                          ? item.IconActive
                                                          : item.Icon
                                                  }
                                                  height="20"
                                                  width="20"
                                                  alt="Logo"
                                                  className={`me-3 img img-fluid ${!toggle && styles.showIcon} ${toggle ? "ms-4" : "ms-3"}`}
                                              />

                                              {toggle && (
                                                  <div className={`${styles.sidebarItemsName}`}>
                                                      {item.name}
                                                  </div>
                                              )}
                                          </div>
                                      </div>
                                  </Link>
                              )}
                          </>
                      ))}
                  </div>

                </div>




                <main>{children}</main>
            </Container>
        </>
    );
};

export default OwnSidebar;