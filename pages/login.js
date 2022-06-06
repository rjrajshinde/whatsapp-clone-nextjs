import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebaseCon";
import Image from "next/image";

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background: #121b22;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
`;
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  border-radius: 50px;
  padding: 10px;
  background-color: #47c756;
  color: #fff;
  border: none;
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 20px;
  letter-spacing: 1px;
  :hover {
    background-color: #fff;
    color: #47c756;
  }
  :active {
    transform: translateY(5px);
  }
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.7);
`;

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
        <link
          rel="icon"
          href="https://www.freepnglogos.com/uploads/whatsapp-logo-app-png-4.png"
        />
      </Head>
      <LoginContainer>
        <Image
          src="https://www.freepnglogos.com/uploads/whatsapp-logo-app-png-4.png"
          alt="WhatsApp Logo"
          width={200}
          height={200}
        />
        <Button onClick={signIn}> Sign In with GOOGLE </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;
