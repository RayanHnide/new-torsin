import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
// import { IconArrowLeft } from 'tabler-icons';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getSupportList } from '../../store/actions/report';
import Validation from '../../utils/Validation';
import API from '../../helpers/api';
import { Toaster, toast } from 'react-hot-toast';
import { handleErrorMessage } from '../../utils/CommonFunctions';
import { useRouter } from 'next/router';

export default function Report({ style, styles, style1, setReport }) {

    const router = useRouter();
    const [activeRadio, setActiveRadio] = useState('');
    const dispatch = useDispatch();
    const [supportList] = useSelector((Gstate) => [
        Gstate?.ReportReducers?.supportList
    ])

    useEffect(() => {
        dispatch(getSupportList())
    }, [supportList?.length])

    const [showErrors, setShowErrors] = useState(false);
    const [problem, setProblem] = useState(null);

    const handleRadioChange = (e) => {
        const { value } = e.target;
        setActiveRadio(value);
    };

    const handleSubmit = () => {
        setShowErrors(true);
        if (
            !Validation.minOf(problem, 20, 300) ||
            !activeRadio
        ) {
            return;
        }
        else {
            setShowErrors(false);
            const id = supportList?.find((item) => item?.topicName == activeRadio).topicId
            API.apiPost('supportPostReport', {
                topicId: id,
                description: problem
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
                        router.push('/help-support')
                    }
                })
                .catch((err) => {
                    handleErrorMessage(err);
                })
        }
    }

    return (
        <>
            <Toaster />
            <div className={`d-flex justify-content-start align-items-center ${style1.publishNav} py-4`}>
                <span className='me-3' role='button'>
                    {/*<IconArrowLeft onClick={() => setReport(false)} />*/}
                </span>
                <span className={`${style1.viewJob} mx-2`}>
                    Report a Problem
                </span>
                <span className='mb-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-math-greater" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 18l14 -6l-14 -6" />
                    </svg>
                </span>
                <span className={`${style1.viewJob} mx-2`}>
                    Active Jobs
                </span>
            </div>
            <Container>
                <Form.Group>
                    <div className={`${style1.viewJobOuterContainer} py-4 px-5`}>
                        <Form.Label className={`${styles.activeReportLabel}`}>
                            What brings you here?
                            <p className='mb-0 mt-2'>
                                Pick the one that most applies to you.
                            </p>
                        </Form.Label>
                    </div>

                    <div className={`${style1.viewJobOuterContainer} ${styles.scroll} py-1 px-5 mt-4 ${showErrors && !activeRadio && style.borderDanger}`}>
                        {
                            supportList?.length > 0 && supportList?.map((item, index) => (
                                <div key={index} className={`${activeRadio === item?.topicName && styles.activeRadio} my-4 pb-2 pt-3 px-4`}>
                                    <Form.Label htmlFor={item?.topicName} className={`d-flex justify-content-between align-items-center ${styles.activeReportRadioLabel}`}>
                                        <span className={`${styles.opacityLabel} text-capitalize`}>
                                            {item?.topicName}
                                        </span>
                                        <input type="radio" id={item?.topicName} name="reportProblem" value={item?.topicName} onChange={handleRadioChange} />
                                    </Form.Label>
                                </div>
                            ))
                        }
                    </div>
                    {
                        showErrors && !activeRadio && <p className='text-danger errorMessage ms-3 mt-1'>
                            Please select the support topic
                        </p>
                    }
                </Form.Group>

                <Form.Group className={`${style1.viewJobOuterContainer} px-5 py-4 pb-5 mt-4`} controlId='problem'>
                    <Form.Label className={`${style1.jobTitle} mb-3`}>
                        Problem
                    </Form.Label>
                    <Form.Control
                        as='textarea'
                        rows='5'
                        name='problem'
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        placeholder='Start typing here. Tell us about your experience in this ride.....'
                        className={`${styles.activeReportRadioLabel} ${styles.textareaBorder} text-dark py-3 px-4`}
                        isInvalid={showErrors && !Validation.minOf(problem, 20, 300)}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {!problem ? "Please enter a description of your problem" : problem?.length < 20 ? "Description can't be less than 20 words" : problem.length > 300 && "Description can't be greater than 300 words"}
                    </Form.Control.Feedback>
                </Form.Group>
                <div className='text-end my-4'>
                    <button
                        className={`${style.nextButton} px-5 py-3`}
                        onClick={handleSubmit}
                    >
                        Submit Feedback
                    </button>
                </div>
            </Container>
        </>
    );
}
