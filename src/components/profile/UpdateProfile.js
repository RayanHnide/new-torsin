import React, { useEffect, useRef, useState } from 'react';
import styles from '../../stylesheet/profile.module.scss';
import style from '../../stylesheet/dashboard.module.scss';
import { Col, Container, Form, Image, Modal, Row, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails } from '../../store/actions/profile';
import API from '../../helpers/api';
import { handleErrorMessage } from "../../utils/CommonFunctions";
import { Toaster, toast } from 'react-hot-toast';
import Validation from "../../utils/Validation";
import { Input } from 'reactstrap';
import { uploadFileToS3 } from '../../utils/S3';
import { v4 as uuidv4 } from 'uuid';
import { Country } from "country-state-city";
import Select from "react-select";
import { useRouter } from 'next/router';
 import { FiChevronsLeft} from "react-icons/fi";

import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

export default function UpdateProfile() {

    const router = useRouter()
    const dispatch = useDispatch();
    const [profileList] = useSelector((Gstate) => [
        Gstate?.ProfileReducers?.profilelist,
    ]);

    const [data, setData] = useState(profileList);
    const { fullName, email, gender, mobileNo, bio, location, profileImage, countryName } = data;
    const [showErrors, setShowErrors] = useState(false);

    useEffect(() => {
        if (data && data.countryName) {
            const preSelectedCountry = Country.getAllCountries().find(
                (country) => {
                    return data.countryName == country.name
                }
            );
            if (preSelectedCountry) {
                setSelectedCountry(preSelectedCountry);
            }
        }
    }, [data.countryName]);

    const [selectedFile, setSelectedFile] = useState();
    const [imageCrop, setimageCrop] = useState();
    const [images, setImages] = useState([])
    const [imageURls, setImageURls] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        if (images.length < 1) return;
        const newURLs = [];
        images.forEach(image => {
            newURLs.push(URL.createObjectURL(image))
        })
        setImageURls(newURLs);
    }, [images]);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setImages([...event?.target?.files])
    };

    const uploadPic = async (e) => {
        setimageCrop(false);

        if (selectedFile) {//file
            const uniqueFileName = `${uuidv4()}`;
            try {
                const url = await uploadFileToS3(
                    selectedFile,
                    `${uniqueFileName}_${selectedFile.name}`,
                    selectedFile.type
                );
                data.profileImage = url;
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }

    const hideImageModal = () => {
        setimageCrop(false);
        setSelectedFile(null)
    }

    useEffect(() => {
        setData(profileList)
        setSelectedPlace(profileList?.location)
    }, [profileList?.length])

    const handleProfileChange = (e) => {
        const { name, value } = e.target;

        // Update 'selectedPlace' state when the location input field changes
        if (name === "location") {
            setSelectedPlace(value);
        }

        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleProfileUpdate = () => {
        setShowErrors(true);

        if (
            !Validation.alphabets(fullName) ||
            !Validation.email(email) ||
            !Validation.number(mobileNo) ||
            // Validation.empty(location) ||
            // Validation.empty(countryName)
            !selectedCountry ||
            !selectedPlace ||
            bio?.trim()?.length && (
                !Validation.minOf(bio, 20, 300)
            )
        ) {
            return;
        }
        else {
            setShowErrors(false);
            data.countryName = selectedCountry.name
            data.location = selectedPlace
            if (bio == '') {
                data.bio = null
            }
            API.apiPut("updateTalentProfile", (data))
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
                        dispatch(getProfileDetails())
                        router.back()
                    }
                })
                .catch((err) => {
                    handleErrorMessage(err);
                });
        }
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none', // Remove the border
            boxShadow: 'none', // Remove the box shadow
        }),
    };

    const [selectedPlace, setSelectedPlace] = useState(null);
    const autocompleteRef = useRef(null);

    const handlePlaceChanged = () => {

        const places = autocompleteRef.current.getPlaces();

        if (places?.length > 0) {
            const place = places[0];

            if (place) {
                // Rest of your code for extracting information from the place object
                const streetAddress = place.vicinity;
                const addressdata = place.address_components;
                const allAddress = place.name;

                const zipcodeobj = addressdata.find((obj) =>
                    obj.types.includes("postal_code")
                );
                const zipcode = zipcodeobj ? zipcodeobj.long_name : "";

                let formattedAddress = place.formatted_address;
                if (formattedAddress.startsWith(allAddress)) {
                    formattedAddress = formattedAddress.replace(allAddress, "").trim();
                }
                if (zipcode && formattedAddress.includes(zipcode)) {
                    formattedAddress = formattedAddress.replace(zipcode, "").trim();
                }

                // Concatenate name and formatted_address
                formattedAddress = allAddress + " " + formattedAddress;

                setSelectedPlace(formattedAddress);
            }
        }
    };

    const libraries = ["places"];
    return (
        <>
            <Toaster />
            <div className={`d-flex justify-content-start align-items-center pt-4 mb-2 ${style.publishNav}`}>
                <span className='me-3' role='button'>
                    <FiChevronsLeft onClick={() => router.back()} />
                </span>
                <span className={`${styles.addSkillsTitle}`}>Edit Profile</span>
            </div>

            <Container className='mb-4'>
                <div className={`${styles.imageContainer} d-flex justify-content-center align-items-center`}>
                    <div className={`d-flex justify-content-center my-4 `}>
                        <div className={`d-flex justify-content-center align-items-center ${styles.imageDiv}`}>
                            <div className={`${styles.editIcon1}`}>
                                <Image src='/images/editPencil.png' alt='edit' onClick={() => setimageCrop(true)} className={`img img-fluid ${styles.editIcon}`} />
                            </div>
                            {
                                selectedFile ?
                                    imageURls.map((imageSrc, i) =>
                                        <Image key={i}
                                            className={`w-100 ${styles.userProfile}`}
                                            src={imageSrc}
                                            alt=""
                                        />
                                    )
                                    :
                                    <>
                                        <Image
                                            alt=""
                                            src={profileImage ? profileImage : "/images/dummyImage.png"}
                                            className={`${styles.userProfile}`}
                                        />
                                    </>
                            }
                            <Modal
                                show={imageCrop}
                                centered
                                onHide={hideImageModal}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Update Profile</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="d-flex flex-column align-items-center">
                                        <Input type="file" multiple accept="image/*" onChange={changeHandler} />
                                        {selectedFile && <div className="row">
                                            <Card className='w-75 m-3 p-0 border-0'>
                                                {imageURls.map((imageSrc, i) =>
                                                    <Image key={i}
                                                        className="w-100"
                                                        src={imageSrc}
                                                        alt="image"
                                                    />
                                                )}
                                            </Card>
                                        </div>
                                        }
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="d-flex justify-content-center">
                                    <Button variant="primary" onClick={uploadPic}>
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
                <Row className={`my-3 px-4 d-flex justify-content-between`}>
                    <Col md={5}>
                        <Form.Group controlId='name'>
                            <Form.Label className={`${styles.formLabel}`}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                name="fullName"
                                value={fullName}
                                onChange={handleProfileChange}
                                className={`${styles.skillsFormInput} py-3 px-4`}
                                isInvalid={showErrors && !Validation.alphabets(fullName)}
                            />
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!fullName ? "Please enter full name" : "Digits and/or special characters are not allowed"}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group onChange={handleProfileChange}>
                            <Form.Label className={`${styles.formLabel}`}>Gender</Form.Label>
                            <div>
                                <Form.Label htmlFor='male' className={`${styles.genderLabel}`}>
                                    <input type="radio" className='me-2' id="male" name="gender" value="1" checked={(gender == "1") ? true : false} onChange={handleProfileChange} />
                                    Male
                                </Form.Label>
                            </div>
                            <div>
                                <Form.Label htmlFor='female' className={`${styles.genderLabel}`}>
                                    <input type="radio" className='me-2' id="female" name="gender" value="2" checked={(gender == "2") ? true : false} onChange={handleProfileChange} />
                                    Female
                                </Form.Label>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={`my-3 px-4 d-flex justify-content-between`}>
                    <Col md={5}>
                        <Form.Group controlId="email">
                            <Form.Label className={`${styles.formLabel}`}>Email</Form.Label>
                            <Form.Control
                                type='text'
                                name="email"
                                value={email}
                                onChange={handleProfileChange}
                                className={`${styles.skillsFormInput} py-3 px-4`}
                                isInvalid={showErrors && !Validation.email(email)}
                            />
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!email ? "Please enter email" : "Please enter valid email , e.g example@something.com"}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group controlId="location">
                            <Form.Label className={`${styles.formLabel}`}>Location</Form.Label>
                            <LoadScript
                                googleMapsApiKey="AIzaSyD9HAzCj-r9Zw8dZnQWkNgrkewOc4aRjGc"
                                libraries={libraries} // Add "places" library
                            >
                                <StandaloneSearchBox
                                    onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                    onUnmount={(auto) => (autocompleteRef.current = null)}
                                    onPlacesChanged={handlePlaceChanged}
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter a location"
                                        className={`px-4 ${styles.skillsFormInput} py-3 w-100 ${showErrors && !selectedPlace && styles.borderDanger}`}
                                        value={selectedPlace} // Use 'selectedPlace' state instead of 'location' from 'data'
                                        name="location" // Set the name to "location" to update the 'selectedPlace' state
                                        onChange={handleProfileChange} // Handle changes in the input field
                                        style={{
                                            outline: "none",
                                            padding: "",
                                            textOverflow: "ellipsis",
                                        }}
                                        isInvalid={showErrors && !selectedPlace}
                                    />
                                </StandaloneSearchBox>
                            </LoadScript>
                            {showErrors && !selectedPlace && (
                                <div className="errorMessage text-danger">Please enter location.</div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={`my-3 px-4 d-flex justify-content-between`}>
                    <Col md={5}>
                        <Form.Group controlId="phone">
                            <Form.Label className={`${styles.formLabel}`}>Mobile Number</Form.Label>
                            <Form.Control
                                type='text'
                                name="mobileNo"
                                value={mobileNo}
                                onChange={handleProfileChange}
                                className={`${styles.skillsFormInput} py-3 px-4`}
                                isInvalid={showErrors && !Validation.number(mobileNo)}
                                maxLength={10}
                            />
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!mobileNo ? "Please enter mobile no." : "Alphabets and/or special characters are not allowed"}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group controlId='countryName'>
                            <Form.Label className={`${styles.formLabel}`}>Country</Form.Label>
                            <Select
                                className={`${styles.skillsFormInput} ps-3 py-2 ${showErrors && !selectedCountry && styles.borderDanger}`}
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
                                    setShowErrors(false)
                                }}
                                isInvalid={showErrors && !selectedCountry}
                                styles={customStyles} // Apply the custom styles
                            />
                            {showErrors && !selectedCountry && (
                                <div className="errorMessage text-danger">Please select country.</div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={`my-3 px-4 d-flex justify-content-between`}>
                    <Col>
                        <Form.Group controlId='bio'>
                            <Form.Label className={`${styles.formLabel}`}>Bio</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows="3"
                                name="bio"
                                placeholder='Bio....'
                                className={`${styles.skillsFormInput} py-3 px-4`}
                                value={bio}
                                onChange={handleProfileChange}
                                maxLength="500"
                                isInvalid={showErrors && bio?.length && !Validation.minOf(bio, 20, 300)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {!bio?.length ? "Please enter bio" : bio?.length < 20 && "Bio can't be less than 20 words "}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <div className='text-end mt-4 me-4'>
                    <button className={`${styles.skillsAddButton}`} onClick={handleProfileUpdate}>Save Changes</button>
                </div>
            </Container>
        </>
    )
}
