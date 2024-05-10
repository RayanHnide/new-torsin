import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Image } from "react-bootstrap";
 import { FiChevronsLeft} from "react-icons/fi";

import {
  getAdminServices,
  getSkillsDetails,
} from "../../store/actions/profile";
import API from "../../helpers/api";
import { handleErrorMessage } from "../../utils/CommonFunctions";
import { toast } from "react-hot-toast";

const Skill = ({
  setSkillPage,
  style,
  styles,
  setNewSkills,
  newSkills,
  skillsList,
  handleBack
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [showErrors1, setShowErrors1] = useState(false);

  const [adminServices] = useSelector((Gstate) => [
    Gstate?.ProfileReducers?.adminServices,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Function to fetch options from API based on the input value
    const fetchOptions = () => {
      dispatch(getAdminServices(inputValue));

      if (Array.isArray(adminServices)) {
        const filteredOptions =
          inputValue.trim() !== ""
            ? adminServices.filter(
              (service) =>
                service.serviceName
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()) &&
                !selectedOptions.some(
                  (selected) => selected.id === service.id
                )
            )
            : [];

        setOptions(filteredOptions);
      }
    };

    // Fetch options when inputValue changes
    if (inputValue.trim() !== "") {
      fetchOptions();
    } else {
      setOptions([]); // Clear options when inputValue is empty
    }
  }, [inputValue, selectedOptions, adminServices?.length]);

  const handleOptionSelect = (option) => {
    if (!skillsList.includes(option.serviceName)) {
      const totalSkills = skillsList.length + selectedOptions.length;
      if (totalSkills < 10) {
        setSelectedOptions((prevSelected) => [...prevSelected, option]);
        setInputValue("");
      }
    }
  };

  // Function to remove a selected option
  const removeSelectedOption = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.filter(
        (selectedOption) => selectedOption.serviceName !== option.serviceName
      )
    );
    setInputValue((prevInputValue) => {
      const updatedValue = prevInputValue
        .split(", ")
        .filter((skill) => skill !== option.serviceName)
        .join(", ");

      return updatedValue;
    });
  };

  const handleAddSkillByEnter = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const enteredSkill = inputValue.toLowerCase().trim();
      const isSkillInSkillsList = skillsList.includes(
        enteredSkill.toLowerCase()
      );
      const isSkillInSelectedOptions = selectedOptions.some(
        (option) =>
          option.serviceName.toLowerCase() === enteredSkill.toLowerCase()
      );

      if (isSkillInSkillsList || isSkillInSelectedOptions) {
        setShowErrors1(true);
        return;
      } else {
        setShowErrors1(false);
        setSelectedOptions((prevSelected) => [
          ...prevSelected,
          {
            serviceName: enteredSkill,
          },
        ]);
        setInputValue(""); // Clear the input box after adding the skill
      }
    }
  };

  useEffect(() => {
    const updatedSkills = selectedOptions?.map((option) =>
      option.id !== undefined ? option.id.toString() : option.serviceName
    );
    setNewSkills(updatedSkills);
  }, [selectedOptions]);

  const handleAddSkill = () => {
    setShowErrors(true);
    if (!selectedOptions.length) {
      return;
    } else if (newSkills?.length + skillsList?.length > 10) {
      toast.error(
        `You've already added ${skillsList?.length
        } skills out of 10 skills , now you can add ${10 - skillsList?.length
        } more skills`,
        {
          position: "top-right",
          style: {
            borderBottom: "4px solid #dc3545",
            padding: "16px",
            color: "#3c5f4b",
            marginRight: "25px",
          },
        }
      );
      return;
    } else {
      setShowErrors(false);
      API.apiPost("addSkills", {
        skillArray: newSkills,
      })
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
            dispatch(getSkillsDetails());
            setTimeout(() => {
              handleBack()
            }, 500);
          }
        })
        .catch((err) => {
          handleErrorMessage(err);
        });
    }
  };

  return (
    <>
      <div
        className={`d-flex justify-content-start align-items-center pt-4 mb-2 ${style.publishNav}`}
      >
        <span className="me-3" role="button">
          <FiChevronsLeft onClick={() => handleBack()} />
        </span>
        <span className={`${style.viewJob} mx-2`}>Add a Skill</span>
        <span className="mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-math-greater"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 18l14 -6l-14 -6"></path>
          </svg>
        </span>
        <span className={`${style.viewJob} mx-2`}>Profile</span>
      </div>

      <Container className={`${styles.outerBox} p-4 mt-4`}>
        <p className={`${styles.skillsPara} pe-1 `}>
          Add a new skill that matches your portfolio so that we can Filter it
          with relevant jobs. (You can add maximum 10 skills)
        </p>

        <Form.Group controlId="add-skill" className="position-relative">
          <Form.Label className={`${styles.skillsLabel}`}>
            Search and add skills
          </Form.Label>
          <Form.Control
            type="text"
            name="skillName"
            placeholder="Search here"
            className={`${styles.skillsFormInput} py-3 px-4 mt-1`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddSkillByEnter} // Add event handler for Enter key press
            maxLength={50}
            isInvalid={(showErrors && !selectedOptions?.length) || showErrors1}
            disabled={skillsList.length >= 10}
          />
          {inputValue?.length >= 1 && (
            <Image
              src="./images/removeSkill.png"
              className={`img img-fluid ${!(showErrors || showErrors1)
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
          <Form.Control.Feedback type="invalid" className="errorMessage">
            {selectedOptions?.length < 1 &&
              !showErrors1 &&
              "Please enter skills"}
            {showErrors1 && "Skill already exists. Please add new skills."}
          </Form.Control.Feedback>
        </Form.Group>

        <div
          className={`${Array.isArray(options) && options.length && styles.optionsOuter
            } mb-3 mt-3`}
        >
          {Array.isArray(options) &&
            options?.map((option, index) => (
              <>
                <div
                  key={option.id}
                  className={`py-2 px-3 ${styles.optionsMenu}`}
                  onClick={() => handleOptionSelect(option)}
                  style={{
                    cursor: skillsList.includes(option.serviceName)
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {option.serviceName}
                </div>
                {index !== options.length - 1 && (
                  <hr className={`${style.hr} m-0`} />
                )}
              </>
            ))}
        </div>

        <div
          className={`d-flex flex-wrap align-items-center ${styles.skillsFormInput
            } p-2 ${!selectedOptions?.length && "d-none"}`}
        >
          {selectedOptions?.map((option) => (
            <div
              className={`${styles.addSkillOuter} d-flex justify-content-between align-items-center py-1 px-3 me-2 my-2`}
              key={option.id}
            >
              <span className={`me-2 ${styles.skills} my-0 py-0`}>
                {option.serviceName}
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
        <div className="text-end mt-4">
          <button
            className={`${styles.skillsAddButton}`}
            onClick={handleAddSkill}
          >
            Add
          </button>
        </div>
      </Container>
    </>
  );
};

export default Skill;
