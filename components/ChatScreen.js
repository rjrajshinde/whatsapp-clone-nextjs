import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseCon";
import { Avatar, IconButton } from "@material-ui/core";
import getRecipientEmail from "../utilities/getRecipientEmail";
import { AttachFile, Mic, MoreVert, Search } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { InsertEmoticon } from "@material-ui/icons";
import firebase from "firebase/compat/app";
import TimeAgo from "timeago-react";

const Container = styled.div`
  background: center / contain repeat rgba(0, 0, 0, 0.33)
    url("https://i.pinimg.com/originals/97/c0/07/97c00759d90d786d9b6096d274ad3e07.png");
  background-blend-mode: darken;
  cursor: default;
`;

const Header = styled.div`
  position: sticky;
  z-index: 100;
  top: 0;
  background: #1f2c34;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 65px;
  padding: 20px;
`;

const HeaderInfo = styled.div`
  margin-left: 20px;
  flex: 1;
  font-size: 16px;
  > h3 {
    margin-bottom: -8px;
    font-size: 1.05em;
  }
  > p {
    font-size: 0.8em;
    color: #b4b4b5;
  }
`;

const MessageContainer = styled.div`
  padding: 30px;
  min-height: 90vh;
`;

const HeaderIcons = styled.div``;

const EndOFMessageContainer = styled.div``;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 7px;
  position: sticky;
  bottom: 0;
  background-color: #1f2c34;
  z-index: 100;
`;

const MessageInput = styled.input`
  flex: 1;
  align-items: center;
  outline: 0;
  padding: 12px;
  position: sticky;
  border: none;
  bottom: 0;
  background-color: #2b3942;
  border-radius: 15px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 16px;
  color: white;
`;

function ChatScreen({ chat, messages }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");

  const { id } = router.query;

  //* IT GOES INTO THE CHATS COLLECTION AND THE CHATS DOC WITH THE SPECIFIC ID THAT WE GET FROM ROUTER.QUERY AS SHOWN ABOVE AND AFTER GOES TO THE MESSAGES COLLECTION AND FETCHES THE DATA IN TIMESTAMP ORDER

  //todo ROUTER.QUERY.ID BASICALLY GIVES THE ID THAT IS COMING FROM [ID].JS FILE (THAT ID IS IN THE URL)
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      //! THIS HERE IS THE MESSAGES ARE RENDER ON THE CLIENT SIDE WHEN CLIENT GOT CONNECTED THEN IT'S GOING TO FETCH THE DATA AND SHOW IN ROWS
      return messagesSnapshot.docs.map((ele) => (
        <Message
          key={ele.id}
          user={ele.data().user}
          message={{
            ...ele.data(),
            timestamp: ele.data.timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      //! THIS HERE IS BASICALLY IT'S GOING TO RENDER BEFORE THE CLIENT GOING TO CONNECTED MEANS IT'S SERVER SIDE RENDERING AND HERE WE SEND THE MESSAGES JSON OBJECT
      return JSON.parse(messages).map((ele) => (
        <Message key={ele.id} user={ele.user} message={ele} />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    //* WHEN THE USER SEND THE MESSAGE IT WILL UPDATE THE LAST SEEN TO RECENTLY ACTIVITY
    db.collection("users")
      .doc(user.uid)
      .set(
        { lastSeen: firebase.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );

    //* AND HERE WE ARE ADDING MESSAGES THAT WE GET FROM THE INPUT FIELD WITH TIME AND PHOTOURL WITH EMAILS
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
  };

  //? TO GET THE EMAIL OF USER THAT WE ARE CHATTING WITH
  const headingEmail = getRecipientEmail(chat.users, user);

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", headingEmail)
  );

  const recipientInfo = recipientSnapshot?.docs?.[0]?.data();

  console.log("blahblah", firebase.firestore);

  return (
    <Container>
      <Header>
        {recipientInfo ? (
          <Avatar src={recipientInfo?.photoURL} />
        ) : (
          <Avatar>{headingEmail[0].toUpperCase()}</Avatar>
        )}

        <HeaderInfo>
          <h3>{headingEmail}</h3>
          {recipientInfo ? (
            <p>
              Last Active:{"  "}
              {recipientInfo.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipientInfo.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last Active...</p>
          )}
        </HeaderInfo>
        <HeaderIcons>
          <IconButton>
            <Search style={{ color: "#AEBAC1" }} />
          </IconButton>
          <IconButton>
            <MoreVert style={{ color: "#AEBAC1" }} />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOFMessageContainer />
      </MessageContainer>
      <InputContainer>
        <IconButton>
          <InsertEmoticon style={{ color: "#AEBAC1" }} />
        </IconButton>
        <IconButton>
          <AttachFile style={{ color: "#AEBAC1" }} />
        </IconButton>
        <MessageInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {/* FOR MESSAGE INPUT */}
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send
        </button>
        <IconButton>
          <Mic style={{ color: "#AEBAC1" }} />
        </IconButton>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;
