import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Image, Modal, Row } from 'react-bootstrap'
import Validation from '../../../utils/Validation';
import { Toaster, toast } from 'react-hot-toast';
import { handleErrorMessage } from '../../../utils/CommonFunctions'
import API from '../../../helpers/api';
import { useDispatch } from 'react-redux';
import { getContractsList } from '../../../store/actions/client-action/contract';
import { Oval } from 'react-loader-spinner';
// import { IconArrowLeft } from 'tabler-icons';

export default function CreateContract({ percentage, style, style1, contractDetails, styles, publishedJobs, mailList, setCreateContract, editedItem, edit, setEdit, setDetailsId, queryData }) {

    const adminPercentage = percentage
 
    const { contract_details, milestone } = contractDetails;
    const contractId = contractDetails?.contractId
    
  
    const initial = {
        talentId: (edit && contractDetails && contractDetails.talentId) || null,
        projectId: (edit && contractDetails && contractDetails.jobId) || null,
        description: edit && contractDetails && contractDetails.description || null,
        contractType: edit && contractDetails && contractDetails.contractType || null,
        amount: edit && contractDetails && contractDetails.contractType == '2' ? parseInt(contractDetails.amount) : null,
        timeDuration: edit && contractDetails && contractDetails.contractType == '2' ? parseInt(contractDetails.timeDuration) : null,
        torsinRate: edit && contractDetails && contractDetails.contractType == '2' ? contractDetails.torsinRate : null,
        receivedAmount: edit && contractDetails && contractDetails.contractType == '2' ? contractDetails.receivedAmount : null,
        endDate: edit && contractDetails && contractDetails.contractType == '2' ? contractDetails.endDate : null,
        specificDate: edit && contractDetails && contractDetails.contractType == '2' ? contractDetails.specificDate : null,
    }

    const [data, setData] = useState(initial);
    const { talentId, projectId, description, contractType, amount, torsinRate, receivedAmount, endDate, specificDate, timeDuration } = data;

    useEffect(() => {
        const updatedInitial = { ...initial };
        if (queryData?.talentId) {
            updatedInitial.talentId = queryData.talentId;
        }
        if (queryData?.jobId) {
            updatedInitial.projectId = queryData.jobId;
        }
        setData(updatedInitial);
    }, [queryData, queryData?.talentId, queryData?.jobId])

    const [showErrors, setShowErrors] = useState(false);
    const [showErrors2, setShowErrors2] = useState(false);

    const [secondPage, setSecondPage] = useState(false);
    const [milestones, setMilestones] = useState([]);
    const [successModal, setSuccessModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (edit) {
            setMilestones(milestone)
        }
    }, [edit])

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amount') {
            // Remove the dollar sign from the entered value before updating the state
            const numericValue = value.replace(/\$/g, '');
            setData((prev) => ({
                ...prev,
                [name]: numericValue,
            }));

            if (numericValue && data.timeDuration) {
                const numeric_amount = parseFloat(numericValue);
                const numeric_duration = parseInt(data.timeDuration);
                const torsinRate = numeric_amount * parseInt(adminPercentage?.adminPercentage) / 100;
                const receivedAmount = numeric_amount - torsinRate;
                setData((prev) => ({
                    ...prev,
                    torsinRate: (torsinRate * numeric_duration).toFixed(2),
                    receivedAmount: (receivedAmount * numeric_duration).toFixed(2),
                }));
            } else {
                setData((prev) => ({
                    ...prev,
                    torsinRate: '',
                    receivedAmount: '',
                }));
            }
        } else if (name === 'timeDuration') {
            setData((prev) => ({
                ...prev,
                [name]: value,
            }));

            if (data.amount && value) {
                const numeric_amount = parseFloat(data.amount);
                const numeric_duration = parseInt(value);
                const torsinRate = numeric_amount * parseInt(adminPercentage?.adminPercentage) / 100;
                const receivedAmount = numeric_amount - torsinRate;
                setData((prev) => ({
                    ...prev,
                    torsinRate: (torsinRate * numeric_duration).toFixed(2),
                    receivedAmount: (receivedAmount * numeric_duration).toFixed(2),
                }));
            } else {
                setData((prev) => ({
                    ...prev,
                    torsinRate: '',
                    receivedAmount: '',
                }));
            }
        } else {
            setData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSave = () => {
        setShowErrors(true);
        if (
            Validation.empty(projectId) ||
            Validation.empty(contractType) ||
            Validation.empty(talentId) ||
            !Validation.minOf(description, 50, 500) ||
            data?.contractType == '2' &&
            (!Validation.numberType(amount) ||
                Validation.empty(endDate) ||
                data?.endDate == '2' && Validation.empty(specificDate))
        ) {
            return
        }
        else if (data?.contractType == '1' &&
            !milestones?.length >= 1 &&
            (!Validation.numberType(amount))) {
            setShowErrors2(true);
            return
        }
        else {
            setShowErrors(false);
            setShowErrors2(false);
            if (data?.contractType == '2') {
                if (data?.endDate == '1') {
                    data.contractType = parseInt(data.contractType)
                    data.endDate = parseInt(data.endDate)
                    delete data?.specificDate
                }
                else if (data?.endDate == '2') {
                    data.contractType = parseInt(data.contractType)
                    data.endDate = parseInt(data.endDate)
                }
            }
            else if (data?.contractType == '1') {
                if (milestones?.length >= 1) {
                    data.milestoneData = [...milestones]
                    data.ismilestone = parseInt(2)
                    data.contractType = parseInt(data.contractType)
                    data.torsinRate = torsinFee
                    data.receivedAmount = receivingAmount
                    data.amount = milestonePrice
                    delete data?.endDate
                    delete data?.specificDate
                }
                else {
                    data.milestoneData = null
                    data.ismilestone = parseInt(1)
                    data.contractType = parseInt(data.contractType)
                    data.torsinRate = torsinFee
                    data.receivedAmount = receivingAmount
                    delete data?.endDate
                    delete data?.specificDate
                }
            }

            if (edit) {
                data.contractId = contractId
                API.apiPut('editContract', (data))
                    .then((res) => {
                        if (res) {
                            toast.success(res?.data?.response?.message?.successMessage, {
                                position: "top-right",
                                style: {
                                    borderBottom: '4px solid #33a34e',
                                    padding: "16px",
                                    color: "#3c5f4b",
                                    marginRight: "25px",
                                },
                            });
                            setEdit(false);
                            setDetailsId(null);
                            setCreateContract(null);
                            dispatch(getContractsList(0))
                        }
                    })
                    .catch((err) => {
                        handleErrorMessage(err);
                    });

            } else if (!edit) {
                API.apiPost('createContract', (data))
                    .then((res) => {
                        if (res) {
                            toast.success(res?.data?.response?.message?.successMessage, {
                                position: "top-right",
                                style: {
                                    borderBottom: '4px solid #33a34e',
                                    padding: "16px",
                                    color: "#3c5f4b",
                                    marginRight: "25px",
                                },
                            });
                        }
                        setSuccessModal(true);
                    })
                    .catch((err) => {
                        handleErrorMessage(err);
                    });
            }
        }
    }

    const handleUpdate = () => {

    }

    const handleNext = () => {
        setShowErrors(true);
        if (
            Validation.empty(projectId) ||
            Validation.empty(contractType) ||
            Validation.empty(talentId) ||
            !Validation.minOf(description, 50, 500)
        ) {
            return
        }
        else {
            setShowErrors(false);
            setSecondPage(true);
        }
    }

    const handleAdd = () => {
        data.amount = null
        setMilestones((prevMilestones) => [
            ...prevMilestones,
            { name: "", startDate: "", endDate: "", price: "" },
        ]);
    };

    const handleMilestoneChange = (index, event) => {
        const { name, value } = event.target;
        setMilestones((prevMilestones) => {
            const updatedMilestones = [...prevMilestones];
            updatedMilestones[index][name] = value;
            return updatedMilestones;
        });
    };

    const handleRemove = (index) => {
        data.amount = null
        setMilestones((prevMilestones) => {
            const updatedMilestones = [...prevMilestones];
            updatedMilestones.splice(index, 1);
            return updatedMilestones;
        });
    };

    const handleSuccessModal = () => {
        setSuccessModal(false);
        setCreateContract(false);
        dispatch(getContractsList(0))
    }

    const milestonePrice = !amount ?
        milestones.reduce((acc, milestone) =>
            acc + (milestone.price !== '' ? parseFloat(milestone.price) : 0), 0)
        :
        amount;

    const torsinFee = milestonePrice * parseInt(adminPercentage?.adminPercentage) / 100;
    const receivingAmount = milestonePrice - torsinFee;

    const uniqueData = mailList.filter((item, index, arr) => {
        return arr.findIndex(obj => obj.talentEmail === item.talentEmail) === index;
    });


    const handleEditBackIcon = () => {
        setDetailsId(null);
        setEdit(null);
        setCreateContract(false);
    }

    return (
        <>
            <Toaster />

            <Modal centered show={successModal} onHide={handleSuccessModal} backdrop="static">
                <Modal.Header closeButton style={{ border: "0" }} className="pb-0" />
                <Modal.Body>
                    <div className='text-center px-5 pb-3'>
                        <Image src='/images/contractSent.png' className='img img-fluid' />
                        <p className={`${styles.modalTitle} mt-3`}>Contract sent</p>
                        <p className={`${style.addLocationTitle} text-dark px-4`}>
                            Your contract has been sent successfully.We will notify you once
                            <span className='mx-1 fw-bold'>

                                {mailList?.find(item => item?.talentId == data?.talentId)?.fullName}
                            </span>
                            accepts it.
                        </p>
                        <div>
                            <button className={`${styles.createButton} text-white px-5 py-2 mt-2`} onClick={handleSuccessModal}>Close</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <div className={`d-flex justify-content-start align-items-center py-4 ${style.publishNav}`}>
                <span className='me-2' role='button'>
                    {/* <IconArrowLeft onClick={() =>
                        (!edit) ?
                            setCreateContract(null)
                            :
                            handleEditBackIcon()
                    } /> */}
                </span>
                <p className={`${styles.newContractTitle} my-0`}>
                    {!edit ? 'New Contract' : 'Edit Contract'}
                </p>
            </div>

            <Container >
                {!secondPage ?
                    <Row className={``}>
                        <Form.Group controlId='email' className='my-2'>
                            <Form.Label className={`${style.formLabel}`}>
                                Client Email Address
                            </Form.Label>
                            <Form.Control
                                required
                                as="select"
                                type="select"
                                className={`${style.formInput} ${style.formSelect} p-3 ${styles.selectControl} ${(!queryData || edit) && 'bg-white'}`}
                                name="talentId"
                                onChange={handleChange}
                                value={!queryData ? talentId : queryData?.talentId}
                                disabled={edit || queryData}
                                isInvalid={showErrors && Validation.empty(talentId)}
                            >
                                <option >
                                    Select
                                </option>

                                 
                                {
                                    uniqueData?.map((item, index) => (
                                        <option key={index} value={item?.talentId} className={`${style.chargeOption}`}>ss</option>
                                    ))
                                }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!talentId && "Please select email address"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId='contract-name' className='my-2'>
                            <Form.Label className={`${style.formLabel}`}>
                                Contract Name
                            </Form.Label>
                            <Form.Control
                                required
                                as="select"
                                type="select"
                                className={`${style.formInput} ${style.formSelect} p-3 ${(!queryData || edit) && 'bg-white'}`}
                                name="projectId"
                                onChange={handleChange}
                                placeholder='Music Composer'
                                disabled={edit || queryData}
                                value={!queryData ? projectId : queryData?.jobId}
                                isInvalid={showErrors && Validation.empty(projectId)}
                            >
                                <option hidden className='text-muted' style={{ color: "#828282" }}>Select</option>
                                {
                                    publishedJobs?.map((item, index) => (
                                        <option value={item?.id} key={index}>{item?.jobName}</option>
                                    ))
                                }
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!projectId && "Please select contract name"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId='description' className='my-2'>
                            <Form.Label className={`${style.formLabel}`}>
                                Description
                            </Form.Label>
                            <Form.Control
                                as='textarea'
                                rows="4"
                                name="description"
                                placeholder='Write a short description about the contract'
                                className={`${style.formInput} p-3`}
                                value={description}
                                onChange={handleChange}
                                minLength={50}
                                maxLength={500}
                                isInvalid={showErrors && !Validation.minOf(description, 50, 500)}
                            />
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!description ? "Please enter description" : description?.length < 50 ? "Description can't be less than 50 words" : "Description can't be greater than 500 words"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="contract-type" className='my-2'>
                            <Form.Label className={`${style.formLabel}`}>Contract type</Form.Label>
                            <Form.Control
                                required
                                as="select"
                                type="select"
                                className={`${style.formInput} ${style.formSelect} p-3 bg-white`}
                                name="contractType"
                                onChange={handleChange}
                                value={contractType}
                                disabled={edit}
                                isInvalid={showErrors && Validation.empty(contractType)}
                            >
                                <option hidden className={`${styles.selectColor}`}>Select</option>
                                <option value="2" className={`${style.chargeOption}`}>Hourly</option>
                                <option value="1" className={`${style.chargeOption}`}>Fixed</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!contractType && "Please select contract type"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {
                            contractType == '2' &&
                            <>
                                <Form.Group controlId='hourly-rate' className='my-2'>
                                    <Form.Label className={`${style.formLabel}`}>
                                        Hourly rate
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='$100 /hr'
                                        className={`${style.formInput} p-3`}
                                        name='amount'
                                        // value={amount}
                                        value={amount ? `$${amount}` : ''}
                                        onChange={handleChange}
                                        maxLength={4}
                                        isInvalid={showErrors && !Validation.numberType(amount)}
                                    />
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!amount ? "Please enter rate" : amount == 0 ? "Rate can't be zero" : "Alphabets and special characters are not allowed"}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='duration' className='my-2'>
                                    <Form.Label className={`${style.formLabel}`}>
                                        Duration
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='1 hour'
                                        className={`${style.formInput} p-3`}
                                        name='timeDuration'
                                        value={timeDuration}
                                        onChange={handleChange}
                                        maxLength={4}
                                        isInvalid={showErrors && !Validation.numberType(timeDuration)}
                                    />
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!timeDuration ? "Please enter duration" : timeDuration == 0 ? "Duration can't be zero" : "Alphabets and special characters are not allowed"}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='torsin-fee' className='my-2'>
                                    <Form.Label className={`${style.formLabel}`}>
                                        {adminPercentage?.adminPercentage}
                                        % Torsin Fee
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder={`$${adminPercentage?.adminPercentage}`}
                                        className={`${style.formInput} p-3`}
                                        name='torsinRate'
                                        // value={torsinRate}
                                        value={torsinRate ? `$${torsinRate}` : ''}
                                        maxLength={4}
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group controlId='receive' className='my-2'>
                                    <Form.Label className={`${style.formLabel}`}>
                                        You'll Receive
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='$95'
                                        className={`${style.formInput} p-3`}
                                        name='receivedAmount'
                                        // value={receivedAmount}
                                        value={receivedAmount ? `$${receivedAmount}` : ''}
                                        readOnly
                                        maxLength={4}
                                    />
                                </Form.Group>

                                <Form.Group className='my-2' onChange={handleChange} isInvalid={showErrors && Validation.empty(endDate)}>
                                    <Form.Label className={`${style.formLabel}`} >
                                        End Date
                                    </Form.Label>
                                    <div>
                                        <Form.Label htmlFor='undefined' className={`${style.formLabel}`}>
                                            {!edit ?
                                                <input type="radio" className='me-3' id="undefined" name="endDate" value="1" />
                                                :
                                                <input type="radio" checked={edit && endDate == '1'} className='me-3' id="undefined" name="endDate" value="1" />
                                            }
                                            Undefined
                                        </Form.Label>
                                    </div>
                                    <div>
                                        <Form.Label htmlFor='specific' className={`${style.formLabel}`}>
                                            {!edit ?
                                                <input type="radio" className='me-3' id="specific" name="endDate" value="2" />
                                                :
                                                <input type="radio" checked={edit && endDate == '2'} className='me-3' id="specific" name="endDate" value="2" />
                                            }
                                            Specific Date
                                        </Form.Label>
                                    </div>
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!endDate && "Please select end date"}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {
                                    endDate && endDate == '2' &&
                                    <Form.Group>
                                        <Form.Control
                                            placeholder=''
                                            type='date'
                                            name='specificDate'
                                            value={specificDate}
                                            className={`${style.formInput} p-3`}
                                            onChange={handleChange}
                                            isInvalid={showErrors && Validation.empty(specificDate)}
                                        />
                                        <Form.Control.Feedback type="invalid" className="errorMessage">
                                            {!specificDate && "Please enter specific date"}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                }
                            </>
                        }
                    </Row>
                    :
                    <Row>
                        <Form.Group controlId='fixed-rate' className={`my-2`}>
                            <Form.Label className={`${style.formLabel}`}>
                                Amount
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='$ Enter amount'
                                className={`${style.formInput} bg-white p-3`}
                                name='amount'
                                value={milestones.length > 0 ?
                                    milestonePrice ?
                                        milestonePrice.toString()
                                        :
                                        '0.00'
                                    : amount || ''}
                                disabled={milestones.length ? true : false}
                                onChange={handleChange}
                                maxLength={5}
                                isInvalid={showErrors2 && !Validation.numberType(amount)}
                            />
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!amount ? "Please enter rate" : amount == 0 ? "Rate can't be zero" : "Alphabets and special characters are not allowed"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div>
                            <hr className={` ${style1.hr}`} />
                            <div className='text-center'>
                                <p className={`my-0 text-align-center`}>
                                    Milestones
                                </p>
                            </div>
                            <div style={{ marginTop: "-25px" }}>
                                <p className={`my-0 d-flex justify-content-end align-items-center`}>
                                    <Image
                                        src='./images/addContract.png'
                                        className='img img-fluid me-2'
                                        onClick={handleAdd}
                                        role='button'
                                    />
                                    <span
                                        role='button'
                                        onClick={handleAdd}>
                                        Add
                                    </span>
                                </p>
                            </div>
                            <hr className={` ${style1.hr}`} />

                            {milestones.map((milestone, index) => (
                                <React.Fragment key={index}>
                                    <div key={index} className={`${styles.milestoneBoxOuter} my-4`}>
                                        <Container className='px-4 py-3'>
                                            <p className={`${!edit ? 'my-0 d-flex justify-content-end align-items-center' : 'd-none'}`}>
                                                <Image
                                                    src='./images/removeMilestone.png'
                                                    className='img img-fluid me-2'
                                                    role='button'
                                                    onClick={() => handleRemove(index)}
                                                />
                                                <span
                                                    role='button'
                                                    onClick={() => handleRemove(index)}
                                                    className='text-danger'
                                                >
                                                    Remove
                                                </span>
                                            </p>
                                            <Form.Group controlId={`milestone-name-${index}`} className='mb-2'>
                                                <Form.Label className={`${style.formLabel}`}>
                                                    Milestone Name
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Enter name'
                                                    className={`${style.formInput} p-3`}
                                                    value={milestone.name}
                                                    name='name'
                                                    onChange={(e) =>
                                                        handleMilestoneChange(index, e)
                                                    }
                                                />
                                            </Form.Group>
                                            <Row>
                                                <Col>
                                                    <Form.Group controlId={`milestone-start-date-${index}`} className='my-2'>
                                                        <Form.Label className={`${style.formLabel}`}>
                                                            Start Date
                                                        </Form.Label>
                                                        <Form.Control
                                                            type='date'
                                                            placeholder='01/01/2023'
                                                            name='startDate'
                                                            className={`${style.formInput} p-3`}
                                                            value={milestone.startDate}
                                                            onChange={(e) =>
                                                                handleMilestoneChange(index, e)
                                                            }
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId={`milestone-end-date-${index}`} className='my-2'>
                                                        <Form.Label className={`${style.formLabel}`}>
                                                            End Date
                                                        </Form.Label>
                                                        <Form.Control
                                                            type='date'
                                                            placeholder='01/01/2023'
                                                            name='endDate'
                                                            className={`${style.formInput} p-3`}
                                                            min={milestone.startDate}
                                                            value={milestone.endDate}
                                                            onChange={(e) =>
                                                                handleMilestoneChange(index, e)
                                                            }
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Form.Group controlId={`milestone-price-${index}`} className='my-2'>
                                                <Form.Label className={`${style.formLabel}`}>
                                                    Milestone Price
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    placeholder='Enter amount'
                                                    className={`${style.formInput} p-3`}
                                                    value={milestone.price}
                                                    maxLength={5}
                                                    name='price'
                                                    onChange={(e) =>
                                                        handleMilestoneChange(index, e)
                                                    }
                                                />
                                            </Form.Group>
                                        </Container>
                                    </div>
                                    <hr className={`${style1.hr}`} />
                                </ React.Fragment>
                            ))}

                            {milestones?.length >= 1 && <div className={`d-flex justify-content-between align-items-center`}>
                                <p className={`${style.formLabel}`}>
                                    Milestone Price
                                </p>
                                <p className={`${style.formLabel} text-muted`}>
                                    ${milestonePrice || '0.00'}
                                </p>
                            </div>}

                            <div className={`d-flex justify-content-between align-items-center`}>
                                <p className={`${style.formLabel}`}>
                                    {adminPercentage?.adminPercentage}
                                    % Torsin Fee
                                </p>
                                <p className={`${style.formLabel} text-muted`}>
                                    ${torsinFee ? torsinFee.toFixed(2) : '0.00'}
                                </p>
                            </div>

                            <div className={`d-flex justify-content-between align-items-center`}>
                                <p className={`${style.deleteJobTitle} text-black`}>
                                    You'll Receive
                                </p>
                                <p className={`${styles.receivePrice}`}>
                                    ${receivingAmount ? receivingAmount.toFixed(2) : '0.00'}
                                </p>
                            </div>
                            <hr className={` ${style1.hr}`} />
                        </div>
                    </Row>
                }

                <div className='d-flex justify-content-end align-items-center'>
                    <button
                        className={`${style.nextButton} my-4 px-5 py-3`}
                        onClick={!edit ? (contractType == '1' ? !secondPage ? handleNext : handleSave : handleSave) : (contractType == '1' ? !secondPage ? handleNext : handleSave : handleSave)}
                    >
                        {!edit
                            ?
                            contractType == '1' ?
                                !secondPage ?
                                    'Next' :
                                    'Send'
                                :
                                'Sent'
                            :
                            contractType == '1' ?
                                !secondPage ?
                                    'Next' :
                                    'Update'
                                :
                                'Update'
                        }
                    </button>
                </div>
            </Container>
        </>
    )
}
