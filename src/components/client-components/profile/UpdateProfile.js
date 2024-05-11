import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, FormText, Image, Modal, Row } from 'react-bootstrap';
import styles from '../../stylesheet/profile.module.scss';
import publishStyle from '../../stylesheet/publish.module.scss';
import { getProfileDetails } from '../../store/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../helpers/api';
import { handleErrorMessage } from '../../utils/CommonFunctions';
import { Toaster, toast } from 'react-hot-toast';
import { Input } from 'reactstrap';
import Validation from '../../utils/Validation';
import { uploadFileToS3 } from '../../utils/S3';
import { v4 as uuidv4 } from 'uuid';
import { Country } from "country-state-city";
import Select from "react-select";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { useRouter } from 'next/router';
import { IconArrowLeft } from 'tabler-icons';

export default function UpdateProfile() {

    const dispatch = useDispatch();
    const [profileList] = useSelector((Gstate) => [Gstate?.ProfileReducers?.profilelist]);
    const [data, setData] = useState(profileList);
    const [showErrors, setShowErrors] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setData(profileList)
        setSelectedPlace(profileList?.location)
    }, [profileList?.length])

    useEffect(() => {
        if (data && data.countryName) {
            const preSelectedCountry = Country.getAllCountries().find(
                (country) => country.name === data.countryName
            );
            if (preSelectedCountry) {
                setSelectedCountry(preSelectedCountry);
            }
        }
    }, [data]);

    const { fullName, email, mobileNo, gender, location, countryName, profileImage } = data;

    const [selectedFile, setSelectedFile] = useState();
    const [imageCrop, setimageCrop] = useState();
    const [images, setImages] = useState([])
    const [imageURls, setImageURls] = useState([]);

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
                const url = await uploadFileToS3(selectedFile, `${uniqueFileName}_${selectedFile.name}`);
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update 'selectedPlace' state when the location input field changes
        if (name === "location") {
            setSelectedPlace(value);
        }

        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handlePut = () => {
        setShowErrors(true);
        if (!Validation.alphabets(fullName) ||
            !Validation.email(email) ||
            !Validation.number(mobileNo) ||
            Validation.empty(gender) ||
            Validation.empty(location) ||
            // Validation.empty(countryName)
            !selectedCountry ||
            !selectedPlace
        ) {
            return;
        }

        else {
            setShowErrors(false);
            data.countryName = selectedCountry.name
            data.location = selectedPlace
            API.apiPut("updateClientProfile", (data))
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
                        router.back();
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

    return (
        <>
            <Toaster />
            <Container>
                <div className={`d-flex justify-content-start align-items-center ${publishStyle.publishNav} py-4`}>
                    <span className='me-3' role='button'>
                        <IconArrowLeft onClick={() => router.push('/profile')} />
                    </span>
                    <span className={`${styles.editProfileHeading}`}>Edit Profile</span>
                </div>

                <div className={`${styles.imageContainer} d-flex justify-content-center align-items-center`}>
                    {/* <Image src="./images/Smith.png" className='img img-fluid' alt="profile image" /> */}
                    <div className={`d-flex justify-content-center my-4 `}>
                        <div className={`d-flex justify-content-center align-items-center ${styles.imageDiv}`}>
                            <div className={`${styles.editIcon1}`}>
                                <Image src='/images/editPencil.png' onClick={() => setimageCrop(true)} className={`img img-fluid ${styles.editIcon}`} />
                            </div>
                            {
                                selectedFile ?
                                    imageURls.map((imageSrc, i) =>
                                        <Image key={i}
                                            className={`w-100 ${styles.userProfile}`}
                                            src={imageSrc}
                                            alt="new"
                                        />
                                    )
                                    :
                                    <>
                                        <Image
                                            alt="user"
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
                                                        alt=""
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
                                className={`ps-4 ${styles.formInput}`}
                                value={fullName}
                                onChange={handleChange}
                                isInvalid={showErrors && !Validation.alphabets(fullName)}
                            />
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!fullName ? "Please enter full name" : "Digits and/or special characters are not allowed"}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group onChange={handleChange} isInvalid={showErrors && Validation.empty(gender)}>
                            <Form.Label className={`${styles.formLabel}`}>Gender</Form.Label>
                            <div>
                                <Form.Label htmlFor='male' className={`${styles.formLabel}`}>
                                    <input type="radio" className='me-2' id="male" name="gender" value="1" checked={(gender == "1") ? true : false} onChange={handleChange} />
                                    Male
                                </Form.Label>
                            </div>
                            <div>
                                <Form.Label htmlFor='female' className={`${styles.formLabel}`}>
                                    <input type="radio" className='me-2' id="female" name="gender" value="2" checked={(gender == "2") ? true : false} onChange={handleChange} />
                                    Female
                                </Form.Label>
                            </div>
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!gender && "Please select gender"}
                            </Form.Control.Feedback>
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
                                className={`ps-4 ${styles.formInput}`}
                                value={email}
                                onChange={handleChange}
                                isInvalid={showErrors && !Validation.email(email)}
                            />
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!email ? "Please enter email" : "Please enter valid email , e.g example@something.com"}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Label className={`${styles.formLabel}`}>Location</Form.Label>
                        <LoadScript
                            googleMapsApiKey="AIzaSyD9HAzCj-r9Zw8dZnQWkNgrkewOc4aRjGc"
                            libraries={["places"]} // Add "places" library
                        >
                            <StandaloneSearchBox
                                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                onUnmount={(auto) => (autocompleteRef.current = null)}
                                onPlacesChanged={handlePlaceChanged}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter a location"
                                    className={`px-4 ${styles.formInput} w-100 ${showErrors && !selectedPlace && publishStyle.borderDanger}`}
                                    value={selectedPlace} // Use 'selectedPlace' state instead of 'location' from 'data'
                                    name="location" // Set the name to "location" to update the 'selectedPlace' state
                                    onChange={handleChange} // Handle changes in the input field
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
                    </Col>
                </Row>
                <Row className={`my-3 px-4 d-flex justify-content-between`}>
                    <Col md={5}>
                        <Form.Group controlId="phone">
                            <Form.Label className={`${styles.formLabel}`}>Mobile Number</Form.Label>
                            <Form.Control
                                type='text'
                                name="mobileNo"
                                className={`ps-4 ${styles.formInput}`}
                                value={mobileNo}
                                onChange={handleChange}
                                isInvalid={showErrors && !Validation.number(mobileNo)}
                                maxLength={10}
                            />
                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                {!mobileNo ? "Please enter mobile no." : mobileNo.length < 10 ? "can't be less than 10 characters" : "Alphabets and/or special characters are not allowed"}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group controlId='countryName'>
                            <Form.Label className={`${styles.formLabel}`}>Country</Form.Label>
                            <Select
                                className={`${publishStyle.formInput} ps-3 py-1 ${showErrors && !selectedCountry && publishStyle.borderDanger}`}
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
                <div className={`text-end mt-4 pt-2 me-4 mb-3`}>
                    <button className={`${styles.saveButton} `} onClick={handlePut}>
                        Save Changes
                    </button>
                </div>
            </Container>
        </>
    )
}
