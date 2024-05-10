import React, { useEffect, useRef, useState } from 'react';
import chatStyle from '../../stylesheet/chat.module.scss';
import { Col, Container, Form, Row } from 'react-bootstrap';
 import { getSupportChat } from '../../store/actions/support';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import API from '../../helpers/api';
import { handleErrorMessage } from '../../utils/CommonFunctions';
import { Toaster, toast } from 'react-hot-toast';
import moment from 'moment';

export default function SupportChat({ query }) {

    const dispatch = useDispatch();
    const router = useRouter()
    const ref = useRef()
    const [message, setMessage] = useState("");

    const { ticketId, status } = query;
    const [supportChatList] = useSelector((Gstate) => [Gstate?.SupportReducers?.supportChatList])

    useEffect(() => {
        dispatch(getSupportChat(ticketId))
    }, [supportChatList?.length])

    useEffect(() => {
        ref?.current?.scrollIntoView({ behavior: "smooth" })
    }, [supportChatList?.length])

    const sendMessage = (event) => {
        event.preventDefault();
        if (message.trim() === "") {
            return;
        }
        else {
            API.apiPost('supportChatInitiate', {
                'ticketId': ticketId,
                'message': message
            })
                .then((response) => {
                    if (response) {
                        // toast.success(response?.data?.response?.message?.successMessage, {
                        //     position: "top-right",
                        //     style: {
                        //         borderBottom: '4px solid #33a34e',
                        //         padding: "16px",
                        //         color: "#3c5f4b",
                        //         marginRight: "25px",
                        //     },
                        // });
                        setMessage('');
                        dispatch(getSupportChat(ticketId))
                    }
                })
                .catch((err) => {
                    handleErrorMessage(err);
                })
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage(e);
        }
    };

    const isMessageFromCurrentWeek = (messageDate) => {
        const messageMoment = moment(messageDate);
        const currentWeekStart = moment().startOf('week');
        return messageMoment.isSameOrAfter(currentWeekStart);
    };

    const getMessageDateFormatted = (messageDate) => {
        const messageMoment = moment(messageDate);
        if (isMessageFromCurrentWeek(messageDate)) {
            return <Moment fromNow>{messageDate}</Moment>;
        } else {
            return messageMoment.format('DD MMM YYYY');
        }
    };

    return (
        <>
            <Toaster />
            <main className={`${chatStyle.chatOuter} pt-2 my-0`}>
                <div className={`${chatStyle.chatInner}`}>
                    <div className={`d-flex align-items-center ${chatStyle.chatNav} px-4 pt-3`}>
                        {/* <IconArrowLeft
                            size={20}
                            role='button'
                            onClick={() => router.back()}
                        /> */}
                        <p className={`my-0 ms-2 ${chatStyle.personName}`}>
                            Ticket Number #{ticketId}
                        </p>
                    </div>
                    <Container className="pt-1">
                        {
                            supportChatList?.length > 0 && supportChatList?.slice().reverse().map((message, index) => (
                                <div key={index}>
                                    <div
                                        className={`d-flex ${message?.isSenderAdmin
                                            ? "justify-content-start"
                                            : "justify-content-end"
                                            } mx-4`}
                                    >
                                        <div
                                            className={`${message?.isSenderAdmin
                                                ? chatStyle.leftMsg
                                                : chatStyle.rightMsg
                                                } p-3 my-2 d-flex justify-content-center`}
                                        >
                                            <p className="my-0 text-break">{message?.message}</p>
                                        </div>
                                    </div>
                                    {/* <div className={`d-flex ${message?.isSenderAdmin ? 'justify-content-start' : 'justify-content-end'} mx-4`}>
                                        <p className={`my-0 ${chatStyle.innerMsgTime}`}><Moment fromNow>{message?.createdAt}</Moment></p>
                                    </div> */}
                                    <div className={`d-flex ${message?.isSenderAdmin ? 'justify-content-start' : 'justify-content-end'} mx-4`}>
                                        <p className={`my-0 ${chatStyle.innerMsgTime}`}>
                                            {getMessageDateFormatted(message?.createdAt)}
                                        </p>
                                    </div>

                                </div>
                            ))
                        }
                    </Container>
                    <div ref={ref} />
                </div>

                {status == '2' &&
                    <Row className="d-flex align-items-center justify-content-end w-100">
                        <Col className='ms-3'>
                            <Form.Group className="d-flex px-3 position-relative">
                                <Form.Control
                                    name="messageInput"
                                    type="text"
                                    className={`${chatStyle.chatInput} ps-4 pe-5 py-2 outline-0`}
                                    placeholder={`Enter message...`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    autoComplete="off"
                                    onKeyDown={handleKeyDown}
                                // disabled={url && 'true'}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={1} sm={1} className="p-0">
                            {/* <IconSend
                                role="button"
                                className=""
                                color="#14226D"
                                onClick={sendMessage}
                            /> */}
                        </Col>
                    </Row>}
            </main>
        </>
    )
}
