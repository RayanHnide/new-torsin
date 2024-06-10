
import axios from 'axios';
import { Country } from "country-state-city";
import styles from '../../stylesheet/profile.module.scss';
import style from '../../stylesheet/dashboard.module.scss';
import {InlineEdit, SelectPicker, Stack, Slider, DatePicker, CheckPicker} from 'rsuite';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';
 import { CiSaveUp2 } from "react-icons/ci";
import { GrLinkPrevious } from "react-icons/gr";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { GrLinkNext } from "react-icons/gr";


import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Image, Row, Card } from 'react-bootstrap';
import Select from 'react-select'
import 'rsuite/dist/rsuite.css'
import Validation from "../../utils/Validation";
 import { Toaster, toast } from 'react-hot-toast';
 import { format } from 'date-fns';
import { MdModeEditOutline } from "react-icons/md";

import { MdDeleteForever } from "react-icons/md";



import * as auth from "../../helpers/auth";


export default function EditProfile(){
    // const [addPhotoFields, setAddPhotoFields] = useState([{ photos: [''] }]);
    const [file, setFile] = useState()
    const[experienceData,setexperienceData] = useState({
        title:'',
        role:'',
        description:'',

    })
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => setOpenModal(false);
    const handleClose = () => setOpen(false);
    const [value, setValue] = useState([]);
    const [startDate,setStartDate] = useState('')
    const [accountList,setAccountList] = useState([])
    const [endDate,setEndDate] = useState('')
    const[certificate,setCertificate] = useState('')
    const[newCertificate,setNewCertificate] = useState('')
    const [newLicenses,setNewLicenses]  = useState('')
    const [skills,setSkills] = useState([])
    const [CertificateList,setCertificateList] = useState([])
    const [nextStep,setNextStep] = useState(true)
    const [AccountName,setAccountName] = useState('')
    const [AccountUrl,setAccountUrl] = useState('')
    const [newAccount,setNewAccount] = useState('')
    const [newUrl,setNewUrl] = useState('')
    const[id,setId] = useState(null)
    const[idCertificate,setIdCertificate] = useState(null)
    const [licenses,setLicenses]  = useState('')
    const [licensesFile,setLicensesFile] = useState('')
    const [enumData,setEnumData] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedSkills,setSelectedSkills] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedgender, setSelectedGender] = useState(null);
    const [selectedEducations, setSelectedEducations] = useState(null);
    const [selectedMilitaryStatus, setSelectedMilitaryStatus] = useState(null);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [selectedJopLocation, setSelectedJopLocation] = useState(null);
    const [selectedServices,setSelectedServices] = useState(null);
    const [selectedJops, setSelectedJops] = useState(null);
     const [languages,setLanguages] = useState([])
    const [militaryStatus,setMilitaryStatus] = useState([])
    const [gender,setGender] = useState([])
    const [educations,setEducations] = useState([])
    const [jops,setJops] = useState([])
    const [services,setServices] = useState([])
    const [jopLocation,setJopLocation] = useState([])
    const [bio,setBio] = useState('')
    const [selectedLanguages,setSelectedLanguages] = useState([])


    const fetchAllSkills =async()=>{
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('https://admin.torsin.com/api/users/skills/', {
                headers: {
                    Authorization: accessToken
                }
            });

            setSkills(response.data.results)
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchEducations =async()=>{
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('https://admin.torsin.com/api/users/education-degrees/', {
                headers: {
                    Authorization: accessToken
                }
            });

            setEducations(response.data.results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchServices =async()=>{
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('https://admin.torsin.com/api/users/services/', {
                headers: {
                    Authorization: accessToken
                }
            });

            setServices(response.data.results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchCertificateList =async()=>{
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('https://admin.torsin.com/api/users/user-licenses/', {
                headers: {
                    Authorization: accessToken
                }
            });

            setCertificateList(response.data.results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchMilitaryStatus=async()=>     {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('https://admin.torsin.com/api/users/military-status/', {
                headers: {
                    Authorization: accessToken
                }
            });



            setMilitaryStatus(response.data.results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchJopLocation=async()=>     {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('https://admin.torsin.com/api/users/job-locations/', {
                headers: {
                    Authorization: accessToken
                }
            });



            setJopLocation(response.data.results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchJops=async()=>     {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('https://admin.torsin.com/api/users/job-titles/', {
                headers: {
                    Authorization: accessToken
                }
            });



            setJops(response.data.results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchGender=async()=>     {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('https://admin.torsin.com/api/users/genders/', {
                headers: {
                    Authorization: accessToken
                }
            });



            setGender(response.data.results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchLanguages=async()=>{
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('https://admin.torsin.com/api/users/languages/', {
                headers: {
                    Authorization: accessToken
                }
            });



         setLanguages(response.data.results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const fetchProfileData=async()=>{
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('https://admin.torsin.com/api/users/profile/', {
                headers: {
                    Authorization: accessToken
                }
            });

            setEnumData(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const UpdateProfile=()=>{
         axios.put('https://admin.torsin.com/api/users/profile/',{
             users_skills:selectedSkills,
             profileImage: null,
             video: null,
             fullName:fullName,
             phone_number:phoneNumber,
             cv: null,
             email:email,

             portfolio:null
         },{
             headers:{
                 Authorization:localStorage.getItem('accessToken')
             }
         }).then((res)=>{
             console.log(res)
         })
    }


    const fetchAccountsList=async()=>{
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get('https://admin.torsin.com/api/users/user-accounts/', {
                headers: {
                    Authorization: accessToken
                }
            });



            setAccountList(response.data.results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleDeleteAccount=(id)=>{
        axios.delete(`https://admin.torsin.com/api/users/user-accounts/${id}/`,{
            headers:{
                Authorization:`${localStorage.getItem('accessToken')}`
            }
        }).then((res)=>{
            toast.success('Deleted Account successfully', {
                position: "top-right",
                style: {
                    borderBottom: '4px solid #33a34e',
                    padding: "16px",
                    color: "#3c5f4b",
                    marginRight: "25px",
                },
            });
            setAccountList(accountList.filter(account => account.id !== id));

        }).catch(err=>console.log(err))
    }

    useEffect(() => {
        if (enumData && enumData.countryName) {
            const preSelectedCountry = Country.getAllCountries().find(
                (country) => {
                    return enumData.countryName == country.name
                }
            );
            if (preSelectedCountry) {
                setSelectedCountry(preSelectedCountry);
            }
        }
    }, [enumData.countryName]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('https://admin.torsin.com/api/users/genders/', {
                    headers: {
                        Authorization: accessToken
                    }
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        fetchProfileData()
        fetchLanguages()
        fetchGender()
        fetchMilitaryStatus()
        fetchJops()
        fetchJopLocation()
        fetchServices()
        fetchEducations()
        fetchAccountsList()
        fetchCertificateList()
        fetchAllSkills()


    }, []);

    const handleexperienceFieldsChange = (e) => {

        setexperienceData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    function handleChange(event) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);


        axios.post("https://admin.torsin.com/api/uploader/items/", formData, {
            headers: {
                'Authorization': `${localStorage.getItem('accessToken')}`
            }
        }).then((res) => {

            setCertificate(res.data.file)
            // event.target.value = null;


        }).catch((error) => {
            console.error('Error uploading file:', error);
        });
    }
    function handleUpdateCertificateUrl(event) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);


        axios.post("https://admin.torsin.com/api/uploader/items/", formData, {
            headers: {
                'Authorization': `${localStorage.getItem('accessToken')}`
            }
        }).then((res) => {

            setNewCertificate(res.data.file)
            // event.target.value = null;


        }).catch((error) => {
            console.error('Error uploading file:', error);
        });
    }

    function handleSubmit(e){
        e.preventDefault()

        const url = 'https://admin.torsin.com/api/users/user-licenses/';
        const formData = new FormData();
        formData.append('name', licenses);
        formData.append('file', certificate);
        const config = {
            headers: {
                Authorization:`${localStorage.getItem('accessToken')}`,
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config).then((response) => {
            toast.success('Added Certificate successfully', {
                position: "top-right",
                style: {
                    borderBottom: '4px solid #33a34e',
                    padding: "16px",
                    color: "#3c5f4b",
                    marginRight: "25px",
                },
            });
            setCertificateList([...CertificateList, { id: response.data.id, name: licenses, file: certificate }]);

             setLicenses('')
            document.querySelector('input[type="file"]').value = null;

        });
    }
    function handleUpdateCertificate(){


        const url = `https://admin.torsin.com/api/users/user-licenses/${idCertificate}/`;
        const formData = new FormData();
        formData.append('name', newLicenses);
        formData.append('file', newCertificate);
        const config = {
            headers: {
                Authorization:`${localStorage.getItem('accessToken')}`,
                'content-type': 'multipart/form-data',
            },
        };
        axios.put(url, formData, config).then((response) => {
            const updatedCertificateList = CertificateList.map(e => {
                if (e.id === idCertificate) {
                    return { id: idCertificate, name: newLicenses, file: newCertificate };
                } else {
                    return e;
                }

            });


            setCertificateList(updatedCertificateList);
            toast.success('Added Certificate successfully', {
                position: "top-right",
                style: {
                    borderBottom: '4px solid #33a34e',
                    padding: "16px",
                    color: "#3c5f4b",
                    marginRight: "25px",
                },
            });
            // setCertificateList([...CertificateList, { id: response.data.id, name: newLicenses, file: newCertificate }]);

            setLicenses('')
            document.querySelector('input[type="file"]').value = null;

        });
    }
    const DeleteCertificate=(id)=>{
        axios.delete(`https://admin.torsin.com/api/users/user-licenses/${id}/`,{
            headers:{
                Authorization:`${localStorage.getItem('accessToken')}`
            }
        }).then((res)=>{
            toast.success('Deleted Certificate successfully', {
                position: "top-right",
                style: {
                    borderBottom: '4px solid #33a34e',
                    padding: "16px",
                    color: "#3c5f4b",
                    marginRight: "25px",
                },
            });

        })

        setCertificateList(CertificateList.filter(account => account.id !== id));
    }
    const CreateAccounts=()=>{
        axios.post("https://admin.torsin.com/api/users/user-accounts/",{
            name:AccountName,
            url:AccountUrl
        },{
            headers:{
                Authorization:`${localStorage.getItem('accessToken')}`
            }
        }).then((res)=>{

                toast.success('Added Account successfully', {
                    position: "top-right",
                    style: {
                        borderBottom: '4px solid #33a34e',
                        padding: "16px",
                        color: "#3c5f4b",
                        marginRight: "25px",
                    },
                });
            setAccountList([...accountList, { id: res.data.id, name: AccountName, url: AccountUrl }]);


        })

    }
    const UpdateAccount=()=>{
        axios.put(`https://admin.torsin.com/api/users/user-accounts/${id}/`,{
            name:newAccount,
            url:newUrl
        },{
            headers:{
                Authorization:`${localStorage.getItem('accessToken')}`
            }
        }).then((res)=>{
            const updatedAccountList = accountList.map(account => {
                if (account.id === id) {
                    return { id: id, name: newAccount, url: newUrl };
                } else {
                    return account;
                }

            });
            console.log(res);

            setAccountList(updatedAccountList);
            toast.success('Updated  Account successfully', {
                position: "top-right",
                style: {
                    borderBottom: '4px solid #33a34e',
                    padding: "16px",
                    color: "#3c5f4b",
                    marginRight: "25px",
                },
            });
        }).catch(err=>console.log(err))

    }

    const handleExperience=()=>{


        axios.post("https://admin.torsin.com/api/users/experiences/",{
            title:experienceData.title,
            role:experienceData.role,
            description:experienceData.description,
            start_date:startDate,
            end_date:endDate
        },{
            headers:{
                Authorization:`${localStorage.getItem('accessToken')}`
            }
        }).then((res)=>{
            setexperienceData({
                title: '',
                role: '',
                description: ''
            });
            setStartDate('')
            setEndDate('')
            toast.success('Added experience successfully', {
                position: "top-right",
                style: {
                    borderBottom: '4px solid #33a34e',
                    padding: "16px",
                    color: "#3c5f4b",
                    marginRight: "25px",
                },
            });
        }).catch(err=>console.log(err))
    }
    const [fullName,setFullName] = useState(enumData.fullName)
    const [email,setEmail] = useState(enumData.email)
    const [phoneNumber,setPhoneNumber] = useState(enumData.phone_number)

    useEffect(() => {
        if (enumData.fullName&&enumData.email&&enumData.phone_number) {
            setFullName(enumData.fullName);
            setEmail(enumData.email)
            setPhoneNumber(enumData.phone_number)
        }
    }, [enumData.fullName,enumData.email,enumData.phone_number]);
    // const resumeLink ="https://raw.githubusercontent.com/github-name/pdf-renderer/main/src/assets/resume.pdf";
     

  
    return(
        <>


            <h4>
                Edit Profile
            </h4>

            <div className='mb-5' style={{
                padding:'10px',
                border:'1px solid gray',
                borderRadius:'30px'
            }}>

                {
                    nextStep ?
                        <>

                            <div className='mt-4' >

                                <div className='row mx-0 d-flex justify-content-between'>
                                    <div className='col-lg-4'>

                                        <Form.Group controlId='name'>
                                            <Form.Label >Name</Form.Label>
                                            <Form.Control
                                                required={true}
                                                type="text"
                                                placeholder="Name"
                                                name="fullName"
                                                style={{ width: '100%' }}
                                                value={fullName}

                                                onChange={(e)=>{
                                                    setFullName(e.target.value)
                                                }}
                                                // className={`${styles.skillsFormInput} py-3 px-4`}
                                            />
                                            <Form.Control.Feedback type="invalid" className="errorMessage">


                                             </Form.Control.Feedback>
                                        </Form.Group>
                                        { !fullName && (
                                            <div className="errorMessage text-danger">this field is required</div>
                                        )}

                                    </div>
                                    <div className='col-lg-4'>

                                        <Form.Group controlId='name'>
                                            <Form.Label >Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                style={{ width: '100%' }}
                                                placeholder="Email"
                                                name="email"
                                                value={email}
                                                onChange={(e)=>{
                                                    setEmail(e.target.value)
                                                }}
                                                // onChange={handleProfileChange}
                                                // className={`${styles.skillsFormInput} py-3 px-4`}
                                            />

                                        </Form.Group>
                                        { !email && (
                                            <div className="errorMessage text-danger">this field is required</div>
                                        )}

                                    </div>
                                    <div className='col-lg-4'>

                                        <Form.Group controlId="phone">
                                            <Form.Label >Mobile Number</Form.Label>
                                            <Form.Control
                                                type='text'
                                                style={{ width: '100%' }}
                                                name="phone_number"
                                                value={phoneNumber}

                                                onChange={(e)=>{
                                                    setPhoneNumber(e.target.value)
                                                }}
                                                // className={`${styles.skillsFormInput} py-3 px-4`}
                                                // isInvalid={showErrors && !Validation.number(phone_number)}
                                                maxLength={14}
                                            />
                                            {/*<Form.Control.Feedback type="invalid" className="errorMessage">*/}
                                            {/*    {!phone_number ? "Please enter mobile no." : "Alphabets and/or special characters are not allowed"}*/}
                                            {/*</Form.Control.Feedback>*/}
                                        </Form.Group>
                                        { !phoneNumber && (
                                            <div className="errorMessage text-danger">this field is required</div>
                                        )}

                                    </div>

                                </div>


                            </div>

                            <div className='  mt-5  '>
                                <div className='row   mx-0'>
                                    <div className='col-lg-4'>
                                        <Form.Group controlId='countryName'>
                                            <Form.Label  >Country</Form.Label>
                                            <Select

                                                className={`  py-2  `}
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

                                                }}
                                                isInvalid={ !selectedCountry}
                                            />
                                            { !selectedCountry && (
                                                <div className="errorMessage text-danger">Please select country.</div>
                                            )}
                                        </Form.Group>
                                    </div>


                                    <div className='col-lg-4   justify-content-center '>
                                        <div  >
                                            <Form.Group className='w-100' controlId='countryName'>

                                                <div className='col-lg-4 mt-2 '>
                                                    <Form.Group  controlId='countryName' className='w-100'>
                                                        <Form.Label  >Jop</Form.Label>

                                                        <Stack spacing={10} className='w-100' direction="column" alignItems="flex-start">
                                                            <SelectPicker

                                                                data={jops.map((e)=>{
                                                                    return {
                                                                        label:e,
                                                                        value:e
                                                                    }
                                                                })}

                                                                searchable={false}
                                                                style={{ width: '100%' }}
                                                                onChange={((e)=>{
                                                                    setSelectedJops(e)
                                                                })}
                                                                placeholder="Select without search"
                                                            />
                                                        </Stack>


                                                    </Form.Group>
                                                </div>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className='col-lg-3  justify-content-center mt-2'>
                                        <div>
                                            <Form.Group controlId='countryName'>


                                                <Form.Group controlId='countryName' className='w-100'>
                                                    <Form.Label  >Jop Location</Form.Label>

                                                    <Stack spacing={10} className='w-100' direction="column" alignItems="flex-start">
                                                        <SelectPicker

                                                            data={jopLocation.map((e)=>{
                                                                return {
                                                                    label:e,
                                                                    value:e
                                                                }
                                                            })}
                                                            style={{ width: '100%' }}
                                                            searchable={false}

                                                            onChange={((e)=>{
                                                                setSelectedJopLocation(e)
                                                            })}
                                                            placeholder="Select without search"
                                                        />
                                                    </Stack>


                                                </Form.Group>

                                            </Form.Group>
                                        </div>
                                    </div>




                                </div>
                            </div>




                            <div className='  mt-5'>
                                <div className='row mx-0'>



                                    <div className='col-lg-4 mt-2'>
                                        <Form.Group controlId='countryName'>
                                            <Form.Label  >Gender</Form.Label>

                                            <Stack spacing={10} direction="column" alignItems="flex-start">
                                                <SelectPicker
                                                    data={gender.map((e)=>{
                                                        return {
                                                            label:e,
                                                            value:e
                                                        }
                                                    })}

                                                    searchable={false}
                                                    style={{ width: '100%' }}
                                                    onChange={((e)=>{
                                                        setSelectedGender(e)
                                                    })}
                                                    placeholder="Select without search"
                                                />
                                            </Stack>


                                        </Form.Group>
                                    </div>


                                    <div className='col-lg-4 mt-2'>
                                        <Form.Group controlId='countryName'>
                                            <Form.Label  >Languages</Form.Label>

                                            <Stack spacing={10} direction="column" alignItems="flex-start">
                                                <SelectPicker
                                                    data={languages.map((e)=>{
                                                        return {
                                                            label:e,
                                                            value:e
                                                        }
                                                    })}
                                                    searchable={false}
                                                    style={{ width: '100%' }}
                                                    onChange={((e)=>{
                                                        setSelectedLanguages(e)
                                                    })}
                                                    placeholder="Select without search"
                                                />
                                            </Stack>


                                        </Form.Group>
                                    </div>
                                    <div className='col-lg-3'>

                                        <Form.Group controlId='name'>
                                            <Form.Label >School</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="School"
                                                name="school"
                                                value={enumData.school}
                                                style={{ width: '100%' }}
                                                onChange={(e)=>{setSelectedSchool(e.target.value)}}
                                                // className={`${styles.skillsFormInput} py-3 px-4`}
                                            />
                                            <Form.Control.Feedback type="invalid" className="errorMessage">
                                                {!enumData.fullName ? "Please enter full name" : "Digits and/or special characters are not allowed"}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                    </div>


                                </div>
                            </div>




                            <Form.Group className='mt-4 mx-lg-2 mx-0' controlId='bio'>
                                <Form.Label className={`${styles.formLabel}`}>Bio</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows="3"
                                    name="bio"
                                    placeholder='Bio....'
                                    className={`${styles.skillsFormInput} py-3 px-4`}
                                    value={bio}
                                    onChange={(e)=>setBio(e.target.value)}
                                    maxLength="500"
                                    isInvalid={ bio?.length && !Validation.minOf(bio, 20, 300)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {!bio?.length ? "Please enter bio" : bio?.length < 20 && "Bio can't be less than 20 words "}
                                </Form.Control.Feedback>
                            </Form.Group >


                         <div className='d-flex justify-content-center  mt-5'>
                             <button className='btn btn-primary p-3 w-25 ' onClick={()=>setNextStep(false)}>
                                 Next
                                 <GrLinkNext  className='mx-2 fs-4'/>

                             </button>
                         </div>
                        </>


                        :
                        <>
                            <div className='container mt-4 '>
                                <div className='row mx-0'>



                                    <div className='col-lg-4 mt-2'>
                                        <Form.Group controlId='countryName'>
                                            <Form.Label  >Services</Form.Label>

                                            <Stack spacing={10} direction="column" alignItems="flex-start">
                                                <SelectPicker
                                                    data={services.map((e)=>{
                                                        return {
                                                            label:e.name,
                                                            value:e
                                                        }
                                                    })}

                                                    searchable={false}
                                                   style={{ width: '100%' }}
                                                    onChange={((e)=>{

                                                        setSelectedServices(e)
                                                    })}
                                                    placeholder="Select without search"
                                                />
                                            </Stack>


                                        </Form.Group>
                                    </div>


                                    <div className='col-lg-4 mt-2'>
                                        <Form.Group controlId='countryName'>
                                            <Form.Label  >education-degrees</Form.Label>

                                            <Stack spacing={10} direction="column" alignItems="flex-start">
                                                <SelectPicker
                                                    data={educations.map((e)=>{
                                                        return {
                                                            label:e,
                                                            value:e
                                                        }
                                                    })}
                                                    searchable={false}
                                                    style={{ width: '100%' }}
                                                    onChange={((e)=>{
                                                        setSelectedEducations(e)
                                                    })}
                                                    placeholder="Select without search"
                                                />
                                            </Stack>


                                        </Form.Group>
                                    </div>
                                    <div className='col-lg-3'>




                                        <Form.Group className='mx-lg-3 mx-0' controlId='countryName'>


                                            <Form.Group controlId='countryName'>
                                                <Form.Label  >Military Status</Form.Label>

                                                <Stack spacing={10} direction="column" alignItems="flex-start">
                                                    <SelectPicker
                                                        data={militaryStatus.map((e)=>{
                                                            return {
                                                                label:e,
                                                                value:e
                                                            }
                                                        })}
                                                        searchable={false}
                                                        style={{ width: '100%' }}
                                                        onChange={((e)=>{
                                                            setSelectedMilitaryStatus(e)
                                                        })}
                                                        placeholder="Select without search"
                                                    />
                                                </Stack>


                                            </Form.Group>

                                        </Form.Group>

                                    </div>


                                </div>
                             <Toaster/>
                                <div className='row   mx-0 mt-4'>
                                    <div className='col-lg-4 mx-1 border  p-3 ' style={{borderRadius:'10px'}}>
                                        <legend>
                                            Certificate
                                        </legend>
                                      <div className='d-flex align-items-center'>
                                          <fieldset>

                                              <div  >
                                                  <Form.Group controlId='name'>
                                                      <Form.Label >Name</Form.Label>
                                                      <Form.Control
                                                          type="text"
                                                          placeholder="Name"
                                                          name="licenses"
                                                          style={{ width: '100%' }}
                                                          value={licenses}
                                                          onChange={(e)=>{
                                                              setLicenses(e.target.value)
                                                          }}
                                                          // onChange={handleProfileChange}
                                                          // className={`${styles.skillsFormInput} py-3 px-4`}
                                                      />
                                                      <Form.Control.Feedback type="invalid" className="errorMessage">
                                                          {!enumData.fullName ? "Please enter full name" : "Digits and/or special characters are not allowed"}
                                                      </Form.Control.Feedback>
                                                  </Form.Group>
                                                  { !licenses && (
                                                      <div className="errorMessage text-danger">Please Enter the  licenses Name.</div>
                                                  )}
                                              </div>
                                              <div className='mt-4'>
                                                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                      <p>URL</p>
                                                      <input   className='form-control' type="file" onChange={handleChange}/>
                                                      <button className='btn btn-primary mt-3' disabled={!licenses || !certificate || !CertificateList}  type="submit">Add Certificate</button>
                                                  </form>
                                              </div>
                                          </fieldset>


                                      </div>
                                        <div>
                                            <div className='mt-2 fs-5'>Your Certificates</div>
                                            {
                                                CertificateList.map((e,i)=>{
                                                    return(
                                                        <>
                                                            <Modal key={i} open={openModal} onClose={handleCloseModal}>
                                                                <Modal.Header>
                                                                    <Modal.Title>Update Certificate</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <Form.Group controlId='name'>
                                                                        <Form.Label >New Certificate</Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            placeholder="Name"
                                                                            name="newAccount"
                                                                            // value={newLicenses}
                                                                            style={{ width: '100%' }}
                                                                            // value={enumData.fullName}
                                                                            onChange={(i)=>{setNewLicenses(i.target.value)}}
                                                                            // className={`${styles.skillsFormInput} py-3 px-4`}
                                                                        />

                                                                    </Form.Group>
                                                                </Modal.Body>
                                                                <Modal.Body>
                                                                    <Form.Group controlId='name'>
                                                                        <Form.Label >New Certificate Url</Form.Label>
                                                                        <div className='mt-2'>
                                                                            <form   encType="multipart/form-data">
                                                                                <p>URL</p>
                                                                                <input   className='form-control' type="file" onChange={handleUpdateCertificateUrl}/>
                                                                             </form>
                                                                        </div>

                                                                    </Form.Group>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button disabled={!newLicenses||!newCertificate||!CertificateList}  onClick={()=>{

                                                                        handleUpdateCertificate()
                                                                        handleCloseModal()
                                                                    }} appearance="primary">
                                                                        Update
                                                                    </Button>
                                                                    <Button onClick={handleCloseModal} appearance="subtle">
                                                                        Cancel
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                            <div className=' w-100 mt-1'>
                                                                 <div className='fw-bold'>{e.name} :

                                                                    <Image className='mx-3' src={e.file} width={100}/>
                                                                    <MdDeleteForever onClick={()=>{
                                                                        DeleteCertificate(e.id)
                                                                    }} className='fs-3' style={{color:'red',cursor:'pointer'}}/>

                                                                    <MdModeEditOutline onClick={()=>{
                                                                        handleOpenModal()
                                                                        setIdCertificate(e.id)

                                                                    }} className='fs-4' style={{color:'blue',cursor:'pointer'}}/>
                                                                </div>




                                                                <hr/>

                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='col-lg-4 mx-0 mx-lg-1   border  p-3' style={{borderRadius:'10px'}}>
                                        <legend>
                                            Accounts
                                        </legend>
                                        <fieldset >


                                            <div  >

                                                <Form.Group controlId='name'>
                                                    <Form.Label >Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Name"
                                                        name="AccountName"
                                                        style={{ width: '100%' }}
                                                        value={AccountName}
                                                        onChange={(e)=>setAccountName(e.target.value)}
                                                        // className={`${styles.skillsFormInput} py-3 px-4`}
                                                    />

                                                </Form.Group>

                                                    <Form.Group
                                                        controlId='portfolio'
                                                        className='mt-3 mb-2'
                                                    >
                                                        <Form.Label
                                                            className={`${style.skillsLabel}`}
                                                        >
                                                            Account Link
                                                        </Form.Label>
                                                        <Form.Control
                                                            type='text'
                                                            placeholder='https://LinkedIn.com'
                                                            className={`${style.skillsFormInput} py-3 px-4`}
                                                            name='AccountUrl'
                                                            onChange={(e)=>setAccountUrl(e.target.value)}
                                                            value={AccountUrl}
                                                        />
                                                    </Form.Group>

                                                <button disabled={!AccountName ||!AccountUrl} onClick={CreateAccounts} className='btn btn-primary mt-2'>
                                                    Add Account
                                                </button>


                                                <div>
                                                    <div className='mt-2 fs-5'>Your Accounts</div>
                                                    {
                                                        accountList.map((e,i)=>{
                                                            return(
                                                                <>
                                                                    <Modal key={i} open={open} onClose={handleClose}>
                                                                        <Modal.Header>
                                                                            <Modal.Title>Update Account</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                            <Form.Group controlId='name'>
                                                                                <Form.Label >New Account Name</Form.Label>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    placeholder="Name"
                                                                                    name="newAccount"

                                                                                    style={{ width: '100%' }}
                                                                                    // value={enumData.fullName}
                                                                                    onChange={(i)=>{setNewAccount(i.target.value)}}
                                                                                    // className={`${styles.skillsFormInput} py-3 px-4`}
                                                                                />

                                                                            </Form.Group>
                                                                        </Modal.Body>
                                                                        <Modal.Body>
                                                                            <Form.Group controlId='name'>
                                                                                <Form.Label >New Account Url</Form.Label>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    placeholder='new Account Url'
                                                                                    name="newUrl"

                                                                                    style={{ width: '100%' }}
                                                                                    // value={newUrl}
                                                                                    // value={enumData.fullName}
                                                                                    onChange={(i)=>{setNewUrl(i.target.value)}}
                                                                                    // className={`${styles.skillsFormInput} py-3 px-4`}
                                                                                />

                                                                            </Form.Group>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                            <Button disabled={!newUrl||!newAccount} onClick={()=>{

                                                                                UpdateAccount()
                                                                                handleClose()
                                                                            }} appearance="primary">
                                                                                Ok
                                                                            </Button>
                                                                            <Button onClick={handleClose} appearance="subtle">
                                                                                Cancel
                                                                            </Button>
                                                                        </Modal.Footer>
                                                                    </Modal>
                                                                 <div className=' w-100 mt-1'>

                                                                         <div className='fw-bold'>{e.name} :</div>
                                                                         <span>{e.url}</span>
                                                                          <MdDeleteForever onClick={()=>{
                                                                              handleDeleteAccount(e.id)
                                                                          }} className='fs-3' style={{color:'red',cursor:'pointer'}}/>

                                                                         <MdModeEditOutline onClick={()=>{
                                                                             handleOpen()
                                                                            setId(e.id)

                                                                         }} className='fs-4' style={{color:'blue',cursor:'pointer'}}/>


                                                                     <hr/>

                                                                 </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>


                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className='col-lg-3 mx-lg-2 mx-0   border  p-3' style={{borderRadius:'10px'}}>
                                        <fieldset>
                                            <legend>
                                                experiences                                                                                        </legend>

                                            <div className='mt-4'>


                                                <Form.Group controlId='name'>
                                                    <Form.Label >title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="title"
                                                        value={experienceData.title}
                                                        name="title"
                                                        style={{ width: '100%' }}
                                                         // value={AccountName}
                                                        onChange={(e)=>handleexperienceFieldsChange(e)}
                                                         // className={`${styles.skillsFormInput} py-3 px-4`}
                                                    />

                                                </Form.Group>
                                                <Form.Group className='mt-3' controlId='name'>
                                                    <Form.Label >Role</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Ex: Team Leader"
                                                        name="role"
                                                        style={{ width: '100%' }}
                                                        value={experienceData.role}
                                                        // value={AccountName}
                                                        onChange={(e)=>handleexperienceFieldsChange(e)}
                                                         // className={`${styles.skillsFormInput} py-3 px-4`}
                                                    />

                                                </Form.Group>

                                                <Form.Group className='mt-3' controlId='name'>
                                                    <Form.Label >Description</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={experienceData.description}
                                                        onChange={(e)=>handleexperienceFieldsChange(e)}
                                                        placeholder="title"
                                                        as='textarea'
                                                        name="description"
                                                        style={{ width: '100%' }}
                                                        // value={AccountName}
                                                         // className={`${styles.skillsFormInput} py-3 px-4`}
                                                    />
                                                    <Form.Control.Feedback type="invalid" className="errorMessage">
                                                        {!enumData.fullName ? "Please enter full name" : "Digits and/or special characters are not allowed"}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                 <div className='row mt-3'>
                                                      <div className='col-12'>
                                                          <Form.Label >Start Date</Form.Label>
                                                          <DatePicker   onChange={(e)=>{
                                                              if (e instanceof Date && !isNaN(e)) {
                                                                  const formattedDate = format(e, 'yyyy-MM-dd');
                                                                  setStartDate(formattedDate);
                                                              }

                                                          }} />
                                                      </div>

                                                     <div className='col-12 mt-3'>
                                                         <Form.Label >End Date</Form.Label>
                                                         <DatePicker   onChange={(e)=>{
                                                             if (e instanceof Date && !isNaN(e)) {
                                                                 const formattedDate = format(e, 'yyyy-MM-dd');
                                                                 setEndDate(formattedDate);
                                                             }

                                                         }}  />
                                                     </div>
                                                 </div>


                                                 <button onClick={handleExperience} disabled={!experienceData.title || !experienceData.role || !experienceData.description ||  !startDate || !endDate } className='btn btn-primary mt-2'>
                                                    Add Experience
                                                </button>


                                            </div>
                                        </fieldset>
                                    </div>


                                </div>

                             <div className='row mt-4'>
                                 <div className='col-lg-3'>



                                     <Form.Group className='mx-lg-3 mx-0' controlId='countryName'>


                                         <Form.Group controlId='countryName'>
                                             <Form.Label  >Skills</Form.Label>

                                             <Stack spacing={10} direction="column" alignItems="flex-start">
                                                 <CheckPicker

                                                     multiple={true}
                                                     data={skills.map((e)=>{
                                                         return {
                                                             label:e,
                                                             value:e
                                                         }
                                                     })}

                                                     searchable={false}
                                                     style={{ width: '100%' }}
                                                     onChange={((e)=>{
                                                         setSelectedSkills(e)
                                                         console.log(e)
                                                     })}
                                                     placeholder="Select without search"
                                                 />
                                             </Stack>


                                         </Form.Group>

                                     </Form.Group>

                                 </div>
                             </div>


                                <div className='d-flex justify-content-around  mt-5'>
                                    <button className='btn btn-primary p-3 w-25' onClick={()=>setNextStep(true)}>
                                        <GrLinkPrevious className='fs-4 mx-2' />
                                      Prev
                                    </button>


                                    <button  className='btn btn-primary p-3 w-25' onClick={UpdateProfile}>
                                       Save Changes
                                        <CiSaveUp2  className='fs-3 mx-2'/>

                                    </button>

                                </div>

                                
                            </div>
            

                         </>
                }
            </div>
            
   

        </>
    )
}


{/* {enumData.licenses && enumData.licenses.length > 1 && (
    <Image src={enumData.licenses[3].file} className={`img img-fluid ${styles.getImage} my-3`} alt='job' />
)} */}






