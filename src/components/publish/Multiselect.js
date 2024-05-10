import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminServices } from '../../store/actions/publishJob';
import { Form, Image } from 'react-bootstrap';

const MultiSelectDropdown = ({ styles, style1, adminService, editJob, setAdminService, showErrors }) => {

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([...adminService]); // Set initial selectedOptions with adminService data    

    const [adminServices] = useSelector((Gstate) => [
        Gstate?.PublishJobReducers?.adminServices
    ])

    const dispatch = useDispatch();

    useEffect(() => {
        // Function to fetch options from API based on the input value
        const fetchOptions = () => {

            dispatch(getAdminServices(inputValue))

            if (Array.isArray(adminServices)) {
                const filteredOptions =
                    inputValue.trim() !== ''
                        ? adminServices.filter((service) =>
                            service.serviceName.toLowerCase().includes(inputValue.toLowerCase()) &&
                            !selectedOptions.some((selected) => selected.id === service.id)
                        )
                        : [];

                setOptions(filteredOptions);
            }
        };

        // Fetch options when inputValue changes
        if (inputValue.trim() !== '') {
            fetchOptions();
        } else {
            setOptions([]); // Clear options when inputValue is empty
        }
    }, [inputValue, selectedOptions, adminServices?.length]);

    // Function to handle selection of an option
    const handleOptionSelect = (option) => {
        if (adminService.some((selected) => selected?.serviceName === option?.serviceName)) {
            // If the option is already present in adminService, just set selectedOptions
            setSelectedOptions([...adminService]);
        } else {
            setSelectedOptions((prevSelected) => [...prevSelected, option]);
        }
        setInputValue(''); // Clear input value after selecting an option       
    };

    // Function to remove a selected option
    const removeSelectedOption = (option) => {
        setSelectedOptions((prevSelected) =>
            prevSelected.filter((selectedOption) => selectedOption.id !== option.id)
        );
    };

    useEffect(() => {
        if (selectedOptions.length) {
            setAdminService(selectedOptions?.map((option) => option.id));
        }
    }, [selectedOptions?.length]);

    return (
        <div>
            {/* Input for typing search */}
            <Form.Group controlId="add-service" className='my-3'>
                <Form.Label className={`${styles.formLabel}`}>Add Skills</Form.Label>
                <Form.Control
                    type="text"
                    name='options'
                    className={`${styles.formInput} ${styles.formSelect} p-3`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type here"
                    disabled={selectedOptions?.length == 5}
                    isInvalid={showErrors && !selectedOptions?.length}
                />
                <Form.Control.Feedback type="invalid" className="errorMessage">
                    {selectedOptions?.length < 1 && "Please select skills"}
                </Form.Control.Feedback>
            </Form.Group>
            {/* Dropdown options */}
            <div className={`${Array.isArray(options) && options.length && styles.optionsOuter} mb-3`}>
                {Array.isArray(options) && options?.map((option, index) => (
                    <>
                        <div
                            key={option.id}
                            className={`py-2 px-3 ${styles.optionsMenu}`}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option.serviceName}
                        </div>
                        {
                            index !== options.length - 1 &&
                            <hr className={`${style1.hr} m-0`} />
                        }
                    </>
                ))}
            </div>
            {/* Selected options */}
            <div>
                <div className={`d-flex flex-wrap align-items-center ${styles.formInput} ${styles.formSelect} p-2 ${!selectedOptions?.length && 'd-none'}`}>
                    {selectedOptions?.map((option) => (
                        <div className={`${styles.addSkillOuter} d-flex justify-content-between align-items-center py-1 px-3 me-2 my-2`} key={option.id}>
                            <span
                                className={`me-2 ${styles.skills} my-0 py-0`}
                            >
                                {option.serviceName}
                            </span>
                            <span>
                                <Image
                                    src='/images/removeSkill.png'
                                    className='img img-fluid'
                                    role='button'
                                    onClick={() => removeSelectedOption(option)}
                                />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
