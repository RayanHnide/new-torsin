import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal, Image } from "react-bootstrap";
import styles from "../../stylesheet/profile.module.scss";
import style from "../../stylesheet/dashboard.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
function ViewModal({
  show,
  handleClose,
  uploadData,
  selectedImageIndex,
  selectedVideo,
  slideIndex,
}) {
  const settings1 = {
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    initialSlide: slideIndex,
  };
  const videoSliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplaySpeed: 3000,
    initialSlide: slideIndex,
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <AiOutlineClose
          className={`${styles.closeIcon}`}
          onClick={handleClose}
        />

        {selectedImageIndex ? (
          <div className="px-5 text-center">
            {Array.isArray(uploadData?.photos) &&
            uploadData?.photos?.length > 0 ? (
              <Slider {...settings1}>
                {uploadData?.photos?.map((item, index) => (
                  <div key={index} className="p-5">
                    <Image
                      src={item.photos}
                      alt={item.description}
                      className={`${styles.uploadImg1}`}
                    />
                    {item?.tagUser.length > 0 ? (
                      <div>
                        <h4
                          className={`${styles.addNewSkills} pt-2 text-start`}
                        >
                          Tag People
                        </h4>
                        <div className={`${styles.addSkillOuteqr}`}>
                          <h4
                            className={`${styles.personDetails}  text-start mb-0`}
                          >
                            {item?.tagUser && item.tagUser.length > 0
                              ? item.tagUser.join(", ")
                              : ""}
                          </h4>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {item?.description !== null ? (
                      <div>
                        <h4
                          className={`${styles.addNewSkills} pt-1 text-start`}
                        >
                          Description
                        </h4>
                        <h4 className={`${styles.personDetails} text-start`}>
                          {item?.description}
                        </h4>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </Slider>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="px-5 text-center">
            {Array.isArray(uploadData?.videos) &&
            uploadData?.videos?.length > 0 ? (
              <Slider {...videoSliderSettings}>
                {uploadData?.videos?.map((item, index) => (
                  <div key={index} className="p-4">
                    <video
                      src={item.video}
                      controls
                      className={`${styles.videoImg1}`}
                    ></video>
                    {item?.tagUser.length > 0 ? (
                      <div>
                        <h4
                          className={`${styles.addNewSkills} pt-2 text-start`}
                        >
                          Tag People
                        </h4>
                        <h4 className={`${styles.personDetails} text-start`}>
                          {item?.tagUser && item.tagUser.length > 1
                            ? item.tagUser.join(", ")
                            : item.tagUser}
                        </h4>
                      </div>
                    ) : (
                      ""
                    )}
                    {item?.description !== null ? (
                      <div>
                        <h4
                          className={`${styles.addNewSkills} pt-1 text-start`}
                        >
                          Description
                        </h4>
                        <h4 className={`${styles.personDetails} text-start`}>
                          {item?.description}
                        </h4>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </Slider>
            ) : (
              <></>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

export default ViewModal;
