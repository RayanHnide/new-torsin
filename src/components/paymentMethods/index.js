import React, { useEffect, useState } from 'react';
import style from '../../stylesheet/dashboard.module.scss'
import styles from '../../stylesheet/paymentMethods.module.scss';
import style1 from '../../stylesheet/profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountDetails, getPaymentsList } from '../../store/actions/paymentMethods';
import { Container, Image } from 'react-bootstrap';
import API from '../../helpers/api';
import { toast } from 'react-hot-toast';
import { handleErrorMessage } from '../../utils/CommonFunctions';
import { ThreeDots } from 'react-loader-spinner';

export default function PaymentMethods() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [paymentCardList, accountDetails] = useSelector((Gstate) => [
        Gstate?.PaymentMethodReducers?.paymentCardList,
        Gstate?.PaymentMethodReducers?.accountDetails,
    ])

    useEffect(() => {
        dispatch(getPaymentsList())
        if (paymentCardList) {
            setTimeout(() => {
                setLoadingData(false);
            }, 500);
        }
    }, [])

    useEffect(() => {
        dispatch(getAccountDetails())
    }, [])

    const handleUrlGenerate = () => {
        setLoading(true);
        API.apiPost('getUrl', {
            instanceId: paymentCardList?.instanceId
        })
            .then((response) => {
                if (response) {
                    toast.success(response?.data?.response?.message?.successMessage, {
                        position: "top-right",
                        style: {
                            borderBottom: '4px solid #33a34e',
                            padding: "16px",
                            color: "#3c5f4b",
                            marginRight: "25px",
                        },
                    });
                    const generatedUrl = response?.data?.response?.accountOnboarding?.url;
                    window.open(generatedUrl, "_self");
                }

            })
            .catch((err) => {
                handleErrorMessage(err);
            })
    }

    const { external_accounts } = accountDetails;
    const bankDetails = external_accounts?.data;

    return (
        <>
            <div className={`d-flex justify-content-start align-items-center py-4 mb-2 ${style.publishNav}`}>
                <span className={`${style.viewJob}`}>
                    Payment Methods
                </span>
            </div>
            {!accountDetails?.isComplete &&
                <div className={`position-relative`}>
                    {loading && (
                        <div className={`${styles.loaderOverlay}`}>
                            <ThreeDots
                                height={50}
                                width={50}
                                color="#0E184D"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#e0e0e0"
                                strokeWidth={8}
                                strokeWidthSecondary={5}
                            />
                        </div>
                    )}
                    <Container className={`${styles.paymentLinkOuter} text-center py-4 mb-4 ${loading && style.formBlur}`}>
                        <button
                            className={`${style1.skillsAddButton}`}
                            // onClick={() => window.open('https://example.com', '_blank')}
                            onClick={handleUrlGenerate}
                            disabled={loading}
                        >
                            Add Bank
                        </button>
                    </Container>
                </div>
            }

            {!accountDetails?.isComplete ?
                <Container className={`${styles.outerBox} text-center pb-4`}>
                    <Image src='./images/info.png' className='img img-fluid my-3' alt='info' />
                    <p className={`${style1.servicesPortfolioTitle} my-0`}>
                        Click on the above link to proceed to Stripe payment source
                    </p>
                </Container>
                :
                <Container className={`${styles.outerBox} py-3 position-relative`}>
                    {loadingData && (
                        <div className={`${styles.loaderOverlay}`}>
                            <ThreeDots
                                height={50}
                                width={50}
                                color="#0E184D"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#e0e0e0"
                                strokeWidth={8}
                                strokeWidthSecondary={5}
                            />
                        </div>
                    )}
                    {
                        bankDetails?.length && bankDetails?.map((item, index) => (
                            <div key={index}>
                                <div className={`d-flex align-items-center`}>
                                    <p>Bank Name :</p>
                                    <p className='ms-2'>
                                        {
                                            item?.bank_name || '---'
                                        }
                                    </p>
                                </div>
                                <div className={`d-flex align-items-center`}>
                                    <p>Account Holder Name :</p>
                                    <p className='ms-2'>
                                        {
                                            item?.account_holder_name || '---'
                                        }
                                    </p>
                                </div>
                                <div className={`d-flex align-items-center`}>
                                    <p>Account Number :</p>
                                    <p className='ms-2'>
                                        {
                                            "**** **** **** " + item?.last4 || '---'
                                        }
                                    </p>
                                </div>
                                <div className={`d-flex align-items-center`}>
                                    <p className='mb-0'>Account Type :</p>
                                    <p className='mb-0 ms-2'>
                                        {
                                            item?.account_type || '---'
                                        }
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                    {
                        !accountDetails.length && !bankDetails?.length &&
                        <div className='text-center my-5 pt-4'>
                            <Image src='./images/emptyPaymentMethods.png' className='img img-fluid' alt='empty payment methods' />
                            <p className={`my-0 ${styles.empty} text-dark mt-3`}>
                                No Payments Methods
                            </p>
                        </div>
                    }
                </Container>
            }
        </>
    )
}
