import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage2 from "./SendMessage2";
import { useSelector } from "react-redux";
import { ref, onValue } from "firebase/database"
import { database } from "../../firebase_setup/firebase";

const ChatBox = ({ styles, person, queryData }) => {

  const [messages, setMessages] = useState([]);
  const scroll = useRef(null);
  const [url, setUrl] = useState(null);
  const [profilelist] = useSelector((Gstate) => [Gstate?.ProfileReducers?.profilelist]);

  useEffect(() => {
    const databaseRef = ref(database, `Chat/jobid${person?.jobId}-proposalid${person?.proposalId}`)
    onValue(databaseRef, (snapshot) => {
      const _messages = snapshot.val()
      if (_messages) {
        const messageList = Object.keys(_messages)
          .map((key) => ({
            ..._messages[key],
          }))
          .sort((a, b) => b.id - a.id)
          .reverse()
        setMessages(messageList)
      } else {
        setMessages([])
      }
    })
  }, [person, queryData]);

  return (
    <main className={`${styles.chatOuter} pt-2 my-0 ${(!person && !queryData) && 'd-flex justify-content-center align-items-center text-center'}`}>
      {
        (!person && !queryData)
          ?
          <>
            <div>
              <p className={`${styles.torsinWeb}`}>
                Torsin Web
              </p>
              <p className={`${styles.openChatDesc}`}>
                Send and receive messages hassle free.
              </p>

              <p className={`${styles.openChatDesc} ${styles.positionAbs}`}>
                Tap the chat to open
              </p>
            </div>

          </>
          :
          <>
            <div className={`${!url ? styles.chatInner : styles.chatInner2}`}>
              <Message
                messages={messages}
                styles={styles}
                person={person}
                profileList={profilelist}
              />
            </div>
            <SendMessage2
              className='my-2'
              scroll={scroll}
              user={person}
              styles={styles}
              profileList={profilelist}
              url={url}
              setUrl={setUrl}
            />
          </>
      }
    </main>
  );
};

export default ChatBox;