import React, { useEffect, useState } from "react";
import { db } from "../../firebase_setup/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Col, Form, Image, Row } from "react-bootstrap";
 import { TbMoodSmile } from "react-icons/tb";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";

const SendMessage = ({ scroll, profileList, user, styles }) => {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      // alert("Enter valid message");
      return;
    }
    else {
      setCount(count + 1);
    }

    await addDoc(collection(db, "ChatRooms", String(user.jobId), "messages"), {
      // _id: new Date().getTime(),
      createdAt: new Date().getTime(),
      jobId: user?.jobId,
      proposalId: user?.proposalId,
      text: message,
      user: {
        _id: profileList?.id,
        avatar: profileList?.profileImage,
        name: profileList?.fullName
      }
    });
    setMessage("");    
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(e);
    }
  }

  return (
    <>
      <Row className="d-flex align-items-center">
        <Col md={1}>
          <CiCirclePlus
            size={23}
            className="ms-4"
            color="#14226D"
          />
        </Col>
        <Col>
          <Form.Group className="d-flex px-3 position-relative">
            <Form.Control
              name="messageInput"
              type="text"
              className={`${styles.chatInput} me-3 ps-4 pe-5 py-2 outline-0`}
              placeholder="Enter message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
              onKeyDown={handleKeyDown}
            />

            <TbMoodSmile
              fill="#14226D"
              color="white"
              size={40}
              className={`${styles.emoji}`}
            />

            <IoMdSend
              role="button"
              className="mt-2"
              color="#14226D"
              onClick={(event) => sendMessage(event)}
            />
            {/* <button onClick={(event) => sendMessage(event)}>Send</button> */}
          </Form.Group>
        </Col>
      </Row>
    </>
  )
};

export default SendMessage;