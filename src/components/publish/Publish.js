 import React, { useEffect, useState } from 'react';
import styles from "../../stylesheet/publish.module.scss";
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import { uploadFileToS3 } from '../../utils/S3';
import Validation from '../../utils/Validation';
import { v4 as uuidv4 } from 'uuid';
import API from '../../helpers/api';
import { handleErrorMessage } from '../../utils/CommonFunctions'
import { getAdminServices, getCorresCity, getPublishedJobs } from '../../store/actions/publishJob';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { FaTrashAlt } from "react-icons/fa";

import MultiSelectDropdown from './Multiselect';
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useRouter } from 'next/router';

export default function Publish({ editJob, publishFun, adminServices, setEditJob, style1 }) {

    const initial = {
        location: editJob ? editJob.location : "",
        countryName: editJob ? editJob.countryName : "",
        jobName: editJob ? editJob.jobName : "",
        jobDescription: editJob ? editJob.jobDescription : "",
        photos: editJob ? editJob.photos : [],
        adminService: editJob ? editJob.adminService : [],
        projectType: editJob ? editJob.projectType : "",
        priceRate: editJob ? editJob.priceRate : "",
    }

    const [addPhotoFields, setAddPhotoFields] = useState([{ photos: '' }]);
    const [editJobPhotos, setEditJobPhotos] = useState('');
    const router = useRouter()

    useEffect(() => {
        editJob && setAddPhotoFields(photos.map(url => ({ photos: url })));
        editJob && setImageUrl([...photos]);
    }, [editJob?.photos?.length])

    const [firstStep, setFirstStep] = useState(true);
    const [secondStep, setSecondStep] = useState(false);
    const [thirdStep, setThirdStep] = useState(false);
    const [data, setData] = useState(initial);
    const { location, countryName, jobName, jobDescription, photos, projectType, priceRate } = data;
    const [adminService, setAdminService] = useState(data?.adminService);
    const [showErrors, setShowErrors] = useState(false);
    const [showErrors1, setShowErrors1] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const [imageUrl1, setImageUrl] = useState([]);

    const dispatch = useDispatch();
    const corresCity = useSelector((Gstate) => Gstate?.PublishJobReducers?.corresCity)

    !editJob && thirdStep && setTimeout(() => {
        publishFun(false);
    }, 1000);

    useEffect(() => {
        if (editJob) {
            if (data && data.countryName && data.location) {
                const preSelectedCountry = Country.getAllCountries().find(
                    (country) => country.name === data.countryName
                );
                if (preSelectedCountry) {
                    setSelectedCountry(preSelectedCountry);
                }
            }
        }
    }, [data.countryName]);

    useEffect(() => {
        if (editJob) {
            if (data && data.location) {
                const preSelectedCity = getOptionsArray().find(
                    (city) => city.label === data.location
                );
                if (preSelectedCity) {
                    setSelectedCity(preSelectedCity)
                }
            }
        }
    }, [data.location, data.countryName, corresCity?.length])

    const handleFirstPage = () => {
        if (
            // !Validation.alphabets(countryName) ||
            // !Validation.minOf(location, 10, 100)
            !selectedCountry ||
            !selectedCity
        ) {
            setShowErrors1(true);
            return;
        }
        else {
            setShowErrors1(false);
            setFirstStep(false);
            setSecondStep(true);
        }
    }

    useEffect(() => {
        selectedCountry?.name && dispatch(getCorresCity(selectedCountry.name))
    }, [selectedCountry?.name])

    const handleSecondPage = () => {
        let flag = 0;
        // addPhotoFields.map((item) => {
        //     setShowErrors(true);
        //     if (Validation.empty(item.photos)) {
        //         flag = 0;
        //         return
        //     }
        //     else {
        //         flag++;
        //     }
        // })
        if (
            !Validation.minAlphabets(jobName, 4) ||
            !Validation.numberType(priceRate) ||
            !Validation.minOf(jobDescription, 50, 500) ||
            !adminService.length ||
            Validation.empty(projectType)
        ) {

            setShowErrors(true);
            return;
        }
        //if (flag)
        else {

            data.photos = [...imageUrl1];
            setShowErrors(false);
            data.location = selectedCity.label
            data.countryName = selectedCountry.name
            data.adminService = adminService
            API.apiPost("publishJob", (data))
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
                        dispatch(getPublishedJobs());
                        setThirdStep(true);
                        setFirstStep(false);
                        setSecondStep(false);
                    }
                })
                .catch((err) => {
                    handleErrorMessage(err);
                });
        }
    }

    const handleUpdateJob = () => {
        let flag = 0;
        // addPhotoFields.map((item, id) => {
        //     setShowErrors(true);
        //     if (Validation.empty(item.photos)) {
        //         flag = 0;
        //         return
        //     }
        //     else {
        //         flag++;
        //     }
        // })
        if (
            !selectedCountry ||
            !selectedCity ||
            !Validation.alphabets(jobName) ||
            !Validation.numberType(priceRate) ||
            Validation.empty(jobDescription) ||
            // Validation.empty(adminService) ||
            !adminService?.length ||
            Validation.empty(projectType)
        ) {
            setShowErrors(true);
            return;
        }
        //else if (flag)
        else {
            data.photos = [...imageUrl1];
            setShowErrors(false);
            data.id = parseInt(editJob.id);
            data.location = selectedCity.label
            data.countryName = selectedCountry.name
            data.adminService = adminService

            // if (data.adminService == adminService && !adminServices.some(service => service.id === parseInt(adminService))) {
            //     data.adminService = adminServices.find((item) => { return item.serviceName == adminService }).id
            // }

            API.apiPut("updateJob", (data))
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
                        dispatch(getPublishedJobs());
                        dispatch(getAdminServices());
                        // publishFun(false);
                        setEditJob(null);
                        // setFirstStep(false);
                        // setSecondStep(false);
                    }
                    router.push('/publish')
                    // router.reload();
                })
                .catch((err) => {
                    handleErrorMessage(err);
                });
        }
    }

    const handleChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const addPhotos = () => {
        let item = [...addPhotoFields];
        let obj = {
            photos: ''
        }
        if (item.length < 5) {
            item.push(obj)
            setAddPhotoFields(item);
        }
    }

    const removePhotoFields = (id) => {
        addPhotoFields?.splice(id, 1);
        imageUrl1?.splice(id, 1);
        setAddPhotoFields([...addPhotoFields]);
    }

    const handlePhotosChange = async (e, item, i) => {
        let newWorkValues = [...addPhotoFields];

        const { name } = e.target;
        newWorkValues[i][name] = e.target.files[0];
        setAddPhotoFields(newWorkValues);

        const uniqueFileName = `${uuidv4()}`;

        if (item.photos) {
            try {
                const imageUrl = await uploadFileToS3(item.photos, `${uniqueFileName}_${item.photos.name}`);
                // newUrl[i] = imageUrl;
                imageUrl1[i] = imageUrl;
                setImageUrl([...imageUrl1]);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none', // Remove the border
            boxShadow: 'none', // Remove the box shadow
        }),
    };

    const getOptionsArray = () => {
        return Object.entries(corresCity).map(([value, label]) => ({
            value,
            label,
        }));
    };

    return (
        <>
            <Toaster />
            <p className={`${styles.publishJobTitle}`}>
                {!editJob ?
                    'Publish a Job'
                    :
                    'Update Job'
                }
            </p>
            <div className='d-flex justify-content-center align-items-center mb-3'>
                <Image src={`${firstStep ? "/images/loader1.png" : secondStep && "/images/loader2.png"} `} className={`${thirdStep ? "d-none" : "img img-fluid"}`} alt="Loader" />
            </div>

            {firstStep &&
                <Container>
                    <Row className={`${styles.outerBox} p-4`}>
                        <p className={`${styles.addLocationTitle}`}>Add Location</p>

                        <Form.Group controlId="country" className='my-3'>
                            <Form.Label className={`${styles.formLabel}`}>Country</Form.Label>
                            <Select
                                className={`${styles.formInput} p-2 ${showErrors1 && !selectedCountry && styles.borderDanger} `}
                                options={Country.getAllCountries()}
                                name="countryName"
                                getOptionLabel={(options) => {
                                    return options["name"];
                                }}
                                placeholder='eg. South Dakota'
                                getOptionValue={(options) => {
                                    return options["name"];
                                }}
                                value={selectedCountry}
                                onChange={(item) => {
                                    setSelectedCountry(item);
                                    setShowErrors1(false)
                                }}
                                isInvalid={showErrors1 && !selectedCountry}
                                styles={customStyles} // Apply the custom styles
                            />
                            {showErrors1 && !selectedCountry && (
                                <div className="errorMessage text-danger">Please select country.</div>
                            )}
                        </Form.Group>

                        <Form.Group controlId='location' className='my-2'>
                            <Form.Label className={`${styles.formLabel}`}>
                                City
                            </Form.Label>
                            {/* <Form.Control
                                type='text'
                                placeholder='eg. Murshid Bazar, Deira, P.P Box 40512'
                                className={`${styles.formInput} p-3`}
                                name="location"
                                onChange={handleChange}
                                isInvalid={showErrors1 && !Validation.minOf(location, 10, 100)}
                                value={location}
                                minLength={10}
                                maxLength={100}
                            /> */}
                            <Select
                                className={`${styles.formInput} p-2 ${showErrors1 && !selectedCity && styles.borderDanger
                                } `}
                                options={getOptionsArray()} // Use the converted array of objects
                                name="cityName"
                                getOptionLabel={(option) => option.label}
                                getOptionValue={(option) => option.value}
                                placeholder='eg. Murshid Bazar, Deira, P.P Box 40512'
                                value={selectedCity}
                                // isDisabled={!selectedCountry}
                                onChange={(item) => {
                                    setSelectedCity(item)
                                }}
                                isInvalid={showErrors1 && !selectedCity}
                                styles={customStyles} // Apply your custom styles
                            />
                            {showErrors1 && !selectedCity && (
                                <p className="errorMessage text-danger">Please select a city.</p>
                            )}
                        </Form.Group>
                        {/*
                        {corresCity?.map((city) => (
                            <div key={city}>{city}</div>
                        ))} */}
                    </Row>

                    <div className='d-flex justify-content-center align-items-center'>
                        <button className={`${styles.nextButton} my-4 px-5 py-3`} onClick={handleFirstPage} >Next</button>
                    </div>
                </Container>
            }

            {secondStep &&
                <Container>
                    <Row className={`${styles.outerBox} p-4`}>
                        <p className={`${styles.addLocationTitle}`}>Add Description</p>

                        <Form.Group controlId='job-name' className='my-2'>
                            <Form.Label className={`${styles.formLabel}`}>
                                Job Name
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='eg. Film Making'
                                className={`${styles.formInput} p-3`}
                                name='jobName'
                                onChange={handleChange}
                                value={jobName}
                                minLength={3}
                                maxLength={50}
                                isInvalid={showErrors && !Validation.minAlphabets(jobName, 4)}
                            />
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!jobName
                                    ? "Please enter job name"
                                    : /[^A-Za-z]/.test(jobName)
                                        ? "Digits and special characters are not allowed"
                                        : jobName.length < 3
                                            ? "Job name can't be less than 3 characters"
                                            : ""
                                }
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId='job-desc' className='my-3'>
                            <Form.Label className={`${styles.formLabel}`}>
                                Job Description
                            </Form.Label>
                            <Form.Control
                                as='textarea'
                                rows="2"
                                name="jobDescription"
                                placeholder='Type here....'
                                className={`${styles.formInput} p-3`}
                                value={jobDescription}
                                onChange={handleChange}
                                minLength={50}
                                maxLength={500}
                                isInvalid={showErrors && !Validation.minOf(jobDescription, 50, 500)}
                            />
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!jobDescription ? "Please enter job description" : jobDescription?.length < 50 ? "Job description can't be less than 50 words" : "Job description can't be greater than 500 words"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <div className='d-flex justify-content-between align-items-center flex-wrap'>
                                <Form.Label className={`${styles.formLabel}`}>
                                    Add Photos
                                </Form.Label>
                                <div role='button' className='my-2 d-flex align-items-center' onClick={addPhotos}>
                                    <Image src='/images/addImages.png' />
                                    <span className={`${styles.addMore}`}>Add more</span>
                                </div>
                            </div>

                            {addPhotoFields.map((item, id) => (
                                <Row key={id} className='d-flex align-items-center'>
                                    <Col md={addPhotoFields.length > 1 ? 11 : 12} className='position-relative'>
                                        <Form.Group
                                            className='position-relative'
                                        >
                                            <Form.Control
                                                type='text'
                                                placeholder='No files selected'
                                                value={id < editJob?.photos?.length ? !item?.photos?.name ? (item?.photos?.split("_")[1] || item.photos?.split(".com/")[1]) : item?.photos?.name : item?.photos?.name ? item?.photos?.name : ""}
                                                className={`${styles.formInput} p-3 mt-2`}
                                                name='photos'
                                                readOnly={editJob ? true : item?.photos ? true : false}
                                                // isInvalid={showErrors && Validation.empty(item?.photos)}
                                                onChange={(e) => handlePhotosChange(e, item, id)}
                                            />
                                            <Form.Label htmlFor={`photo${id}`}>
                                                <span htmlFor={`photo${id}`} className={`${styles.browseButton}`}>Browse</span>
                                                <input
                                                    id={`photo${id}`}
                                                    className='d-none'
                                                    type="file"
                                                    accept="image/*"
                                                    name='photos'
                                                    onChange={(e) => handlePhotosChange(e, item, id)}
                                                />
                                            </Form.Label>
                                            {/* <Form.Control.Feedback type="invalid" className={`${styles.errorMessage}`}>
                                                {showErrors && Validation.empty(item.photos) && "Please add photo"}
                                            </Form.Control.Feedback> */}
                                        </Form.Group>
                                    </Col>
                                    {addPhotoFields.length > 1 &&
                                        <Col md={1}>
                                            <FaTrashAlt
                                                color='red'
                                                className={`mb-4`}
                                                role='button'
                                                onClick={() => removePhotoFields(id)}
                                            />
                                        </Col>
                                    }
                                </Row>
                            ))}
                        </Form.Group>

                        <MultiSelectDropdown
                            adminService={adminService}
                            styles={styles}
                            style1={style1}
                            editJob={editJob}
                            showErrors={showErrors}
                            Validation={Validation}
                            setAdminService={setAdminService}
                        />

                        {/* <Form.Group controlId="add-service" className='my-3'>
                            <Form.Label className={`${styles.formLabel}`}>Add Service</Form.Label>
                            <Form.Control
                                required
                                as="select"
                                type="select"
                                className={`${styles.formInput} ${styles.formSelect} p-3 `}
                                name="adminService"
                                onChange={handleChange}
                                // value={adminService}
                                // value={adminServices?.find(service => service.serviceName === adminService)?.id || adminService}
                                isInvalid={showErrors && Validation.empty(adminService)}
                            >
                                <option hidden className='text-muted'>Select</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!adminService && "Please select service"}
                            </Form.Control.Feedback>
                        </Form.Group> */}

                        <p className={`${styles.addLocationTitle} mt-3`}>Tell us about your budget</p>

                        <Form.Group controlId="payment-method" className='my-3'>
                            <Form.Label className={`${styles.formLabel}`}>Project type</Form.Label>
                            <Form.Control
                                required
                                as="select"
                                type="select"
                                className={`${styles.formInput} ${styles.formSelect} p-3 `}
                                name="projectType"
                                onChange={handleChange}
                                value={projectType}
                                isInvalid={showErrors && Validation.empty(projectType)}
                            >
                                <option hidden className='text-danger'>Select</option>
                                <option value="1" className={`${styles.chargeOption}`}>Hourly</option>
                                <option value="2" className={`${styles.chargeOption}`}>Fixed</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!projectType && "Please select project type"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {projectType ?
                            projectType == '1' ?
                                <Form.Group controlId='hourly-rate' className='my-3'>
                                    <Form.Label className={`${styles.formLabel}`}>
                                        Hourly rate
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='eg. $550'
                                        className={`${styles.formInput} p-3`}
                                        name='priceRate'
                                        value={priceRate}
                                        onChange={handleChange}
                                        maxLength={4}
                                        isInvalid={showErrors && !Validation.numberType(priceRate)}
                                    />
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!priceRate ? "Please enter rate" : priceRate == 0 ? "Rate can't be zero" : "Alphabets and special characters are not allowed"}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                :
                                <Form.Group controlId='hourly-rate' className='my-3'>
                                    <Form.Label className={`${styles.formLabel}`}>
                                        Fixed rate
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='eg. $550'
                                        className={`${styles.formInput} p-3`}
                                        name='priceRate'
                                        value={priceRate}
                                        onChange={handleChange}
                                        maxLength={4}
                                        isInvalid={showErrors && !Validation.numberType(priceRate)}
                                    />
                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                        {!priceRate ? "Please enter rate" : priceRate == 0 ? "Rate can't be 0" : "Alphabets and special characters are not allowed"}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            :
                            ''
                        }
                    </Row>

                    <div className='d-flex justify-content-center align-items-center'>
                        <button className={`${styles.nextButton} my-4 px-5 py-3`} onClick={editJob ? handleUpdateJob : handleSecondPage}>
                            {!editJob ?
                                'Publish'
                                :
                                'Update'
                            }
                        </button>
                    </div>
                </Container>
            }

            {
                thirdStep &&
                <Container className={`${styles.successDiv}`}>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Image src="/images/jobSuccess.png" className='img img-fluid' alt='job success' />
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <p className={`${styles.jobSuccessful}`}>Job published successfully!</p>
                    </div>
                </Container>
            }
        </>
    )
}
