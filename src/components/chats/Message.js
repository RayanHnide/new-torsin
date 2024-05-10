import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Image } from "react-bootstrap";
import Moment from "react-moment";
 import { BsThreeDotsVertical } from "react-icons/bs";
import { LuFileText } from "react-icons/lu";
import { CiMenuBurger } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";

const Message = ({ messages, styles, person, profileList }) => {
  const ref = useRef()

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const [fullScreenImage, setFullScreenImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  return (
    <>
      <div className={`d-flex justify-content-between align-items-center ${styles.chatNav} px-4 `}>
        <div className='d-flex'>
          <Image src={person?.profileImage || './images/dummyImage.png'} className={`img img-fluid ${styles.chatDp} me-3`} alt="profile image" />
          <div className=''>
            <p className={`my-0 ${styles.personName}`}>
              {person?.fullName}
            </p>
            <p className={`my-0 ${styles.personChat}`}>
              Active
            </p>
          </div>
        </div>
        <div>
          <BsThreeDotsVertical
            className={`${styles.iconThreeDots}`}
          />
        </div>
      </div>

      <Container className="pt-1">
        {messages.map((message, id) => (
          <div key={id}>
            {/* ... */}
            <div
              className={`d-flex ${message?.user?._id !== profileList?.id
                ? "justify-content-start"
                : "justify-content-end"
                } mx-4`}
            >
              <div
                className={`${message?.user?._id !== profileList?.id
                  ? styles.leftMsg
                  : styles.rightMsg
                  } p-3 my-2 d-flex justify-content-center`}
              >
                {message?.text && <p className="my-0 text-break">{message.text}</p>}
                {message?.image &&
                  <Image
                    src={message?.image}
                    className={`img img-fluid ${!fullScreenImage ? styles.uploadedImage : styles.fullScreen} `}
                    onClick={() => handleImageClick(message.image)}
                    alt="image"
                  />}
                {message?.video &&
                  <video
                    src={message.video}
                    className={`img img-fluid ${styles.uploadedImg} rounded`}
                    height={350}
                    width={350}
                    controls
                  />
                }
                {message?.document &&
                  <div className={`${styles.pdfOuter} d-flex flex-column align-items-center justify-content-center`}>
                    <LuFileText
                      size={30}
                    />
                    <p className={`my-0 pt-2 ${styles.pdfName}`}>
                      {message?.document.split("_")[1]}
                    </p>
                  </div>
                }
              </div>
            </div>
            {fullScreenImage && (
              <div className={`${styles.fullscreenImageOverlay}`} onClick={handleCloseFullScreen}>
                <div className={`${styles.fullscreenImageContainer}`}>
                  <img src={fullScreenImage} alt="Full-Screen Image" className={`${styles.fullscreenImage}`} />
                </div>
              </div>
            )}
            <div className={`d-flex ${message?.user?._id !== profileList?.id ? 'justify-content-start' : 'justify-content-end'} mx-4`}>
              <p className={`my-0 ${styles.innerMsgTime}`}><Moment fromNow>{message?.createdAt}</Moment></p>
            </div>
          </div>))}
      </Container>
      <div ref={ref} />
    </>
  );
}

export default Message;