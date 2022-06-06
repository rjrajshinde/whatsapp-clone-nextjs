import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import getRecipientEmail from "../utilities/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseCon";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

const Container = styled.div`
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #2e3a42;
  :hover {
    background-color: #212e36;
    transition: 0.2s ease-in;
  }
`;

const UAvatar = styled(Avatar)`
  margin: 8px 15px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

function Chat({ id, users }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  //* FOR GET THE IMAGES OF THE USERS (MEANS AS WE DID BACK THAT WE SAVE THE DATA WITH TWO EMAIL FIRST IS THE EMAIL OF THE USER THAT CURRENTLY SIGNED IN AND ANOTHER IS RECIPIENT USER) WITH THE HELP OF THEIR EMAIL USING USECOLLECTION FROM DB.COLLECTION LIKE ALL OTHER DATABASE COLLECTION KIND OF MEANS TABLE WHERE THE DATA IS SAVED IN DOCUMENTS (OBJECTS (KEY:PAIR))
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipientDP = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  const enterChatFunc = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChatFunc}>
      {recipientDP ? (
        <UAvatar src={recipientDP?.photoURL} />
      ) : (
        <UAvatar>{recipientEmail[0].toUpperCase()}</UAvatar>
      )}

      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;
