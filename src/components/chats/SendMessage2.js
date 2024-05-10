import React, { useEffect, useState } from "react";
import { database } from "../../firebase_setup/firebase";
import { push, update, child, ref } from "firebase/database"
import { Col, Form, Image, Row } from "react-bootstrap";
 import { LuFileText } from "react-icons/lu";
import { TbSquareLetterX } from "react-icons/tb";
import { TbMoodSmile } from "react-icons/tb";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";

import { uploadFileToS3 } from '../../utils/S3';
import { v4 as uuidv4 } from 'uuid';
import EmojiPicker from "emoji-picker-react"

const SendMessage2 = ({ profileList, user, styles, url, setUrl }) => {
    const [message, setMessage] = useState("");
    const [count, setCount] = useState(0);
    const [showEmoji, setShowEmoji] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleFileUpload(e);
        }
    };

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        setMessage(selectedFile);
    };

    useEffect(() => {
        if (message?.type) {
            generateUrl();
        }
    }, [message?.type])

    const generateUrl = async () => {
        if (message?.type) {
            const uniqueFileName = `${uuidv4()}`;
            try {
                const url = await uploadFileToS3(message, `${uniqueFileName}_${message.name}`, message.type);
                setUrl(url);
            } catch (err) {
                console.log('err', err)
            }
        }
    }

    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (message === "") {
            return;
        } else {
            setCount(count + 1);
        }

        const postData = {
            id: new Date().getTime(),
            createdAt: new Date().getTime(),
            jobId: user?.jobId,
            proposalId: user?.proposalId,
            text: !message?.type ? message : "",
            image: message.type && message?.type.includes("image") ? url : "",
            video: message.type && message?.type.includes("video") ? url : "",
            document: message.type && message?.type.includes("application") ? url : "",
            user: {
                _id: profileList?.id,
                avatar: profileList?.profileImage,
                name: profileList?.fullName,
            },
            read: false,
        }

        const newPostKey = push(child(ref(database), `Chat`)).key
        const updates = {}
        updates[`Chat/jobid${user?.jobId}-proposalid${user?.proposalId}/` + newPostKey] = postData

        update(ref(database), updates)
            .then(() => {
                console.log("Added");
            })
            .catch((err) => {
                console.log('err', err)
            })

        setMessage('');
        setUrl(null);
        showEmoji && setShowEmoji(false)
    }

    const handleCross = () => {
        setMessage('');
        setUrl(null);
    }

    const handleEmoji = (emojiData) => {
        setMessage((pre) => pre + emojiData.emoji)
    }

    return (
        <>
            <Row className="d-flex align-items-center justify-content-end w-100 position-relative">
                {
                    url && message?.type && message?.type.includes('image') ?
                        <div className={`${styles.uploadOuterDiv} p-0`}>
                            <Image
                                src={url}
                                alt="upload image"
                                className={`img img-fluid ${styles.uploadedImage} `}
                            />
                            <TbSquareLetterX
                                size={20}
                                className={`border rounded rounded-5 bg-danger text-white p-1 ${styles.iconCross}`}
                                onClick={handleCross}
                            />
                        </div>
                        : message?.type && message?.type.includes('video') ?
                            <div className={`${styles.uploadOuterDiv} p-0`}>
                                <video
                                    src={url}
                                    className={`img img-fluid ${styles.uploadedImage} rounded`}
                                    height={250}
                                    width={250}
                                    controls
                                />
                                <TbSquareLetterX
                                    size={20}
                                    className={`border rounded rounded-5 bg-danger text-white p-1 ${styles.iconCross}`}
                                    onClick={handleCross}
                                />
                            </div>
                            :
                            message?.type && message?.type.includes('application') &&
                            <div className={`${styles.uploadOuterDiv} d-flex justify-content-center p-0`}>
                                <div className={`${styles.pdfOuter} d-flex flex-column align-items-center justify-content-center`}>
                                    <LuFileText
                                        size={30}
                                    />
                                    <p className={`my-0 pt-2 ${styles.pdfName}`}>
                                        {message?.name}
                                    </p>
                                </div>
                                <TbSquareLetterX
                                    size={20}
                                    className={`border rounded rounded-5 bg-danger text-white p-1 ${styles.iconCross}`}
                                    onClick={handleCross}
                                />
                            </div>
                }
                <Col xs={2} sm={1} md={1} className="text-end p-0">
                    <div>
                        <label htmlFor="fileInput">
                            <CiCirclePlus size={23} className="" color="#14226D" />
                        </label>
                        <Form.Control
                            type='file'
                            id="fileInput"
                            style={{ display: "none" }}
                            accept="image/*, video/*, application/pdf"
                            onChange={handleFileSelect}
                        />
                    </div>
                </Col>
                <Col xs={9} sm={10} className="p-0">
                    <Form.Group className="d-flex px-3 position-relative">
                        <Form.Control
                            name="messageInput"
                            type="text"
                            className={`${!url ? styles.chatInput : styles.chatInput2} ps-4 pe-5 py-2 outline-0`}
                            placeholder={`${!url ? 'Enter message...' : ''}`}
                            value={!message?.type ? message : ''}
                            onChange={(e) => setMessage(e.target.value)}
                            autoComplete="off"
                            onKeyDown={handleKeyDown}
                            disabled={url && 'true'}
                        />

                        <TbMoodSmile
                            fill="#14226D"
                            color="white"
                            size={40}
                            className={`${styles.emoji}`}
                            onClick={() => setShowEmoji(!showEmoji)}
                        />
                        {showEmoji && (
                            <div className={`${styles.emojiCss}`}>
                                <EmojiPicker onEmojiClick={handleEmoji} onKeyDown={handleKeyDown} />
                            </div>
                        )}
                    </Form.Group>
                </Col>
                <Col xs={1} sm={1} className="p-0">
                    <IoMdSend
                        role="button"
                        className=""
                        color="#14226D"
                        onClick={handleFileUpload}
                    />
                </Col>
            </Row>
        </>
    );
};


export default SendMessage2;