import React, { useEffect, useState } from "react";
import styles from "../../stylesheet/profile.module.scss";
import style from "../../stylesheet/dashboard.module.scss";
import {
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Button,
  Card,
} from "react-bootstrap";
import { FiChevronsLeft,FiChevronsRight } from "react-icons/fi";
import { LuFileText } from "react-icons/lu";


import { useDispatch, useSelector } from "react-redux";
import {
  getServicessDetails,
  getSkillsDetails,
  getUploadData,
} from "../../store/actions/profile";
import API from "../../helpers/api";
import { handleErrorMessage } from "../../utils/CommonFunctions";
import { Toaster, toast } from "react-hot-toast";
import Validation from "../../utils/Validation";
import { uploadFileToS3 } from "../../utils/S3";
import { v4 as uuidv4 } from "uuid";
import { BallTriangle } from "react-loader-spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skill from "./Skill";
import { useRouter } from "next/router";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Upload from "./Upload";
import ViewModal from "./ViewModal";

export default function Profile() {
  const router = useRouter();
  const [newSkills, setNewSkills] = useState(false);
  const [newServices, setNewServices] = useState(false);
  const [viewServices, setViewServices] = useState(false);
  const dispatch = useDispatch();
  const [profileList, skillsList, servicesList, uploadData] = useSelector(
    (Gstate) => [
      Gstate?.ProfileReducers?.profilelist,
      Gstate?.ProfileReducers?.skillsList,
      Gstate?.ProfileReducers?.servicesList,
      Gstate?.ProfileReducers?.uploadData,
    ]
  );

  const [userServices, setUserServices] = useState({
    serviceName: "",
    chargeType: "",
    serviceCharge: "",
    serviceDescription: "",
    serviceImage: [],
    serviceVideo: "",
  });
  const {
    serviceName,
    serviceCharge,
    chargeType,
    serviceDescription,
    serviceImage,
    serviceVideo,
  } = userServices;
  const [showErrors, setShowErrors] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [clickedIndex, setClickedIndex] = useState("");

  const [video, setVideo] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoLoader, setVideoLoader] = useState(false);

  const [selectedServiceImages, setSelectedServiceImages] = useState([
    "/images/uploadImageIcon.png",
    "/images/uploadImageIcon.png",
    "/images/uploadImageIcon.png",
  ]);
  const [apiImageUrl, setApiImageUrl] = useState([]);

  const [skillPage, setSkillPage] = useState(false);
  const [upload, setUpload] = useState(false);
  const [firstpg, setFirstPage] = useState(true);

  const handleUpload1 = () => {
    setUpload(true);
    setFirstPage(false);
  };

  const handleSkill = () => {
    setFirstPage(false);
    setSkillPage(true);
  };

  const handleBack = () => {
    setFirstPage(true);
    setSkillPage(false);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedImageIndex(null);
    setSelectedVideo(null);
    setSlideIndex(null);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getSkillsDetails());
  }, [skillsList?.length]);

  useEffect(() => {
    dispatch(getUploadData());
  }, [uploadData?.length]);

  useEffect(() => {
    dispatch(getServicessDetails());
  }, [servicesList?.length]);

  const handleServicesChange = (e) => {
    const { name, value } = e.target;

    setUserServices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServicesModal = () => {
    setNewServices(false);
    setShowErrors(false);
    setSelectedUser("");
    setUserServices({
      serviceName: "",
      chargeType: "",
      serviceCharge: "",
      serviceDescription: "",
    });
    setVideo("");
    setVideoUrl("");
    setSelectedServiceImages([
      "/images/uploadImage.png",
      "/images/uploadImage.png",
      "/images/uploadImage.png",
    ]);
    setApiImageUrl(["", "", ""]);
  };

  const handleServicesUpdate = () => {
    setShowErrors(true);

    if (
      !Validation.minOf(serviceDescription, 50, 500) ||
      !Validation.minAlphabets(serviceName, 3) ||
      !Validation.numberType(serviceCharge)
    ) {
      return;
    } else {
      setShowErrors(false);
      userServices.serviceImage = apiImageUrl;
      userServices.serviceVideo = videoUrl;
      API.apiPost("addServices", userServices)
        .then((response) => {
          if (response) {
            toast.success(response?.data?.response?.message?.successMessage, {
              position: "top-right",
              style: {
                borderBottom: "4px solid #33a34e",
                padding: "16px",
                color: "#3c5f4b",
                marginRight: "25px",
              },
            });
            setNewServices(false);
            setUserServices({
              serviceName: "",
              chargeType: "",
              serviceCharge: "",
              serviceDescription: "",
              serviceVideo: "",
              serviceImage: ["", "", ""],
            });
            dispatch(getServicessDetails());
            setVideoUrl("");
            setSelectedServiceImages([
              "/images/uploadImage.png",
              "/images/uploadImage.png",
              "/images/uploadImage.png",
            ]);
          }
        })
        .catch((err) => {
          handleErrorMessage(err);
        });
    }
  };

  const handleViewServices = (item) => {
    setSelectedUser(item);
    setViewServices(true);
  };

  const handleViewServicesModal = () => {
    setViewServices(false);
    setSelectedUser("");
  };

  const handleVideoSubmit = (e) => {
    setVideo(e.target.files[0]);
  };

  useEffect(() => {
    video && handleSubmit();
  }, [video.length]);

  const handleSubmit = async (e) => {
    const uniqueFileName = `${uuidv4()}`;

    if (video) {
      try {
        setVideoLoader(true);
        const videoUrl1 = await uploadFileToS3(
          video,
          `${uniqueFileName}_${video.name}`
        );

        setVideoUrl(videoUrl1);
        setVideoLoader(false);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleVideoChange = () => {
    setVideoUrl("");
    setVideo("");
  };

  const handleServiceImage = (event, index) => {
    const updatedFiles = [...selectedServiceImages];
    const change = event.target.files[0];
    if (change) {
      setClickedIndex(index);
      updatedFiles[index] = event.target.files[0];
      setSelectedServiceImages(updatedFiles);
    }
  };

  const handleUpload = async (index) => {
    const selectedFile = selectedServiceImages[index];

    if (!selectedFile) {
      // alert('Please select a file');
      return;
    }

    const uniqueFileName = `${uuidv4()}`;

    try {
      const res = await uploadFileToS3(
        selectedFile,
        `${uniqueFileName}_${selectedFile.name}`,
        selectedFile.type
      );

      setSelectedServiceImages((prevUrls) => {
        const updatedUrls = [...prevUrls];
        updatedUrls[index] = res;
        return updatedUrls;
      });

      setApiImageUrl((prev) => {
        const updatedApiUrl = [...prev];
        updatedApiUrl[index] = res;
        return updatedApiUrl;
      });
    } catch (err) {
      handleErrorMessage(err)
    }
  };

  useEffect(() => {
    handleUpload(clickedIndex);
  }, [clickedIndex]);

  const settings = {
    centerMode: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.6,
    slidesToScroll: 1,
    arrow: false,
    prevArrow: <FiChevronsLeft color="grey" />,
    nextArrow: <FiChevronsRight color="grey" />,
    // afterChange: current => setSlideNumber(current)
  };

  const settingsVideo = {
    centerMode: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
    prevArrow: <FiChevronsLeft color="grey" />,
    nextArrow: <FiChevronsRight color="grey" />,
    // afterChange: current => setSlideNumber(current)
  };

  let slider;

  const slides = servicesList?.map((item) => item?.serviceImage);

  const [uploadVideo, setUploadVideo] = useState(null);
  const [profileUrl1, setProfileUrl1] = useState(null);
  const [images, setImages] = useState([]);

  const handleVideoSelection = async (event) => {
    const Vfile = event.target.files[0];

    if (Vfile) {
      if (isValidVideoFile(Vfile)) {
        const uniqueFileName = `${uuidv4()}`;
        try {
          const urlV = await uploadFileToS3(
            Vfile,
            `${uniqueFileName}_${Vfile.name}`
          );
          setUploadVideo(urlV);
          handleUpload1();
        } catch (error) {
          console.log("error uploading file", error);
        }
      } else {
        toast.error("Please select a valid video file.", {
          position: "top-right",
          style: {
            borderBottom: "4px solid #33a34e",
            padding: "16px",
            color: "#3c5f4b",
            marginRight: "25px",
          },
        });
        event.target.value = null;
      }
    }
  };

  const isValidVideoFile = (file) => {
    const validVideoTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      ".mp4",
      ".webm",
      ".ogg",
    ];

    return (
      validVideoTypes.includes(file.type) ||
      validVideoTypes.some((ext) => file.name.endsWith(ext))
    );
  };

  const handleImageSelection1 = async (event) => {
    const file = event.target.files[0];

    if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
      setImages([...event?.target?.files]);
      const uniqueFileName = `${uuidv4()}`;
      try {
        const url1 = await uploadFileToS3(
          file,
          `${uniqueFileName}_${file.name}`
        );
        setProfileUrl1(url1);
        handleUpload1();
      } catch (error) {
        console.log("error uploading file", error);
      }
    } else {
      toast.error("Please select a valid image file (PNG, JPG, JPEG).", {
        position: "top-right",
        style: {
          borderBottom: "4px solid #33a34e",
          padding: "16px",
          color: "#3c5f4b",
          marginRight: "25px",
        },
      });
    }
  };

  const settings1 = {
    // dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: Math.min(3, uploadData?.photos?.length || 2),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // beforeChange: (current, next) => {
    //   setSelectedVideoIndex(next);
    // },
  };
  const videoSliderSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [slideIndex, setSlideIndex] = useState(null);

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setSlideIndex(index);
    handleShow();
  };
  const handleVideoClick = (index) => {
    setSelectedVideo(index);
    setSlideIndex(index);
    handleShow();
  };
  return (
    <>
      <Toaster />

      {/* <==========================Add new services starts============================> */}

      <Modal
        centered
        show={newServices}
        onHide={handleServicesModal}
        backdrop="static"
        dialogClassName={`${styles.servicesModalOuter}`}
        contentClassName={`${styles.profileModalContent} p-3`}
      >
        <Modal.Header closeButton style={{ border: "0" }}>
          <Modal.Title closeButton className={`${styles.addSkillsTitle}`}>
            Add new Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-between d-flex">
              <Col md={6}>
                <p className={`${styles.servicesFirstLine}`}>
                  Job description Complete your profile. Set your profile
                  completely.
                </p>

                <Form.Group controlId="service-name" className={`mt-3 mb-4`}>
                  <Form.Label className={`${styles.skillsLabel}`}>
                    Service Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="serviceName"
                    placeholder="eg. Song Production"
                    className={`${styles.skillsFormInput} py-3 px-4`}
                    value={serviceName}
                    onChange={handleServicesChange}
                    maxLength={50}
                    isInvalid={
                      showErrors && !Validation.minAlphabets(serviceName, 3)
                    }
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="errorMessage"
                  >
                    {!serviceName
                      ? "Please enter service name"
                      : /[^A-Za-z]/.test(serviceName)
                        ? "Digits and special characters are not allowed"
                        : serviceName.length < 3
                          ? "Service name can't be less than 3 characters"
                          : ""}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="service-description" className={`my-4`}>
                  <Form.Label className={`${styles.skillsLabel}`}>
                    Service Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="5"
                    name="serviceDescription"
                    placeholder="Type here...."
                    className={`${styles.skillsFormInput} py-3 px-4`}
                    value={serviceDescription}
                    onChange={handleServicesChange}
                    maxLength="500"
                    isInvalid={
                      showErrors &&
                      !Validation.minOf(serviceDescription, 50, 500)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {!serviceDescription
                      ? "Please enter service description"
                      : serviceDescription?.length < 50 &&
                      "Services description can't be less than 50 words "}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="project-type" className="mb-3">
                  <Form.Label className={`${styles.skillsLabel}`}>
                    Service Type
                  </Form.Label>
                  <Form.Select
                    className={`${styles.skillsFormInput} ${styles.skillsFormInput1} py-3 px-4`}
                    name="chargeType"
                    value={chargeType}
                    onChange={handleServicesChange}
                  // isInvalid={showErrors && Validation.empty(chargeType)}
                  >
                    <option hidden className="text-muted">
                      Select
                    </option>
                    <option value="1" className={`${styles.chargeOption}`}>
                      Hourly
                    </option>
                    <option value="2" className={`${styles.chargeOption}`}>
                      Fixed
                    </option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="service-charges">
                  <Form.Label className={`${styles.skillsLabel}`}>
                    Service Charge
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="serviceCharge"
                    placeholder="eg. $550"
                    className={`${styles.skillsFormInput} py-3 px-4`}
                    value={serviceCharge}
                    onChange={handleServicesChange}
                    maxLength={4}
                    isInvalid={
                      showErrors && !Validation.numberType(serviceCharge)
                    }
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="errorMessage"
                  >
                    {!serviceCharge
                      ? "Please enter service charge"
                      : serviceCharge == 0
                        ? "Service charge can't be zero"
                        : "Alphabets and special characters are not allowed"}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={5}>
                <p className={`${styles.servicesPortfolioTitle}`}>
                  Add Portfolio of your service
                </p>
                <p className={`${styles.servicesFirstLine}`}>
                  Add Portfolio that matches with your work.
                </p>
                <p className={`${styles.skillsLabel}`}>Add Video</p>
                {!videoLoader && !videoUrl ? (
                  <Form.Group>
                    <Form.Label htmlFor="videoFile">
                      <div>
                        <Image
                          src="/images/videoUploader.png"
                          alt="video uploader"
                          className="img img-fluid"
                          role="button"
                        />
                      </div>
                      <input
                        id="videoFile"
                        className="d-none"
                        type="file"
                        name="video"
                        accept="video/*"
                        onChange={handleVideoSubmit}
                      />
                    </Form.Label>
                  </Form.Group>
                ) : videoLoader ? (
                  <BallTriangle
                    height={70}
                    width={80}
                    radius={5}
                    color="#0E184D"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={true}
                  />
                ) : (
                  <div
                    className={`${styles.videoDiv} d-flex justify-content-center align-items-center py-4 position-relative`}
                  >
                    <LuFileText
                      size={17}
                      className={`${styles.iconCross}`}
                      onClick={handleVideoChange}
                    />
                    <video
                      width="305"
                      height="240"
                      controls
                      className={`${styles.video}`}
                    >
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  </div>
                )}
                <p className={`${styles.skillsLabel} mt-4`}>Add Photos</p>

                <div
                  className={`d-flex justify-content-between align-items-center ${styles.videoDiv}`}
                >
                  {selectedServiceImages.map((file, index) => (
                    <div
                      key={index}
                      className={`${styles.uploadImageDiv} m-2 d-flex align-items-center justify-content-center`}
                    >
                      <Form.Group>
                        <Form.Label htmlFor={`service-image${index}`}>
                          <div
                            className={`${file === "/images/uploadImageIcon.png"
                              ? "text-center"
                              : ""
                              } text-center `}
                          >
                            <Image
                              src={file}
                              className={`img img-fluid ${file !== "/images/uploadImageIcon.png"
                                ? styles.addServiceImage
                                : ""
                                }`}
                              alt="add photos"
                            />
                            <p
                              className={`${styles.clickHere} text-center ${file != "/images/uploadImageIcon.png"
                                ? "d-none"
                                : "my-0"
                                }`}
                            >
                              Click Here
                            </p>
                          </div>
                          <input
                            id={`service-image${index}`}
                            className="d-none"
                            type="file"
                            name="video[]"
                            accept="image/*"
                            onChange={(e) => handleServiceImage(e, index)}
                          />
                        </Form.Label>
                      </Form.Group>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <div className="text-end my-3">
              <button
                className={`${styles.skillsAddButton}`}
                onClick={handleServicesUpdate}
              >
                Add Service
              </button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>

      {/*<================================View Services Modal====================================>  */}

      <Modal
        centered
        show={viewServices}
        onHide={handleViewServicesModal}
        backdrop="static"
        dialogClassName={`${styles.servicesModalOuter}`}
        contentClassName={`${styles.profileModalContent} p-3`}
      >
        <Modal.Header closeButton style={{ border: "0" }}>
          <Modal.Title className={`${styles.addSkillsTitle}`}>
            My Service
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {selectedUser && (
              <Row className="justify-content-between d-flex">
                <Col md={6}>
                  <p className={`${styles.servicesFirstLine}`}>
                    Job description Complete your profile. Set your profile
                    completely.
                  </p>
                  <Form.Group controlId="serviceName" className={`mt-3 mb-4`}>
                    <Form.Label className={`${styles.skillsLabel}`}>
                      Service Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="serviceName"
                      placeholder="eg. Song Production"
                      className={`${styles.skillsFormInput} text-dark py-3 px-4`}
                      value={selectedUser?.serviceName}
                      readOnly
                    // onChange={handleServicesChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="serviceDescription" className={`my-4`}>
                    <Form.Label className={`${styles.skillsLabel}`}>
                      Service Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="7"
                      name="serviceDescription"
                      placeholder="Type here...."
                      className={`${styles.skillsFormInput} text-dark py-3 px-4`}
                      value={selectedUser.serviceDescription}
                      readOnly
                    // onChange={handleServicesChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="chargeType" className={`mt-3 mb-4`}>
                    <Form.Label className={`${styles.skillsLabel}`}>
                      Service Type
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="chargeType"
                      placeholder="eg. Song Production"
                      className={`${styles.skillsFormInput} text-dark py-3 px-4`}
                      value={selectedUser.chargeType == 1 ? "Hourly" : "Fixed"}
                      readOnly
                    // onChange={handleServicesChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="serviceCharge" className={`mt-3 mb-4`}>
                    <Form.Label className={`${styles.skillsLabel}`}>
                      Service Charge
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="serviceCharge"
                      placeholder="eg. Song Production"
                      className={`${styles.skillsFormInput} text-dark py-3 px-4`}
                      value={selectedUser.serviceCharge}
                      readOnly
                    // onChange={handleServicesChange}
                    />
                  </Form.Group>
                  {/* <p className={`${styles.servicesPortfolioTitle}`}>Add Portfolio of your service</p>
                <p className={`${styles.servicesFirstLine}`}>Add Portfolio that matches with your work.</p> */}
                </Col>
                <Col md={5}>
                  <p className={`${styles.servicesPortfolioTitle}`}>
                    Add Portfolio of your service
                  </p>
                  <p className={`${styles.servicesFirstLine}`}>
                    Add Portfolio that matches with your work.
                  </p>
                  <p className={`${styles.skillsLabel}`}>Video</p>
                  <div
                    className={`${styles.videoDiv} d-flex justify-content-center align-items-center py-4`}
                  >
                    <video
                      width="305"
                      height="160"
                      controls
                      className={`${styles.video}`}
                    >
                      <source
                        src={selectedUser.serviceVideo}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <div className={`${styles.videoDiv}`}></div>
                  <p className={`${styles.skillsLabel} my-3`}>Photos</p>
                  {/* <Image src='/images/portfolioGroup.png' className='img img-fluid px-4 py-3' /> */}
                  <div
                    className={`${styles.videoDiv} d-flex ${selectedUser?.serviceImage?.length > 2
                      ? "justify-content-between"
                      : "justify-content-around"
                      } align-items-center flex-wrap `}
                  >
                    {selectedUser?.serviceImage?.map((item, index) => (
                      <Image
                        key={index}
                        src={item}
                        className={`img img-fluid ${styles.viewServicesImage
                          } my-2 ${index > 2 ? styles.imgWidth : ""}`}
                        alt="images"
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            )}
          </Container>
        </Modal.Body>
      </Modal>

      {/* <=======================================Profile========================================> */}
      {firstpg ? (
        <>
          <div className={`${styles.profileTitle}`}>Profile</div>
          <div className={`${styles.profileCard} p-4 my-3`}>
            <Row className={`justify-content-between row-reverse`}>
              <Col md={9}>
                <Row className="d-flex justify-content-start align-items-center ps-3">
                  <Col md={3}>
                    <div className={`${styles.imageDiv}`}>
                      {/* <Image src="/images/Smith.png" className='img img-fluid' /> */}

                      <div className={`${styles.imageDiv} `}>
                        <Image
                          alt="user"
                          src={
                            profileList?.profileImage
                              ? profileList?.profileImage
                              : "/images/dummyImage.png"
                          }
                          className={`${styles.userProfile} img img-fluid`}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <p className={`${styles.personName}`}>
                        {profileList?.fullName}
                      </p>
                      <div className="d-flex align-items-center my-3">
                        <Image
                          src="/images/gender.png"
                          alt="gender"
                          className="img img-fluid"
                          style={{
                            marginRight:"2px"
                          }}
                        />
                        <span className={`ms-3 ${styles.personDetails}`}>
                          {profileList?.gender && profileList?.gender === 1
                            ? "Male"
                            : "Female"}
                        </span>
                      </div>
                      <div className="d-flex align-items-center my-3">
                        <Image
                          src="/images/phone.png"
                          className="img img-fluid"
                          alt="phone"
                        />
                        <span className={`ms-3 ${styles.personDetails}`}>
                          {profileList?.mobileNo}
                        </span>
                      </div>
                      <div className="d-flex align-items-center my-3">
                        {/* <IconMail size={18} color="grey" /> */}
                        <Image
                            src="/images/mail.png"
                            className="img img-fluid"
                            alt="location"
                          />
                        <span className={`ms-3 ${styles.personDetails}`}>
                          {profileList?.email}
                        </span>
                      </div>
                      {profileList?.location && (
                        <div className="d-flex align-items-center my-3">
                          <Image
                            src="/images/location.png"
                            className="img img-fluid"
                            alt="location"
                          />
                          <span className={`ms-3 ${styles.personDetails}`}>
                            {profileList?.location}
                            {`${profileList?.countryName && !profileList?.location.endsWith(profileList?.countryName) ?
                              `, ${profileList?.countryName}`
                              :
                              ""} `}
                          </span>
                        </div>
                      )}
                      {profileList?.bio && (
                        <div className="d-flex align-items-center my-3">
                          <Image
                            src="/images/bio.png"
                            className="img img-fluid"
                            alt="bio"
                          />
                          <span className={`ms-3 ${styles.personDetails}`}>
                            {profileList?.bio}
                          </span>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col sm={2} md={3} lg={2}>
                <div
                  className={`${styles.editProfile} px-2 py-2 d-flex justify-content-center align-items-center`}
                  onClick={() => router.push(`/profile/update-profile`)}
                >
                  Edit Profile
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col md={5}>
              <div className={`${styles.profileCard} p-4 my-3`}>
                <p className={`${styles.subCardTitle}`}>Portfolio</p>
                {/* Video */}
                <div className="d-flex justify-content-between">
                  <p className={`${styles.subCardTitle}  pt-1`}>Add Video</p>
                  <div
                    className="d-flex justify-content-center align-items-center mb-3"
                    role="button"
                    onClick={() =>
                      document.getElementById("videoInput").click()
                    }
                  >
                    <Image src="/images/plus.png" className="img img-fluid" alt="add" />
                    <span className={`${styles.addNewSkills} ms-2`}>
                      Add More
                    </span>
                  </div>
                </div>

                <div className="px-4 text-center">
                  {Array.isArray(uploadData?.videos) &&
                    uploadData?.videos?.length > 0 ? (
                    <Slider {...videoSliderSettings}>
                      {uploadData?.videos?.map((item, index) => (
                        <div
                          key={index}
                          className="px-2 cursor-pointer"
                          onClick={() => handleVideoClick(index)}
                          role="button"
                        >
                          <video
                            src={item.video}
                            controls
                            className={`${styles.videoImg}`}
                          ></video>
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <>
                      <Image
                        src="images/videoNew.png"
                        alt="video upload"
                        className={`${styles.videoImg} img img-fluid cursor-pointer`}
                        onClick={() =>
                          document.getElementById("videoInput").click()
                        }
                      />
                    </>
                  )}
                </div>

                <input
                  type="file"
                  id="videoInput"
                  style={{ display: "none" }}
                  accept="video"
                  onChange={(e) => handleVideoSelection(e)}
                />

                <div className={`${styles.videoDiv}`}>
                  <Slider
                    className={``}
                    ref={(sli) => (slider = sli)}
                    {...settingsVideo}
                  >
                    {servicesList?.map((item, id) => (
                      <video
                        width="305"
                        height="240"
                        controls
                        className={`${styles.video} border border-light border-5`}
                      >
                        <source
                          src={item.serviceVideo}
                          className={`${item?.serviceVideo ? "" : "d-none"}`}
                          type="video/mp4"
                        />
                      </video>
                    ))}
                  </Slider>
                </div>

                {/* photo */}
                <div className="d-flex justify-content-between mt-2">
                  <p className={`${styles.subCardTitle} pt-1`}>Add Photos</p>
                  <div
                    className="d-flex justify-content-center align-items-center mb-3"
                    role="button"
                    onClick={() =>
                      document.getElementById("adharInput").click()
                    }
                  >
                    <Image src="/images/plus.png" className="img img-fluid" alt="add" />
                    <span className={`${styles.addNewSkills} ms-2`}>
                      Add More
                    </span>
                  </div>
                </div>

                <div className="px-4 text-center">
                  {Array.isArray(uploadData?.photos) &&
                    uploadData?.photos?.length > 0 ? (
                    <Slider {...settings1}>
                      {uploadData?.photos?.map((item, index) => (
                        <div
                          key={index}
                          className="px-2 cursor-pointer"
                          onClick={() => handleImageClick(index)}
                          role="button"
                        >
                          <Image
                            src={item.photos}
                            alt={item.description}
                            className={`${styles.uploadImg}`}
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <>
                      <Image
                        src="images/imgUpload.png"
                        alt="upload"
                        className="img img-fluid cursor-pointer"
                        onClick={() =>
                          document.getElementById("adharInput").click()
                        }
                      />
                      <Image
                        src="images/imgUpload.png"
                        alt="upload"
                        className="img img-fluid cursor-pointer"
                        onClick={() =>
                          document.getElementById("adharInput").click()
                        }
                      />
                    </>
                  )}

                  <input
                    type="file"
                    id="adharInput"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageSelection1(e)}
                    multiple
                  />
                </div>

                <div>
                  <Slider
                    className={``}
                    ref={(sli) => (slider = sli)}
                    {...settings}
                  >
                    {slides.flat().map((slide, index) => (
                      <Container key={index} className={` py-3`}>
                        <Row>
                          <Image
                            src={slide}
                            alt="slide"
                            className={`img img-fluid ${styles.sliderImage}`}
                          />
                        </Row>
                      </Container>
                    ))}
                  </Slider>
                </div>
              </div>
            </Col>
            <Col md={7}>
              <div className={`${styles.profileCard} p-4 mt-3 mb-4`}>
                <div className="d-flex justify-content-between align-items-center">
                  <p className={`${styles.subCardTitle}`}>Skills</p>
                  <div
                    className="d-flex justify-content-center align-items-center mb-3"
                    role="button"
                    onClick={handleSkill}
                  >
                    <Image src="/images/plus.png" className="img img-fluid" alt="add" />
                    <span className={`${styles.addNewSkills} ms-2`}>
                      Add new skills
                    </span>
                  </div>
                </div>
                <div
                  className={`${styles.skillsInnerDiv} py-3 px-3 d-flex ${skillsList?.length
                    ? "justify-content-start"
                    : "justify-content-center"
                    } align-items-center flex-wrap`}
                >
                  {skillsList?.length ? (
                    skillsList?.map((item, id) => (
                      <span key={id} className={`px-2 py-1 mx-1 my-2`}>
                        {item}
                      </span>
                    ))
                  ) : (
                    <>
                      <p className="mb-0">No skills !</p>
                    </>
                  )}
                </div>
              </div>
              <div className={` p-4 ${styles.profileCard} ${styles.marginTop}`}>
                <div
                  className={`d-flex justify-content-between align-items-center ${styles.servicesNav}`}
                >
                  <p className={`${styles.subCardTitle}`}>Services</p>
                  <div
                    className="d-flex justify-content-center align-items-center mb-3"
                    role="button"
                    onClick={() => setNewServices(!newServices)}
                  >
                    <Image src="/images/plus.png" className="img img-fluid" alt="add" />
                    <span className={`${styles.addNewSkills} ms-2`}>
                      Add new services
                    </span>
                  </div>
                </div>

                <div className="">
                  {servicesList?.length ? (
                    servicesList?.map((item, id) => (
                      <Row
                        key={id}
                        className={`${id % 2 == 0 ? styles.oddServices : styles.evenServices
                          } d-flex justify-content-between align-items-center px-4 py-3 my-3`}
                        onClick={() => handleViewServices(item)}
                      >
                        <Col md={2} className="me-2">
                          <Image
                            src={
                              item?.serviceImage
                                ? item?.serviceImage[0]
                                : "/images/services.png"
                            }
                            alt="service image"
                            className={`img img-fluid ${styles.servicesImageBox}`}
                          />
                        </Col>
                        <Col>
                          <p
                            className={`${styles.servicesTitle} my-2 text-wrap`}
                          >
                            {item?.serviceName}
                          </p>
                          <p
                            className={`${styles.servicesDetails} my-1 text-break`}
                          >
                            {item?.serviceDescription.length > 150
                              ? item.serviceDescription.substr(0, 120)
                              : item?.serviceDescription}
                          </p>
                          <div className="d-flex justify-content-between align-items-center my-2">
                            <div>
                              <span className={`${styles.servicesRates} me-1`}>
                                {item?.chargeType == 1 ? "Hourly" : "Fixed"}
                              </span>
                              <span
                                className={`${styles.servicesRates} border-start border-1 ps-1 border-secondary`}
                              >
                                {item?.serviceCharge}
                              </span>
                            </div>
                            <div className={`${styles.servicesViewMore}`}>
                              View more
                            </div>
                          </div>
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <div className={`${styles.skillsInnerDiv} py-3 px-3`}>
                      <p className="text-center my-0">No services !</p>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : skillPage ? (
        <Skill
          style={style}
          styles={styles}
          newSkills={newSkills}
          skillsList={skillsList}
          handleBack={handleBack}
          setSkillPage={setSkillPage}
          setNewSkills={setNewSkills}
        />
      ) : upload ? (
        <>
          <Upload
            profileUrl1={profileUrl1}
            uploadVideo={uploadVideo}
            handleBack={handleBack}
            getUploadData={getUploadData}
          />
        </>
      ) : (
        ""
      )}

      {selectedImageIndex !== null || selectedVideo !== null ? (
        <ViewModal
          show={show}
          handleClose={handleClose}
          uploadData={uploadData}
          slideIndex={slideIndex}
          selectedImageIndex={
            selectedImageIndex !== null
              ? uploadData?.photos[selectedImageIndex]
              : null
          }
          selectedVideo={
            selectedVideo !== null ? uploadData?.videos[selectedVideo] : null
          }
        />
      ) : null}
    </>
  );
}
