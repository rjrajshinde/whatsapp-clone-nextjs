import styled from "styled-components";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import MoreVert from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebaseCon";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

const Container = styled.div`
  background: #121b22;

  max-width: 400px;
  height: 100vh;
  flex: 40%;
  border-right: 1px solid #2e3a42;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    max-width: 280px;
    min-width: 240px;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  background: #1f2c34;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 65px;
`;

const UAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const ContainerIcons = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
  gap: 5px;
`;

const SearchInput = styled.input`
  flex: 1;
  border-radius: 10px;
  padding: 10px 10px;
  border: none;
  background: #1f2c34;
  color: #aebac1;
  outline: none;
`;

const SideBarButton = styled(Button)`
  &.buttonClass {
    width: 100%;
    background: #aebac1;
    border: 1px solid #aebac1;
    :hover {
      color: #aebac1;
      border: 1px solid #aebac1;
    }
  }
`;

const ButtonContainer = styled.div`
  margin: 0px 15px 5px 15px;
`;

function Sidebar() {
  const [user] = useAuthState(auth);
  //* IT GOES TO FIREBASE DB AND GET WHERE ARE THE EMAIL ARE PRESENT OF THE PERSON WHO CURRENTLY LOGGED IN
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  //* WE ARE SAVING ALL THE CHAT INFORMATION FROM DB WHERE THE USERS EMAIL IS PRESENT IN CHATSDATA
  const [chatsData] = useCollection(userChatRef);

  const createNewChat = () => {
    const input = prompt(
      "Enter the Email Address of the user you want to chat with "
    );
    //! IF THE INPUT IS NOTHING THEN RETURN NULL STOP EXECUTING AND EXIT FROM THIS CODE
    if (!input) return null;

    //! IF EMAIL IS VALIDATE THEN WE ADD THE CHAT IN TO DB WITH 'CHATS' COLLECTION
    //* WE ARE ADDING THE CHATS INTO DB IF THE CHAT(EMAIL OF RECIPIENT) DOES NOT EXIST IN DB (OR YOU HAVEN'T START CHATTING WITH THIS EMAIL) AND EMAIL IS VALID
    if (
      EmailValidator.validate(input) &&
      !IsChatAlreadyExist(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  //! HERE WE ARE CHECKING IF THE EMAIL WE ARE TYPING IS ALREADY EXIST MEANS WE ALREADY START CHATTING WITH THIS EMAIL OR NOT
  //? THIS LINE IS GOING TO FIND THE EMAIL ADDRESS OF RECIPIENT IN THIS DATA THAT WE GET ABOVE (THE DATA OF THE SIGN IN USER LIKE IT'S CHATTING BOOK)
  const IsChatAlreadyExist = (email) =>
    !!chatsData?.docs.find(
      (chat) => chat.data().users.find((user) => user === email)?.length > 0
    );
  //! THIS !! IS TO CONVERT THE VALUE TO BOOLEAN

  const signOut = () => {
    auth.signOut();
    window.history.pushState({}, "", "/");
  };

  return (
    <Container>
      <Header>
        <UAvatar src={user?.photoURL} onClick={signOut} />
        <ContainerIcons>
          <IconButton>
            <ChatOutlinedIcon style={{ color: "#AEBAC1" }} />
          </IconButton>
          <IconButton>
            <MoreVert style={{ color: "#AEBAC1" }} />
          </IconButton>
        </ContainerIcons>
      </Header>
      <Search>
        <SearchIcon style={{ color: "#AEBAC1" }} />
        <SearchInput placeholder="Search in Chats" />
      </Search>
      <ButtonContainer>
        <SideBarButton className="buttonClass" onClick={() => createNewChat()}>
          Start a New Chat
        </SideBarButton>
      </ButtonContainer>
      {chatsData?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;
