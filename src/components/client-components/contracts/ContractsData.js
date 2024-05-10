import React, { useState } from 'react'
import { Col, Container, Image, Modal, Row } from 'react-bootstrap'
import { Toaster, toast } from 'react-hot-toast';
import Moment from 'react-moment'
// import { IconDotsVertical } from 'tabler-icons'
import API from '../../../helpers/api';
import { handleErrorMessage } from '../../../utils/CommonFunctions';
import { useDispatch } from 'react-redux';
import { getContractsList } from '../../../store/actions/client-action/contract';

export default function ContractsData({ styles, data, style1, style, setDetailsId, handleEdit, activeTab }) {

    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [withdrawItem, setWithdrawItem] = useState(null);
    const dispatch = useDispatch();

    const showMenuList = (index) => {
        // setOpenMenuIndex(index);
        setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleWithdraw = (item) => {
        setWithdrawItem(item);
    }

    const withdrawContract = () => {
        const { contract_id } = withdrawItem;
        API.apiPatch(`client/update_contract_status/${contract_id}/`, {
            'status': parseInt(3)
        })
            .then((response) => {
                if (response) {
                    toast.success(response?.data?.message?.successMessage, {
                        position: "top-right",
                        style: {
                            borderBottom: '4px solid #33a34e',
                            padding: "16px",
                            color: "#3c5f4b",
                            marginRight: "25px",
                        },
                    });
                    setWithdrawItem(null);
                    setOpenMenuIndex(null);
                    dispatch(getContractsList(0));
                }
            })
            .catch((err) => {
                handleErrorMessage(err);
            });
    }

    return (
        <>
            <Toaster />

            <Modal centered show={withdrawItem} onHide={() => setWithdrawItem(null)} backdrop="static">
                <Modal.Header closeButton style={{ border: "0" }} className="pb-0" />
                <Modal.Body>
                    <div className='text-center px-5 pb-3'>
                        <Image src='/images/withdrawContract.png' className='img img-fluid' />
                        <p className={`${styles.modalTitle} mt-3`}>Withdraw contract</p>
                        <p className={`${style.addLocationTitle} text-dark px-4`}>
                            We'll notify the <b>{withdrawItem?.talent_name}</b>  to let them know they can no longer accept it. This contract will be marked as archived.
                        </p>
                        <div className='d-flex justify-content-center align-items-center'>
                            <button className={`${styles.noBtn} mt-2 me-5`} onClick={() => setWithdrawItem(null)}>No</button>
                            <button className={`${styles.createButton} text-white px-4 py-2 mt-2`} onClick={withdrawContract}>Yes</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Row className='mx-0 mb-3'>
                {data?.length ?
                    data?.map((item, index) => (
                        <Container key={index} className={`${styles.cardsOuter} mb-3`}>
                            <div className={`d-flex flex-wrap justify-content-between align-items-center py-3 px-2`}>
                                <div role='button' onClick={() => setDetailsId(item?.contractId)}>
                                    <p className={`text-break my-0 ${styles.jobName}`}>
                                        {item?.projectName}
                                    </p>
                                </div>
                                {item?.status == '0' && <div className='position-relative'>
                                    {/* <IconDotsVertical
                                        role='button'
                                        onClick={() => showMenuList(index)}
                                    /> */}
                                    {openMenuIndex === index && (
                                        <div className={`text-center ${styles.menuList} shadow px-5 mt-2 py-2`}>
                                            <p className={`my-2 ${styles.editBtn}`} onClick={() => handleEdit(item)}>Edit</p>
                                            <p className={`my-2 ${styles.editBtn}`} onClick={() => handleWithdraw(item)}>Withdraw</p>
                                        </div>
                                    )}
                                </div>}
                            </div>
                            <hr className={`mx-2 my-0 ${style1.hr}`} />
                            <div className={`d-flex flex-wrap justify-content-between align-items-center py-3 px-2`}>
                                <div>
                                    <p className={`text-break my-0 ${styles.email}`}>
                                        Email -
                                        <span>
                                            {item?.email}
                                        </span>
                                    </p>
                                </div>                                
                                <div>
                                    {/* <p className={`text-break my-0 ${styles.email}`}>
                                        Amount -
                                        <span>
                                            ${item?.amount}
                                        </span>
                                    </p> */}
                                </div>
                            </div>
                            <hr className={`mx-2 my-0 ${style1.hr}`} />
                            <div className={`d-flex flex-wrap justify-content-between align-items-center py-3 px-2`}>
                                <p className={`my-0 text-break ${item?.status == '0' ? 'text-primary' : item?.status == '1' ? 'text-success' : item?.status == '2' && 'text-danger'} ${style.addLocationTitle}`}>
                                    {
                                        item?.status == '0' ? 'Waiting to be accepted' : item?.status == '1' ? 'Accepted' : item?.status == '2' && 'Rejected'
                                    }
                                </p>
                                <div className={`d-flex flex-wrap align-items-center`}>
                                    <Image src='/images/jobTime.png' className={`img img-fluid me-1`} />
                                    <p className={`text-break my-0 ${style.viewJobTime}`}>
                                        <Moment fromNow>
                                            {item?.createdAt}
                                        </Moment>
                                    </p>
                                </div>
                            </div>
                        </Container>
                    ))
                    :
                    <div className='text-center mt-3'>
                        <Image src='/images/emptyContracts.png' className='img img-fluid' />
                        <p className={`my-0 ${styles.viewJobNameTitle} text-dark mt-3`}>
                            {
                                activeTab == 0 ?
                                    "No Contracts Send!"
                                    :
                                    activeTab == 1 ?
                                        "No Contracts Accepted!"
                                        :
                                        activeTab == 2 && "No Contracts Rejected!"
                            }
                        </p>
                    </div>
                }
            </Row>
        </>
    )
}
