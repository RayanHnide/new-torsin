import React, { useState, useEffect } from "react";
import styles from "../../stylesheet/profile.module.scss";
import style from "../../stylesheet/dashboard.module.scss";

import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Image,
} from "react-bootstrap";
import API from "../../helpers/api";
import { Toaster, toast } from "react-hot-toast";
import { handleErrorMessage } from "../../utils/CommonFunctions";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getSearchUser } from "../../store/actions/profile";
import { MdArrowBackIos } from "react-icons/md";

export default function Upload({
  uploadVideo,
  profileUrl1,
  handleBack,
  getUploadData,
}) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [des, setDes] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [showErrors1, setShowErrors1] = useState(false);
  const [searchUser] = useSelector((Gstate) => [
    Gstate?.ProfileReducers?.searchUser,
  ]);

  useEffect(() => {
    const fetchOptions = () => {
      dispatch(getSearchUser(inputValue));

      if (Array.isArray(searchUser)) {
        const filteredOptions =
          inputValue.trim() !== ""
            ? searchUser.filter(
                (user) =>
                  user.fullName
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) &&
                  !selectedOptions.some((selected) => selected.id === user.id)
              )
            : [];

        setOptions(filteredOptions);
      }
    };

    if (inputValue.trim() !== "") {
      fetchOptions();
    } else {
      setOptions([]);
    }
  }, [inputValue, selectedOptions, searchUser?.length]);

  const handleAddSkillByEnter = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const enteredSkill = inputValue.toLowerCase().trim();
      const isSkillInSkillsList = fullName.includes(enteredSkill.toLowerCase());
      const isSkillInSelectedOptions = selectedOptions.some(
        (option) => option.fullName.toLowerCase() === enteredSkill.toLowerCase()
      );

      if (isSkillInSkillsList || isSkillInSelectedOptions) {
        setShowErrors1(true);
        return;
      } else {
        setShowErrors1(false);
        setSelectedOptions((prevSelected) => [
          ...prevSelected,
          {
            fullName: enteredSkill,
          },
        ]);
        setInputValue("");
      }
    }
  };

  const handleOptionSelect = (option) => {
    if (!searchUser.includes(option.fullName)) {
      const name = searchUser.length + selectedOptions.length;
      if (name < 100) {
        setSelectedOptions((prevSelected) => [...prevSelected, option]);
        setInputValue("");
      }
    }
  };

  const removeSelectedOption = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.filter(
        (selectedOption) => selectedOption.fullName !== option.fullName
      )
    );
    setInputValue((prevInputValue) => {
      const updatedValue = prevInputValue
        .split(", ")
        .filter((skill) => skill !== option.fullName)
        .join(", ");

      return updatedValue;
    });
  };
  const handleUpload = () => {
    const buildDataObject = () => {
      const tagId = selectedOptions?.map((option) => option.id) || [];
      const dataObject = {
        description: des,
      };
      if (tagId.length > 0) {
        dataObject.id = tagId;
      }
      return dataObject;
    };

    const data = profileUrl1
      ? { ...buildDataObject(), photos: profileUrl1 }
      : { ...buildDataObject(), videos: uploadVideo };
    API.apiPost("uploadData", data)
      .then((res) => {
        handleBack();
        dispatch(getUploadData());

        if (res) {
          toast.success(res?.data?.response?.message?.successMessage, {
            position: "top-right",
            style: {
              borderBottom: "4px solid #33a34e",
              padding: "16px",
              color: "#3c5f4b",
              marginRight: "25px",
            },
          });
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  };

  return (
    <div>
      <Toaster />
      <div>
        <h6
          className={`${styles.profileTitle} cursor-pointer d-flex align-items-center`}
          onClick={handleBack}
          role="button"
        >
          {" "}
          <MdArrowBackIos />
          Profile
        </h6>
      </div>
      <Container className={`${styles.outerBox} p-4`}>
        <h4 className={`${styles.subCardTitle}`}>Portfolio</h4>
        <h6 className={`${styles.skillsLabel} mt-3`}>
          {profileUrl1 ? "Add Photo" : "Add Video"}
        </h6>
        <div align="center">
          {profileUrl1 ? (
            <Image src={profileUrl1} className={`${styles.uploadWidth}`} alt="profile" />
          ) : (
            <video
              width="305"
              height="240"
              controls
              className={`${styles.uploadWidth} border border-light border-5`}
            >
              <source
                src={uploadVideo}
                className={`${uploadVideo ? "" : "d-none"}`}
                type="video/mp4"
              />
            </video>
          )}
        </div>

        <div>
          <FormLabel className={`${styles.skillsLabel} mt-3`}>
            Tag people
          </FormLabel>
          <FormControl
            type="text"
            placeholder="eg. John smith"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddSkillByEnter}
          />
          {inputValue?.length >= 1 && (
            <Image
              src="images/removeSkill.png"
              className={`img img-fluid ${
                !(showErrors || showErrors1)
                  ? styles.crossImage
                  : styles.crossImage1
              }`}
              alt="remove"
              role="button"
              onClick={() => {
                setInputValue("");
                setShowErrors1(false);
                setShowErrors(true);
              }}
            />
          )}
          {inputValue && (
            <div
              className={`${
                Array.isArray(options) && options.length && styles.optionsOuter
              } mb-3 mt-3 ${styles.search}`}
            >
              {Array.isArray(options) &&
                options?.map((option, index) => (
                  <>
                    <div
                      key={option.id}
                      className={`py-2 px-3 ${styles.optionsMenu} d-flex align-items-center`}
                      onClick={() => handleOptionSelect(option)}
                      style={{
                        cursor: searchUser.includes(option.fullName)
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      <Image
                        src={
                          option.profileImage
                            ? option.profileImage
                            : "images/dummyImage.png"
                        }
                        alt="profile image"
                        className={`${styles.searchImg} me-2`}
                      />
                      {option.fullName}
                    </div>
                    {index !== options.length - 1 && (
                      <hr className={`${style.hr} m-0`} />
                    )}
                  </>
                ))}
            </div>
          )}
        </div>

        <div
          className={`d-flex flex-wrap align-items-center ${
            styles.skillsFormInput
          } p-2 ${!selectedOptions?.length && "d-none"}`}
        >
          {selectedOptions?.map((option) => (
            <div
              className={`${styles.addSkillOuter} d-flex justify-content-between align-items-center py-1 px-3 me-2 my-2`}
              key={option.id}
            >
              <span className={`me-2 ${styles.skills} my-0 py-0`}>
                <Image
                  src={
                    option.profileImage
                      ? option.profileImage
                      : "images/dummyImage.png"
                  }
                  alt="profile image"
                  className={`${styles.searchImg} me-2`}
                />
                {option.fullName}
              </span>
              <span>
                <Image
                  src="./images/removeSkill.png"
                  className="img img-fluid"
                  role="button"
                  alt="remove"
                  onClick={() => removeSelectedOption(option)}
                />
              </span>
            </div>
          ))}
        </div>
        <FormLabel className={`${styles.skillsLabel} mt-3`}>
          Description
        </FormLabel>
        <FormControl
          type="text"
          as="textarea"
          row={5}
          placeholder="Please enter here..."
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />
      </Container>
      <div className="text-end my-4">
        <Button className={`${styles.uploadBtn} p-3`} onClick={handleUpload}>
          {profileUrl1 ? "Add Photo" : "Add Video"}
        </Button>
      </div>
    </div>
  );
}
