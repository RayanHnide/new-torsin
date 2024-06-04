 import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Image, Modal } from "react-bootstrap";
 import { useUserAuth } from "../../firebase_setup/auth/UserAuthContext";
import styles from "../../stylesheet/sidebar.module.scss";
import { ClientMenu, CommonMenu, appMenuItems } from "../../constants/Constant";
import { useDispatch, useSelector } from "react-redux";
import * as auth from '../../helpers/auth';
 import Drawer from 'react-modern-drawer'
import { IoList } from "react-icons/io5";
//import styles 👇
import 'react-modern-drawer/dist/index.css'
import {FaWindowClose} from "react-icons/fa";

const OwnSidebar = ({ children }) => {
    const router = useRouter();
    const { user, logOut } = useUserAuth();
    const [logoutModal, setLogoutModal] = useState(false);
    const toggle = useSelector((Gstate) => Gstate?.SidebarReducer?.toggle)
    const dispatch = useDispatch();
    const handleLogOut = () => {
        auth.logout();
    }

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

    const [showTalentMenu,setShowTalentMenu] = useState(false)
    const [showClientMenu,setShowClientMenu] = useState(false)
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };
    const [isOpen, setIsOpen] = React.useState(true)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const [bla,setBla] = useState('d-none')
    const [bla1,setBla1] = useState('d-lg-block')
    return (

        <>
            <Container  >
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
                                    className={`${styles.cancelButton} fs-5 px-4 py-1`}
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


            <Container  >
              <div className='d-flex justify-content-start bg-black'>
                  <IoList  style={{color:'#2c3d97'}} className='d-blcok position-absolute fs-1 mt-1 mx-1 d-md-none' onClick={()=>{
                      setBla('d-block')
                  }}/>
              </div>
                 <Drawer className={`${bla} ${bla1}`}    style={{marginTop:'83px'}} enableOverlay={false} open={true} direction='left'>





                        <div >
                           <div className='d-flex justify-content-end p-1'>
                               <FaWindowClose style={{color:'#2c3d97'}}  className='fs-4 bg-white  d-block d-lg-none' onClick={()=>setBla('d-none')}/>
                           </div>
                            <div   onClick={()=>setShowTalentMenu(prevState => !prevState)} style={{ backgroundColor: '#2c3d97', fontSize: '100%' ,cursor:'pointer',borderRadius:'5px'}} className='text-center p-1 p-lg-2 w-100 mt-2 text-white' id="dropdown-basic">
                                Talent
                            </div>

                            {
                                showTalentMenu ?   <div>
                                    <div >
                                        <div className="w-100 mt-3">
                                            {appMenuItems.map((item, index) => (
                                                <>

                                                    <Link
                                                        href={item.link}
                                                        key={index}
                                                        className="text-decoration-none"

                                                        title={!toggle ? item?.name : ""}
                                                    >
                                                        <div
                                                            className={`${router.pathname.includes(item.link) && styles.menuItemActive} ${!toggle && 'py-1 '}`}
                                                        >
                                                            <div
                                                                className={`d-flex align-items-center ${styles.sidebarItems
                                                                } ${item.name == "Dashboard" && "p-2"} ${!router.pathname.includes("/dashboard") &&
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


                                                                    <div className={`${styles.sidebarItemsName}`}>
                                                                        {item.name}
                                                                    </div>

                                                            </div>
                                                        </div>
                                                    </Link>

                                                </>
                                            ))}
                                        </div>
                                    </div>
                                    <hr/>
                                </div>:''
                            }

                        </div>


                        <div ref={dropdownRef}>
                            <div  >
                                <div onClick={()=>setShowClientMenu(prevState => !prevState)} style={{ backgroundColor: '#2c3d97', fontSize: '100%' ,cursor:'pointer',borderRadius:'5px'}}  className='text-center p-1 p-lg-2  w-100 mt-2 text-white' id="dropdown-basic">
                                    Client
                                </div>
                                {
                                    showClientMenu?
                                        <div className='menuItem'>
                                            {
                                                ClientMenu.map((item, index) => (
                                                    <div className='mt-3 menuItem ' >
                                                        <Link  href={item.link} key={index} className="text-decoration-none " onClick={handleLinkClick1} title={!toggle ? item?.name : ""}>
                                                            <div className={`${router.pathname.includes(item.link) && styles.menuItemActive} ${!toggle && 'py-2 '}`}>
                                                                <div className={`d-flex align-items-center ${styles.sidebarItems} ${item.name == "Dashboard" && "pt-2"} ${!router.pathname.includes("/dashboard") && index == 0 && "my-1"}`}>
                                                                    <Image src={router.pathname.includes(item.link) ? item.IconActive : item.Icon} height="20" width="20" alt="Logo" className={`me-3 img img-fluid ${!toggle && styles.showIcon} ${toggle ? "ms-4" : "ms-3"}`} />

                                                                        <div className={`${styles.sidebarItemsName}`}>
                                                                            {item.name}
                                                                        </div>

                                                                </div>
                                                            </div>
                                                        </Link>

                                                    </div>

                                                ))

                                            }
                                            <hr/>
                                        </div> :''
                                }
                            </div>
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

                                                <div
                                                    className={`${styles.sidebarItemsName}`}
                                                    onClick={() => setLogoutModal(true)}
                                                >
                                                    {item.name}
                                                </div>

                                        </div>
                                    ) : (
                                        <Link
                                            href={item.link}
                                            key={index}
                                            className="text-decoration-none"

                                            title={!toggle ? item?.name : ""}
                                        >
                                            <div
                                                className={`${router.pathname.includes(item.link) && styles.menuItemActive} ${!toggle && 'py-2 '}`}
                                            >
                                                <div
                                                    className={` d-flex align-items-center ${styles.sidebarItems
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


                                                        <div className={`${styles.sidebarItemsName}`}>
                                                            {item.name}
                                                        </div>

                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </>
                            ))}
                        </div>
                        <hr/>







                </Drawer>
                <main  >{children}</main>
            </Container>


        </>
    );
};

export default OwnSidebar;
