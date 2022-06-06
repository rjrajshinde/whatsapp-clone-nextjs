//TODO THIS UTILITY FOR TO GET THE EMAIL OF THE USER THAT WE ARE CHATTING WITH
const getRecipientEmail = (users, userWhoLoggedIn) =>
  users?.filter((user) => user !== userWhoLoggedIn?.email)[0];

export default getRecipientEmail;
