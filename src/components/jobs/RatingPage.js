import React, { useState } from 'react';
import { Container, Form, Image } from 'react-bootstrap';
// import { IconArrowLeft } from 'tabler-icons';
import { FaStar } from 'react-icons/fa';
import Validation from '../../utils/Validation';
import { Toaster, toast } from 'react-hot-toast';
import API from '../../helpers/api';
import { useDispatch } from 'react-redux';
import { getTalentRating } from '../../store/actions/ratings';

export default function RatingPage({ style, styles, style1, setRatingPage, viewItem }) {

    const dispatch = useDispatch();
    const { clientId, jobId } = viewItem;
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState(null);
    const [showErrors, setShowErrors] = useState(false);

    const handleRating = (selectedRating) => {
        setRating(selectedRating);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={`${i <= rating ? styles.active : ""} ${styles.star} me-3`}
                    onClick={() => handleRating(i)}
                    size={30}
                />
            );
        }
        return stars;
    };

    const handleSubmit = () => {
        setShowErrors(true);
        if (rating < 1) {
            toast.error("Please select rating !", {
                position: "top-right",
                style: {
                    borderBottom: '4px solid #33a34e',
                    padding: "16px",
                    color: "#3c5f4b",
                    marginRight: "25px",
                },
            });
            return;
        }

        else if (Validation.empty(review)) {
            return;
        }

        else {
            setShowErrors(false);

            API.apiPost('createRating', {
                'rating': rating,
                'review': review,
                'jobId': jobId,
                'reciverId': clientId
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
                        // dispatch(getTalentRating())
                        setRatingPage(false)
                    }
                })
                .catch((error) => {
                    console.log('error=>', error)
                })
        }
    }

    return (
        <>
            <Toaster />

            <div className={`d-flex justify-content-start align-items-center ${style1.publishNav} py-4`}>
                <span className='me-3' role='button'>
                    {/*<IconArrowLeft onClick={() => setRatingPage(false)} />*/}
                </span>
                <span className={`${style1.viewJob} mx-2`}>
                    Add Ratings and Review
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
            <Container className={`${style1.viewJobOuterContainer} py-4 px-5 my-4`}>
                <div className={`${styles.activeReportLabel}`}>
                    Would you like to rate this Job & your Employer?
                    <p className='mt-3'>
                        How would you rate the overall experience of your ride? Your Feedback matters!! Add to favourites.
                    </p>
                </div>

                <div>
                    <Image src='./images/jobDp2.png' className='img img-fluid' alt='job' />
                </div>
                <div className={`${styles.feedbackStars} my-3`}>{renderStars()}</div>

                <Form.Group
                    className={`${style.viewJobOuterContainer}`}
                    controlId='problem'
                >
                    <Form.Label
                        className={`${style.jobTitle} my-3`}
                    >
                        Leave a review
                    </Form.Label>
                    <Form.Control
                        as='textarea'
                        rows="5"
                        name="review"
                        placeholder='Start typing here. Tell us about your experience in this ride.....'
                        className={`${styles.activeReportRadioLabel} ${styles.textareaBorder2} text-dark py-3 px-4`}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        // maxLength="250"
                        isInvalid={showErrors && Validation.empty(review)}
                    />
                    <Form.Control.Feedback type='invalid'>
                        {!review && "Please enter review !"}
                    </Form.Control.Feedback>
                </Form.Group>
                <div className='text-end mt-4'>
                    <button
                        className={`${style.nextButton} px-5 py-3`}
                        onClick={handleSubmit}
                    //createRating
                    >
                        Submit Feedback
                    </button>
                </div>
            </Container>
        </>
    );
}
