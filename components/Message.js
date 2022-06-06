import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseCon";
import moment from "moment";

const Container = styled.div`
  font-size: 16px;
`;

const MessageEle = styled.p`
  width: fit-content;
  padding: 0.5em 0.8em;
  // padding-bottom: 1em;
  border-radius: 0.5em;
  margin: 0.8em;
  min-width: 3em;
  position: relative;
  text-align: right;
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: -0.14em;
    border-left: 1em solid transparent;
    border-right: 1em solid transparent;
    border-bottom: 1em solid;
  }
`;

const Sender = styled(MessageEle)`
  margin-left: auto;
  background-color: #05a780;

  &:before {
    right: -0.8em;
    transform: rotate(-45deg);
    border-bottom: 1em solid;
    color: #05a780;
  }
`;

const Receiver = styled(MessageEle)`
  margin-left: left;
  background-color: #1f2c34;
  &:before {
    left: -0.8em;
    transform: rotate(45deg);
    color: #1f2c34;
  }
`;

const MessageTime = styled.span`
  color: whitesmoke;
  padding: 0.7em;
  position: relative;
  bottom: -0.8em;
  text-align: right;
  right: -8px;
  font-size: 8px;
`;

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  console.log("message", message);
  const UserMessageType = user === userLoggedIn.email ? Sender : Receiver;
  return (
    <Container>
      <UserMessageType>
        {message.message}
        <MessageTime>
          {/* {moment(message.timestamp).format("LT")} */}
          {message.timestamp ? moment(message?.timestamp).format("LT") : "..."}
          {/* {moment(1653402719559).format("LT")} */}
        </MessageTime>
      </UserMessageType>
    </Container>
  );
}

export default Message;
