import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { AiOutlineWarning } from "react-icons/ai";
import styles from "../../stylesheet/notifications.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationsList } from "../../store/actions/notifications";

export default function Notifications() {

  const dispatch = useDispatch();

  const [notificationList] = useSelector((Gstate) => [Gstate?.NotificationReducers?.notificationList])

  useEffect(() => {
    dispatch(getNotificationsList())
  }, [notificationList?.length])

  const data1 = [
    {
      title: " Unread Notification - This section will provide the information of error heading",
      time: "Today 06:00PM",
      body: "  This section will prvide the description of error in detail. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus.",
    },
    {
      title: " Read Notification - This section will provide the information of error heading",
      time: "Yesterday 06:00PM",
      body: "  This section will prvide the description of error in detail. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus.",
    },
    {
      title: " Read Notification - This section will provide the information of error heading",
      time: "Today 06:00PM",
      body: "  This section will prvide the description of error in detail. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus.",
    },
    {
      title: " Unread Notification - This section will provide the information of error heading",
      time: "Today 06:00PM",
      body: "  This section will prvide the description of error in detail. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus.",
    },
  ];

  return (
    <>
      <Container className={`${styles.fontFamily}`}>
        <p className={`${styles.title}`}>Notifications</p>
        <Row>
          {data1.map((data, index) => (
            <React.Fragment key={index}>
              <Col md={10} className="d-flex align-items-center">
                <AiOutlineWarning
                  className={`${data.title.includes("Unread") && styles.blueIcon
                    } me-1`}
                />

                <p
                  className={`${styles.notifyHeading} my-0 ${data.title.includes("Unread") && styles.blueTitle
                    }`}
                >
                  {data.title}
                </p>
              </Col>
              <Col md={2}>
                <p className={`${styles.duration}`}>{data.time}</p>
              </Col>
              <Col md={12}>
                <p className={`${styles.notifyBody} mt-3`}>{data.body}</p>
              </Col>
              <hr />
            </React.Fragment>
          ))}
        </Row>
      </Container>
    </>
  );
}
